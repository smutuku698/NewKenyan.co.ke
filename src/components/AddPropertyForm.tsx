'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { propertyListingSchema, type PropertyListingInput } from '@/lib/validations';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, MapPin, Phone, Mail, MessageCircle, Bed, Bath, Square, Calendar, CheckCircle, ArrowRight, Shield, UserPlus, Home, Users, CreditCard } from 'lucide-react';
import PaymentModal from '@/components/PaymentModal';

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

export default function AddPropertyForm() {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<PropertyListingInput>>({
    priceType: 'rent',
    isFurnished: false,
    petsAllowed: false,
    amenities: []
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingPropertyData, setPendingPropertyData] = useState<{
    validatedData: PropertyListingInput;
    imageFiles: File[];
  } | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + images.length > 6) {
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
          setImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImages(prev => [...prev, ...validFiles]);
    setErrors(prev => ({ ...prev, images: '' }));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
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
      console.error('Image upload failed:', result.error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrors({ general: 'You must be signed in to submit a property listing' });
      return;
    }

    setErrors({});
    setSubmitMessage('');

    try {
      // Check if at least one image is provided
      if (images.length === 0) {
        setErrors({ images: 'At least one image is required' });
        return;
      }

      const validatedData = propertyListingSchema.parse(formData);
      
      // Store property data for after payment
      setPendingPropertyData({
        validatedData,
        imageFiles: images
      });
      
      // Show payment modal
      setShowPaymentModal(true);
    } catch (error: unknown) {      
      if (error && typeof error === 'object' && 'errors' in error) {
        const fieldErrors: Record<string, string> = {};
        const zodError = error as { errors: Array<{ path: string[]; message: string }> };
        
        zodError.errors.forEach((err) => {
          const fieldName = err.path[0];
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: 'Please check your input and try again.' });
      }
    }
  };

  const submitPropertyAfterPayment = async () => {
    if (!pendingPropertyData || !user) return;
    
    setIsSubmitting(true);
    const { validatedData, imageFiles } = pendingPropertyData;

    try {
      // Upload images
      const imageUrls = await uploadImages(imageFiles);
      if (imageUrls.length === 0) {
        setErrors({ images: 'Failed to upload images. Please try again.' });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('property_listings')
        .insert({
          user_id: user.id,
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
          images: imageUrls,
          available_from: validatedData.availableFrom ? new Date(validatedData.availableFrom).toISOString() : null,
          is_furnished: validatedData.isFurnished,
          pets_allowed: validatedData.petsAllowed,
        });

      if (error) {
        setErrors({ general: `Failed to submit property listing: ${error.message}` });
      } else {
        setIsSuccess(true);
        setSubmitMessage('Property listing submitted successfully! It will be reviewed by our admin team before being published.');
        
        // Clear pending data
        setPendingPropertyData(null);
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit property listing. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (reference: string) => {
    setShowPaymentModal(false);
    console.log('Payment successful:', reference);
    submitPropertyAfterPayment();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Link href="/" className="hover:text-green-600">Home</Link>
                <span>/</span>
                <Link href="/properties" className="hover:text-green-600">Properties</Link>
                <span>/</span>
                <span className="text-gray-900">Add Property</span>
              </div>
            </nav>

            {/* Authentication Required */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
                <p className="text-gray-600 mb-6">
                  To list your property, you need to sign in to your account. This helps us:
                </p>
                <ul className="text-left text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Verify your property ownership and listing authenticity
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Allow you to manage and edit your property listings
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Track tenant inquiries and responses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Prevent spam and maintain quality
                  </li>
                </ul>
                <div className="space-y-4">
                  <SignInButton mode="modal">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Sign In to List Property
                    </Button>
                  </SignInButton>
                  <p className="text-sm text-gray-500">
                    Don't have an account? Signing in will create one for you automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Why List Your Property on NewKenyan.com?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Home className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Wide Reach</h3>
                    <p className="text-gray-600 text-sm">Connect with thousands of potential tenants and buyers across Kenya.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Trusted Platform</h3>
                    <p className="text-gray-600 text-sm">Kenya's most trusted property marketplace with verified listings.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Affordable Pricing</h3>
                    <p className="text-gray-600 text-sm">Starting at just KSh 100 for 4 months of visibility.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Easy Management</h3>
                    <p className="text-gray-600 text-sm">Manage all your property listings from one convenient dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Property Submitted Successfully!</h2>
          <p className="text-green-700 mb-6">{submitMessage}</p>
          <div className="flex items-center justify-center text-gray-600">
            <span>Redirecting to your dashboard</span>
            <ArrowRight className="h-4 w-4 ml-2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">List Your Property</h2>
      
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
          <div className="flex justify-between items-center mt-1">
            <div>
              {errors.propertyTitle && <p className="text-red-600 text-sm">{errors.propertyTitle}</p>}
            </div>
            <p className={`text-xs ${
              (formData.propertyTitle || '').length < 5 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {(formData.propertyTitle || '').length}/100 characters (minimum 5)
            </p>
          </div>
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
          <div className="flex justify-between items-center mt-1">
            <div>
              {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
            </div>
            <p className={`text-xs ${
              (formData.description || '').length < 20 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {(formData.description || '').length}/1000 characters (minimum 20)
            </p>
          </div>
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
              Property Address *
            </label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address || ''}
              onChange={handleInputChange}
              placeholder="e.g., Kilimani Road, Apartment 15B or P.O Box 1234"
              className={errors.address ? 'border-red-300' : ''}
            />
            <p className="text-sm text-gray-500 mt-1">
              Examples: &quot;123 Ngong Road, Kilimani&quot; or &quot;P.O Box 5678, CBD&quot; or &quot;Plot 42, Karen Estate&quot;
            </p>
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

        {/* Image Upload */}
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="inline h-4 w-4 mr-1" />
            Property Images * (1 required, max 6)
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.images ? 'border-red-300' : ''
            }`}
          />
          <div className="mt-2 text-sm text-gray-600">
            <p className="mb-1"><strong>Recommended sizes for best display:</strong></p>
            <p>• Property cards: 400x300px (4:3 ratio)</p>
            <p>• Detail pages: 1200x800px (3:2 ratio)</p>
            <p>• Max 5MB per image, JPG/PNG/WebP format</p>
          </div>
          {errors.images && <p className="text-red-600 text-sm mt-1">{errors.images}</p>}
          
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Property image ${index + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
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
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? 'Submitting...' : '🎉 Anniversary Special: Pay KES 100 & Submit Property'}
          </Button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            🎉 8 Years Anniversary Special: KES 100 (normally KES 5,000) for 4 months listing period. Celebrating 8 years of trusted service! Your property listing will be reviewed by our admin team before being published.
          </p>
        </div>
      </form>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        email={formData.contactEmail || ''}
        listingData={formData}
        listingType="property"
      />
    </div>
  );
}