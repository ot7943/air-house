import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

export function PaymentVerification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('pending');
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const checkPaymentStatus = async () => {
      try {
        // Check payment status
        const { data: payment, error: paymentError } = await supabase
          .from('payments')
          .select('status')
          .eq('id', id)
          .single();

        if (paymentError) {
          console.error('Error fetching payment:', paymentError);
          toast.error('حدث خطأ أثناء التحقق من حالة الدفع');
          return;
        }

        if (!payment) {
          toast.error('لم يتم العثور على معاملة الدفع');
          navigate('/checkout');
          return;
        }

        setStatus(payment.status);

        if (payment.status === 'completed' && !orderCreated) {
          const orderData = location.state?.orderData;
          
          if (!orderData) {
            console.error('No order data found in location state');
            return;
          }

          try {
            // Check for existing order with this payment ID
            const { data: existingOrder, error: checkError } = await supabase
              .from('pending_orders')
              .select('id')
              .eq('payment_id', id)
              .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully

            if (checkError) {
              throw checkError;
            }

            if (!existingOrder) {
              // No existing order found, create new one
              const orderWithPaymentId = {
                ...orderData,
                payment_id: id
              };

              const { error: insertError } = await supabase
                .from('pending_orders')
                .insert([orderWithPaymentId]);

              if (insertError) {
                // If insert fails due to race condition (another order was created), just proceed
                if (insertError.code !== '23505') { // Not a duplicate key error
                  throw insertError;
                }
              }
            }

            // Whether we created a new order or found an existing one, proceed to confirmation
            setOrderCreated(true);
            clearCart();
            navigate('/order-confirmation', { 
              state: location.state?.confirmationData
            });

          } catch (error) {
            console.error('Error handling order:', error);
            toast.error('حدث خطأ أثناء معالجة الطلب');
          }
        } else if (payment.status === 'failed') {
          toast.error('فشلت عملية الدفع');
          setTimeout(() => {
            navigate('/checkout');
          }, 3000);
        } else {
          // Keep checking every 2 seconds if still pending
          timeoutId = window.setTimeout(checkPaymentStatus, 2000);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        toast.error('حدث خطأ أثناء التحقق من حالة الدفع');
      }
    };

    checkPaymentStatus();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [id, navigate, location.state, clearCart, orderCreated]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'pending' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Loader2 className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
              <h2 className="text-xl font-semibold">جاري التحقق من عملية الدفع</h2>
              <p className="text-gray-600">
                يرجى الانتظار حتى يتم التحقق من حالة الدفع...
              </p>
            </motion.div>
          )}

          {status === 'completed' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-xl font-semibold">تم الدفع بنجاح</h2>
              <p className="text-gray-600">
                جاري تحويلك لصفحة تأكيد الطلب...
              </p>
            </motion.div>
          )}

          {status === 'failed' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-xl font-semibold">فشلت عملية الدفع</h2>
              <p className="text-gray-600">
                جاري تحويلك لسلة المشتريات...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}