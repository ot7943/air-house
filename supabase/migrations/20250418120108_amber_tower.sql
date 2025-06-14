/*
  # Add discount codes table

  1. New Tables
    - discount_codes: Stores discount code information
      - code (text, unique): The discount code
      - discount_percentage (numeric): Percentage discount
      - active (boolean): Whether code is currently valid
      - expiry_date (timestamptz): When code expires
      - max_uses (integer): Maximum number of times code can be used
      - current_uses (integer): Current number of times code has been used

  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for authenticated users to manage codes
*/

CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_percentage numeric NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  active boolean DEFAULT true NOT NULL,
  expiry_date timestamptz NOT NULL,
  max_uses integer,
  current_uses integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create updated_at trigger
CREATE TRIGGER update_discount_codes_updated_at
  BEFORE UPDATE ON discount_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to verify discount codes"
  ON discount_codes
  FOR SELECT
  TO public
  USING (active = true AND (expiry_date > now()) AND (max_uses IS NULL OR current_uses < max_uses));

CREATE POLICY "Allow authenticated users to manage discount codes"
  ON discount_codes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX discount_codes_code_idx ON discount_codes(code);
CREATE INDEX discount_codes_active_expiry_idx ON discount_codes(active, expiry_date);