'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PopulatePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{success: boolean; message?: string; error?: string; createdCount?: number; totalProperties?: number} | null>(null);

  const handlePopulate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/populate-properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: 'Failed to populate properties' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Populate Properties</h1>
      
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <p className="text-gray-600">
          This will create property listings across Kiambu, Westlands, Karen, Runda, Tatu City, and Mombasa 
          using the images from your public/propert images folder.
        </p>
        
        <Button 
          onClick={handlePopulate}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating Properties...' : 'Populate Properties'}
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
            {result.success && (
              <div className="mt-2 text-green-600 text-sm">
                Created {result.createdCount} out of {result.totalProperties} properties
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}