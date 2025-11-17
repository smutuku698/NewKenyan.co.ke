/**
 * Unified Indexing Tracker
 *
 * Tracks which URLs have been submitted to Google and Bing
 * Prevents duplicate submissions and maintains indexing history
 */

import * as fs from 'fs';
import * as path from 'path';

const TRACKER_FILE = path.join(process.cwd(), 'indexing-tracker.json');

export interface IndexedUrlRecord {
  url: string;
  firstIndexed: string; // ISO timestamp
  lastIndexed: string; // ISO timestamp
  services: {
    google?: {
      indexed: boolean;
      timestamp: string;
      success: boolean;
      error?: string;
    };
    bing?: {
      indexed: boolean;
      timestamp: string;
      success: boolean;
      error?: string;
    };
  };
  indexCount: number; // Number of times re-indexed
}

export interface IndexingTrackerData {
  lastUpdated: string;
  totalUrls: number;
  urls: Record<string, IndexedUrlRecord>;
}

/**
 * Load indexing tracker data from file
 */
export function loadTrackerData(): IndexingTrackerData {
  try {
    if (fs.existsSync(TRACKER_FILE)) {
      const data = fs.readFileSync(TRACKER_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('Could not load tracker data, creating new tracker');
  }

  // Return empty tracker
  return {
    lastUpdated: new Date().toISOString(),
    totalUrls: 0,
    urls: {},
  };
}

/**
 * Save indexing tracker data to file
 */
export function saveTrackerData(data: IndexingTrackerData): void {
  try {
    data.lastUpdated = new Date().toISOString();
    data.totalUrls = Object.keys(data.urls).length;
    fs.writeFileSync(TRACKER_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving tracker data:', error);
  }
}

/**
 * Check if a URL has been indexed by a specific service
 */
export function isUrlIndexed(
  url: string,
  service: 'google' | 'bing'
): boolean {
  const data = loadTrackerData();
  const record = data.urls[url];

  if (!record) return false;

  const serviceData = record.services[service];
  return serviceData ? serviceData.indexed && serviceData.success : false;
}

/**
 * Mark a URL as indexed by a service
 */
export function markUrlIndexed(
  url: string,
  service: 'google' | 'bing',
  success: boolean,
  error?: string
): void {
  const data = loadTrackerData();
  const now = new Date().toISOString();

  if (!data.urls[url]) {
    data.urls[url] = {
      url,
      firstIndexed: now,
      lastIndexed: now,
      services: {},
      indexCount: 0,
    };
  }

  const record = data.urls[url];
  record.lastIndexed = now;
  record.indexCount += 1;

  record.services[service] = {
    indexed: true,
    timestamp: now,
    success,
    error,
  };

  saveTrackerData(data);
}

/**
 * Get all URLs that need indexing for a specific service
 */
export function getUrlsToIndex(
  allUrls: string[],
  service: 'google' | 'bing',
  reindexAfterDays?: number
): string[] {
  const data = loadTrackerData();
  const urlsToIndex: string[] = [];

  for (const url of allUrls) {
    const record = data.urls[url];

    // Not indexed yet
    if (!record || !record.services[service]) {
      urlsToIndex.push(url);
      continue;
    }

    // Previously failed - try again
    if (!record.services[service]?.success) {
      urlsToIndex.push(url);
      continue;
    }

    // Re-index if older than specified days
    if (reindexAfterDays) {
      const lastIndexed = new Date(record.services[service]!.timestamp);
      const daysSinceIndexed =
        (Date.now() - lastIndexed.getTime()) / (1000 * 60 * 60 * 24);

      if (daysSinceIndexed >= reindexAfterDays) {
        urlsToIndex.push(url);
      }
    }
  }

  return urlsToIndex;
}

/**
 * Get indexing statistics
 */
export function getIndexingStats(): {
  total: number;
  google: { indexed: number; failed: number; pending: number };
  bing: { indexed: number; failed: number; pending: number };
} {
  const data = loadTrackerData();
  const stats = {
    total: data.totalUrls,
    google: { indexed: 0, failed: 0, pending: 0 },
    bing: { indexed: 0, failed: 0, pending: 0 },
  };

  for (const record of Object.values(data.urls)) {
    // Google stats
    if (record.services.google) {
      if (record.services.google.success) {
        stats.google.indexed++;
      } else {
        stats.google.failed++;
      }
    } else {
      stats.google.pending++;
    }

    // Bing stats
    if (record.services.bing) {
      if (record.services.bing.success) {
        stats.bing.indexed++;
      } else {
        stats.bing.failed++;
      }
    } else {
      stats.bing.pending++;
    }
  }

  return stats;
}

/**
 * Get recently indexed URLs
 */
export function getRecentlyIndexed(
  service?: 'google' | 'bing',
  limit: number = 10
): IndexedUrlRecord[] {
  const data = loadTrackerData();
  let records = Object.values(data.urls);

  // Filter by service if specified
  if (service) {
    records = records.filter(r => r.services[service]?.indexed);
  }

  // Sort by last indexed date
  records.sort((a, b) =>
    new Date(b.lastIndexed).getTime() - new Date(a.lastIndexed).getTime()
  );

  return records.slice(0, limit);
}

/**
 * Clear all tracking data (use with caution!)
 */
export function clearTrackerData(): void {
  const emptyData: IndexingTrackerData = {
    lastUpdated: new Date().toISOString(),
    totalUrls: 0,
    urls: {},
  };
  saveTrackerData(emptyData);
}
