/*
  # Add bank installment payment methods

  1. Changes
    - Add specific bank installment options to payment_method_type enum
    - Update existing constraints
*/

ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - Attijariwafa Bank';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - Bank Misr';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - Bank NXT';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - BDC';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - CIB';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - KFH Bank';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - Mashreq Bank';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - NBD';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - NBE';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - NBK';
ALTER TYPE payment_method_type ADD VALUE IF NOT EXISTS 'Bank installment - SAIB';