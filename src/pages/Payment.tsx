import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, User, Phone, Clock, AlertCircle, ShoppingCart } from 'lucide-react';
import clsx from 'clsx';

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'onChange'
  });

  // Watch the fullName field to enable/disable phone
  const fullName = watch('fullName');

  const onSubmit = async (data: any) => {
    navigate('/delivery', {
      state: {
        ...location.state,
        customerInfo: {
          fullName: data.fullName,
          phone: data.phone,
          callTime: data.callTime
        }
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 sm:py-12">
      <div className="w-full max-w-[95%] sm:max-w-[90%] lg:max-w-5xl mx-auto px-4 relative">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="absolute -top-4 right-4 sm:-right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md text-gray-600 hover:text-gray-800 transition-all hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>رجوع</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-[1fr,2fr]"
        >
          {/* Header */}
          <div className="bg-gradient-to-l from-blue-600 to-blue-700 px-6 py-8 sm:py-10 lg:py-0 lg:flex lg:flex-col lg:justify-center text-center">
            <div className="bg-white/10 w-16 h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-3">البيانات الشخصية</h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100">يرجى إدخال بياناتك لإتمام الطلب</p>
          </div>

          <div className="lg:px-8">
            {/* Error Message */}
            <AnimatePresence>
              {formError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 sm:px-8 py-4 bg-red-50 border-r-4 border-red-500 flex items-center gap-2 text-red-600"
                >
                  <AlertCircle className="flex-shrink-0" />
                  <span>{formError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-8 space-y-6 sm:space-y-8">
              {/* Full Name */}
              <div className="space-y-3">
                <label className="block text-base lg:text-lg font-medium text-gray-700">
                  الاسم الثلاثي <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <input
                    type="text"
                    {...register('fullName', { 
                      required: 'يرجى إدخال الاسم الثلاثي',
                      minLength: { value: 6, message: 'يرجى إدخال الاسم الثلاثي كاملاً' }
                    })}
                    className={clsx(
                      'w-full pr-12 py-3 sm:py-4 lg:py-5 rounded-xl bg-gray-50 border-2 transition-all text-base sm:text-lg',
                      errors.fullName 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-300'
                    )}
                    placeholder="الاسم الثلاثي"
                  />
                </div>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm lg:text-base text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.fullName.message as string}
                  </motion.p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-3">
                <label className="block text-base lg:text-lg font-medium text-gray-700">
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'يرجى إدخال رقم الهاتف',
                      pattern: {
                        value: /^(010|011|012|015)\d{8}$/,
                        message: 'يرجى إدخال رقم هاتف صحيح'
                      },
                      validate: {
                        hasFullName: () => !!fullName || 'يرجى إدخال الاسم الثلاثي أولاً'
                      }
                    })}
                    disabled={!fullName}
                    className={clsx(
                      'w-full pr-12 py-3 sm:py-4 lg:py-5 rounded-xl bg-gray-50 border-2 transition-all text-base sm:text-lg',
                      errors.phone
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-300',
                      !fullName && 'opacity-50 cursor-not-allowed'
                    )}
                    placeholder="01000000000"
                    dir="rtl"
                  />
                </div>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm lg:text-base text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone.message as string}
                  </motion.p>
                )}
              </div>

              {/* Preferred Contact Time */}
              <div className="space-y-3">
                <label className="block text-base lg:text-lg font-medium text-gray-700">
                  وقت الاتصال المفضل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                  <select
                    {...register('callTime', { required: 'يرجى اختيار وقت الاتصال المفضل' })}
                    disabled={!fullName || !watch('phone')}
                    className={clsx(
                      'w-full pr-12 py-3 sm:py-4 lg:py-5 rounded-xl bg-gray-50 border-2 transition-all appearance-none text-base sm:text-lg',
                      errors.callTime
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-300',
                      (!fullName || !watch('phone')) && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <option value="">اختر وقت الاتصال</option>
                    <option value="morning">صباحاً (9 ص - 12 م)</option>
                    <option value="afternoon">ظهراً (12 م - 4 م)</option>
                    <option value="evening">مساءً (4 م - 9 م)</option>
                  </select>
                </div>
                {errors.callTime && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm lg:text-base text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.callTime.message as string}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={!watch('fullName') || !watch('phone') || !watch('callTime')}
                className={clsx(
                  "w-full px-8 py-3 sm:py-4 lg:py-5 bg-gradient-to-l text-white rounded-xl text-lg font-medium transition-all shadow-lg shadow-blue-500/20",
                  watch('fullName') && watch('phone') && watch('callTime')
                    ? "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "from-blue-400 to-blue-500 opacity-50 cursor-not-allowed"
                )}
              >
                متابعة الدفع
              </motion.button>

              {/* Loading Bar GIF */}
              <div className="flex justify-center mt-6">
                <img 
                  src="https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/paymob.png"
                  alt="Loading animation"
                  className="h-8 sm:h-10 w-auto rounded-lg opacity-90"
                  style={{ objectFit: 'contain', imageRendering: 'auto' }}
                />
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}