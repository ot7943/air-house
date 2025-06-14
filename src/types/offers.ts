export interface InstallmentOffer {
  id: string;
  title: string;
  description: string;
  admin_fees_percentage: number;
  down_payment_percentage: number;
  interest_rate_percentage: number;
  bank_logo_1: string;
  bank_logo_2?: string;
  bank_logo_3?: string;
  website_logo: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DiscountOffer {
  id: string;
  title: string;
  description: string;
  discount_percentage: number;
  brand_logo_1: string;
  brand_logo_2?: string;
  brand_logo_3?: string;
  website_logo: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GiftOffer {
  id: string;
  title: string;
  description: string;
  brand_logo_1: string;
  website_logo: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type OfferType = 'installment' | 'discount' | 'gift';

export interface Offer {
  id: string;
  type: OfferType;
  title: string;
  description: string;
  highlight?: string;
  logos: string[];
  theme: 'blue' | 'purple' | 'green';
  details?: {
    adminFees?: number;
    downPayment?: number;
    interestRate?: number;
    discount?: number;
  };
}