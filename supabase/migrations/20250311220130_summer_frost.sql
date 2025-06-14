/*
  # Update products table schema

  1. Changes
    - Flatten JSON structure into individual columns
    - Add new columns for all product specifications
    - Make certain fields optional
    - Maintain existing constraints and policies

  2. Security
    - Maintain existing RLS policies
    - Keep existing constraints for prices
*/

-- Backup existing data (if needed)
CREATE TABLE IF NOT EXISTS products_backup AS SELECT * FROM products;

-- Drop existing table
DROP TABLE IF EXISTS products;

-- Create new table with flattened structure
CREATE TABLE products (
  -- Basic Information
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  discounted_price numeric CHECK (discounted_price >= 0 AND discounted_price <= price),
  image text NOT NULL,
  available boolean DEFAULT true NOT NULL,
  capacity text NOT NULL,
  condition text NOT NULL,
  delivery text NOT NULL,
  warranty text NOT NULL,
  
  -- Technical Specifications
  brand text NOT NULL,
  model text NOT NULL,
  color text NOT NULL,
  type text NOT NULL,
  cooling_system text NOT NULL,
  classification text NOT NULL,
  energy_efficiency_ratio text NOT NULL,
  energy_efficiency_level text NOT NULL,
  cooling_capacity text NOT NULL,
  net_weight numeric NOT NULL,
  gross_weight numeric NOT NULL,
  connection_length numeric NOT NULL,
  
  -- Indoor Unit Dimensions
  indoor_width numeric NOT NULL,
  indoor_height numeric NOT NULL,
  indoor_depth numeric NOT NULL,
  
  -- Outdoor Unit Dimensions
  outdoor_width numeric NOT NULL,
  outdoor_height numeric NOT NULL,
  outdoor_depth numeric NOT NULL,
  
  -- Optional Features
  feature_1 text,
  feature_2 text,
  feature_3 text,
  feature_4 text,
  feature_5 text,
  feature_6 text,
  feature_7 text,
  feature_8 text,
  feature_9 text,
  feature_10 text,
  feature_11 text,
  feature_12 text,
  feature_13 text,
  feature_14 text,
  feature_15 text,
  feature_16 text,
  feature_17 text,
  feature_18 text,
  feature_19 text,
  feature_20 text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Recreate the updated_at trigger
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Recreate policies
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

-- Create indexes for commonly queried fields
CREATE INDEX products_brand_idx ON products(brand);
CREATE INDEX products_model_idx ON products(model);
CREATE INDEX products_type_idx ON products(type);
CREATE INDEX products_price_idx ON products(price);
CREATE INDEX products_created_at_idx ON products(created_at);