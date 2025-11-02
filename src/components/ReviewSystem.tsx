'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { reviewSchema, type ReviewInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  created_at: string;
  user_id: string;
  rating: number;
  comment: string | null;
}

interface ReviewSystemProps {
  businessId: string;
  businessName: string;
}

export default function ReviewSystem({ businessId, businessName }: ReviewSystemProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchReviews = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
      } else {
        setReviews(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    fetchReviews();
  }, [businessId, fetchReviews]);

  useEffect(() => {
    if (user) {
      const existingReview = reviews.find(review => review.user_id === user.id);
      setUserReview(existingReview || null);
    }
  }, [reviews, user]);

  const handleSubmitReview = async () => {
    if (!user) {
      setError('You must be signed in to leave a review');
      return;
    }

    if (newRating === 0) {
      setError('Please select a rating');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const reviewData: ReviewInput = {
        businessId,
        rating: newRating,
        comment: newComment.trim() || null,
      };

      const validatedData = reviewSchema.parse(reviewData);

      if (userReview) {
        const { error } = await supabase
          .from('reviews')
          .update({
            rating: validatedData.rating,
            comment: validatedData.comment,
          })
          .eq('id', userReview.id);

        if (error) {
          console.error('Error updating review:', error);
          setError('Failed to update review. Please try again.');
          return;
        }
      } else {
        const { error } = await supabase
          .from('reviews')
          .insert({
            business_id: validatedData.businessId,
            user_id: user.id,
            rating: validatedData.rating,
            comment: validatedData.comment,
          });

        if (error) {
          console.error('Error submitting review:', error);
          setError('Failed to submit review. Please try again.');
          return;
        }
      }

      setNewRating(0);
      setNewComment('');
      setShowReviewForm(false);
      fetchReviews();
    } catch (error: unknown) {
      console.error('Validation error:', error);
      setError('Please check your input and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (userId: string) => {
    return userId.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="py-4">
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Reviews ({reviews.length})
        </h3>
        {user && (
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            variant={userReview ? "outline" : "default"}
            size="sm"
            className={userReview ? "border-green-300 text-green-600" : "bg-green-600 hover:bg-green-700"}
          >
            {userReview ? 'Update Review' : 'Write Review'}
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h4 className="font-medium mb-4">
            {userReview ? `Update your review for ${businessName}` : `Review ${businessName}`}
          </h4>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Rating Stars */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    star <= (hoveredRating || newRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 hover:text-yellow-200'
                  }`}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Comment (Optional)
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience with this business..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              maxLength={500}
            />
            <div className="flex justify-between items-start mt-1">
              <p className="text-xs text-gray-500">
                Links, emails, and phone numbers are not allowed in reviews
              </p>
              <p className="text-sm text-gray-500">
                {newComment.length}/500 characters
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleSubmitReview}
              disabled={submitting || newRating === 0}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {submitting ? 'Submitting...' : userReview ? 'Update Review' : 'Submit Review'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowReviewForm(false);
                setNewRating(userReview?.rating || 0);
                setNewComment(userReview?.comment || '');
                setError('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* User's Existing Review */}
      {userReview && !showReviewForm && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-green-800">Your Review</h4>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < userReview.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          {userReview.comment && (
            <p className="text-green-700 text-sm">{userReview.comment}</p>
          )}
          <p className="text-green-600 text-xs mt-2">
            {new Date(userReview.created_at).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No reviews yet. Be the first to review this business!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.filter(review => review.user_id !== user?.id).map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-700 font-medium text-sm">
                      {getInitials(review.user_id)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">
                      User {review.user_id.substring(0, 8)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="text-gray-700 text-sm">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}