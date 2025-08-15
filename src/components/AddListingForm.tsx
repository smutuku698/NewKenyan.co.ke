'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { businessListingSchema, type BusinessListingInput } from '@/lib/validations';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, MapPin, Phone, Mail, Globe, Clock, DollarSign, MessageCircle } from 'lucide-react';

const BUSINESS_CATEGORIES = [
  'Food & Dining',
  'Technology',
  'Agriculture',
  'Co-working Space',
  'Healthcare',
  'Education',
  'Retail',
  'Professional Services',
  'Construction',
  'Transportation',
  'Entertainment',
  'Beauty & Wellness',
  'Finance',
  'Manufacturing',
  'Tourism',
  'Other'
];

export default function AddListingForm() {
  const { user } = useUser();
  const [formData, setFormData] = useState<Partial<BusinessListingInput>>({});
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'File size must be less than 5MB' }));
        return;
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'File must be JPEG, PNG, or WebP format' }));
        return;
      }

      setImage(file);
      setErrors(prev => ({ ...prev, image: '' }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      
      console.log('Uploading image:', fileName, 'Size:', file.size);
      
      const { data, error } = await supabase.storage
        .from('business-images')
        .upload(fileName, file);

      if (error) {
        console.error('Storage upload error:', error);
        setErrors(prev => ({ ...prev, image: `Upload failed: ${error.message}` }));
        return null;
      }

      console.log('Upload successful:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('business-images')
        .getPublicUrl(fileName);

      console.log('Public URL:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Upload function error:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrors({ general: 'You must be signed in to submit a listing' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitMessage('');

    try {
      const validatedData = businessListingSchema.parse(formData);
      
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
        // Continue without image if upload fails
      }

      const { error } = await supabase
        .from('business_listings')
        .insert({
          user_id: user.id,
          business_name: validatedData.businessName,
          category: validatedData.category,
          description: validatedData.description,
          address: validatedData.address,
          city: validatedData.city,
          pin_location_url: validatedData.pinLocationUrl,
          phone: validatedData.phone,
          email: validatedData.email,
          website: validatedData.website,
          business_days: validatedData.businessDays,
          pricing_info: validatedData.pricingInfo,
          whatsapp_number: validatedData.whatsappNumber,
          image_url: imageUrl,
        });

      if (error) {
        setErrors({ general: `Failed to submit listing: ${error.message}` });
      } else {
        setSubmitMessage('Listing submitted successfully! It will be reviewed by our admin team before being published.');
        setFormData({});
        setImage(null);
        setImagePreview('');
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

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
        <p className="text-gray-600">Please sign in to submit a business listing.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Add Your Business Listing</h2>
      
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
        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <Input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName || ''}
            onChange={handleInputChange}
            placeholder="Enter your business name"
            className={errors.businessName ? 'border-red-300' : ''}
          />
          {errors.businessName && <p className="text-red-600 text-sm mt-1">{errors.businessName}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.category ? 'border-red-300' : ''
            }`}
          >
            <option value="">Select a category</option>
            {BUSINESS_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            What We Do *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description || ''}
            onChange={handleInputChange}
            placeholder="Describe your business and what makes it special"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.description ? 'border-red-300' : ''
            }`}
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Address (Optional)
            </label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address || ''}
              onChange={handleInputChange}
              placeholder="e.g., 123 Kimathi Street, CBD"
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline h-4 w-4 mr-1" />
              Phone Number *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={handleInputChange}
              placeholder="+254700123456"
              className={errors.phone ? 'border-red-300' : ''}
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <MessageCircle className="inline h-4 w-4 mr-1" />
              WhatsApp Number (Optional)
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              Email (Optional)
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              placeholder="business@example.com"
              className={errors.email ? 'border-red-300' : ''}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="inline h-4 w-4 mr-1" />
              Website (Optional)
            </label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website || ''}
              onChange={handleInputChange}
              placeholder="https://yourbusiness.com"
              className={errors.website ? 'border-red-300' : ''}
            />
            {errors.website && <p className="text-red-600 text-sm mt-1">{errors.website}</p>}
          </div>
        </div>

        {/* Business Days */}
        <div>
          <label htmlFor="businessDays" className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline h-4 w-4 mr-1" />
            Business Hours (Optional)
          </label>
          <Input
            id="businessDays"
            name="businessDays"
            type="text"
            value={formData.businessDays || ''}
            onChange={handleInputChange}
            placeholder="Monday - Friday: 9:00 AM - 6:00 PM"
            className={errors.businessDays ? 'border-red-300' : ''}
          />
          {errors.businessDays && <p className="text-red-600 text-sm mt-1">{errors.businessDays}</p>}
        </div>

        {/* Pricing Info */}
        <div>
          <label htmlFor="pricingInfo" className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            Pricing Information (Optional)
          </label>
          <textarea
            id="pricingInfo"
            name="pricingInfo"
            rows={3}
            value={formData.pricingInfo || ''}
            onChange={handleInputChange}
            placeholder="Service prices, packages, or pricing structure"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.pricingInfo ? 'border-red-300' : ''
            }`}
          />
          {errors.pricingInfo && <p className="text-red-600 text-sm mt-1">{errors.pricingInfo}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="inline h-4 w-4 mr-1" />
            Business Image (Optional)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.image ? 'border-red-300' : ''
            }`}
          />
          <p className="text-sm text-gray-500 mt-1">Max 5MB, JPG/PNG/WebP format</p>
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
          
          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Business preview"
                width={384}
                height={192}
                className="w-full max-w-md h-48 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Listing for Review'}
          </Button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Your listing will be reviewed by our admin team before being published.
          </p>
        </div>
      </form>
    </div>
  );
}