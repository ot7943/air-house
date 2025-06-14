/*
  # Add Apple Pay payment method

  1. Changes
    - Add 'Apple pay' to payment_method_type enum
    - Update existing constraints
*/

ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Apple pay';