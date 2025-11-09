/**
 * IndexNow API Integration
 *
 * Submits URLs to search engines (Bing, Yandex, etc.) for instant indexing
 * https://www.indexnow.org/
 */

const INDEXNOW_API_KEY = '4552f861398b42c591437a07760a58e4';
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

interface IndexNowParams {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow API
 * @param urls - Array of full URLs to submit
 * @returns Promise<boolean> - True if successful
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  if (!urls || urls.length === 0) {
    console.warn('IndexNow: No URLs provided');
    return false;
  }

  // Limit to 10,000 URLs per submission (IndexNow limit)
  const urlsToSubmit = urls.slice(0, 10000);

  const payload: IndexNowParams = {
    host: 'newkenyan.com',
    key: INDEXNOW_API_KEY,
    keyLocation: `https://newkenyan.com/${INDEXNOW_API_KEY}.txt`,
    urlList: urlsToSubmit,
  };

  try {
    // Submit to primary endpoint (api.indexnow.org distributes to all search engines)
    const response = await fetch(INDEXNOW_ENDPOINTS[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`IndexNow: Successfully submitted ${urlsToSubmit.length} URLs`);
      return true;
    } else {
      console.error(`IndexNow: Failed with status ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('IndexNow: Error submitting URLs', error);
    return false;
  }
}

/**
 * Submit a single URL to IndexNow
 * @param url - Full URL to submit
 */
export async function submitUrlToIndexNow(url: string): Promise<boolean> {
  return submitToIndexNow([url]);
}

/**
 * Generate IndexNow submission for a property listing
 */
export async function indexProperty(propertyId: string): Promise<boolean> {
  const url = `https://newkenyan.com/properties/${propertyId}`;
  return submitUrlToIndexNow(url);
}

/**
 * Generate IndexNow submission for a location page
 */
export async function indexLocationPage(
  propertyType: string,
  transactionType: string,
  locationSlug: string
): Promise<boolean> {
  const url = `https://newkenyan.com/${propertyType}-for-${transactionType}/${locationSlug}`;
  return submitUrlToIndexNow(url);
}

/**
 * Batch submit multiple property pages
 */
export async function indexProperties(propertyIds: string[]): Promise<boolean> {
  const urls = propertyIds.map(id => `https://newkenyan.com/properties/${id}`);
  return submitToIndexNow(urls);
}

/**
 * Batch submit multiple location pages
 */
export async function indexLocationPages(pages: Array<{
  propertyType: string;
  transactionType: string;
  locationSlug: string;
}>): Promise<boolean> {
  const urls = pages.map(
    page => `https://newkenyan.com/${page.propertyType}-for-${page.transactionType}/${page.locationSlug}`
  );
  return submitToIndexNow(urls);
}
