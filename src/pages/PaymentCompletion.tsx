import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Truck, Clock, Building } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const bankLogos = [
  {
    name: 'Bank Misr',
    value: 'Bank installment - Bank Misr',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Banque_Misr.svg/1200px-Banque_Misr.svg.png'
  },
  {
    name: 'BDC',
    value: 'Bank installment - BDC',
    logo: 'https://hapijournal.com/wp-content/uploads/2020/01/bank.jpg'
  },
  {
    name: 'NBE',
    value: 'Bank installment - NBE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/32/National_Bank_of_Egypt.svg'
  },
  {
    name: 'CIB',
    value: 'Bank installment - CIB',
    logo: 'https://ytg.eco/wp-content/uploads/2024/05/commercial-international-bank-cib-vector-logo-small.png'
  },
  {
    name: 'Mashreq',
    value: 'Bank installment - Mashreq Bank',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-cxi4QySV-LUwoNaT3HHKjW64K37kuU3Gg&s'
  }
];

const paymentMethods = [
  {
    id: 'Bank installment',
    title: 'تقسيط بنكي',
    icon: Building,
    description: 'قسط مشترياتك من خلال البنوك المعتمدة',
    available: true
  },
  {
    id: 'Credit card',
    title: 'بطاقة بنكية',
    icon: CreditCard,
    description: 'ادفع باستخدام بطاقة الائتمان الخاصة بك',
    available: true
  },
  {
    id: 'E-wallet',
    title: 'المحفظة الإلكترونية',
    icon: Wallet,
    description: 'ادفع باستخدام محفظتك الإلكترونية',
    available: true
  },
  {
    id: 'Kiosk',
    title: 'مكينة دفع محلية',
    icon: Clock,
    description: 'ادفع من خلال أقرب مكينة دفع محلية لك عند أي تاجر أو كشك',
    available: true
  },
  {
    id: 'Cash on delivery',
    title: 'الدفع عند الاستلام',
    icon: Truck,
    description: 'ادفع نقداً عند استلام طلبك',
    available: true
  }
];

export function PaymentCompletion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, total, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showSafariPrompt, setShowSafariPrompt] = useState(false);
  const [showBankInstallment, setShowBankInstallment] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  // Get state from location
  const state = location.state;
  const discountCode = state?.discountCode;
  const discountPercentage = state?.discountPercentage;

  // Ensure this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate total with installment markup if applicable
  const calculateTotal = (baseTotal: number, isInstallment: boolean) => {
    if (isInstallment) {
      return baseTotal * 1.3; // Apply 30% markup for installment
    }
    return baseTotal;
  };

  const baseTotal = total;
  const currentTotal = calculateTotal(
    baseTotal,
    selectedMethod === 'Bank installment'
  );
  
  const discountedTotal = discountPercentage 
    ? calculateTotal(
        baseTotal * (1 - discountPercentage / 100),
        selectedMethod === 'Bank installment'
      )
    : currentTotal;

  useEffect(() => {
    if (!isClient) return;

    // Check if device is iOS Safari
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
      return isIOS && isSafari;
    };
    
    const isiOSSafari = checkIsIOS();
    
    // Show Safari prompt if needed
    if (isiOSSafari) {
      const hasShownPrompt = sessionStorage.getItem('hasShownSafariPrompt');
      if (!hasShownPrompt) {
        setShowSafariPrompt(true);
        sessionStorage.setItem('hasShownSafariPrompt', 'true');
      }
    }
  }, [isClient]);

  const handleSubmitOrder = async () => {
    if (!selectedMethod || !state?.customerInfo || !state?.deliveryInfo) {
      toast.error('معلومات الطلب غير مكتملة');
      navigate('/payment');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        full_name: state.customerInfo.fullName,
        phone_number: state.customerInfo.phone,
        preferred_contact_time: state.customerInfo.callTime,
        product_links: items.map(item => item.id),
        product_quantities: items.map(item => ({
          id: item.id,
          quantity: item.quantity
        })),
        payment_method: selectedBank || selectedMethod,
        delivery_type: state.deliveryInfo.deliveryType,
        address: {
          country: state.deliveryInfo.country,
          governorate: state.deliveryInfo.governorate,
          city: state.deliveryInfo.city,
          street: state.deliveryInfo.street,
          building: state.deliveryInfo.buildingNumber,
          floor: state.deliveryInfo.floor,
          landmark: state.deliveryInfo.landmark || null
        },
        customer: {
          name: state.customerInfo.fullName,
          phone: state.customerInfo.phone,
          preferred_contact_time: state.customerInfo.callTime
        },
        total: currentTotal,
        discount_code: discountCode || null,
        discount_percentage: discountPercentage || null,
        discounted_total: discountedTotal !== currentTotal ? discountedTotal : null
      };

      const confirmationData = { 
        callTime: state.customerInfo.callTime,
        orderDetails: {
          customerInfo: state.customerInfo,
          deliveryInfo: state.deliveryInfo,
          paymentMethod: selectedBank || selectedMethod,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            discountedPrice: item.discountedPrice,
            quantity: item.quantity
          })),
          total: currentTotal,
          discountCode,
          discountPercentage,
          discountedTotal
        }
      };

      if (selectedMethod === 'Credit card' || selectedMethod === 'E-wallet' || selectedMethod === 'Kiosk' || selectedMethod === 'Bank installment') {
        // Create payment transaction with the correct discounted amount
        const { data: payment, error: paymentError } = await supabase
          .from('payments')
          .insert([{
            client_name: state.customerInfo.fullName,
            phone_number: state.customerInfo.phone,
            amount: discountedTotal,
            payment_method: selectedBank || selectedMethod,
            status: 'pending'
          }])
          .select()
          .single();

        if (paymentError) throw paymentError;

        // Navigate to payment verification page
        navigate(`/payment-verification/${payment.id}`, {
          state: {
            orderData,
            confirmationData
          }
        });

        // Open payment page in new tab
        const paymentWindow = window.open(`https://frozeonix-paymob-pro-pay.netlify.app/id/${payment.id}`);
        
        // If popup was blocked, show a message
        if (!paymentWindow) {
          toast.error('يرجى السماح بفتح النافذة المنبثقة لإتمام عملية الدفع');
        }
      } else {
        // For cash on delivery, create order directly
        const { error } = await supabase
          .from('pending_orders')
          .insert([orderData]);

        if (error) throw error;

        // Show success message
        toast.success('تم تأكيد طلبك بنجاح');

        // Clear cart and navigate to confirmation
        clearCart();
        navigate('/order-confirmation', { state: confirmationData });
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('حدث خطأ أثناء تأكيد الطلب');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      {showSafariPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 m-4 max-w-sm shadow-xl"
          >
            <h3 className="text-xl font-bold mb-4">تنبيه مهم</h3>
            <p className="text-gray-600 mb-6">
              لإتمام عملية الدفع بنجاح، يرجى السماح بفتح النوافذ المنبثقة لموقعنا من خلال إعدادات Safari.
            </p>
            <div className="space-y-4">
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                <li>افتح إعدادات Safari</li>
                <li>اضغط على "النوافذ المنبثقة والإعلانات"</li>
                <li>قم بتفعيل السماح للنوافذ المنبثقة لموقعنا</li>
              </ol>
              <button
                onClick={() => setShowSafariPrompt(false)}
                className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium"
              >
                فهمت
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showBankInstallment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 m-4 max-w-2xl w-full shadow-xl"
          >
            <h3 className="text-xl font-bold mb-6">اختر البنك المناسب للتقسيط</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {bankLogos.map((bank) => (
                <button
                  key={bank.name}
                  onClick={() => setSelectedBank(bank.value)}
                  className={clsx(
                    'p-4 rounded-xl border-2 transition-all',
                    selectedBank === bank.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  )}
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="w-full h-20 object-contain"
                  />
                  <p className="text-center mt-2 font-medium">{bank.name}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowBankInstallment(false);
                  setSelectedMethod(null);
                  setSelectedBank(null);
                }}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-medium"
              >
                رجوع
              </button>
              <button
                onClick={() => {
                  if (selectedBank) {
                    setShowBankInstallment(false);
                    handleSubmitOrder();
                  } else {
                    toast.error('يرجى اختيار بنك');
                  }
                }}
                disabled={!selectedBank}
                className={clsx(
                  'flex-1 py-3 rounded-xl font-medium',
                  selectedBank
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                )}
              >
                تأكيد
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="w-full max-w-[90%] lg:max-w-5xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-[1fr,2fr]"
        >
          {/* Header */}
          <div className="bg-gradient-to-l from-blue-600 to-blue-700 px-6 py-10 lg:py-0 lg:flex lg:flex-col lg:justify-center text-center">
            <div className="bg-white/10 w-16 h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">اختر طريقة الدفع</h1>
            <p className="text-blue-100 text-lg lg:text-xl">اختر طريقة الدفع المناسبة لك</p>
          </div>

          {/* Payment Methods */}
          <div className="lg:px-8">
            <div className="p-8 space-y-6">
              {/* Total Amount Display */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2">ملخص الطلب</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">المجموع الأساسي:</span>
                    <span className="font-medium" style={{ direction: 'ltr' }}>
                      {baseTotal.toLocaleString('ar-EG')} جنيه
                    </span>
                  </div>
                  
                  {selectedMethod === 'Bank installment' && (
                    <div className="flex justify-between items-center text-purple-600">
                      <span>زيادة التقسيط (30%):</span>
                      <span className="font-medium" style={{ direction: 'ltr' }}>
                        {(baseTotal * 0.3).toLocaleString('ar-EG')} جنيه
                      </span>
                    </div>
                  )}

                  {discountPercentage > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>خصم ({discountPercentage}%):</span>
                      <span className="font-medium" style={{ direction: 'ltr' }}>
                        -{((currentTotal * discountPercentage) / 100).toLocaleString('ar-EG')} جنيه
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center font-bold">
                      <span>الإجمالي النهائي:</span>
                      <span className="text-xl text-blue-600" style={{ direction: 'ltr' }}>
                        {discountedTotal.toLocaleString('ar-EG')} جنيه
                      </span>
                    </div>
                    {selectedMethod === 'Bank installment' && (
                      <div className="mt-2 text-sm text-purple-600">
                        القسط الشهري: {Math.ceil(discountedTotal / 30).toLocaleString('ar-EG')} جنيه (لمدة 30 شهر)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {paymentMethods.map((method) => (
                <div key={method.id} className="space-y-4">
                  <label className="relative">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => {
                        setSelectedMethod(method.id);
                        if (method.id === 'Bank installment') {
                          setShowBankInstallment(true);
                        }
                      }}
                      disabled={!method.available}
                      className="peer sr-only"
                    />
                    <div className={clsx(
                      "flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                      method.available
                        ? "cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50"
                        : "opacity-50 cursor-not-allowed"
                    )}>
                      <method.icon className="w-8 h-8 text-blue-600" />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{method.title}</h3>
                        <p className="text-gray-600 text-sm">{method.description}</p>
                      </div>
                      {!method.available && method.id !== 'Cash on delivery' && (
                        <span className="text-red-500 text-sm">غير متاح</span>
                      )}
                    </div>
                  </label>

                  {selectedMethod === method.id && method.id !== 'Bank installment' && (
                    <motion.button
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting}
                      className={clsx(
                        "w-full px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2",
                        'bg-blue-600 text-white hover:bg-blue-700',
                        isSubmitting && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      {isSubmitting ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب'}
                    </motion.button>
                  )}
                </div>
              ))}
              
              {/* Loading Bar GIF */}
              <div className="flex justify-center mt-6">
                <img 
                  src="https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/sign/omar-technology/paymob.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvbWFyLXRlY2hub2xvZ3kvcGF5bW9iLnBuZyIsImlhdCI6MTc0NjMwNDAzOSwiZXhwIjo4MDUzNTA0MDM5fQ.BY0qwlHVnahxRSa81nRdTLyt6grgcN_eFyklBFHf7HI"
                  alt="Loading animation"
                  className="h-10 w-auto rounded-lg opacity-90"
                  style={{ objectFit: 'contain', imageRendering: 'auto' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}