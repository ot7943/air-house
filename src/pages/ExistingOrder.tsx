import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Phone } from 'lucide-react';

export function ExistingOrder() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center py-16"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-6"
        >
          <AlertCircle className="w-20 h-20 text-yellow-500" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          عميلنا العزيز
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          لديك طلب مسجل بالفعل قيد المراجعة والمعالجة. يرجى الانتظار حتى يتم الانتهاء من هذا الطلب قبل تقديم طلب جديد.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-gray-600 mb-4">
            لإلغاء الطلب الحالي، يرجى التواصل مع خدمة العملاء
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="tel:01027755778"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
            >
              <Phone size={18} />
              01027755778
            </a>
            <a
              href="tel:01005626294"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
            >
              <Phone size={18} />
              01005626294
            </a>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 hover:text-blue-800"
        >
          العودة للصفحة الرئيسية
          <ArrowRight className="mr-2" />
        </button>
      </div>
    </motion.div>
  );
}