import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { OrderInvoice } from '../components/OrderInvoice';
import { WindLoader } from '../components/WindLoader';

export function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const { callTime, orderDetails } = location.state || {};

  useEffect(() => {
    // Track conversion
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        'send_to': 'AW-16944886610/hSb4COSqkLQaENLm-Y8_'
      });
    }

    // Show success message for 8 seconds, then show invoice
    const timer = setTimeout(() => {
      setShowSuccess(false);
      setShowInvoice(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const getCallTimeText = (time: string) => {
    switch (time) {
      case 'morning':
        return 'الفترة الصباحية';
      case 'afternoon':
        return 'فترة الظهيرة';
      case 'evening':
        return 'الفترة المسائية';
      default:
        return '';
    }
  };

  if (!orderDetails) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">عذراً، حدث خطأ</h2>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 hover:text-blue-800"
        >
          العودة للصفحة الرئيسية
          <ArrowRight className="mr-2" />
        </button>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex justify-center mb-6"
              >
                <CheckCircle className="w-20 h-20 text-green-500" />
              </motion.div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                شكراً لطلبك!
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                تم استلام طلبك بنجاح. سيقوم فريقنا بالتواصل معك
                {callTime && <span> خلال {getCallTimeText(callTime)}</span>} لتأكيد طلبك
                وترتيب تفاصيل التوصيل.
              </p>

              <div className="text-gray-500 mb-8">
                <p>يرجى إبقاء هاتفك بالقرب منك خلال الفترة المحددة.</p>
                <p>إذا فاتك اتصالنا، لا تقلق - سنحاول مرة أخرى!</p>
                <p>و مهم جدا الأنتظار بضع ثواني من الأن و سيتم أنشاء لك فاتوره بها رقم الطلب الخاص و تفاصيله </p>
                <p>شكرا لثقتكم بي أير هاوس للتكيف و التجاره خبره اكثر من 20 عاما</p>
              </div>
            </div>
          </motion.div>
        )}

        {!showSuccess && showInvoice ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <OrderInvoice orderDetails={orderDetails} />
          </motion.div>
        ) : !showSuccess && (
          <div className="max-w-md mx-auto text-center">
            <WindLoader />
            <p className="text-gray-600 mt-4">جاري إنشاء الفاتورة...</p>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}