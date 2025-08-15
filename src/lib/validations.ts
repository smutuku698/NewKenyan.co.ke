import { z } from 'zod';
import DOMPurify from 'dompurify';

export function sanitizeInput(input: string): string {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  }
  return input.replace(/<[^>]*>/g, '').trim();
}

export const businessListingSchema = z.object({
  businessName: z.string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name must be less than 100 characters')
    .transform(sanitizeInput),
  
  category: z.string()
    .min(1, 'Category is required')
    .transform(sanitizeInput),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .transform(sanitizeInput),
  
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val ? sanitizeInput(val) : null),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .transform(sanitizeInput),
  
  pinLocationUrl: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal(''))
    .transform(val => val || null),
  
  phone: z.string()
    .regex(/^\+254[0-9]{9}$/, 'Phone number must be in format +254XXXXXXXXX')
    .transform(sanitizeInput),
  
  email: z.string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal(''))
    .transform(val => val || null),
  
  website: z.string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal(''))
    .transform(val => val || null),
  
  businessDays: z.string()
    .max(200, 'Business days must be less than 200 characters')
    .optional()
    .transform(val => val ? sanitizeInput(val) : null),
  
  pricingInfo: z.string()
    .max(500, 'Pricing info must be less than 500 characters')
    .optional()
    .transform(val => val ? sanitizeInput(val) : null),
  
  whatsappNumber: z.string()
    .regex(/^\+254[0-9]{9}$/, 'WhatsApp number must be in format +254XXXXXXXXX')
    .optional()
    .or(z.literal(''))
    .transform(val => val || null),
});

export const reviewSchema = z.object({
  businessId: z.string().uuid('Invalid business ID'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string()
    .max(500, 'Comment must be less than 500 characters')
    .optional()
    .transform(val => val ? sanitizeInput(val) : null),
});

export const imageUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'File must be JPEG, PNG, or WebP format'
    ),
});

export const propertyListingSchema = z.object({
  propertyTitle: z.string()
    .min(5, 'Property title must be at least 5 characters')
    .max(100, 'Property title must be less than 100 characters')
    .transform(sanitizeInput),
  
  propertyType: z.string()
    .min(1, 'Property type is required')
    .transform(sanitizeInput),
  
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .transform(sanitizeInput),
  
  price: z.number()
    .positive('Price must be a positive number')
    .min(1000, 'Price must be at least KSh 1,000'),
  
  priceType: z.enum(['rent', 'sale'])
    .default('rent'),
  
  bedrooms: z.number()
    .int('Bedrooms must be a whole number')
    .min(0, 'Bedrooms cannot be negative')
    .max(20, 'Bedrooms cannot exceed 20')
    .optional(),
  
  bathrooms: z.number()
    .int('Bathrooms must be a whole number')
    .min(0, 'Bathrooms cannot be negative')
    .max(20, 'Bathrooms cannot exceed 20')
    .optional(),
  
  squareFeet: z.number()
    .int('Square feet must be a whole number')
    .min(100, 'Square feet must be at least 100')
    .optional(),
  
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters')
    .transform(sanitizeInput),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .transform(sanitizeInput),
  
  county: z.string()
    .optional()
    .or(z.literal(''))
    .refine(val => !val || val.length >= 2, 'County must be at least 2 characters')
    .refine(val => !val || val.length <= 50, 'County must be less than 50 characters')
    .transform(val => val ? sanitizeInput(val) : null),
  
  pinLocationUrl: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal(''))
    .transform(val => val || null),
  
  contactPhone: z.string()
    .regex(/^\+254[0-9]{9}$/, 'Phone number must be in format +254XXXXXXXXX')
    .transform(sanitizeInput),
  
  contactEmail: z.string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal(''))
    .transform(val => val || null),
  
  whatsappNumber: z.string()
    .regex(/^\+254[0-9]{9}$/, 'WhatsApp number must be in format +254XXXXXXXXX')
    .optional()
    .or(z.literal(''))
    .transform(val => val || null),
  
  availableFrom: z.string()
    .optional()
    .transform(val => val || null),
  
  isFurnished: z.boolean()
    .default(false),
  
  petsAllowed: z.boolean()
    .default(false),
  
  amenities: z.array(z.string())
    .default([]),
});

export type BusinessListingInput = z.infer<typeof businessListingSchema>;
export type PropertyListingInput = z.infer<typeof propertyListingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ImageUploadInput = z.infer<typeof imageUploadSchema>;