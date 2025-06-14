/*
  # Create offers tables

  1. New Tables
    - installment_offers: Stores installment plan offers
    - discount_offers: Stores discount offers
    - gift_offers: Stores gift offers

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage offers
*/

-- Create installment_offers table
CREATE TABLE IF NOT EXISTS installment_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  admin_fees_percentage numeric NOT NULL CHECK (admin_fees_percentage >= 0 AND admin_fees_percentage <= 100),
  down_payment_percentage numeric NOT NULL CHECK (down_payment_percentage >= 0 AND down_payment_percentage <= 100),
  interest_rate_percentage numeric NOT NULL CHECK (interest_rate_percentage >= 0 AND interest_rate_percentage <= 100),
  bank_logo_1 text NOT NULL,
  bank_logo_2 text,
  bank_logo_3 text,
  website_logo text NOT NULL,
  active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create discount_offers table
CREATE TABLE IF NOT EXISTS discount_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  discount_percentage numeric NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  brand_logo_1 text NOT NULL,
  brand_logo_2 text,
  brand_logo_3 text,
  website_logo text NOT NULL,
  active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create gift_offers table
CREATE TABLE IF NOT EXISTS gift_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  brand_logo_1 text NOT NULL,
  website_logo text NOT NULL,
  active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create updated_at triggers
CREATE TRIGGER update_installment_offers_updated_at
  BEFORE UPDATE ON installment_offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_discount_offers_updated_at
  BEFORE UPDATE ON discount_offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_gift_offers_updated_at
  BEFORE UPDATE ON gift_offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS and create policies
ALTER TABLE installment_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_offers ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access to installment_offers"
  ON installment_offers
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Allow public read access to discount_offers"
  ON discount_offers
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Allow public read access to gift_offers"
  ON gift_offers
  FOR SELECT
  TO public
  USING (active = true);

-- Admin management policies
CREATE POLICY "Allow authenticated users to manage installment_offers"
  ON installment_offers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage discount_offers"
  ON discount_offers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage gift_offers"
  ON gift_offers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX installment_offers_created_at_idx ON installment_offers(created_at);
CREATE INDEX discount_offers_created_at_idx ON discount_offers(created_at);
CREATE INDEX gift_offers_created_at_idx ON gift_offers(created_at);