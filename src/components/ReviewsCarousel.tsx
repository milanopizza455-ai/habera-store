import React, { useState } from 'react';
import { Plus, Star, X } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewsCarouselProps {
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'isDemoSample'>) => void;
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews, onAddReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [rating, setRating] = useState(5);
  const [productPurchased, setProductPurchased] = useState('Noor Classic Matte Nida Abaya');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;
    onAddReview({
      customerName: customerName.trim(),
      city: city.trim() || 'Pakistan',
      rating,
      productPurchased: productPurchased.trim() || 'HABERA Collection',
      comment: comment.trim(),
    });
    setCustomerName('');
    setComment('');
    setShowForm(false);
  };

  // Duplicate list for seamless continuous left-to-right marquee
  const trackReviews = [...reviews, ...reviews];

  return (
    <section className="bg-[#101010] text-[#FAF7F1] py-16 sm:py-20 overflow-hidden border-y border-[#C6A15B]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-[#C6A15B] font-medium">
            Community Feedback · Sample Showcase Reviews
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAF7F1] mt-1.5">
            What Our Customers Say
          </h2>
          <p className="mt-1.5 text-xs text-[#E8DDCC]/75 max-w-xl">
            Showcasing sample preview feedback alongside customer-submitted reviews from across Pakistan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#101010] transition-colors cursor-pointer whitespace-nowrap"
        >
          {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{showForm ? 'Close Form' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Optional Add Review Form */}
      {showForm && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <form
            onSubmit={handleSubmit}
            className="bg-[#191816] border border-[#C6A15B]/35 p-6 space-y-4"
          >
            <h3 className="font-display text-2xl font-semibold text-[#FAF7F1]">
              Share Your HABERA Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E8DDCC] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Amna S."
                  className="w-full px-3 py-2 bg-[#101010] border border-[#FAF7F1]/20 text-sm text-[#FAF7F1] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E8DDCC] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Karachi / Lahore"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#FAF7F1]/20 text-sm text-[#FAF7F1] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E8DDCC] mb-1">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#101010] border border-[#FAF7F1]/20 text-sm text-[#FAF7F1] focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value={5}>5 Stars — Exceptional</option>
                  <option value={4}>4 Stars — Very Good</option>
                  <option value={3}>3 Stars — Good</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E8DDCC] mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={productPurchased}
                onChange={(e) => setProductPurchased(e.target.value)}
                className="w-full px-3 py-2 bg-[#101010] border border-[#FAF7F1]/20 text-sm text-[#FAF7F1] focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#E8DDCC] mb-1">
                Review Message
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about fabric feel, fit, and delivery..."
                className="w-full px-3 py-2 bg-[#101010] border border-[#FAF7F1]/20 text-sm text-[#FAF7F1] focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#C6A15B] text-[#101010] hover:bg-[#D5B26E] text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer"
            >
              Publish Review
            </button>
          </form>
        </div>
      )}

      {/* Continuous Left-to-Right Carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-ltr gap-5 px-4">
          {trackReviews.map((review, idx) => (
            <article
              key={`${review.id}-${idx}`}
              className="w-[300px] sm:w-[360px] shrink-0 bg-[#171614] border border-[#C6A15B]/30 p-6 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-3.5 h-3.5 ${
                          starIdx < review.rating
                            ? 'text-[#C6A15B] fill-[#C6A15B]'
                            : 'text-[#FAF7F1]/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] tracking-[0.12em] uppercase text-[#E8DDCC]/60">
                    {review.isDemoSample ? 'Demo Sample' : 'Submitted Review'}
                  </span>
                </div>

                <p className="text-sm text-[#FAF7F1]/90 leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#FAF7F1]/10 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#C6A15B]">{review.customerName}</p>
                  <p className="text-[#E8DDCC]/65">{review.city}</p>
                </div>
                <span className="text-[11px] text-[#E8DDCC]/70 truncate max-w-[155px]">
                  {review.productPurchased}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
