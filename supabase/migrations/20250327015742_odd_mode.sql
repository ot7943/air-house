/*
  # Add product quantities to pending orders

  1. Changes
    - Add product_quantities column to pending_orders table
    - Update existing RLS policies

  2. New Columns
    - product_quantities: JSONB array storing product IDs and quantities
*/

ALTER TABLE pending_orders
ADD COLUMN IF NOT EXISTS product_quantities JSONB[];

COMMENT ON COLUMN pending_orders.product_quantities IS 'Array of objects containing product IDs and their quantities';