import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowLeft, Tag, Minus, Plus, Shield, Clock, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

export function Checkout() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;

    setIsApplyingDiscount(true);
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('discount_codes')
        .select('discount_percentage, expiry_date, max_uses, current_uses')
        .eq('code', discountCode.trim())
        .eq('active', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast.error('كود الخصم غير صالح');
        setDiscountPercentage(0);
        return;
      }

      if (new Date(data.expiry_date) <= new Date(now)) {
        toast.error('كود الخصم منتهي الصلاحية');
        setDiscountPercentage(0);
        return;
      }

      if (data.max_uses && data.current_uses >= data.max_uses) {
        toast.error('تم استنفاد الحد الأقصى لاستخدام كود الخصم');
        setDiscountPercentage(0);
        return;
      }

      setDiscountPercentage(data.discount_percentage);
      toast.success('تم تطبيق كود الخصم بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تطبيق كود الخصم');
      setDiscountPercentage(0);
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  const handleProceedToPayment = () => {
    navigate('/payment', {
      state: {
        discountCode: discountCode || null,
        discountPercentage: discountPercentage || null
      }
    });
  };

  const subtotal = total;
  const discountAmount = (subtotal * discountPercentage) / 100;
  const finalTotal = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">سلة المشتريات فارغة</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="ml-2" />
          مواصلة التسوق
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
      {/* Mobile Header */}
      <div className="sm:hidden flex items-center justify-between mb-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">سلة المشتريات</h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Desktop Header */}
      <h1 className="hidden sm:block text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        سلة المشتريات
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y">
              {items.map(item => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6"
                >
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Shield size={14} className="text-green-600" />
                          <span>{item.warranty}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Tag size={14} className="text-blue-600" />
                          <span style={{ direction: 'ltr' }}>
                            {item.discountedPrice ? (
                              <>
                                <span className="text-blue-600">
                                  {item.discountedPrice.toLocaleString('en-US')} EGP
                                </span>
                                <span className="text-gray-400 line-through mr-2">
                                  {item.price.toLocaleString('en-US')} EGP
                                </span>
                              </>
                            ) : (
                              <span className="text-blue-600">
                                {item.price.toLocaleString('en-US')} EGP
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex sm:items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Tag size={16} className="text-blue-600" />
                          <span style={{ direction: 'ltr' }}>
                            {item.discountedPrice ? (
                              <>
                                <span className="line-through">
                                  {item.price.toLocaleString('en-US')} EGP
                                </span>
                                <span className="text-blue-600 mr-2">
                                  {item.discountedPrice.toLocaleString('en-US')} EGP
                                </span>
                              </>
                            ) : (
                              <span>{item.price.toLocaleString('en-US')} EGP</span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield size={16} className="text-green-600" />
                          <span>{item.warranty}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">ملخص الطلب</h2>
            
            {/* Discount Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كود الخصم
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-0 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="  أدخل كود الخصم"
                />
                <button
                  onClick={handleApplyDiscount}
                  disabled={isApplyingDiscount || !discountCode.trim()}
                  className="w-20 px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isApplyingDiscount ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    'تطبيق'
                  )}
                </button>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">المجموع الفرعي:</span>
                <span className="font-medium" style={{ direction: 'ltr' }}>
                  {subtotal.toLocaleString('en-US')} EGP
                </span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>الخصم ({discountPercentage}%):</span>
                  <span className="font-medium" style={{ direction: 'ltr' }}>
                    -{discountAmount.toLocaleString('en-US')} EGP
                  </span>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">الإجمالي:</span>
                  <span className="text-lg font-bold" style={{ direction: 'ltr' }}>
                    {finalTotal.toLocaleString('en-US')} EGP
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Fixed Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 sm:hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">الإجمالي:</span>
                <span className="text-xl font-bold text-blue-600" style={{ direction: 'ltr' }}>
                  {finalTotal.toLocaleString('en-US')} EGP
                </span>
              </div>
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 text-white rounded-full py-3 text-lg font-medium hover:bg-blue-700"
              >
                إتمام الشراء
              </button>
            </div>

            {/* Desktop Checkout Button */}
            <button
              onClick={handleProceedToPayment}
              className="hidden sm:block w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              إتمام الشراء
            </button>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} className="text-green-600" />
                <span>ضمان شامل على جميع المنتجات</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} className="text-blue-600" />
                <span>توصيل سريع خلال 24 ساعة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add bottom padding on mobile to account for fixed bottom bar */}
      <div className="h-32 sm:h-0" />
    </div>
  );
}