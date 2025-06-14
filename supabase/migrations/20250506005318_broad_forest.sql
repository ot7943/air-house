/*
  # Add payment_id to pending_orders table

  1. Changes
    - Add payment_id column to pending_orders table
    - Add unique constraint on payment_id
    - Add foreign key constraint to payments table

  2. Security
    - Maintain existing RLS policies
*/

-- Add payment_id column to pending_orders
ALTER TABLE pending_orders
ADD COLUMN IF NOT EXISTS payment_id uuid UNIQUE REFERENCES payments(id);