'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { SignInButton } from '@/components/SupabaseAuthWrapper';
import { useRouter } from 'next/navigation';
import { businessListingSchema, type BusinessListingInput } from '@/lib/validations';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, MapPin, Phone, Mail, Globe, Clock, DollarSign, MessageCircle, CheckCircle, ArrowRight, Shield, UserPlus, Building2, Users, CreditCard } from 'lucide-react';
import PaymentModal from '@/components/PaymentModal';

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
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<BusinessListingInput>>({});
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingBusinessData, setPendingBusinessData] = useState<{
    validatedData: BusinessListingInput;
    imageFile: File | null;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + images.length > 3) {
      setErrors(prev => ({ ...prev, images: 'Maximum 3 images allowed' }));
      return;
    }

    let hasErrors = false;
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, images: 'Each file must be less than 5MB' }));
        hasErrors = true;
        break;
      }
      
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrors(prev => ({ ...prev, images: 'Files must be JPEG, PNG, or WebP format' }));
        hasErrors = true;
        break;
      }
    }

    if (hasErrors) return;

    setImages(prev => [...prev, ...files]);
    setErrors(prev => ({ ...prev, images: '' }));
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
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
      setErrors({ general: 'You must be signed in to submit a listing' });
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

      const validatedData = businessListingSchema.parse(formData);
      
      // Store business data for after payment
      setPendingBusinessData({
        validatedData,
        imageFile: images[0] || null
      });
      
      // Show payment modal
      setShowPaymentModal(true);
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
    }
  };

  const submitBusinessAfterPayment = async () => {
    if (!pendingBusinessData || !user) return;
    
    setIsSubmitting(true);
    const { validatedData, imageFile } = pendingBusinessData;

    try {
      // Upload image
      const imageUrls = imageFile ? await uploadImages([imageFile]) : [];
      
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
          image_url: imageUrls[0] || null,
        });

      if (error) {
        setErrors({ general: `Failed to submit listing: ${error.message}` });
      } else {
        setIsSuccess(true);
        setSubmitMessage('Business listing submitted successfully! It will be reviewed by our admin team before being published.');
        
        // Clear pending data
        setPendingBusinessData(null);
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit business listing. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (reference: string) => {
    setShowPaymentModal(false);
    console.log('Payment successful:', reference);
    submitBusinessAfterPayment();
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
                <Link href="/business-directory" className="hover:text-green-600">Business Directory</Link>
                <span>/</span>
                <span className="text-gray-900">Add Business</span>
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
                  To add your business listing, you need to sign in to your account. This helps us:
                </p>
                <ul className="text-left text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Verify your business identity and listing authenticity
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Allow you to manage and edit your business listing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Track customer inquiries and responses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Prevent spam and maintain quality
                  </li>
                </ul>
                <div className="space-y-4">
                  <SignInButton mode="modal">
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white py-3">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Sign In to Add Business
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
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Why List Your Business on NewKenyan.com?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Wide Reach</h3>
                    <p className="text-gray-600 text-sm">Connect with thousands of potential customers across all 47 counties in Kenya.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Trusted Platform</h3>
                    <p className="text-gray-600 text-sm">Kenya's most trusted business directory with verified businesses and customers.</p>
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
                    <Mail className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Easy Management</h3>
                    <p className="text-gray-600 text-sm">Manage your business listing from one convenient dashboard.</p>
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
          <h2 className="text-2xl font-semibold text-green-800 mb-2">Business Submitted Successfully!</h2>
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
          <div className="flex justify-between items-center mt-1">
            <div>
              {errors.businessName && <p className="text-red-600 text-sm">{errors.businessName}</p>}
            </div>
            <p className={`text-xs ${
              (formData.businessName || '').length < 2 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {(formData.businessName || '').length}/100 characters (minimum 2)
            </p>
          </div>
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
          <div className="flex justify-between items-center mt-1">
            <div>
              {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
            </div>
            <p className={`text-xs ${
              (formData.description || '').length < 10 ? 'text-red-500' : 'text-gray-500'
            }`}>
              {(formData.description || '').length}/1000 characters (minimum 10)
            </p>
          </div>
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
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="inline h-4 w-4 mr-1" />
            Business Images * (1 required, max 3)
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.images ? 'border-red-300' : ''
            }`}
          />
          <div className="mt-2 text-sm text-gray-600">
            <p className="mb-1"><strong>Recommended sizes for best display:</strong></p>
            <p>• Business cards: 400x250px (landscape)</p>
            <p>• Detail pages: 800x600px (4:3 ratio)</p>
            <p>• Max 5MB per image, JPG/PNG/WebP format</p>
          </div>
          {errors.images && <p className="text-red-600 text-sm mt-1">{errors.images}</p>}
          
          {imagePreviews.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Images ({images.length}/3):</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Business image ${index + 1}`}
                      width={200}
                      height={150}
                      sizes="200px"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs"
                      size="sm"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 hover:bg-green-800 text-white"
          >
            {isSubmitting ? 'Submitting...' : '🎉 Anniversary Special: Pay KES 100 & Submit Business'}
          </Button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            🎉 8 Years Anniversary Special: KES 100 (normally KES 3,000) for 4 months listing period. Celebrating 8 years of trusted service! Your listing will be reviewed by our admin team before being published.
          </p>
        </div>
      </form>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        email={formData.email || ''}
        listingData={formData}
        listingType="business"
      />
    </div>
  );
}