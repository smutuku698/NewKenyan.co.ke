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
  X
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

  // Generate property-specific FAQ
  const generatePropertyFAQ = (property: PropertyListing) => {
    const baseQuestions = [
      {
        question: `What is included in the rent for this ${property.property_type.toLowerCase()} in ${property.city}?`,
        answer: `This ${property.property_type.toLowerCase()} includes the main living space with ${property.bedrooms || 'multiple'} bedroom(s) and ${property.bathrooms || 'bathroom(s)'}. ${property.is_furnished ? 'The property comes fully furnished.' : 'This is an unfurnished property.'} Additional amenities include: ${property.amenities?.join(', ') || 'standard amenities'}. Contact the property owner for detailed information about utilities and services included.`
      },
      {
        question: `How do I schedule a viewing for this property in ${property.city}?`,
        answer: `To schedule a viewing for this ${property.property_type.toLowerCase()}, contact the property owner directly using the contact information provided. You can call ${property.contact_phone}${property.whatsapp_number ? ` or WhatsApp ${property.whatsapp_number}` : ''}. We recommend viewing the property in person before making any commitments.`
      },
      {
        question: `Are pets allowed in this ${property.property_type.toLowerCase()}?`,
        answer: `${property.pets_allowed ? 'Yes, pets are allowed in this property.' : 'Pets are not permitted in this property.'} Please confirm the pet policy directly with the property owner as terms and conditions may apply.`
      },
      {
        question: `What are the nearby amenities around this property in ${property.city}?`,
        answer: `This property is located in ${property.address}, ${property.city}. The area typically offers good access to shopping centers, schools, hospitals, and public transportation. For specific information about nearby amenities, check our <a href='/properties' class='text-green-600 hover:underline'>properties section</a> or contact the property owner.`
      },
      {
        question: `What documents do I need to rent this ${property.property_type.toLowerCase()}?`,
        answer: `Typically, you'll need a valid ID, proof of income, references, and a security deposit. For this specific property, contact the owner at ${property.contact_phone} for exact requirements. Always ensure you get a written rental agreement. Check our <a href='/blog' class='text-green-600 hover:underline'>blog</a> for rental tips and advice.`
      },
      {
        question: `Is this property listing verified and legitimate?`,
        answer: `All properties on NewKenyan.com go through our verification process. However, we always recommend viewing the property in person, verifying the owner's identity, and getting all agreements in writing. Never send money without seeing the property first. Visit our <a href='/business-directory' class='text-green-600 hover:underline'>business directory</a> for verified property agents.`
      }
    ];

    if (property.property_type.toLowerCase().includes('house')) {
      baseQuestions.push({
        question: `What is the construction quality of this house in ${property.city}?`,
        answer: `This house in ${property.city} has been listed with detailed specifications. For information about construction materials, building quality, and recent renovations, contact the property owner directly. We recommend a professional inspection before finalizing any rental or purchase agreement.`
      });
    }

    if (property.price_type === 'sale') {
      baseQuestions.push({
        question: `What are the property transfer and legal costs for buying this ${property.property_type.toLowerCase()}?`,
        answer: `Property transfer costs in Kenya typically include stamp duty, legal fees, and registration costs. For this property priced at KSh ${property.price.toLocaleString()}, consult with a qualified lawyer for exact costs. Find legal professionals in our <a href='/business-directory' class='text-green-600 hover:underline'>business directory</a>.`
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

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Property Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Property Features & Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm">
                    <strong>Furnished:</strong> {property.is_furnished ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm">
                    <strong>Pets Allowed:</strong> {property.pets_allowed ? 'Yes' : 'No'}
                  </span>
                </div>
                {property.available_from && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">
                      <strong>Available:</strong> {new Date(property.available_from).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">
                    <strong>Listed:</strong> {new Date(property.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

            {/* Safety Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
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

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Common questions about this {property.property_type.toLowerCase()} in {property.city}
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