/**
 * Google Indexing API Integration
 *
 * Submits URLs directly to Google for instant indexing
 * Requires Google Search Console API access
 * https://developers.google.com/search/apis/indexing-api/v3/quickstart
 */

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

const CREDENTIALS_PATH = path.join(process.cwd(), 'indexnowapi-478503-1a9130d92cc2.json');
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

interface IndexingResult {
  url: string;
  success: boolean;
  error?: string;
  metadata?: {
    updatedTime?: string;
  };
}

/**
 * Get authenticated Google Indexing API client
 */
async function getIndexingClient() {
  try {
    // Load service account credentials
    const credentials = JSON.parse(
      fs.readFileSync(CREDENTIALS_PATH, 'utf-8')
    );

    // Authenticate using service account
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const authClient = await auth.getClient();

    // Create Indexing API client
    const indexing = google.indexing({
      version: 'v3',
      auth: authClient as any,
    });

    return indexing;
  } catch (error) {
    console.error('Error creating Google Indexing client:', error);
    throw error;
  }
}

/**
 * Submit a single URL to Google Indexing API
 * @param url - Full URL to submit
 * @param type - 'URL_UPDATED' or 'URL_DELETED'
 */
export async function submitUrlToGoogle(
  url: string,
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<IndexingResult> {
  try {
    const indexing = await getIndexingClient();

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type,
      },
    });

    return {
      url,
      success: true,
      metadata: {
        updatedTime: response.data.notifyTime,
      },
    };
  } catch (error: any) {
    console.error(`Error submitting URL to Google: ${url}`, error.message);
    return {
      url,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get the status of a URL in Google's index
 */
export async function getUrlStatus(url: string): Promise<any> {
  try {
    const indexing = await getIndexingClient();

    const response = await indexing.urlNotifications.getMetadata({
      url: url,
    });

    return response.data;
  } catch (error: any) {
    console.error(`Error getting URL status from Google: ${url}`, error.message);
    return null;
  }
}

/**
 * Batch submit multiple URLs to Google Indexing API
 * @param urls - Array of full URLs to submit
 * @param delayMs - Delay between requests in milliseconds (default: 1000ms to respect rate limits)
 */
export async function submitBatchToGoogle(
  urls: string[],
  delayMs: number = 1000
): Promise<IndexingResult[]> {
  const results: IndexingResult[] = [];

  console.log(`📤 Submitting ${urls.length} URLs to Google Indexing API...`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Submitting: ${url}`);

    const result = await submitUrlToGoogle(url);
    results.push(result);

    // Add delay to respect rate limits (200 requests per minute)
    if (i < urls.length - 1 && delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✅ Successfully submitted: ${successful}`);
  console.log(`❌ Failed: ${failed}`);

  return results;
}

/**
 * Helper functions for specific content types
 */

export async function indexJobPosting(jobSlug: string): Promise<IndexingResult> {
  const url = `https://newkenyan.com/jobs-in-kenya/${jobSlug}`;
  return submitUrlToGoogle(url);
}

export async function indexProperty(propertySlug: string): Promise<IndexingResult> {
  const url = `https://newkenyan.com/properties/${propertySlug}`;
  return submitUrlToGoogle(url);
}

export async function indexPropertyLocationPage(
  propertyType: string,
  transactionType: string,
  locationSlug: string
): Promise<IndexingResult> {
  const url = `https://newkenyan.com/${propertyType}-for-${transactionType}/${locationSlug}`;
  return submitUrlToGoogle(url);
}

export async function deleteUrl(url: string): Promise<IndexingResult> {
  return submitUrlToGoogle(url, 'URL_DELETED');
}
