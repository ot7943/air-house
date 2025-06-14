import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export function Contact() {
  const navigate = useNavigate();
  
  return (
    <>
      <SEOHead
        title="تواصل معنا | اير هاوس - خدمة عملاء متميزة"
        description="تواصل مع فريق اير هاوس المتخصص في التكييف. خدمة عملاء 24/7، استشارات مجانية، وخدمة ما بعد البيع المتميزة."
        keywords="تواصل معنا, خدمة عملاء, اير هاوس, استشارات تكييف, خدمة ما بعد البيع, صيانة تكييف"
        url="https://frozeonix.netlify.app/info/contact"
      />
      
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              تواصل معنا
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك
            </p>
          </motion.section>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">معلومات الاتصال</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">أرقام الهاتف</h3>
                      <div className="space-y-1">
                        <a href="tel:01027755778" className="block text-blue-600 hover:text-blue-800">
                          01027755778
                        </a>
                        <a href="tel:01005626294" className="block text-blue-600 hover:text-blue-800">
                          01005626294
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
                      <a href="mailto:airhouse@gmail.com" className="text-blue-600 hover:text-blue-800">
                        airhouse@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">العنوان</h3>
                      <p className="text-gray-600">
                        25 شارع العشرين بجوار شركة الاتصالات فيصل
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">ساعات العمل</h3>
                      <p className="text-gray-600">السبت - الخميس: 9 صباحاً - 12 مساءً</p>
                      <p className="text-gray-600">الجمعة: مغلق</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <span>تسوق الآن</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden h-[400px] lg:h-auto"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.931363328872!2d31.1799511878156!3d30.01012715559585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458468ee26fd1c5%3A0xe8c24c9db732d3dd!2sAir%20House!5e0!3m2!1sen!2seg!4v1742707763847!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}