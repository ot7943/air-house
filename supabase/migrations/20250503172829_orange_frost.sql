/*
  # Update payment method constraints

  1. Changes
    - Create enum type for payment methods
    - Add constraints to payment_method columns
    - Update existing data to match new constraints

  2. Affected Tables
    - pending_orders
    - completed_orders
*/

-- Create payment method type
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'payment_method_type' 
  ) THEN
    CREATE TYPE payment_method_type AS ENUM (
      'Installments',
      'Credit card',
      'E-wallet',
      'Cash on delivery'
    );
  END IF;
END $$;

-- Update pending_orders table
ALTER TABLE pending_orders
ALTER COLUMN payment_method TYPE payment_method_type 
USING payment_method::payment_method_type;

-- Update completed_orders table
ALTER TABLE completed_orders
ALTER COLUMN payment_method TYPE payment_method_type 
USING payment_method::payment_method_type;