/*
  # Add discount information to orders tables

  1. Changes
    - Add discount information columns to both order tables
    - Add validation constraints for discount values
    - Maintain existing constraints and policies

  2. New Columns
    - discount_code: Store the applied discount code
    - discount_percentage: Store the discount percentage
    - discounted_total: Store the final price after discount
*/

-- Add discount columns to pending_orders
ALTER TABLE pending_orders
ADD COLUMN IF NOT EXISTS discount_code text,
ADD COLUMN IF NOT EXISTS discount_percentage numeric,
ADD COLUMN IF NOT EXISTS discounted_total numeric;

-- Add discount columns to completed_orders
ALTER TABLE completed_orders
ADD COLUMN IF NOT EXISTS discount_code text,
ADD COLUMN IF NOT EXISTS discount_percentage numeric,
ADD COLUMN IF NOT EXISTS discounted_total numeric;

-- Add discount-related constraints to pending_orders
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'pending_orders_discount_percentage_check'
  ) THEN
    ALTER TABLE pending_orders
    ADD CONSTRAINT pending_orders_discount_percentage_check 
    CHECK (discount_percentage IS NULL OR (discount_percentage > 0 AND discount_percentage <= 100));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'pending_orders_total_check'
  ) THEN
    ALTER TABLE pending_orders
    ADD CONSTRAINT pending_orders_total_check
    CHECK (total >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'pending_orders_discounted_total_check'
  ) THEN
    ALTER TABLE pending_orders
    ADD CONSTRAINT pending_orders_discounted_total_check
    CHECK (discounted_total IS NULL OR (discounted_total >= 0 AND discounted_total <= total));
  END IF;
END $$;

-- Add discount-related constraints to completed_orders
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'completed_orders_discount_percentage_check'
  ) THEN
    ALTER TABLE completed_orders
    ADD CONSTRAINT completed_orders_discount_percentage_check 
    CHECK (discount_percentage IS NULL OR (discount_percentage > 0 AND discount_percentage <= 100));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'completed_orders_total_check'
  ) THEN
    ALTER TABLE completed_orders
    ADD CONSTRAINT completed_orders_total_check
    CHECK (total >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'completed_orders_discounted_total_check'
  ) THEN
    ALTER TABLE completed_orders
    ADD CONSTRAINT completed_orders_discounted_total_check
    CHECK (discounted_total IS NULL OR (discounted_total >= 0 AND discounted_total <= total));
  END IF;
END $$;