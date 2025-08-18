'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function FixImagesPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{success: boolean; message?: string; error?: string; updatedCount?: number; totalProperties?: number; results?: unknown[]} | null>(null);

  const handleFixImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fix-property-urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: 'Failed to fix property images' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Fix Property Images</h1>
      
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <p className="text-gray-600">
          This will fix the image URLs for all properties to use proper public paths that work on Vercel.
          Your images are in the public folder and will work when deployed.
        </p>
        
        <Button 
          onClick={handleFixImages}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Uploading Images...' : 'Fix Property Images'}
        </Button>
        
        {result && (
          <div className={`mt-4 p-4 rounded-lg ${
            result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <h3 className={`font-semibold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.success ? 'Success!' : 'Error'}
            </h3>
            <p className={result.success ? 'text-green-700' : 'text-red-700'}>
              {result.message || result.error}
            </p>
            {result.success && result.updatedCount && (
              <div className="mt-2 text-green-600 text-sm">
                Updated {result.updatedCount} out of {result.totalProperties} properties
              </div>
            )}
            {result.results && (
              <div className="mt-3 max-h-48 overflow-y-auto">
                <div className="text-sm space-y-1">
                  {result.results.map((item: any, index: number) => (
                    <div key={index} className={`flex items-center ${
                      item.success ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span className="mr-2">{item.success ? '✅' : '❌'}</span>
                      <span>{item.property}</span>
                      {item.imagesUploaded && (
                        <span className="ml-2 text-xs">({item.imagesUploaded} images)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}