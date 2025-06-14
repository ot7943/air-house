/*
  # Add product_code and payment_link columns to products table

  1. Changes
    - Add product_code column with default 'CO' (Cooling Only)
    - Add payment_link column for direct payment links
    - Add constraint to validate product_code values
    - Add index for product_code for better query performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add product_code column
ALTER TABLE products
ADD COLUMN IF NOT EXISTS product_code text DEFAULT 'CO' NOT NULL;

-- Add payment_link column
ALTER TABLE products
ADD COLUMN IF NOT EXISTS payment_link text;

-- Add comment for product_code
COMMENT ON COLUMN products.product_code IS 'Product code indicating type: CO (Cooling Only) or HP (Heat Pump)';

-- Add constraint for product_code
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'products_product_code_check'
  ) THEN
    ALTER TABLE products
    ADD CONSTRAINT products_product_code_check
    CHECK (product_code IN ('CO', 'HP'));
  END IF;
END $$;

-- Add index for product_code
CREATE INDEX IF NOT EXISTS products_product_code_idx ON products(product_code);

-- Add cooling_power and power columns
ALTER TABLE products
ADD COLUMN IF NOT EXISTS cooling_power text,
ADD COLUMN IF NOT EXISTS power text;