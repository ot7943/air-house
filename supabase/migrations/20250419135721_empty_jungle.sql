/*
  # Add order fields to pending_orders and completed_orders tables

  1. Changes
    - Add payment_method column to pending_orders and completed_orders
    - Add delivery_type column to pending_orders and completed_orders
    - Add address column to pending_orders and completed_orders
    - Add customer column to pending_orders and completed_orders
    - Add total column to pending_orders and completed_orders

  2. Security
    - Maintain existing RLS policies
*/

-- Add columns to pending_orders
ALTER TABLE pending_orders 
ADD COLUMN IF NOT EXISTS payment_method text,
ADD COLUMN IF NOT EXISTS delivery_type text,
ADD COLUMN IF NOT EXISTS address jsonb,
ADD COLUMN IF NOT EXISTS customer jsonb,
ADD COLUMN IF NOT EXISTS total numeric;

-- Add columns to completed_orders
ALTER TABLE completed_orders 
ADD COLUMN IF NOT EXISTS payment_method text,
ADD COLUMN IF NOT EXISTS delivery_type text,
ADD COLUMN IF NOT EXISTS address jsonb,
ADD COLUMN IF NOT EXISTS customer jsonb,
ADD COLUMN IF NOT EXISTS total numeric;