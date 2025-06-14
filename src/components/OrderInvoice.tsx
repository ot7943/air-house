import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Calendar, CreditCard, Package, Tag, Receipt, Printer } from 'lucide-react';

interface OrderInvoiceProps {
  orderDetails: {
    customerInfo: {
      fullName: string;
      phone: string;
      callTime: string;
    };
    deliveryInfo: {
      deliveryType: string;
      address: {
        country: string;
        governorate: string;
        city: string;
        street: string;
        building: string;
        floor: string;
        landmark?: string;
      };
    };
    paymentMethod: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      discountedPrice?: number;
      quantity: number;
    }>;
    total: number;
    discountCode?: string;
    discountPercentage?: number;
    discountedTotal?: number;
  };
}

export function OrderInvoice({ orderDetails }: OrderInvoiceProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCallTimeText = (time: string) => {
    switch (time) {
      case 'morning':
        return 'الفترة الصباحية (9 ص - 12 م)';
      case 'afternoon':
        return 'فترة الظهيرة (12 م - 4 م)';
      case 'evening':
        return 'الفترة المسائية (4 م - 9 م)';
      default:
        return '';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="relative group print:shadow-none px-4 sm:px-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg z-10 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Printer className="w-5 h-5" />
            <span>طباعة الفاتورة</span>
          </button>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="print-content bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-3xl mx-auto print:p-0 print:shadow-none"
      >
        {/* Invoice Header */}
        <div className="text-center mb-4 print:mb-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 print:text-black" />
            <h2 className="text-lg sm:text-xl font-bold">فاتورة الطلب</h2>
          </div>
          <p className="text-gray-600 print:text-black text-xs sm:text-sm">
            {new Date().toLocaleDateString('ar-EG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 print:mb-2 print:text-sm">
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-1 text-xs sm:text-sm">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 print:text-black" />
              معلومات العميل
            </h3>
            <p className="text-sm"><strong>الاسم:</strong> {orderDetails.customerInfo.fullName}</p>
            <p className="text-sm"><strong>الهاتف:</strong> {orderDetails.customerInfo.phone}</p>
            <p className="text-sm">
              <strong>وقت التواصل:</strong>{' '}
              {getCallTimeText(orderDetails.customerInfo.callTime)}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-1 text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 print:text-black" />
              عنوان التوصيل
            </h3>
            <p className="text-sm"><strong>نوع التوصيل:</strong> {orderDetails.deliveryInfo.deliveryType === 'home' ? 'منزل' : 'عمل'}</p>
            {orderDetails.deliveryInfo.address && (
              <>
                <p className="text-sm">
                  {orderDetails.deliveryInfo.address?.street}،{' '}
                  مبنى {orderDetails.deliveryInfo.address?.building}،{' '}
                  الطابق {orderDetails.deliveryInfo.address?.floor}
                </p>
                <p className="text-sm">
                  {orderDetails.deliveryInfo.address?.city}،{' '}
                  {orderDetails.deliveryInfo.address?.governorate}
                </p>
                {orderDetails.deliveryInfo.address?.landmark && (
                  <p className="text-sm"><strong>علامة مميزة:</strong> {orderDetails.deliveryInfo.address.landmark}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-4 print:mb-2">
          <h3 className="font-semibold flex items-center gap-1 mb-2 text-xs sm:text-sm">
            <Package className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 print:text-black" />
            تفاصيل الطلب
          </h3>
          <div className="border print:border-black rounded overflow-hidden">
            <table className="w-full text-xs sm:text-sm print:text-[10px]">
              <thead className="bg-gray-50 print:bg-gray-200">
                <tr>
                  <th className="px-2 py-1.5 text-right border-b print:border-black">المنتج</th>
                  <th className="px-2 py-1.5 text-center border-b print:border-black">الكمية</th>
                  <th className="px-2 py-1.5 text-left border-b print:border-black">السعر</th>
                  <th className="px-2 py-1.5 text-left border-b print:border-black">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y print:divide-black">
                {orderDetails.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-2 py-1.5">{item.name}</td>
                    <td className="px-2 py-1.5 text-center">{item.quantity}</td>
                    <td className="px-2 py-1.5 text-left" style={{ direction: 'ltr' }}>
                      {(item.discountedPrice || item.price).toLocaleString('en-US')} EGP
                    </td>
                    <td className="px-2 py-1.5 text-left" style={{ direction: 'ltr' }}>
                      {((item.discountedPrice || item.price) * item.quantity).toLocaleString('en-US')} EGP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:text-sm">
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-1 text-xs sm:text-sm">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 print:text-black" />
              تفاصيل الدفع
            </h3>
            <p className="text-sm"><strong>طريقة الدفع:</strong> {orderDetails.paymentMethod}</p>
            {orderDetails.discountCode && (
              <div className="flex items-center gap-1 text-green-600 print:text-black text-sm">
                <Tag className="w-3 h-3" />
                <span>كود الخصم: {orderDetails.discountCode}</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50 print:bg-transparent p-2 rounded space-y-1 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span>المجموع:</span>
              <span style={{ direction: 'ltr' }}>{orderDetails.total.toLocaleString('en-US')} EGP</span>
            </div>
            
            {orderDetails.discountPercentage && (
              <div className="flex justify-between text-green-600 print:text-black">
                <span>الخصم ({orderDetails.discountPercentage}%):</span>
                <span style={{ direction: 'ltr' }}>
                  -{((orderDetails.total * orderDetails.discountPercentage) / 100).toLocaleString('en-US')} EGP
                </span>
              </div>
            )}
            
            <div className="flex justify-between font-bold pt-1 border-t print:border-black">
              <span>الإجمالي النهائي:</span>
              <span style={{ direction: 'ltr' }}>
                {(orderDetails.discountedTotal || orderDetails.total).toLocaleString('en-US')} EGP
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] sm:text-xs text-gray-500 print:text-black border-t print:border-black mt-4 pt-2">
          <p>شكراً لثقتكم في اير هاوس</p>
          <p>للاستفسارات: 01027755778 - 01005626294</p>
        </div>
      </motion.div>
    </div>
  );
}