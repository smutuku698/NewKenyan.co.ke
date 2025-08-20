'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Eye, RefreshCw, AlertTriangle } from 'lucide-react';

interface PropertyPreview {
  id: string;
  title: string;
  images: string[] | null;
  created_at: string;
}

interface CleanupResponse {
  message: string;
  count?: number;
  deletedCount?: number;
  properties?: PropertyPreview[];
  deletedProperties?: PropertyPreview[];
}

export default function CleanupPropertiesPage() {
  const [preview, setPreview] = useState<PropertyPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(true);

  const fetchPreview = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/cleanup-properties');
      const data: CleanupResponse = await response.json();
      
      if (response.ok) {
        setPreview(data.properties || []);
        setMessage(`Found ${data.count || 0} properties without valid images`);
      } else {
        setMessage(`Error: ${data.message || 'Failed to fetch preview'}`);
      }
    } catch (error) {
      setMessage('Error connecting to API');
      console.error('Preview error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCleanup = async () => {
    if (!confirm(`Are you sure you want to delete ${preview.length} properties without images? This action cannot be undone.`)) {
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/cleanup-properties', {
        method: 'POST',
      });
      const data: CleanupResponse = await response.json();
      
      if (response.ok) {
        setMessage(`✅ Successfully deleted ${data.deletedCount || 0} properties without images`);
        setPreview([]);
        setIsPreviewMode(true);
      } else {
        setMessage(`❌ Error: ${data.message || 'Failed to delete properties'}`);
      }
    } catch (error) {
      setMessage('❌ Error connecting to API');
      console.error('Cleanup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🧹 Cleanup Properties Without Images
            </h1>
            <p className="text-gray-600">
              This tool will help you clean up properties that don't have valid images. 
              It will remove properties with no images, empty image arrays, or sample/placeholder images.
            </p>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800">Important Warning</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  This action will permanently delete properties from the database. Make sure to preview 
                  the properties first and confirm you want to delete them.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button
              onClick={fetchPreview}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              Preview Properties to Delete
            </Button>

            {preview.length > 0 && (
              <Button
                onClick={executeCleanup}
                disabled={isLoading}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete {preview.length} Properties
              </Button>
            )}
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('✅') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : message.includes('❌') 
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {message}
            </div>
          )}

          {preview.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Properties Without Valid Images ({preview.length})
              </h2>
              
              <div className="space-y-4">
                {preview.map((property) => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {property.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          ID: {property.id}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          Created: {new Date(property.created_at).toLocaleDateString()}
                        </p>
                        <div className="text-sm">
                          <span className="font-medium">Images: </span>
                          <span className="text-red-600">
                            {!property.images || property.images.length === 0 
                              ? 'No images' 
                              : `${property.images.length} images (${property.images.join(', ')})`
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {preview.length === 0 && message.includes('Found 0') && (
            <div className="text-center py-8">
              <div className="text-green-600 text-lg font-semibold mb-2">
                🎉 No Cleanup Needed!
              </div>
              <p className="text-gray-600">
                All properties in the database have valid images.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}