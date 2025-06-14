/*
  # Add CIB and Mashreq Bank payment methods

  1. Changes
    - Add 'CIB' and 'Mashreq Bank' to payment_method_type enum
    - Update existing constraints
*/

ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'CIB';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Mashreq Bank';