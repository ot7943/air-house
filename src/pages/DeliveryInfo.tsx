import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, User, MapPin, Building, Home, Landmark, Flag } from 'lucide-react';
import clsx from 'clsx';

// Egyptian governorates data
const governorates = [
  { id: 'cairo', name: 'القاهرة' },
  { id: 'giza', name: 'الجيزة' },
  { id: 'alexandria', name: 'الإسكندرية' },
  { id: 'dakahlia', name: 'الدقهلية' },
  { id: 'red_sea', name: 'البحر الأحمر' },
  { id: 'beheira', name: 'البحيرة' },
  { id: 'fayoum', name: 'الفيوم' },
  { id: 'gharbiya', name: 'الغربية' },
  { id: 'ismailia', name: 'الإسماعيلية' },
  { id: 'menofia', name: 'المنوفية' },
  { id: 'minya', name: 'المنيا' },
  { id: 'qalyubia', name: 'القليوبية' },
  { id: 'new_valley', name: 'الوادي الجديد' },
  { id: 'suez', name: 'السويس' },
  { id: 'asyut', name: 'أسيوط' },
  { id: 'bani_suef', name: 'بني سويف' },
  { id: 'port_said', name: 'بورسعيد' },
  { id: 'damietta', name: 'دمياط' },
  { id: 'sharqia', name: 'الشرقية' },
  { id: 'south_sinai', name: 'جنوب سيناء' },
  { id: 'kafr_el_sheikh', name: 'كفر الشيخ' },
  { id: 'matruh', name: 'مطروح' },
  { id: 'qena', name: 'قنا' },
  { id: 'north_sinai', name: 'شمال سيناء' },
  { id: 'sohag', name: 'سوهاج' },
  { id: 'luxor', name: 'الأقصر' },
  { id: 'aswan', name: 'أسوان' },
];


export function DeliveryInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const selectedGovernorate = watch('governorate');
  const selectedDeliveryType = watch('deliveryType');
  const selectedCountry = watch('country');

  const getCities = (governorate: string) => {
    const citiesMap: { [key: string]: string[] } = {
      cairo: ['مدينة نصر', 'المعادي', 'مصر الجديدة', 'الزيتون', 'حلوان', 'التجمع الخامس', 'العباسية', 'شبرا', 'عين شمس', 'المرج'],
    giza: ['الدقي', 'المهندسين', 'الهرم', '6 أكتوبر', 'الشيخ زايد', 'العجوزة', 'إمبابة', 'البدرشين', 'أوسيم'],
    alexandria: ['سيدي جابر', 'المنتزه', 'العجمي', 'ستانلي', 'محرم بك', 'سموحة', 'المعمورة', 'العامرية'],
    dakahlia: ['المنصورة', 'ميت غمر', 'طلخا', 'دكرنس', 'شربين', 'السنبلاوين', 'بلقاس'],
    red_sea: ['الغردقة', 'رأس غارب', 'سفاجا', 'القصير', 'مرسى علم', 'الشلاتين', 'حلايب'],
    beheira: ['دمنهور', 'كفر الدوار', 'إيتاي البارود', 'أبو حمص', 'الدلنجات', 'المحمودية', 'رشيد', 'حوش عيسى'],
    fayoum: ['الفيوم', 'سنورس', 'إطسا', 'طامية', 'يوسف الصديق'],
    gharbiya: ['طنطا', 'المحلة الكبرى', 'كفر الزيات', 'زفتى', 'سمنود', 'بسيون', 'قطور'],
    ismailia: ['الإسماعيلية', 'فايد', 'القنطرة شرق', 'القنطرة غرب', 'التل الكبير', 'أبو صوير'],
    menofia: ['شبين الكوم', 'منوف', 'السادات', 'أشمون', 'الباجور', 'تلا', 'بركة السبع'],
    minya: ['المنيا', 'ملوي', 'أبو قرقاص', 'بني مزار', 'مطاي', 'سمالوط', 'العدوة'],
    qalyubia: ['بنها', 'شبرا الخيمة', 'قليوب', 'طوخ', 'القناطر الخيرية', 'الخانكة', 'كفر شكر'],
    new_valley: ['الخارجة', 'الداخلة', 'الفرافرة', 'باريس', 'بلاط'],
    suez: ['السويس', 'عتاقة', 'الجناين'],
    asyut: ['أسيوط', 'ديروط', 'منفلوط', 'أبو تيج', 'البداري', 'ساحل سليم', 'الغنايم'],
    bani_suef: ['بني سويف', 'الواسطى', 'ناصر', 'إهناسيا', 'ببا', 'الفشن', 'سمسطا'],
    port_said: ['بورسعيد', 'الزهور', 'الضواحي', 'العرب', 'المناخ'],
    damietta: ['دمياط', 'رأس البر', 'فارسكور', 'كفر سعد', 'الزرقا'],
    sharqia: ['الزقازيق', 'العاشر من رمضان', 'بلبيس', 'منيا القمح', 'أبو كبير', 'فاقوس', 'ههيا'],
    south_sinai: ['الطور', 'شرم الشيخ', 'دهب', 'نويبع', 'سانت كاترين', 'أبو رديس', 'رأس سدر'],
    kafr_el_sheikh: ['كفر الشيخ', 'دسوق', 'سيدي سالم', 'فوه', 'قلين', 'مطوبس'],
    matruh: ['مرسى مطروح', 'الحمام', 'الضبعة', 'سيدي براني', 'السلوم', 'سيوة'],
    qena: ['قنا', 'نجع حمادي', 'دشنا', 'قفط', 'قوص', 'نقادة', 'أبوتشت'],
    north_sinai: ['العريش', 'رفح', 'الشيخ زويد', 'بئر العبد', 'الحسنة'],
    sohag: ['سوهاج', 'طما', 'طهطا', 'جرجا', 'المراغة', 'أخميم', 'البلينا'],
    luxor: ['الأقصر', 'إسنا', 'أرمنت', 'البياضية', 'الزينية'],
    aswan: ['أسوان', 'كوم أمبو', 'إدفو', 'دراو', 'نصر النوبة', 'أبو سمبل'],
    };
    return citiesMap[governorate] || [];
  };

  const onSubmit = (data: any) => {
    navigate('/payment-completion', {
      state: {
        ...location.state,
        deliveryInfo: {
          deliveryType: data.deliveryType,
          country: data.country,
          governorate: data.governorate,
          city: data.city,
          street: data.street,
          buildingNumber: data.buildingNumber,
          floor: data.floor,
          landmark: data.landmark
        }
      }
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md text-gray-600 hover:text-gray-800 transition-all hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>رجوع</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-[1fr,3fr]"
        >
          {/* Header */}
          <div className="bg-gradient-to-l from-blue-600 to-blue-700 px-8 py-12 lg:py-0 lg:flex lg:flex-col lg:justify-center text-center">
            <div className="bg-white/10 w-20 h-20 lg:w-28 lg:h-28 rounded-full flex items-center justify-center mx-auto mb-8">
              <MapPin className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">معلومات التوصيل</h1>
            <p className="text-blue-100 text-lg lg:text-xl">يرجى إدخال عنوان التوصيل</p>
          </div>

          {/* Form */}
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Delivery Type */}
              <div className="space-y-4">
                <label className="block text-xl font-medium text-gray-700">
                  نوع التوصيل <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-6">
                  <label className="relative">
                    <input
                      type="radio"
                      {...register('deliveryType', { required: 'يرجى اختيار نوع التوصيل' })}
                      value="home"
                      className="peer sr-only"
                    />
                    <div className="flex items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50">
                      <Home className="w-6 h-6 text-blue-600" />
                      <span className="text-lg">توصيل للمنزل</span>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      {...register('deliveryType', { required: 'يرجى اختيار نوع التوصيل' })}
                      value="work"
                      className="peer sr-only"
                    />
                    <div className="flex items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50">
                      <Building className="w-6 h-6 text-blue-600" />
                      <span className="text-lg">توصيل للعمل</span>
                    </div>
                  </label>
                </div>
                {errors.deliveryType && (
                  <p className="text-sm text-red-600">{errors.deliveryType.message as string}</p>
                )}
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Country */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    الدولة <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      {...register('country', { required: 'يرجى اختيار الدولة' })}
                      disabled={!selectedDeliveryType}
                      className={clsx(
                        'w-full p-4 rounded-xl bg-gray-50 border-2 transition-all appearance-none text-lg',
                        errors.country
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-200 focus:border-blue-500',
                        !selectedDeliveryType && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <option value="">اختر الدولة</option>
                      <option value="EG">مصر</option>
                    </select>
                    <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
                  </div>
                  {errors.country && (
                    <p className="text-sm text-red-600">{errors.country.message as string}</p>
                  )}
                </div>

                {/* Governorate */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    المحافظة <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      {...register('governorate', { required: 'يرجى اختيار المحافظة' })}
                      disabled={!selectedDeliveryType || !selectedCountry}
                      className={clsx(
                        'w-full p-4 rounded-xl bg-gray-50 border-2 transition-all appearance-none text-lg',
                        errors.governorate
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-200 focus:border-blue-500',
                        (!selectedDeliveryType || !selectedCountry) && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <option value="">اختر المحافظة</option>
                      {governorates.map(gov => (
                        <option key={gov.id} value={gov.id}>{gov.name}</option>
                      ))}
                    </select>
                    <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
                  </div>
                  {errors.governorate && (
                    <p className="text-sm text-red-600">{errors.governorate.message as string}</p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    المدينة <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      {...register('city', { required: 'يرجى اختيار المدينة' })}
                      disabled={!selectedDeliveryType || !selectedCountry || !selectedGovernorate}
                      className={clsx(
                        'w-full p-4 rounded-xl bg-gray-50 border-2 transition-all appearance-none text-lg',
                        errors.city
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-200 focus:border-blue-500',
                        (!selectedDeliveryType || !selectedCountry || !selectedGovernorate) && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <option value="">اختر المدينة</option>
                      {selectedGovernorate && getCities(selectedGovernorate).map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
                  </div>
                  {errors.city && (
                    <p className="text-sm text-red-600">{errors.city.message as string}</p>
                  )}
                </div>

                {/* Street */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    الشارع <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('street', { required: 'يرجى إدخال اسم الشارع' })}
                    disabled={!selectedDeliveryType}
                    className={clsx(
                      'w-full p-4 rounded-xl bg-gray-50 border-2 transition-all text-lg',
                      errors.street
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500',
                      !selectedDeliveryType && 'opacity-50 cursor-not-allowed'
                    )}
                    placeholder="اسم الشارع"
                  />
                  {errors.street && (
                    <p className="text-sm text-red-600">{errors.street.message as string}</p>
                  )}
                </div>

                {/* Building Number */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    رقم المبنى/الشقة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('buildingNumber', { required: 'يرجى إدخال رقم المبنى/الشقة' })}
                    disabled={!selectedDeliveryType}
                    className={clsx(
                      'w-full p-4 rounded-xl bg-gray-50 border-2 transition-all text-lg',
                      errors.buildingNumber
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500',
                      !selectedDeliveryType && 'opacity-50 cursor-not-allowed'
                    )}
                    placeholder="رقم المبنى/الشقة"
                  />
                  {errors.buildingNumber && (
                    <p className="text-sm text-red-600">{errors.buildingNumber.message as string}</p>
                  )}
                </div>

                {/* Floor */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    الطابق <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('floor', { required: 'يرجى إدخال رقم الطابق' })}
                    disabled={!selectedDeliveryType}
                    className={clsx(
                      'w-full p-4 rounded-xl bg-gray-50 border-2 transition-all text-lg',
                      errors.floor
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500',
                      !selectedDeliveryType && 'opacity-50 cursor-not-allowed'
                    )}
                    placeholder="رقم الطابق"
                  />
                  {errors.floor && (
                    <p className="text-sm text-red-600">{errors.floor.message as string}</p>
                  )}
                </div>
              </div>

              {/* Landmark - Full width */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                  علامة مميزة
                </label>
                <input
                  type="text"
                  {...register('landmark')}
                  disabled={!selectedDeliveryType}
                  className={clsx(
                    'w-full p-4 rounded-xl bg-gray-50 border-2 transition-all text-lg',
                    'border-gray-200 focus:border-blue-500',
                    !selectedDeliveryType && 'opacity-50 cursor-not-allowed'
                  )}
                  placeholder="علامة مميزة (اختياري)"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={!selectedDeliveryType}
                className={clsx(
                  'w-full py-6 bg-gradient-to-l text-white rounded-xl text-xl font-medium transition-all shadow-lg shadow-blue-500/20',
                  selectedDeliveryType
                    ? 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    : 'from-blue-400 to-blue-500 opacity-50 cursor-not-allowed'
                )}
              >
                متابعة الدفع
              </motion.button>

              {/* Loading Bar GIF */}
              <div className="flex justify-center mt-8">
                <img 
                  src="https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/sign/omar-technology/paymob.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJvbWFyLXRlY2hub2xvZ3kvcGF5bW9iLnBuZyIsImlhdCI6MTc0NjMwNDAzOSwiZXhwIjo4MDUzNTA0MDM5fQ.BY0qwlHVnahxRSa81nRdTLyt6grgcN_eFyklBFHf7HI"
                  alt="Loading animation"
                  className="h-12 w-auto rounded-lg opacity-90"
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