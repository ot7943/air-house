/*
  # Add discount code usage tracking

  1. Changes
    - Add function to increment discount code usage
    - Add trigger to track usage when orders are created
    - Maintain existing constraints and policies

  2. New Functions
    - increment_discount_code_usage: Updates current_uses count
*/

-- Create function to increment discount code usage
CREATE OR REPLACE FUNCTION increment_discount_code_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.discount_code IS NOT NULL THEN
    UPDATE discount_codes
    SET current_uses = current_uses + 1
    WHERE code = NEW.discount_code
    AND active = true
    AND (max_uses IS NULL OR current_uses < max_uses)
    AND expiry_date > now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for pending orders
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'track_discount_code_usage_pending'
  ) THEN
    CREATE TRIGGER track_discount_code_usage_pending
    AFTER INSERT ON pending_orders
    FOR EACH ROW
    EXECUTE FUNCTION increment_discount_code_usage();
  END IF;
END $$;

-- Create trigger for completed orders
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'track_discount_code_usage_completed'
  ) THEN
    CREATE TRIGGER track_discount_code_usage_completed
    AFTER INSERT ON completed_orders
    FOR EACH ROW
    EXECUTE FUNCTION increment_discount_code_usage();
  END IF;
END $$;