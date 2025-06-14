import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const brands = [
  { 
    name: 'Sharp', 
    logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/SHARP.webp',
    description: 'تكنولوجيا يابانية متقدمة',
    link: '/brands/sharp'
  },
  { 
    name: 'Carrier', 
    logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/CARRIER.webp',
    description: 'رائدة في حلول التكييف',
    link: '/brands/carrier'
  },
  { 
    name: 'Media', 
    logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/MIDEA.webp',
    description: 'كفاءة عالية في الطاقة',
    link: '/brands/midea'
  },
  { 
    name: 'Haier', 
    logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/HAIER.webp',
    description: 'تصميم عصري وأداء قوي',
    link: '/brands/haier'
  },
  { 
    name: 'Tornado', 
    logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/TORNADO.webp',
    description: 'قوة تبريد استثنائية',
    link: '/brands/tornado'
  },
  { 
    name: 'Fresh', 
    logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/FRESH.webp',
    description: 'جودة مصرية موثوقة',
    link: '/brands/fresh'
  },
  { 
    name: 'Unionaire', 
    logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/UNIONAIRE.webp',
    description: 'خبرة عريقة في التكييف',
    link: '/brands/unionaire'
  },
];

export function BrandSlider() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">العلامات التجارية المعتمدة</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          نحن وكلاء معتمدون لأفضل العلامات التجارية العالمية في مجال التكييف، مما يضمن لك الحصول على منتجات أصلية بضمان شامل
        </p>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {brands.map((brand, index) => (
            <Link
              key={brand.name}
              to={brand.link}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:bg-blue-50"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} - ${brand.description}`}
                  className="w-full h-16 object-contain mb-3 filter grayscale group-hover:grayscale-0 transition-all"
                  loading="lazy"
                />
                <h3 className="font-semibold text-center text-sm mb-1 group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-gray-600 text-center group-hover:text-blue-500 transition-colors">
                  {brand.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            جميع منتجاتنا أصلية ومعتمدة من الوكلاء الرسميين مع ضمان شامل وخدمة ما بعد البيع
          </p>
        </div>
      </div>
    </div>
  );
}