import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Wind } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { WindLoader } from '../components/WindLoader';
import { SEOHead } from '../components/SEOHead';
import { useProducts } from '../hooks/useProducts';

const PRODUCTS_PER_PAGE = 8;

const brandInfo = {
  'sharp': {
    name: 'Sharp',
    arabicName: 'شارب',
    title: 'تكييفات شارب',
    description: 'اكتشف مجموعة تكييفات شارب المتميزة بأحدث التقنيات وأفضل الأسعار',
    image: 'https://images.unsplash.com/photo-1631083215283-b1e563f8c5d5?auto=format&fit=crop&w=1200&q=80'
  },
  'carrier': {
    name: 'Carrier',
    arabicName: 'كاريير',
    title: 'تكييفات كاريير',
    description: 'تكييفات كاريير - الاختيار الأمثل للراحة والجودة العالية',
    image: 'https://images.unsplash.com/photo-1631083215283-b2e563f8c5d5?auto=format&fit=crop&w=1200&q=80'
  },
  'unionaire': {
    name: 'Unionaire',
    arabicName: 'يونيون اير',
    title: 'تكييفات يونيون اير',
    description: 'تكييفات يونيون اير - حلول تبريد متكاملة بأسعار تنافسية',
    image: 'https://images.unsplash.com/photo-1631083215283-b3e563f8c5d5?auto=format&fit=crop&w=1200&q=80'
  },
  'fresh': {
    name: 'Fresh',
    arabicName: 'فريش',
    title: 'تكييفات فريش',
    description: 'تكييفات فريش - جودة عالية وأداء متميز',
    image: 'https://images.unsplash.com/photo-1631083215283-b4e563f8c5d5?auto=format&fit=crop&w=1200&q=80'
  },
  'midea': {
    name: 'Midea',
    arabicName: 'ميديا',
    title: 'تكييفات ميديا',
    description: 'تكييفات ميديا - تكنولوجيا متطورة وكفاءة عالية',
    image: 'https://images.unsplash.com/photo-1631083215283-b5e563f8c5d5?auto=format&fit=crop&w=1200&q=80'
  },
  'tornado': {
    name: 'Tornado',
    arabicName: 'تورنيدو',
    title: 'تكييفات تورنيدو',
    description: 'تكييفات تورنيدو - أداء قوي وتصميم عصري',
    image: 'https://images.unsplash.com/photo-1631083215283-b6e563f8c5d5?auto=format&fit=crop&w=1200&q=80'
  },
  'haier': {
    name: 'Haier',
    arabicName: 'هايير',
    title: 'تكييفات هايير',
    description: 'تكييفات هايير - تكنولوجيا ذكية لراحة مثالية',
    image: 'https://images.unsplash.com/photo-1631083215283-b7e563f8c5d5?auto=format&fit=crop&w=1200&q=80'
  }
};

export function BrandProducts() {
  const { brand } = useParams<{ brand: keyof typeof brandInfo }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { products, loading, error, totalCount } = useProducts(
    currentPage,
    PRODUCTS_PER_PAGE,
    { brand: brandInfo[brand]?.name }
  );

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  if (!brand || !brandInfo[brand]) {
    navigate('/');
    return null;
  }

  if (loading) {
    return <WindLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">عذراً، حدث خطأ</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  const brandData = brandInfo[brand];
  const brandUrl = `https://www.airhouse.shop/brands/${brand}`;
  const brandKeywords = [
    `تكييف ${brandData.arabicName}`,
    `${brandData.name}`,
    'شراء تكييف',
    'اير هاوس',
    'تكييفات مصر',
    `عروض ${brandData.arabicName}`,
    `اسعار تكييف ${brandData.arabicName}`
  ].join(', ');

  return (
    <>
      <SEOHead
        title={`${brandData.title} | اير هاوس - أفضل الأسعار والعروض`}
        description={`${brandData.description}. تسوق الآن من مجموعة تكييفات ${brandData.arabicName} بأفضل الأسعار مع ضمان شامل وتوصيل مجاني من اير هاوس.`}
        keywords={brandKeywords}
        url={brandUrl}
      />
      
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16 px-6 rounded-2xl overflow-hidden"
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <button
              onClick={() => navigate('/')}
              className="mb-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white/90 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>العودة للرئيسية</span>
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-4"
            >
              <Wind className="w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-3xl sm:text-4xl font-bold">{brandData.title}</h1>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl text-blue-100 max-w-2xl"
            >
              {brandData.description}
            </motion.p>
          </div>

          <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `url(${brandData.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </motion.section>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              لا توجد منتجات متاحة حالياً
            </h2>
            <p className="text-gray-600">
              يرجى العودة لاحقاً لمشاهدة أحدث المنتجات
            </p>
          </div>
        )}
      </div>
    </>
  );
}