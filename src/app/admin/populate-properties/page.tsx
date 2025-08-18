'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

// Property data for different regions
const propertyData = [
  // COMMERCIAL/OFFICE PROPERTIES
  {
    propertyTitle: "Modern Co-working Space in Westlands",
    propertyType: "Office",
    description: "Contemporary co-working space in prime Westlands location. Features hot desks, private offices, meeting rooms, and high-speed internet. Perfect for startups, freelancers, and remote teams.",
    price: 15000,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 2,
    squareFeet: 2000,
    address: "Westlands Road, Business Hub",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345017",
    contactEmail: "coworking@newkenyan.co.ke",
    whatsappNumber: "+254712345017",
    amenities: ["wifi", "security", "parking", "air conditioning", "elevator"],
    isFurnished: true,
    petsAllowed: false,
    isCommercial: true
  },
  {
    propertyTitle: "Executive Office Space in CBD",
    propertyType: "Office", 
    description: "Premium executive office space in Nairobi CBD. Fully furnished with modern amenities, reception area, and conference facilities. Ideal for established businesses and corporate offices.",
    price: 25000,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 3,
    squareFeet: 1500,
    address: "Kimathi Street, Executive Plaza",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345018",
    contactEmail: "office@newkenyan.co.ke",
    whatsappNumber: "+254712345018",
    amenities: ["wifi", "security", "parking", "air conditioning", "elevator", "backup generator"],
    isFurnished: true,
    petsAllowed: false,
    isCommercial: true
  },
  {
    propertyTitle: "Creative Workspace in Karen",
    propertyType: "Office",
    description: "Unique creative workspace in serene Karen environment. Features open plan areas, break-out spaces, and natural lighting. Perfect for creative agencies, design studios, and tech companies.",
    price: 18000,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 2,
    squareFeet: 1200,
    address: "Karen Road, Creative Complex",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345019",
    contactEmail: "creative@newkenyan.co.ke",
    whatsappNumber: "+254712345019",
    amenities: ["wifi", "security", "parking", "garden", "backup generator"],
    isFurnished: true,
    petsAllowed: false,
    isCommercial: true
  },

  // RESIDENTIAL PROPERTIES
  // KIAMBU
  {
    propertyTitle: "Modern 3BR Family House in Kiambu",
    propertyType: "House",
    description: "Beautiful 3-bedroom family home in Kiambu with spacious compound and modern finishes. Features include a large kitchen, living room, and secure parking. Perfect for families looking for suburban living with easy access to Nairobi.",
    price: 85000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1400,
    address: "Kiambu Road, Green Valley Estate",
    city: "Kiambu",
    county: "Kiambu",
    contactPhone: "+254712345001",
    contactEmail: "kiambu@newkenyan.co.ke",
    whatsappNumber: "+254712345001",
    amenities: ["parking", "security", "garden", "backup generator"],
    isFurnished: false,
    petsAllowed: true,
    isCommercial: false
  },
  {
    propertyTitle: "Spacious 4BR Villa in Kiambu Town",
    propertyType: "Villa",
    description: "Luxurious 4-bedroom villa situated in quiet Kiambu neighborhood. Features include master ensuite, modern kitchen, spacious living areas, and beautiful garden. Close to schools and shopping centers.",
    price: 1200000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2000,
    address: "Kiambu Town, Villa Gardens",
    city: "Kiambu",
    county: "Kiambu",
    contactPhone: "+254712345002",
    contactEmail: "kiambu@newkenyan.co.ke",
    whatsappNumber: "+254712345002",
    amenities: ["garden", "parking", "security", "backup generator", "storage"],
    isFurnished: false,
    petsAllowed: true,
    isCommercial: false
  },
  
  // WESTLANDS
  {
    propertyTitle: "Luxury 2BR Apartment in Westlands",
    propertyType: "Apartment",
    description: "Premium 2-bedroom apartment in the heart of Westlands. Features modern amenities, city views, and close proximity to shopping malls, restaurants, and business centers. Perfect for young professionals.",
    price: 95000,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1000,
    address: "Westlands Square, Block A",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345003",
    contactEmail: "westlands@newkenyan.co.ke",
    whatsappNumber: "+254712345003",
    amenities: ["parking", "security", "gym", "pool", "elevator"],
    isFurnished: true,
    petsAllowed: false,
    isCommercial: false
  },
  {
    propertyTitle: "Executive 3BR Penthouse in Westlands",
    propertyType: "Penthouse",
    description: "Stunning 3-bedroom penthouse with panoramic city views. Features include a private balcony, modern kitchen, and premium finishes throughout. Located in prestigious Westlands area.",
    price: 3500000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1800,
    address: "Westlands Road, Sky Tower",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345004",
    contactEmail: "westlands@newkenyan.co.ke",
    whatsappNumber: "+254712345004",
    amenities: ["parking", "security", "gym", "pool", "balcony", "elevator"],
    isFurnished: true,
    petsAllowed: false,
    isCommercial: false
  },
  
  // KAREN
  {
    propertyTitle: "Elegant 4BR House in Karen",
    propertyType: "House",
    description: "Beautiful 4-bedroom house in prestigious Karen suburb. Features include spacious rooms, modern kitchen, large garden, and secure compound. Close to international schools and Karen shopping center.",
    price: 180000,
    priceType: "rent",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    address: "Karen Hardy Estate, House 24",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345005",
    contactEmail: "karen@newkenyan.co.ke",
    whatsappNumber: "+254712345005",
    amenities: ["garden", "parking", "security", "backup generator", "servant quarter"],
    isFurnished: false,
    petsAllowed: true,
    isCommercial: false
  },
  {
    propertyTitle: "Luxury 5BR Mansion in Karen",
    propertyType: "House",
    description: "Magnificent 5-bedroom mansion in Karen with swimming pool and manicured gardens. Perfect for large families or executives. Features include multiple living areas, study room, and staff quarters.",
    price: 5800000,
    priceType: "sale",
    bedrooms: 5,
    bathrooms: 5,
    squareFeet: 3500,
    address: "Karen Blixen Road, Mansion Estate",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345006",
    contactEmail: "karen@newkenyan.co.ke",
    whatsappNumber: "+254712345006",
    amenities: ["pool", "garden", "parking", "security", "servant quarter", "backup generator"],
    isFurnished: false,
    petsAllowed: true,
    isCommercial: false
  },
  
  // RUNDA
  {
    propertyTitle: "Contemporary 3BR Townhouse in Runda",
    propertyType: "Townhouse",
    description: "Modern 3-bedroom townhouse in exclusive Runda estate. Features contemporary design, private garden, and top-notch security. Perfect for families seeking luxury living.",
    price: 150000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1600,
    address: "Runda Estate, Townhouse 12",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345007",
    contactEmail: "runda@newkenyan.co.ke",
    whatsappNumber: "+254712345007",
    amenities: ["garden", "parking", "security", "clubhouse", "backup generator"],
    isFurnished: false,
    petsAllowed: true,
    isCommercial: false
  },
  {
    propertyTitle: "Luxury 4BR Villa in Runda",
    propertyType: "Villa",
    description: "Exquisite 4-bedroom villa in prime Runda location. Features include spacious living areas, modern kitchen, swimming pool, and beautiful landscaped gardens. 24/7 security provided.",
    price: 4200000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 2800,
    address: "Runda Mhasibu Estate, Villa 8",
    city: "Nairobi",
    county: "Nairobi",
    contactPhone: "+254712345008",
    contactEmail: "runda@newkenyan.co.ke",
    whatsappNumber: "+254712345008",
    amenities: ["pool", "garden", "parking", "security", "clubhouse", "backup generator"],
    isFurnished: false,
    petsAllowed: true,
    isCommercial: false
  },
  
  // TATU CITY
  {
    propertyTitle: "Modern 2BR Apartment in Tatu City",
    propertyType: "Apartment",
    description: "Brand new 2-bedroom apartment in the innovative Tatu City development. Features smart home technology, modern amenities, and access to shopping, schools, and recreational facilities.",
    price: 75000,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 900,
    address: "Tatu City, Riviera Apartments",
    city: "Kiambu",
    county: "Kiambu",
    contactPhone: "+254712345009",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345009",
    amenities: ["parking", "security", "gym", "pool", "wifi", "backup generator"],
    isFurnished: true,
    petsAllowed: false,
    isCommercial: false
  },
  {
    propertyTitle: "Smart 3BR Townhouse in Tatu City",
    propertyType: "Townhouse",
    description: "Innovative 3-bedroom townhouse in Tatu City with smart home features. Includes private garden, modern kitchen, and access to world-class amenities including schools and shopping centers.",
    price: 2200000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1500,
    address: "Tatu City, Eden Square",
    city: "Kiambu",
    county: "Kiambu",
    contactPhone: "+254712345010",
    contactEmail: "tatucity@newkenyan.co.ke",
    whatsappNumber: "+254712345010",
    amenities: ["garden", "parking", "security", "wifi", "backup generator", "clubhouse"],
    isFurnished: false,
    petsAllowed: true,
    isCommercial: false
  },
  
  // MOMBASA
  {
    propertyTitle: "Beachfront 3BR Apartment in Mombasa",
    propertyType: "Apartment",
    description: "Stunning 3-bedroom beachfront apartment with ocean views. Features include spacious balcony, modern kitchen, and direct beach access. Perfect for vacation rental or permanent residence.",
    price: 120000,
    priceType: "rent",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1300,
    address: "Nyali Beach, Ocean View Apartments",
    city: "Mombasa",
    county: "Mombasa",
    contactPhone: "+254712345011",
    contactEmail: "mombasa@newkenyan.co.ke",
    whatsappNumber: "+254712345011",
    amenities: ["parking", "security", "pool", "balcony", "air conditioning"],
    isFurnished: true,
    petsAllowed: false,
    isCommercial: false
  },
  {
    propertyTitle: "Luxury Beach Villa in Mombasa",
    propertyType: "Villa",
    description: "Magnificent 4-bedroom beach villa with private pool and direct ocean access. Features include spacious living areas, modern amenities, and tropical gardens. Perfect for luxury coastal living.",
    price: 6500000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 3000,
    address: "Diani Beach Road, Villa Paradise",
    city: "Mombasa",
    county: "Mombasa",
    contactPhone: "+254712345012",
    contactEmail: "mombasa@newkenyan.co.ke",
    whatsappNumber: "+254712345012",
    amenities: ["pool", "garden", "parking", "security", "air conditioning", "balcony"],
    isFurnished: true,
    petsAllowed: true,
    isCommercial: false
  }
];

export default function PopulatePropertiesPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const categorizeImages = (files: File[]) => {
    const officeImages: File[] = [];
    const residentialImages: File[] = [];
    
    files.forEach(file => {
      const fileName = file.name.toLowerCase();
      
      if (fileName.includes('office') || 
          fileName.includes('working') || 
          fileName.includes('coworking') || 
          fileName.includes('co working') || 
          fileName.includes('co-working') ||
          fileName.includes('workspace')) {
        officeImages.push(file);
      } else {
        residentialImages.push(file);
      }
    });
    
    return { officeImages, residentialImages };
  };

  const uploadImagesForProperty = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await fetch('/api/upload-images', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (result.success) {
      return result.urls;
    } else {
      throw new Error(result.error || 'Image upload failed');
    }
  };

  const insertPropertyListing = async (property: any, imageUrls: string[]) => {
    const { error } = await supabase
      .from('property_listings')
      .insert({
        user_id: 'demo-user-001',
        property_title: property.propertyTitle,
        property_type: property.propertyType,
        description: property.description,
        price: property.price,
        price_type: property.priceType,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        square_feet: property.squareFeet,
        address: property.address,
        city: property.city,
        county: property.county,
        contact_phone: property.contactPhone,
        contact_email: property.contactEmail,
        whatsapp_number: property.whatsappNumber,
        amenities: property.amenities,
        images: imageUrls,
        available_from: new Date().toISOString(),
        is_furnished: property.isFurnished,
        pets_allowed: property.petsAllowed,
        is_approved: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      throw error;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    addLog(`Selected ${files.length} files`);
  };

  const handlePopulate = async () => {
    if (selectedFiles.length === 0) {
      addLog('Please select images first');
      return;
    }

    setIsUploading(true);
    setProgress('Starting population...');
    
    try {
      // Categorize images
      const categorizedImages = categorizeImages(selectedFiles);
      addLog(`Categorized images: ${categorizedImages.officeImages.length} office, ${categorizedImages.residentialImages.length} residential`);

      const commercialProperties = propertyData.filter(p => p.isCommercial);
      const residentialProperties = propertyData.filter(p => !p.isCommercial);

      let processedCount = 0;

      // Process commercial properties first
      for (const property of commercialProperties) {
        if (categorizedImages.officeImages.length < 3) break;
        
        setProgress(`Processing commercial: ${property.propertyTitle}`);
        addLog(`Creating commercial property: ${property.propertyTitle}`);
        
        try {
          const imagesToUpload = categorizedImages.officeImages.splice(0, 3);
          const imageUrls = await uploadImagesForProperty(imagesToUpload);
          await insertPropertyListing(property, imageUrls);
          
          addLog(`✅ Created: ${property.propertyTitle} with ${imageUrls.length} images`);
          processedCount++;
        } catch (error) {
          addLog(`❌ Failed to create ${property.propertyTitle}: ${error}`);
        }
      }

      // Process residential properties
      for (const property of residentialProperties) {
        if (categorizedImages.residentialImages.length < 3) break;
        
        setProgress(`Processing residential: ${property.propertyTitle}`);
        addLog(`Creating residential property: ${property.propertyTitle}`);
        
        try {
          const imagesToUpload = categorizedImages.residentialImages.splice(0, 3);
          const imageUrls = await uploadImagesForProperty(imagesToUpload);
          await insertPropertyListing(property, imageUrls);
          
          addLog(`✅ Created: ${property.propertyTitle} with ${imageUrls.length} images`);
          processedCount++;
        } catch (error) {
          addLog(`❌ Failed to create ${property.propertyTitle}: ${error}`);
        }
      }

      setProgress(`Completed! Created ${processedCount} properties`);
      addLog(`🎉 Population completed! Created ${processedCount} properties`);
      
    } catch (error) {
      addLog(`❌ Population failed: ${error}`);
      setProgress('Failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Populate Properties</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Property Images</h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="mb-4 w-full"
          />
          <p className="text-sm text-gray-600 mb-4">
            Select your property images. The script will automatically categorize office/workspace images for commercial properties and other images for residential properties.
          </p>
          
          {selectedFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium">Selected: {selectedFiles.length} files</p>
            </div>
          )}
          
          <Button 
            onClick={handlePopulate}
            disabled={isUploading || selectedFiles.length === 0}
            className="w-full"
          >
            {isUploading ? 'Creating Properties...' : 'Create Properties'}
          </Button>
        </div>

        {progress && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800">Progress</h3>
            <p className="text-blue-700">{progress}</p>
          </div>
        )}

        {logs.length > 0 && (
          <div className="bg-gray-50 border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Logs</h3>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {logs.map((log, index) => (
                <div key={index} className="text-sm font-mono">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">What this will create:</h3>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• 3 Commercial/Office properties (using workspace images)</li>
            <li>• 15+ Residential properties (using home/apartment images)</li>
            <li>• Properties across: Kiambu, Westlands, Karen, Runda, Tatu City, Mombasa</li>
            <li>• 3 images per property, automatically categorized</li>
            <li>• All properties marked as approved and ready to view</li>
          </ul>
        </div>
      </div>
    </div>
  );
}