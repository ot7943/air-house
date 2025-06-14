/*
  # Create payments table

  1. New Table
    - payments: Stores payment transaction information
      - client_name: Customer's full name
      - phone_number: Customer's phone number
      - amount: Transaction amount
      - payment_method: Payment method used
      - status: Transaction status
      - created_at: Timestamp of creation
      - updated_at: Timestamp of last update

  2. Security
    - Enable RLS
    - Add policies for public access
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  phone_number text NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  payment_method text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create updated_at trigger
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to create payments"
  ON payments
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage payments"
  ON payments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX payments_status_idx ON payments(status);
CREATE INDEX payments_created_at_idx ON payments(created_at);