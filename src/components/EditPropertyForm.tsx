'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/components/AuthProvider';
import { propertyListingSchema, type PropertyListingInput } from '@/lib/validations';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, MapPin, Phone, Mail, MessageCircle, Bed, Bath, Square, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Studio',
  'Townhouse',
  'Villa',
  'Penthouse',
  'Commercial',
  'Office',
  'Warehouse',
  'Land',
  'Other'
];

const COMMON_AMENITIES = [
  'parking',
  'security',
  'gym',
  'pool',
  'garden',
  'balcony',
  'elevator',
  'backup generator',
  'wifi',
  'furnished',
  'air conditioning',
  'heating',
  'laundry',
  'storage',
  'rooftop terrace',
  'servant quarter',
  'clubhouse',
  'playground'
];

interface PropertyListing {
  id: string;
  property_title: string;
  property_type: string;
  description: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  address: string;
  city: string;
  county: string | null;
  contact_phone: string;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[];
  images: string[];
  is_furnished: boolean;
  pets_allowed: boolean;
  user_id: string;
}

interface EditPropertyFormProps {
  property: PropertyListing;
}

export default function EditPropertyForm({ property }: EditPropertyFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<PropertyListingInput>>({});
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (property) {
      // Pre-populate form with existing property data
      setFormData({
        propertyTitle: property.property_title,
        propertyType: property.property_type,
        description: property.description,
        price: property.price,
        priceType: property.price_type as 'rent' | 'sale',
        bedrooms: property.bedrooms || undefined,
        bathrooms: property.bathrooms || undefined,
        squareFeet: 0, // Default value as square_feet doesn't exist in schema
        address: property.address,
        city: property.city,
        county: property.county,
        pinLocationUrl: '', // Default value as pin_location_url doesn't exist in schema
        contactPhone: property.contact_phone,
        contactEmail: property.contact_email,
        whatsappNumber: property.whatsapp_number || '',
        availableFrom: '', // Default value as available_from doesn't exist in schema
        isFurnished: property.is_furnished,
        petsAllowed: property.pets_allowed,
        amenities: property.amenities || []
      });
      setExistingImages(property.images || []);
    }
  }, [property]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      const numValue = value === '' ? undefined : Number(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => {
      const currentAmenities = prev.amenities || [];
      const newAmenities = currentAmenities.includes(amenity)
        ? currentAmenities.filter(a => a !== amenity)
        : [...currentAmenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + newImages.length + existingImages.length > 6) {
      setErrors(prev => ({ ...prev, images: 'Maximum 6 images allowed' }));
      return;
    }

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, images: 'Each file must be less than 5MB' }));
        return;
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrors(prev => ({ ...prev, images: 'Files must be JPEG, PNG, or WebP format' }));
        return;
      }

      validFiles.push(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        if (newPreviews.length === validFiles.length) {
          setNewImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setNewImages(prev => [...prev, ...validFiles]);
    setErrors(prev => ({ ...prev, images: '' }));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadNewImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}-${index}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) {
        console.error('Storage upload error:', error);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      return publicUrl;
    });

    const results = await Promise.all(uploadPromises);
    return results.filter(url => url !== null) as string[];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrors({ general: 'You must be signed in to update a property listing' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitMessage('');

    try {
      const validatedData = propertyListingSchema.parse(formData);
      
      // Upload new images
      let newImageUrls: string[] = [];
      if (newImages.length > 0) {
        newImageUrls = await uploadNewImages(newImages);
      }

      // Combine existing and new images
      const allImages = [...existingImages, ...newImageUrls];

      const { error } = await supabase
        .from('property_listings')
        .update({
          property_title: validatedData.propertyTitle,
          property_type: validatedData.propertyType,
          description: validatedData.description,
          price: validatedData.price,
          price_type: validatedData.priceType,
          bedrooms: validatedData.bedrooms,
          bathrooms: validatedData.bathrooms,
          square_feet: validatedData.squareFeet,
          address: validatedData.address,
          city: validatedData.city,
          county: validatedData.county,
          pin_location_url: validatedData.pinLocationUrl,
          contact_phone: validatedData.contactPhone,
          contact_email: validatedData.contactEmail,
          whatsapp_number: validatedData.whatsappNumber,
          amenities: validatedData.amenities,
          images: allImages,
          available_from: validatedData.availableFrom ? new Date(validatedData.availableFrom).toISOString() : null,
          is_furnished: validatedData.isFurnished,
          pets_allowed: validatedData.petsAllowed,
          updated_at: new Date().toISOString()
        })
        .eq('id', property.id)
        .eq('user_id', user.id); // Ensure user can only update their own property

      if (error) {
        setErrors({ general: `Failed to update property listing: ${error.message}` });
      } else {
        setSubmitMessage('Property listing updated successfully!');
        // Redirect to dashboard after a brief delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'errors' in error) {
        const fieldErrors: Record<string, string> = {};
        const zodError = error as { errors: Array<{ path: string[]; message: string }> };
        zodError.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: 'Please check your input and try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-green-600 hover:text-green-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Edit Property Listing</h2>
      
      {submitMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
          {submitMessage}
        </div>
      )}

      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property Title */}
        <div>
          <label htmlFor="propertyTitle" className="block text-sm font-medium text-gray-700 mb-2">
            Property Title *
          </label>
          <Input
            id="propertyTitle"
            name="propertyTitle"
            type="text"
            value={formData.propertyTitle || ''}
            onChange={handleInputChange}
            placeholder="e.g., Modern 2BR Apartment with City Views"
            className={errors.propertyTitle ? 'border-red-300' : ''}
          />
          {errors.propertyTitle && <p className="text-red-600 text-sm mt-1">{errors.propertyTitle}</p>}
        </div>

        {/* Property Type & Price Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
              Property Type *
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType || ''}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.propertyType ? 'border-red-300' : ''
              }`}
            >
              <option value="">Select property type</option>
              {PROPERTY_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.propertyType && <p className="text-red-600 text-sm mt-1">{errors.propertyType}</p>}
          </div>

          <div>
            <label htmlFor="priceType" className="block text-sm font-medium text-gray-700 mb-2">
              Listing Type *
            </label>
            <select
              id="priceType"
              name="priceType"
              value={formData.priceType || 'rent'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price (KSh) *
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price || ''}
            onChange={handleInputChange}
            placeholder={formData.priceType === 'rent' ? 'Monthly rent amount' : 'Sale price'}
            className={errors.price ? 'border-red-300' : ''}
          />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Property Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description || ''}
            onChange={handleInputChange}
            placeholder="Describe your property, its features, and what makes it special"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.description ? 'border-red-300' : ''
            }`}
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
              <Bed className="inline h-4 w-4 mr-1" />
              Bedrooms
            </label>
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              min="0"
              max="20"
              value={formData.bedrooms || ''}
              onChange={handleInputChange}
              placeholder="Number of bedrooms"
              className={errors.bedrooms ? 'border-red-300' : ''}
            />
            {errors.bedrooms && <p className="text-red-600 text-sm mt-1">{errors.bedrooms}</p>}
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
              <Bath className="inline h-4 w-4 mr-1" />
              Bathrooms
            </label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              min="0"
              max="20"
              value={formData.bathrooms || ''}
              onChange={handleInputChange}
              placeholder="Number of bathrooms"
              className={errors.bathrooms ? 'border-red-300' : ''}
            />
            {errors.bathrooms && <p className="text-red-600 text-sm mt-1">{errors.bathrooms}</p>}
          </div>

          <div>
            <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-2">
              <Square className="inline h-4 w-4 mr-1" />
              Size (sq ft)
            </label>
            <Input
              id="squareFeet"
              name="squareFeet"
              type="number"
              min="100"
              value={formData.squareFeet || ''}
              onChange={handleInputChange}
              placeholder="Square footage"
              className={errors.squareFeet ? 'border-red-300' : ''}
            />
            {errors.squareFeet && <p className="text-red-600 text-sm mt-1">{errors.squareFeet}</p>}
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Address *
            </label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address || ''}
              onChange={handleInputChange}
              placeholder="Street address"
              className={errors.address ? 'border-red-300' : ''}
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city || ''}
              onChange={handleInputChange}
              placeholder="City"
              className={errors.city ? 'border-red-300' : ''}
            />
            {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
              County
            </label>
            <Input
              id="county"
              name="county"
              type="text"
              value={formData.county || ''}
              onChange={handleInputChange}
              placeholder="County (optional)"
              className={errors.county ? 'border-red-300' : ''}
            />
            {errors.county && <p className="text-red-600 text-sm mt-1">{errors.county}</p>}
          </div>

          <div>
            <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Available From
            </label>
            <Input
              id="availableFrom"
              name="availableFrom"
              type="date"
              value={formData.availableFrom || ''}
              onChange={handleInputChange}
              className={errors.availableFrom ? 'border-red-300' : ''}
            />
            {errors.availableFrom && <p className="text-red-600 text-sm mt-1">{errors.availableFrom}</p>}
          </div>
        </div>

        {/* Pin Location URL */}
        <div>
          <label htmlFor="pinLocationUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Google Maps Pin Location (Optional)
          </label>
          <Input
            id="pinLocationUrl"
            name="pinLocationUrl"
            type="url"
            value={formData.pinLocationUrl || ''}
            onChange={handleInputChange}
            placeholder="https://maps.google.com/..."
            className={errors.pinLocationUrl ? 'border-red-300' : ''}
          />
          {errors.pinLocationUrl && <p className="text-red-600 text-sm mt-1">{errors.pinLocationUrl}</p>}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline h-4 w-4 mr-1" />
              Contact Phone *
            </label>
            <Input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              value={formData.contactPhone || ''}
              onChange={handleInputChange}
              placeholder="+254700123456"
              className={errors.contactPhone ? 'border-red-300' : ''}
            />
            {errors.contactPhone && <p className="text-red-600 text-sm mt-1">{errors.contactPhone}</p>}
          </div>

          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <MessageCircle className="inline h-4 w-4 mr-1" />
              WhatsApp Number *
            </label>
            <Input
              id="whatsappNumber"
              name="whatsappNumber"
              type="tel"
              value={formData.whatsappNumber || ''}
              onChange={handleInputChange}
              placeholder="+254700123456"
              className={errors.whatsappNumber ? 'border-red-300' : ''}
            />
            {errors.whatsappNumber && <p className="text-red-600 text-sm mt-1">{errors.whatsappNumber}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline h-4 w-4 mr-1" />
            Contact Email (Optional)
          </label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={formData.contactEmail || ''}
            onChange={handleInputChange}
            placeholder="contact@example.com"
            className={errors.contactEmail ? 'border-red-300' : ''}
          />
          {errors.contactEmail && <p className="text-red-600 text-sm mt-1">{errors.contactEmail}</p>}
        </div>

        {/* Property Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Property Features</h3>
          
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFurnished"
                checked={formData.isFurnished || false}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Furnished</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="petsAllowed"
                checked={formData.petsAllowed || false}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Pets Allowed</span>
            </label>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_AMENITIES.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(formData.amenities || []).includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {existingImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Property image ${index + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Images */}
        <div>
          <label htmlFor="newImages" className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="inline h-4 w-4 mr-1" />
            Add New Images {existingImages.length > 0 && `(${6 - existingImages.length - newImages.length} slots remaining)`}
          </label>
          <input
            id="newImages"
            name="newImages"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleNewImageChange}
            disabled={existingImages.length + newImages.length >= 6}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.images ? 'border-red-300' : ''
            }`}
          />
          <p className="text-sm text-gray-500 mt-1">Max 5MB per image, JPG/PNG/WebP format. Total limit: 6 images</p>
          {errors.images && <p className="text-red-600 text-sm mt-1">{errors.images}</p>}
          
          {newImagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {newImagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`New image ${index + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex space-x-4">
          <Link href="/dashboard">
            <Button type="button" variant="outline" className="flex-1">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white"
          >
            {isSubmitting ? 'Updating...' : 'Update Property Listing'}
          </Button>
        </div>
      </form>
    </div>
  );
}