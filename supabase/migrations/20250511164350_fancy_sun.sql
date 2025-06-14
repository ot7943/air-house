/*
  # Add Kiosk payment method

  1. Changes
    - Add 'Kiosk' to payment_method_type enum
    - Update existing constraints
*/

ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Kiosk';