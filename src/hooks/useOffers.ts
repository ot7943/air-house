import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { InstallmentOffer, DiscountOffer, GiftOffer, Offer } from '../types/offers';

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        // Fetch all types of offers in parallel
        const [
          { data: installmentOffers, error: installmentError },
          { data: discountOffers, error: discountError },
          { data: giftOffers, error: giftError }
        ] = await Promise.all([
          supabase
            .from('installment_offers')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false }),
          supabase
            .from('discount_offers')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false }),
          supabase
            .from('gift_offers')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false })
        ]);

        if (installmentError) throw installmentError;
        if (discountError) throw discountError;
        if (giftError) throw giftError;

        // Transform offers into a unified format
        const transformedOffers: Offer[] = [
          ...(installmentOffers || []).map((offer: InstallmentOffer) => ({
            id: offer.id,
            type: 'installment' as const,
            title: offer.title,
            description: offer.description,
            highlight: `قسط ${offer.down_payment_percentage}%`,
            logos: [
              offer.bank_logo_1,
              offer.bank_logo_2,
              offer.bank_logo_3
            ].filter(Boolean),
            theme: 'blue',
            details: {
              adminFees: offer.admin_fees_percentage,
              downPayment: offer.down_payment_percentage,
              interestRate: offer.interest_rate_percentage
            }
          })),
          ...(discountOffers || []).map((offer: DiscountOffer) => ({
            id: offer.id,
            type: 'discount' as const,
            title: offer.title,
            description: offer.description,
            highlight: `وفر ${offer.discount_percentage}%`,
            logos: [
              offer.brand_logo_1,
              offer.brand_logo_2,
              offer.brand_logo_3
            ].filter(Boolean),
            theme: 'green',
            details: {
              discount: offer.discount_percentage
            }
          })),
          ...(giftOffers || []).map((offer: GiftOffer) => ({
            id: offer.id,
            type: 'gift' as const,
            title: offer.title,
            description: offer.description,
            highlight: 'هدية مجانية',
            logos: [offer.brand_logo_1],
            theme: 'purple'
          }))
        ];

        setOffers(transformedOffers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching offers');
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  return { offers, loading, error };
}