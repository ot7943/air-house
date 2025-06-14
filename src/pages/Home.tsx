import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Shield, Clock, Truck, Wrench, MapPin, Phone, ChevronDown, Star, Award, Users, TrendingUp, Zap, Snowflake, Sun, Wind as WindIcon, ThermometerSun, Settings, CheckCircle, ArrowRight, Calendar, Gift } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { WindLoader } from '../components/WindLoader';
import { Reviews } from '../components/Reviews';
import { SEOHead } from '../components/SEOHead';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 8;

const benefits = [
  {
    icon: Shield,
    title: 'ضمان شامل',
    description: 'جميع منتجاتنا تأتي مع ضمان شامل لراحة بالك'
  },
  {
    icon: Clock,
    title: 'خدمة 24/7',
    description: 'فريق دعم متاح على مدار الساعة لمساعدتك'
  },
  {
    icon: Truck,
    title: 'توصيل سريع',
    description: 'خدمة توصيل وتركيب احترافية في جميع أنحاء مصر'
  },
  {
    icon: Wrench,
    title: 'صيانة دورية',
    description: 'خدمات صيانة منتظمة لضمان أداء مثالي'
  }
];

const stats = [
  { icon: Users, number: '50,000+', label: 'عميل راضي' },
  { icon: Award, number: '15+', label: 'سنة خبرة' },
  { icon: CheckCircle, number: '99%', label: 'معدل الرضا' },
  { icon: Settings, number: '24/7', label: 'دعم فني' }
];

const seasonalTips = [
  {
    icon: Sun,
    season: 'الصيف',
    title: 'نصائح التبريد الصيفي',
    tips: [
      'اضبط درجة الحرارة على 24-26 درجة مئوية',
      'استخدم المراوح لتوزيع الهواء البارد',
      'أغلق النوافذ والستائر نهاراً',
      'نظف فلاتر التكييف شهرياً'
    ],
    color: 'from-orange-400 to-red-500'
  },
  {
    icon: Snowflake,
    season: 'الشتاء',
    title: 'نصائح التدفئة الشتوية',
    tips: [
      'اضبط درجة الحرارة على 20-22 درجة مئوية',
      'تأكد من عزل النوافذ والأبواب',
      'استخدم وضع التدفئة بكفاءة',
      'افحص التكييف قبل بداية الموسم'
    ],
    color: 'from-blue-400 to-cyan-500'
  }
];

const maintenanceTips = [
  {
    icon: Settings,
    title: 'الصيانة الدورية',
    description: 'نظف الفلاتر كل شهر واستبدلها كل 3 أشهر',
    frequency: 'شهرياً'
  },
  {
    icon: ThermometerSun,
    title: 'فحص الأداء',
    description: 'راقب كفاءة التبريد وتأكد من عدم وجود تسريبات',
    frequency: 'كل 3 أشهر'
  },
  {
    icon: Wrench,
    title: 'الصيانة المتخصصة',
    description: 'فحص شامل من قبل فني متخصص',
    frequency: 'سنوياً'
  }
];

const brands = [
  { name: 'Sharp', logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/SHARP.webp', description: 'تكنولوجيا يابانية متقدمة', link: '/brands/sharp' },
  { name: 'Carrier', logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/CARRIER.webp', description: 'رائدة في حلول التكييف', link: '/brands/carrier' },
  { name: 'Media', logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/MIDEA.webp', description: 'كفاءة عالية في الطاقة', link: '/brands/midea' },
  { name: 'Haier', logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/HAIER.webp', description: 'تصميم عصري وأداء قوي', link: '/brands/haier' },
  { name: 'Tornado', logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/TORNADO.webp', description: 'قوة تبريد استثنائية', link: '/brands/tornado' },
  { name: 'Fresh', logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/FRESH.webp', description: 'جودة مصرية موثوقة', link: '/brands/fresh' },
  { name: 'Unionaire', logo: 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/UNIONAIRE.webp', description: 'خبرة عريقة في التكييف', link: '/brands/unionaire' }
];

const articles = [
  {
    id: 1,
    title: 'كيفية اختيار التكييف المناسب لمنزلك',
    excerpt: 'دليل شامل لاختيار نوع وحجم التكييف المناسب حسب مساحة الغرفة واحتياجاتك',
    image: 'https://images.unsplash.com/photo-1631083215283-b1e563f8c5d5?auto=format&fit=crop&w=800&q=80',
    category: 'دليل الشراء',
    readTime: '5 دقائق',
    date: '2025-01-15'
  },
  {
    id: 2,
    title: 'أفضل درجة حرارة للتكييف في الصيف',
    excerpt: 'تعرف على الدرجة المثلى للتكييف لتوفير الطاقة والحصول على راحة مثالية',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    category: 'نصائح',
    readTime: '3 دقائق',
    date: '2025-01-12'
  },
  {
    id: 3,
    title: 'صيانة التكييف: دليل المبتدئين',
    excerpt: 'خطوات بسيطة للحفاظ على تكييفك وإطالة عمره الافتراضي',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    category: 'صيانة',
    readTime: '7 دقائق',
    date: '2025-01-10'
  }
];

const offers = [
  {
    title: 'عرض الشتاء الحار',
    description: 'خصم 25% على جميع تكييفات التدفئة',
    discount: '25%',
    validUntil: '31 يناير 2025',
    color: 'from-red-500 to-orange-500'
  },
  {
    title: 'تقسيط بدون فوائد',
    description: 'قسط مشترياتك على 24 شهر بدون فوائد',
    discount: '0%',
    validUntil: 'عرض دائم',
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'تركيب مجاني',
    description: 'تركيب وصيانة مجانية لمدة سنة كاملة',
    discount: 'مجاني',
    validUntil: '15 فبراير 2025',
    color: 'from-green-500 to-teal-500'
  }
];

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<'price' | 'name'>('price');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const { products, loading, error, totalCount } = useProducts(currentPage, PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  // Ensure this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (a.available !== b.available) {
      return a.available ? -1 : 1;
    }

    if (sortBy === 'price') {
      const priceA = a.discountedPrice || a.price;
      const priceB = b.discountedPrice || b.price;
      return sortOrder === 'desc' ? priceB - priceA : priceA - priceB;
    } else {
      return sortOrder === 'desc'
        ? b.name.localeCompare(a.name, 'ar')
        : a.name.localeCompare(b.name, 'ar');
    }
  });

  const toggleSort = (field: 'price' | 'name') => {
    if (sortBy === field) {
      setSortOrder(current => (current === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setShowSortMenu(false);
  };

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

  return (
    <>
      <SEOHead
        title="Air House | اير هاوس - أفضل شركة تكييفات في مصر"
        description="اكتشف أحدث العروض على التكييفات بجميع الأنواع والماركات العالمية. خدمة تركيب وصيانة احترافية، ضمان شامل، وأسعار تنافسية. تواصل معنا الآن!"
        keywords="تكييف مصر, اير هاوس, شراء تكييف, تكييف شارب, تكييف كاريير, تكييف ميديا, تكييف فريش, تكييف هايير, تكييف تورنيدو, عروض تكييف, تركيب تكييف, صيانة تكييف"
        url="https://www.airhouse.shop/"
        type="website"
        image="https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/Air%20Logo.webp"
        business={{
          name: "Air House Egypt",
          type: "LocalBusiness",
          telephone: ["+201027755778", "+201005626294"],
          email: "airhouse@gmail.com",
          address: {
            streetAddress: "25 شارع العشرين بجوار شركة الاتصالات فيصل",
            addressLocality: "الجيزة",
            addressRegion: "الجيزة",
            postalCode: "21634",
            addressCountry: "EG"
          },
          geo: {
            latitude: 30.01012715559585,
            longitude: 31.1799511878156
          },
          openingHours: ["Sa-Th 09:00-00:00"],
          priceRange: "$$",
          rating: {
            ratingValue: 4.8,
            reviewCount: 500,
            bestRating: 5,
            worstRating: 1
          },
          sameAs: ["https://www.facebook.com/share/1XtsCtVWrG/"],
          paymentAccepted: ["Cash", "Credit Card", "Bank Transfer", "Installments"],
          currenciesAccepted: "EGP",
          areaServed: "Egypt"
        }}
        breadcrumbs={[
          {
            name: "الرئيسية",
            item: "https://www.airhouse.shop/",
            position: 1
          }
        ]}
        faq={[
          {
            question: "ما هي أفضل أنواع التكييفات؟",
            answer: "نحن نقدم أفضل أنواع التكييفات من العلامات التجارية الرائدة مثل شارب، كاريير، ميديا، فريش، هايير، وتورنيدو."
          },
          {
            question: "هل تقدمون خدمة التركيب؟",
            answer: "نعم، نقدم خدمة التركيب المجانية مع ضمان شامل على التركيب والمنتج."
          },
          {
            question: "ما هي مناطق التوصيل؟",
            answer: "نقدم خدمة التوصيل لجميع محافظات مصر مع إمكانية التركيب في نفس اليوم."
          }
        ]}
        openGraph={{
          title: "Air House | اير هاوس - أفضل شركة تكييفات في مصر",
          description: "اكتشف أحدث العروض على التكييفات بجميع الأنواع والماركات العالمية",
          image: "https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/Air%20Logo.webp",
          imageAlt: "شعار شركة Air House لأنظمة التكييف",
          type: "website"
        }}
        twitter={{
          card: "summary_large_image",
          title: "Air House | اير هاوس - أفضل شركة تكييفات في مصر",
          description: "اكتشف أحدث العروض على التكييفات بجميع الأنواع والماركات العالمية",
          image: "https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/Air%20Logo.webp",
          imageAlt: "شعار شركة Air House لأنظمة التكييف"
        }}
      />
      
      <div className="space-y-8 sm:space-y-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-24 px-6 sm:px-8 rounded-2xl overflow-hidden mx-4 sm:mx-0"
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              مرحباً بكم في اير هاوس
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-xl mb-6 sm:mb-8 text-blue-100"
            >
              نحن شركة رائدة في مجال حلول التكييف المتكاملة، نقدم أفضل المنتجات من أشهر العلامات التجارية
              مع خدمة متميزة وأسعار تنافسية. خبرتنا تمتد لأكثر من 15 عاماً في السوق المصري.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="tel:01027755778"
                className="flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
              >
                <Phone size={20} />
                اتصل بنا
              </a>
              <a
                href="#location"
                className="flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
              >
                <MapPin size={20} />
                موقعنا
              </a>
            </motion.div>
          </div>
          <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&w=800&q=80)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
            role="presentation"
            aria-hidden="true"
          />
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-0"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Special Offers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">العروض الحصرية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${offer.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                </div>
                <p className="mb-4 text-white/90">{offer.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{offer.discount}</span>
                  <div className="text-right">
                    <div className="text-sm text-white/80">صالح حتى</div>
                    <div className="font-medium">{offer.validUntil}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">لماذا تختار اير هاوس؟</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <benefit.icon className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Brand Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">العلامات التجارية المتاحة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
                  className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-16 object-contain mb-3 filter grayscale group-hover:grayscale-0 transition-all"
                  />
                  <h3 className="font-semibold text-center text-sm mb-1">{brand.name}</h3>
                  <p className="text-xs text-gray-600 text-center">{brand.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Seasonal Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">نصائح موسمية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seasonalTips.map((tip, index) => (
              <motion.div
                key={tip.season}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`bg-gradient-to-br ${tip.color} text-white p-6 rounded-xl shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <tip.icon className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">{tip.title}</h3>
                    <p className="text-white/80">{tip.season}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {tip.tips.map((tipText, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tipText}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Maintenance Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">دليل الصيانة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maintenanceTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <tip.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{tip.title}</h3>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {tip.frequency}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Articles Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 sm:px-0"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">مقالات مفيدة</h2>
            <Link
              to="/articles"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              عرض المزيد
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                  >
                    اقرأ المزيد
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Products Section */}
        <motion.section className="px-4 sm:px-0">
          <div className="sticky top-0 z-20 bg-gray-50 -mx-4 px-4 py-4 sm:static sm:bg-transparent sm:mx-0 sm:px-0 sm:py-0">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">منتجاتنا</h2>
              {isClient && (
                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="sm:hidden w-full flex items-center justify-between gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border"
                  >
                    <span className="text-gray-700">ترتيب حسب: {sortBy === 'price' ? 'السعر' : 'الاسم'}</span>
                    <ChevronDown className={`transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`sm:hidden absolute top-full right-0 left-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden transition-all ${showSortMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <button
                      onClick={() => toggleSort('price')}
                      className={`w-full px-4 py-3 text-right ${sortBy === 'price' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                    >
                      ترتيب حسب السعر
                    </button>
                    <button
                      onClick={() => toggleSort('name')}
                      className={`w-full px-4 py-3 text-right ${sortBy === 'name' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                    >
                      ترتيب حسب الاسم
                    </button>
                  </div>
                  <div className="hidden sm:flex gap-4">
                    <button
                      onClick={() => toggleSort('price')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                        sortBy === 'price'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowUpDown size={16} />
                      ترتيب حسب السعر
                    </button>
                    <button
                      onClick={() => toggleSort('name')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                        sortBy === 'name'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowUpDown size={16} />
                      ترتيب حسب الاسم
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.map((product, index) => (
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
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </motion.section>

        {/* Reviews Section */}
        <Reviews />

        {/* Location Section */}
        <motion.section
          id="location"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mx-4 sm:mx-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">موقعنا</h2>
              <div className="space-y-4">
                <p className="flex items-start gap-3">
                  <MapPin className="text-blue-600 flex-shrink-0 mt-1" />
                  <span>25 شارع العشرين بجوار شركة الاتصالات فيصل</span>
                </p>
                <div className="flex items-start gap-3">
                  <Phone className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <a href="tel:01027755778" className="block hover:text-blue-600 transition-colors">01027755778</a>
                    <a href="tel:01005626294" className="block hover:text-blue-600 transition-colors">01005626294</a>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">ساعات العمل:</h3>
                  <p>السبت - الخميس: 9 صباحاً - 12 مساءً</p>
                  <p>الجمعة: مغلق</p>
                </div>
              </div>
            </div>
            <div className="h-[300px] sm:h-[400px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.931363328872!2d31.1799511878156!3d30.01012715559585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458468ee26fd1c5%3A0xe8c24c9db732d3dd!2sAir%20House!5e0!3m2!1sen!2seg!4v1742707763847!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}