'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import PropertyDetailsCard from '@/components/PropertyDetailsCard';
import PropertyMap from '@/components/PropertyMap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Bed,
  Bath,
  Square,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Eye,
  Home,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Star,
  Shield,
  CheckCircle,
  X,
  Building2
} from 'lucide-react';

interface PropertyListing {
  id: string;
  created_at: string;
  property_title: string;
  property_type: string;
  description: string;
  price: number;
  price_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  address: string;
  city: string;
  county: string | null;
  contact_phone: string;
  contact_email: string | null;
  whatsapp_number: string | null;
  amenities: string[];
  images: string[];
  available_from: string | null;
  is_furnished: boolean;
  pets_allowed: boolean;
  rating: number;
  review_count: number;
  is_approved: boolean;
  is_featured: boolean;
  views_count: number;
  user_id: string;
  year_built: number | null;
  garage: number | null;
  google_maps_link: string | null;
  construction_progress?: string | null;
  completion_date?: string | null;
  payment_plan?: string | null;
  nearby_features?: string[];
  external_features?: string[];
  internal_features?: string[];
}

interface PropertyDetailClientProps {
  property: PropertyListing;
  similarProperties: PropertyListing[];
}

export default function PropertyDetailClient({ property, similarProperties }: PropertyDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState<{message: string; type: 'success' | 'error'} | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const formatPrice = (price: number, priceType: string) => {
    return `KSh ${price.toLocaleString()}${priceType === 'rent' ? '/month' : ''}`;
  };

  const handleContactClick = (type: 'phone' | 'whatsapp' | 'email') => {
    switch (type) {
      case 'phone':
        window.open(`tel:${property.contact_phone}`);
        break;
      case 'whatsapp':
        if (property.whatsapp_number) {
          window.open(`https://wa.me/${property.whatsapp_number.replace('+', '')}`);
        }
        break;
      case 'email':
        if (property.contact_email) {
          window.open(`mailto:${property.contact_email}`);
        }
        break;
    }
  };

  // Generate property-specific FAQ with unique content based on actual property details
  const generatePropertyFAQ = (property: PropertyListing) => {
    const listingType = property.price_type === 'rent' ? 'Rent' : 'Sale';
    const priceString = `KSh ${property.price.toLocaleString()}${property.price_type === 'rent' ? '/month' : ''}`;

    const baseQuestions = [
      {
        question: `What makes this ${property.bedrooms}-bedroom ${property.property_type.toLowerCase()} in ${property.city} unique?`,
        answer: `${property.property_title} stands out with its ${property.is_furnished ? 'fully furnished interiors' : 'spacious layout'}${property.square_feet ? ` spanning ${property.square_feet.toLocaleString()} sq ft` : ''}, featuring ${property.bedrooms} bedroom${property.bedrooms > 1 ? 's' : ''} and ${property.bathrooms} bathroom${property.bathrooms > 1 ? 's' : ''}. Located in ${property.address}, ${property.city}, this property offers ${property.amenities && property.amenities.length > 0 ? property.amenities.slice(0, 3).join(', ') + (property.amenities.length > 3 ? ', and more' : '') : 'quality amenities'}. ${property.nearby_features && property.nearby_features.length > 0 ? `The neighborhood features convenient access to ${property.nearby_features.slice(0, 3).join(', ')}.` : ''}`
      },
      {
        question: `How much is the ${property.price_type === 'rent' ? 'monthly rent' : 'sale price'} for ${property.property_title}?`,
        answer: `The ${property.price_type === 'rent' ? 'monthly rent' : 'asking price'} for this ${property.bedrooms}-bedroom ${property.property_type.toLowerCase()} in ${property.city} is ${priceString}. ${property.payment_plan ? `Payment options include: ${property.payment_plan}. ` : ''}${property.price_type === 'rent' ? 'Additional costs may include security deposit and service charges.' : 'This price is competitive for the area considering the property features and location.'} Contact ${property.contact_phone} for more details.`
      },
      {
        question: `What amenities are included in this ${property.property_type.toLowerCase()} in ${property.city}?`,
        answer: `${property.property_title} comes with ${property.is_furnished ? 'full furnishing and ' : ''}excellent amenities including ${property.amenities && property.amenities.length > 0 ? property.amenities.join(', ') : 'standard modern features'}. ${property.external_features && property.external_features.length > 0 ? `External features include ${property.external_features.join(', ')}. ` : ''}${property.internal_features && property.internal_features.length > 0 ? `Inside, you'll find ${property.internal_features.join(', ')}.` : ''}`
      },
      {
        question: `How can I schedule a viewing for this property in ${property.city}?`,
        answer: `To view ${property.property_title} in person, contact the property owner directly at ${property.contact_phone}${property.whatsapp_number ? ` or via WhatsApp at ${property.whatsapp_number}` : ''}. ${property.contact_email ? `You can also email ${property.contact_email}. ` : ''}${property.available_from ? `The property is available from ${new Date(property.available_from).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.` : 'Schedule your viewing today!'} We always recommend viewing the property in person before making any commitments.`
      },
      {
        question: `Are pets allowed at ${property.property_title} in ${property.city}?`,
        answer: `${property.pets_allowed ? `Yes! This ${property.property_type.toLowerCase()} in ${property.city} is pet-friendly, making it perfect for you and your furry companions.` : `Unfortunately, pets are not permitted at ${property.property_title}.`} Please confirm the specific pet policy${property.pets_allowed ? ' and any related terms (such as pet deposits or size restrictions)' : ''} directly with the property owner at ${property.contact_phone}.`
      },
      {
        question: `What is the neighborhood like around ${property.property_title}?`,
        answer: `${property.property_title} is located in ${property.address}, ${property.city}${property.county ? `, ${property.county}` : ''}. ${property.nearby_features && property.nearby_features.length > 0 ? `The area offers convenient access to ${property.nearby_features.join(', ')}. ` : 'The neighborhood provides good access to shopping centers, schools, hospitals, and public transportation. '}${property.city === 'Nairobi' ? 'The location offers excellent connectivity to major business districts and entertainment hubs.' : `${property.city} is known for its peaceful environment and growing infrastructure.`} Contact the property owner for more details about the local community.`
      }
    ];

    // Add construction/payment-specific FAQ if applicable
    if (property.construction_progress || property.completion_date) {
      baseQuestions.push({
        question: `What is the construction status of ${property.property_title}?`,
        answer: `${property.construction_progress ? `The construction status is: ${property.construction_progress}. ` : ''}${property.completion_date ? `The expected completion date is ${new Date(property.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. ` : ''}${property.payment_plan ? `Flexible payment plans are available: ${property.payment_plan}.` : ''} For the latest updates on construction progress and handover schedules, please contact ${property.contact_phone}.`
      });
    }

    // Add sale-specific FAQ
    if (property.price_type === 'sale') {
      baseQuestions.push({
        question: `What are the costs involved in buying ${property.property_title} in ${property.city}?`,
        answer: `The purchase price for this property is ${priceString}. Additional costs in Kenya typically include stamp duty (4% for properties over KSh 5 million, 2% below), legal fees (approximately 1-2% of purchase price), valuation fees, and registration costs. ${property.payment_plan ? `The seller offers: ${property.payment_plan}. ` : ''}For a detailed breakdown specific to this property, contact ${property.contact_phone} or consult with a qualified property lawyer. Visit our <a href='/business-directory' class='text-green-600 hover:underline'>business directory</a> for trusted legal professionals.`
      });
    }

    // Add rental-specific FAQ
    if (property.price_type === 'rent') {
      baseQuestions.push({
        question: `What documents do I need to rent ${property.property_title}?`,
        answer: `To rent this ${property.bedrooms}-bedroom ${property.property_type.toLowerCase()} in ${property.city}, you'll typically need: a valid national ID or passport, proof of income (pay slips or bank statements), personal references, and a security deposit (usually 1-2 months' rent). For this specific property at ${priceString}, contact the owner at ${property.contact_phone} for exact requirements. Always ensure you receive a written tenancy agreement. Check our <a href='/blog' class='text-green-600 hover:underline'>blog</a> for more rental tips and tenant rights information.`
      });
    }

    return baseQuestions;
  };

  const propertyFAQ = generatePropertyFAQ(property);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  // Favorites functionality
  const getFavorites = (): string[] => {
    if (typeof window === 'undefined') return [];
    const favorites = localStorage.getItem('propertyFavorites');
    return favorites ? JSON.parse(favorites) : [];
  };

  const addToFavorites = (propertyId: string) => {
    const favorites = getFavorites();
    const updatedFavorites = [...favorites, propertyId];
    localStorage.setItem('propertyFavorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (propertyId: string) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== propertyId);
    localStorage.setItem('propertyFavorites', JSON.stringify(updatedFavorites));
  };

  const toggleFavorite = () => {
    const favorites = getFavorites();
    const isCurrentlyFavorite = favorites.includes(property.id);
    
    if (isCurrentlyFavorite) {
      removeFromFavorites(property.id);
      setIsFavorite(false);
      showToastMessage('Removed from favorites', 'success');
    } else {
      addToFavorites(property.id);
      setIsFavorite(true);
      showToastMessage('Added to favorites', 'success');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: property.property_title,
      text: `Check out this ${property.property_type.toLowerCase()} in ${property.city} - ${formatPrice(property.price, property.price_type)}`,
      url: window.location.href,
    };

    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToastMessage('Property shared successfully', 'success');
      } catch (error) {
        // User cancelled sharing
        if (error instanceof Error && error.name !== 'AbortError') {
          showToastMessage('Failed to share property', 'error');
        }
      }
    } else {
      // Fallback to clipboard (desktop)
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToastMessage('Property link copied to clipboard', 'success');
      } catch (error) {
        showToastMessage('Failed to copy link', 'error');
      }
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Check if property is already in favorites on component mount
  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(property.id));
  }, [property.id]);

  // Keyboard navigation for gallery
  useEffect(() => {
    if (!isGalleryOpen) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen, property.images.length]);

  return (
    <>
      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Property Photos</h2>
              {property.images && property.images.length > 0 ? (
                <div>
                  <div 
                    className="relative h-64 sm:h-72 md:h-80 mb-4 rounded-lg overflow-hidden cursor-pointer bg-gray-100"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <Image
                      src={property.images[currentImageIndex]}
                      alt={`${property.property_title} - ${property.city} property for ${property.price_type}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {property.images.length} photo{property.images.length > 1 ? 's' : ''}
                    </div>
                  </div>

                  {property.images.length > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                      {property.images.slice(0, 5).map((image, index) => (
                        <div
                          key={index}
                          className={`relative aspect-square rounded cursor-pointer overflow-hidden border-2 transition-colors ${
                            index === currentImageIndex ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setIsGalleryOpen(true);
                          }}
                        >
                          <Image
                            src={image}
                            alt={`Property view ${index + 1}`}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {property.images.length > 5 && (
                        <div
                          className="relative aspect-square rounded cursor-pointer overflow-hidden border-2 border-gray-200 hover:border-gray-300 bg-gray-900 bg-opacity-75 flex items-center justify-center"
                          onClick={() => setIsGalleryOpen(true)}
                        >
                          <span className="text-white font-semibold">
                            +{property.images.length - 5}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Home className="h-12 w-12 mx-auto mb-2" />
                    <p>No images available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Property Header */}
            <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">{property.property_title}</h1>
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge variant="secondary" className="text-sm">{property.property_type}</Badge>
                    {property.is_featured && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {property.address}, {property.city}
                    {property.county && `, ${property.county}`}
                  </div>
                  
                  {/* Property Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    {property.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 mr-2" />
                        <span>{property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 mr-2" />
                        <span>{property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {property.square_feet && (
                      <div className="flex items-center">
                        <Square className="h-5 w-5 mr-2" />
                        <span>{property.square_feet.toLocaleString()} sq ft</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      <span>{property.views_count.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
                
                <div className="sm:text-right min-w-0 flex-shrink-0">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 break-words">
                    {formatPrice(property.price, property.price_type)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    {property.price_type === 'rent' ? 'Monthly rent' : 'Sale price'}
                  </p>
                  <div className="flex space-x-2 sm:justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleFavorite}
                      className={`transition-colors ${
                        isFavorite 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleShare}
                      className="text-gray-500 hover:text-blue-500"
                      title="Share property"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Property Details Card */}
            <PropertyDetailsCard
              propertyType={property.property_type}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              garage={property.garage}
              squareFeet={property.square_feet}
              yearBuilt={property.year_built}
              rating={property.rating}
            />

            {/* Detailed Property Overview Section */}
            <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">
                {property.bedrooms}-Bedroom {property.property_type} for {property.price_type === 'rent' ? 'Rent' : 'Sale'} in {property.city}
              </h2>

              <div className="space-y-8 text-gray-700 leading-relaxed">
                {/* Price and Key Info */}
                <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-lg border border-green-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">{property.price_type === 'rent' ? 'Monthly Rent' : 'Sale Price'}:</span>
                      <p className="text-green-600 font-bold text-lg">KSh {property.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">Location:</span>
                      <p>{property.city}{property.county ? `, ${property.county}` : ''}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">Property Type:</span>
                      <p>{property.property_type}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">Bedrooms:</span>
                      <p>{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">Bathrooms:</span>
                      <p>{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</p>
                    </div>
                    {property.square_feet && (
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">Property Size:</span>
                        <p>{property.square_feet.toLocaleString()} sq ft</p>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-900 block mb-1">Furnishing:</span>
                      <p>Furnished</p>
                    </div>
                    {property.available_from && (
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">Available:</span>
                        <p>{new Date(property.available_from).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Extended Personalized Overview */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Overview</h3>
                  <div className="space-y-4 text-base">
                    <p>
                      I&apos;m excited to present <strong>{property.property_title}</strong>, {property.bedrooms ? `a stunning ${property.bedrooms}-bedroom` : 'an exceptional'} {property.property_type.toLowerCase()} that perfectly embodies {property.city === 'Nairobi' ? 'modern urban living in Kenya\'s capital' : `quality living in ${property.city}`}.
                      {property.square_feet ? ` Spanning an impressive ${property.square_feet.toLocaleString()} square feet, ` : ' '}
                      This property comes fully furnished with modern, high-quality furniture and appliances, allowing you to move in immediately without any hassle.
                    </p>

                    <p>
                      Located at {property.address} in {property.city}{property.county ? `, ${property.county}` : ''}, this {property.property_type.toLowerCase()} features {property.bedrooms} {property.bedrooms > 1 ? 'generously-sized bedrooms' : 'spacious bedroom'} and {property.bathrooms} {property.bathrooms > 1 ? 'well-appointed bathrooms' : 'modern bathroom'},
                      {property.bedrooms >= 3 ? ' making it perfect for families who need extra space for children, home offices, or guest rooms' : property.bedrooms === 2 ? ' providing ample space for couples, small families, or professionals who work from home' : ' ideal for singles or couples seeking comfortable, manageable living space'}.
                      {property.pets_allowed ? ' Better yet, this is a pet-friendly property, so your furry family members are welcome to join you in your new home.' : ' Please note that this property has a no-pets policy.'}
                    </p>

                    <p>
                      {property.price_type === 'rent'
                        ? `Available for rent at KSh ${property.price.toLocaleString()} per month, this property represents excellent value for the quality and location offered. The rental includes access to ${property.amenities && property.amenities.length > 0 ? 'premium amenities and facilities' : 'all essential features'}${property.payment_plan ? `, and flexible payment arrangements are available: ${property.payment_plan}` : ', with standard deposit and payment terms'}.`
                        : `This property is offered for sale at KSh ${property.price.toLocaleString()}, representing ${property.city === 'Nairobi' ? 'an excellent investment opportunity in Kenya\'s most dynamic property market' : `great value in ${property.city}\'s growing real estate market`}.${property.payment_plan ? ` ${property.payment_plan}` : ' Various financing options may be available through local banks and financial institutions.'}`
                      }
                    </p>
                  </div>
                </div>

                {/* Key Features - Enhanced */}
                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Key Features</h3>
                    <p className="mb-4">
                      {property.property_title} comes equipped with an impressive array of features designed to enhance your daily living experience:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-start bg-green-50 p-3 rounded-lg">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-gray-800">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    {property.external_features && property.external_features.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">External Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {property.external_features.map((feature, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {property.internal_features && property.internal_features.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Internal Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {property.internal_features.map((feature, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Neighborhood Guide */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">About the Neighborhood</h3>
                  <div className="space-y-4">
                    <p>
                      One of the standout aspects of {property.property_title} is its prime location in {property.city}.
                      {property.city === 'Nairobi'
                        ? ' As Kenya\'s bustling capital and economic hub, Nairobi offers unparalleled access to business districts, entertainment venues, international schools, and world-class healthcare facilities.'
                        : property.city === 'Mombasa'
                        ? ' Mombasa, Kenya\'s second-largest city and main coastal hub, combines beachside living with urban amenities, offering residents a unique tropical lifestyle with excellent business opportunities.'
                        : property.city === 'Kisumu'
                        ? ' Kisumu, strategically located on the shores of Lake Victoria, is a rapidly growing city offering a perfect blend of lakeside tranquility and urban development opportunities.'
                        : ` ${property.city} is a thriving Kenyan town offering quality infrastructure, growing business opportunities, and a peaceful environment away from the hustle of major cities.`
                      }
                    </p>

                    {property.nearby_features && property.nearby_features.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Nearby Amenities & Facilities:</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {property.nearby_features.map((feature, index) => (
                            <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg border">
                              <span className="text-blue-600 mr-2">📍</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          These nearby facilities ensure that everything you need for daily life - from groceries and healthcare to entertainment and education - is just minutes away.
                        </p>
                      </div>
                    )}

                    <p>
                      The {property.address} location provides {property.city === 'Nairobi' ? 'excellent connectivity via major roads and public transport, making your daily commute smooth whether you\'re heading to Westlands, Upper Hill, CBD, or Karen' : `convenient access to ${property.city}'s main areas and key transport routes`}.
                      {property.price_type === 'rent'
                        ? ` This makes ${property.property_title} an ideal rental choice for professionals working in the area, families seeking good schools and amenities, or anyone who values convenience and quality of life.`
                        : ` For property investors, this location offers strong potential for capital appreciation and rental yields, backed by ${property.city}'s ongoing development and infrastructure improvements.`
                      }
                    </p>
                  </div>
                </div>

                {/* Lifestyle & Living Experience */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Lifestyle & Living Experience</h3>
                  <div className="space-y-4">
                    <p>
                      Living at {property.property_title} means more than just having a roof over your head - it&apos;s about embracing a lifestyle of modern convenience and comfort.
                      {property.bedrooms >= 3
                        ? ' With three or more bedrooms, families will appreciate the space for children to grow, dedicated home offices for remote work, and room for guests without feeling cramped.'
                        : property.bedrooms === 2
                        ? ' The two-bedroom layout strikes the perfect balance - enough space for comfort and flexibility, whether that\'s a home office, nursery, or guest room, while remaining manageable for busy professionals or small families.'
                        : ' The single-bedroom configuration is perfect for those who value quality over quantity, with well-designed living spaces that maximize functionality without unnecessary maintenance.'
                      }
                    </p>

                    <p>
                      {property.property_type.toLowerCase().includes('apartment') || property.property_type.toLowerCase().includes('flat')
                        ? `Apartment living at ${property.property_title} offers the convenience of modern amenities with minimal maintenance responsibilities. ${property.amenities && property.amenities.some(a => a.toLowerCase().includes('gym') || a.toLowerCase().includes('pool') || a.toLowerCase().includes('security')) ? 'The building\'s shared facilities provide resort-style living - imagine starting your day with a workout in the on-site gym, or cooling off in the pool after work, all without leaving home.' : 'The well-managed complex ensures your living experience is hassle-free, with professional maintenance and security teams handling the details.'}`
                        : property.property_type.toLowerCase().includes('house') || property.property_type.toLowerCase().includes('bungalow') || property.property_type.toLowerCase().includes('villa')
                        ? `House living at ${property.property_title} gives you the freedom and privacy that comes with your own standalone property. ${property.external_features && property.external_features.length > 0 ? `Enjoy your private outdoor space for ${property.external_features.some(f => f.toLowerCase().includes('garden')) ? 'gardening, children\'s play, or outdoor entertaining' : 'barbecues, relaxation, and making lasting family memories'}.` : 'You\'ll have complete control over your living environment, with the space to create your perfect home.'}  ${property.pets_allowed ? 'The property is pet-friendly, so your dogs can run freely in the yard!' : ''}`
                        : `This ${property.property_type.toLowerCase()} offers the best of both worlds - ${property.bedrooms >= 3 ? 'spacious family living' : 'compact efficiency'} combined with ${property.amenities && property.amenities.length > 3 ? 'premium amenities' : 'essential facilities'} that make daily life comfortable and convenient.`
                      }
                    </p>

                    <p>
                      The property comes fully furnished with quality furniture, modern appliances, and all the essentials you need. This is particularly ideal for expatriates relocating to Kenya, professionals on short-term assignments, or anyone who wants to move in immediately without the hassle and expense of buying furniture. Simply bring your personal belongings and start enjoying your new home from day one.
                    </p>
                  </div>
                </div>

                {/* Investment Value (for sale properties) */}
                {property.price_type === 'sale' && (
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Investment Potential</h3>
                    <div className="space-y-3">
                      <p>
                        <strong>Why {property.property_title} is a Smart Investment:</strong>
                      </p>
                      <ul className="space-y-2 ml-6">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span><strong>Prime Location:</strong> {property.city === 'Nairobi' ? 'Nairobi\'s property market has shown consistent growth, with prime areas seeing 5-8% annual appreciation' : `${property.city} is experiencing rapid development with improving infrastructure and growing demand`}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span><strong>Rental Income Potential:</strong> {property.bedrooms >= 3 ? 'Large family homes command premium rents from expatriates and affluent local families' : property.bedrooms === 2 ? 'Two-bedroom properties are highly sought after by young professionals and small families, ensuring strong rental demand' : 'Studio and one-bedroom units have the highest occupancy rates due to constant demand from singles and couples'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span><strong>Quality Construction:</strong> {property.year_built ? `Built in ${property.year_built}, this property ${new Date().getFullYear() - property.year_built < 5 ? 'is nearly new with modern standards and minimal maintenance needs' : 'has stood the test of time while offering opportunities for value-adding renovations'}` : 'The property features quality construction and finishes that ensure long-term value retention'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span><strong>Ready Market:</strong> Properties in {property.city} with {property.bedrooms} bedrooms typically {property.price_type === 'rent' ? 'rent within 2-4 weeks' : 'sell within 3-6 months'} when priced competitively</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-sm">
                        <em>Note: Property values and rental rates fluctuate based on market conditions. Consult with a qualified property advisor or financial planner before making investment decisions.</em>
                      </p>
                    </div>
                  </div>
                )}

                {/* Detailed Listing Information */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{property.price_type === 'rent' ? 'Rental' : 'Purchase'} Details</h3>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">{property.price_type === 'rent' ? 'Monthly Rent:' : 'Sale Price:'}</span>
                        <p className="text-2xl font-bold text-green-600">KSh {property.price.toLocaleString()}</p>
                      </div>
                      {property.available_from && (
                        <div>
                          <span className="font-semibold text-gray-900 block mb-1">Available From:</span>
                          <p className="text-lg">{new Date(property.available_from).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      )}
                    </div>

                    {property.price_type === 'rent' && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">What You Need to Know:</h4>
                        <ul className="space-y-2 text-sm">
                          <li><strong>Security Deposit:</strong> Typically 1-2 months&apos; rent (confirm with owner)</li>
                          <li><strong>Lease Terms:</strong> Minimum 12-month lease preferred</li>
                          <li><strong>Utilities:</strong> May be separate or included (confirm with owner)</li>
                          <li><strong>Maintenance:</strong> {property.property_type.toLowerCase().includes('apartment') ? 'Building maintenance usually included; personal items tenant responsibility' : 'Tenant typically responsible for minor repairs; major structural items landlord responsibility'}</li>
                        </ul>
                      </div>
                    )}

                    {property.payment_plan && (
                      <div>
                        <span className="font-semibold text-gray-900 block mb-2">Payment Terms:</span>
                        <p className="bg-white p-4 rounded border">{property.payment_plan}</p>
                      </div>
                    )}

                    {property.construction_progress && (
                      <div>
                        <span className="font-semibold text-gray-900 block mb-2">Construction Status:</span>
                        <p><span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{property.construction_progress}</span></p>
                        {property.completion_date && (
                          <p className="mt-2 text-sm">Expected completion: {new Date(property.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Get in Touch</h3>
                  <p className="mb-4">
                    Ready to {property.price_type === 'rent' ? 'view this property and make it your new home' : 'schedule a viewing or discuss this investment opportunity'}?
                    Contact the property owner directly using the information below:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center bg-white p-4 rounded-lg border">
                      <span className="text-2xl mr-3">📞</span>
                      <div>
                        <span className="font-semibold text-gray-900 block">Call / WhatsApp:</span>
                        <a href={`tel:${property.contact_phone}`} className="text-green-600 hover:text-green-700 font-semibold text-lg">
                          {property.contact_phone}
                        </a>
                      </div>
                    </div>
                    {property.contact_email && (
                      <div className="flex items-center bg-white p-4 rounded-lg border">
                        <span className="text-2xl mr-3">📧</span>
                        <div>
                          <span className="font-semibold text-gray-900 block">Email:</span>
                          <a href={`mailto:${property.contact_email}`} className="text-green-600 hover:text-green-700">
                            {property.contact_email}
                          </a>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-4">
                      <strong>Viewing Tip:</strong> When you call, mention the property reference &quot;{property.property_title}&quot; and the address at {property.address}.
                      Ask about viewing times, current availability, and any questions you have about {property.price_type === 'rent' ? 'lease terms' : 'purchase process'}.
                    </p>
                  </div>
                </div>

                {/* Why You'll Love This Property - Extended */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Why {property.property_title} Should Be Your Next Home</h3>
                  <div className="space-y-4">
                    <p>
                      After reviewing all the features and benefits, it&apos;s clear that <strong>{property.property_title}</strong> stands out in {property.city}&apos;s property market for several compelling reasons:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border">
                        <h4 className="font-semibold text-gray-900 mb-2">🏠 Space & Layout</h4>
                        <p className="text-sm">
                          Move-in ready with modern furnishings,
                          {property.bedrooms >= 3 ? ' perfect for growing families' : property.bedrooms === 2 ? ' ideal for small families or professionals' : ' great for singles or couples'}{property.square_feet ? ` across ${property.square_feet.toLocaleString()} sq ft` : ''}.
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border">
                        <h4 className="font-semibold text-gray-900 mb-2">📍 Prime Location</h4>
                        <p className="text-sm">
                          Located in {property.city}&apos;s {property.city === 'Nairobi' ? 'well-connected suburbs' : 'prime residential area'},
                          with {property.nearby_features && property.nearby_features.length > 0 ? `convenient access to ${property.nearby_features.slice(0, 2).join(' and ')}` : 'excellent proximity to essential amenities'}.
                        </p>
                      </div>
                      {property.amenities && property.amenities.length > 3 && (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border">
                          <h4 className="font-semibold text-gray-900 mb-2">✨ Premium Amenities</h4>
                          <p className="text-sm">
                            Enjoy {property.amenities.length}+ features including {property.amenities.slice(0, 2).join(', ')},
                            ensuring comfort and convenience for modern living.
                          </p>
                        </div>
                      )}
                      <div className="bg-gradient-to-br from-pink-50 to-red-50 p-4 rounded-lg border">
                        <h4 className="font-semibold text-gray-900 mb-2">💰 Great Value</h4>
                        <p className="text-sm">
                          {property.price_type === 'rent'
                            ? `At KSh ${property.price.toLocaleString()}/month, competitive pricing for the quality and location offered`
                            : `Priced at KSh ${property.price.toLocaleString()}, representing ${property.city === 'Nairobi' ? 'solid investment potential in Kenya\'s capital' : 'excellent value in a growing market'}`
                          }
                        </p>
                      </div>
                    </div>
                    <p className="mt-4">
                      Whether you&apos;re {property.bedrooms >= 3 ? 'a family looking for space to grow and thrive' : property.bedrooms === 2 ? 'a couple seeking a comfortable home or a professional wanting a home office setup' : 'seeking your first home or a convenient urban base'},
                      {property.property_title} offers the perfect blend of convenience, {property.amenities && property.amenities.length > 3 ? 'luxury amenities' : 'quality finishes'}, and prime location that makes it {property.price_type === 'rent' ? 'an ideal place to call home' : 'a smart property investment'}.
                    </p>
                    <p className="font-semibold text-green-700 text-lg mt-4">
                      Don&apos;t miss this opportunity - contact the owner today at {property.contact_phone} to arrange your viewing!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Contact Property Owner</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-gray-600" />
                  <span className="text-sm text-gray-700">{property.contact_phone}</span>
                </div>

                {property.contact_email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-600" />
                    <span className="text-sm text-gray-700">{property.contact_email}</span>
                  </div>
                )}

                {property.whatsapp_number && (
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-3 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-sm text-gray-700">{property.whatsapp_number}</span>
                  </div>
                )}
              </div>

              {/* Contact Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => handleContactClick('phone')}
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Owner
                </Button>

                {property.whatsapp_number && (
                  <Button
                    onClick={() => handleContactClick('whatsapp')}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </Button>
                )}

                {property.contact_email && (
                  <Button
                    onClick={() => handleContactClick('email')}
                    variant="outline"
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                )}
              </div>
            </div>

            {/* Safety Notice - Sticky */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sticky top-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Safety First</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Always view property in person</li>
                    <li>• Never pay without seeing the property</li>
                    <li>• Verify owner&apos;s identity</li>
                    <li>• Get agreements in writing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Plans */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#066046]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Payment Options
              </h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-sm">
                  <svg className="h-5 w-5 mr-2 text-[#066046] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Mortgage Financing</strong> - Get pre-approved with leading Kenyan banks</span>
                </li>
                <li className="flex items-start text-sm">
                  <svg className="h-5 w-5 mr-2 text-[#066046] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Bank Transfer</strong> - Direct payment to seller&apos;s account</span>
                </li>
                <li className="flex items-start text-sm">
                  <svg className="h-5 w-5 mr-2 text-[#066046] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Outright Purchase</strong> - Full payment at once</span>
                </li>
                <li className="flex items-start text-sm">
                  <svg className="h-5 w-5 mr-2 text-[#066046] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Installment Plan</strong> - Deposit + monthly payments over agreed period</span>
                </li>
              </ul>

              <div className="space-y-2">
                <Link
                  href="/mortgage-calculator"
                  className="w-full bg-[#066046] hover:bg-[#055039] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Mortgage Calculator
                </Link>

                <Link
                  href="/construction-calculator"
                  className="w-full bg-[#066046] hover:bg-[#055039] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Construction Calculator
                </Link>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Calculate your monthly payments and construction costs
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <PropertyMap
          googleMapsLink={property.google_maps_link}
          address={property.address}
          city={property.city}
          county={property.county}
          propertyTitle={property.property_title}
        />

        {/* More Properties Section */}
        {similarProperties.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">More Properties in {property.city}</h2>
              <Link 
                href={`/properties?city=${property.city}`}
                className="text-green-600 hover:text-green-700 font-semibold flex items-center"
              >
                View All Properties in {property.city}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similarProperties.map((similarProperty) => (
                <PropertyCard 
                  key={similarProperty.id} 
                  id={similarProperty.id}
                  title={similarProperty.property_title}
                  type={similarProperty.property_type}
                  price={similarProperty.price}
                  bedrooms={similarProperty.bedrooms || undefined}
                  bathrooms={similarProperty.bathrooms || undefined}
                  location={`${similarProperty.city}${similarProperty.county ? `, ${similarProperty.county}` : ''}`}
                  city={similarProperty.city}
                  images={similarProperty.images}
                  amenities={similarProperty.amenities}
                  contactPhone={similarProperty.contact_phone}
                  whatsappNumber={similarProperty.whatsapp_number || undefined}
                />
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer Section */}
        <section className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Disclaimer</h3>
                  <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                    <p>
                      The information displayed about this property comprises a property advertisement. <strong>NewKenyan.co.ke</strong> makes no warranty as to the accuracy or completeness of the advertisement or any linked or associated information, and NewKenyan.co.ke has no control over the content.
                    </p>
                    <p>
                      This property listing does not constitute property particulars. The information is provided and maintained by the property owner/agent listed above.
                    </p>
                    <p className="font-medium text-gray-900">
                      <strong>NewKenyan.co.ke shall not in any way be held liable for the actions of any agent and/or property owner/landlord on or off this website.</strong>
                    </p>
                    <p className="text-xs text-gray-600 mt-4 pt-4 border-t border-yellow-200">
                      We strongly recommend that you verify all property details, visit the property in person, and conduct proper due diligence before making any commitments or payments. Never send money without seeing the property and verifying ownership documentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Common questions about {property.property_title} - {property.bedrooms}-bedroom {property.property_type.toLowerCase()} in {property.city}
              </p>
            </div>

            <div className="space-y-4">
              {propertyFAQ.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <div 
                        className="text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Need more information about properties in {property.city}?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/properties">Browse All Properties</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/blog">Property Investment Tips</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Vertical Scrolling Image Gallery Modal */}
      {isGalleryOpen && property.images && property.images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black"
          onClick={closeGallery}
        >
          {/* Close Button */}
          <button
            onClick={closeGallery}
            className="fixed top-4 right-4 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors backdrop-blur-sm"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image Counter */}
          <div className="fixed top-4 left-4 z-20 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          {/* Contact Buttons Fixed at Bottom */}
          <div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={() => handleContactClick('phone')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 shadow-lg rounded-full"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            {property.whatsapp_number && (
              <Button
                onClick={() => handleContactClick('whatsapp')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 shadow-lg rounded-full"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            )}
          </div>

          {/* Vertical Scrolling Container */}
          <div
            className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
            onScroll={(e) => {
              // Update current image index based on scroll position
              const scrollTop = e.currentTarget.scrollTop;
              const windowHeight = window.innerHeight;
              const newIndex = Math.round(scrollTop / windowHeight);
              if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < property.images.length) {
                setCurrentImageIndex(newIndex);
              }
            }}
          >
            {/* Each image takes full viewport height */}
            {property.images.map((image, index) => (
              <div
                key={index}
                className="w-full h-screen flex items-center justify-center snap-start snap-always relative"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`${property.property_title} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>

                {/* Image Number Indicator (bottom right of each image) */}
                <div className="absolute bottom-24 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                  {index + 1}
                </div>

                {/* Scroll Hint - only show on first image */}
                {index === 0 && property.images.length > 1 && (
                  <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm flex items-center backdrop-blur-sm">
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Scroll for more
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scroll Progress Indicator - Right Side */}
          {property.images.length > 1 && (
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-2">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-green-500 h-8'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                    // Smooth scroll to the selected image
                    const container = document.querySelector('.overflow-y-scroll');
                    if (container) {
                      container.scrollTo({
                        top: index * window.innerHeight,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
            showToast.type === 'success' 
              ? 'bg-green-600' 
              : 'bg-red-600'
          }`}>
            {showToast.message}
          </div>
        </div>
      )}
    </>
  );
}