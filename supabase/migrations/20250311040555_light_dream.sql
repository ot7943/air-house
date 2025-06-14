/*
  # Update products table schema and security

  1. Changes
    - Add price constraints
    - Enable RLS and policies
    - Add updated_at trigger

  2. Security
    - Enable RLS on products table
    - Add policy for public read access
    - Add policy for authenticated users to manage products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON products;
DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON products;

-- Add price constraints
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'products_price_check'
  ) THEN
    ALTER TABLE products 
    ADD CONSTRAINT products_price_check 
    CHECK (price >= 0);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'products_check'
  ) THEN
    ALTER TABLE products 
    ADD CONSTRAINT products_check 
    CHECK (discounted_price >= 0 AND discounted_price <= price);
  END IF;
END $$;

-- Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_products_updated_at'
  ) THEN
    CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);