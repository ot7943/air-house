import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight, Search, Filter, Tag, TrendingUp, BookOpen, Lightbulb, Settings, Zap, Shield, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

const categories = [
  { id: 'all', name: 'جميع المقالات', icon: BookOpen },
  { id: 'buying-guide', name: 'دليل الشراء', icon: TrendingUp },
  { id: 'tips', name: 'نصائح', icon: Lightbulb },
  { id: 'maintenance', name: 'صيانة', icon: Settings },
  { id: 'energy', name: 'كفاءة الطاقة', icon: Zap },
  { id: 'troubleshooting', name: 'حل المشاكل', icon: Shield }
];

const articles = [
  {
    id: 1,
    title: 'كيفية اختيار التكييف المناسب لمنزلك',
    excerpt: 'دليل شامل لاختيار نوع وحجم التكييف المناسب حسب مساحة الغرفة واحتياجاتك. تعرف على العوامل المهمة التي يجب مراعاتها عند الشراء.',
    image: 'https://images.unsplash.com/photo-1631083215283-b1e563f8c5d5?auto=format&fit=crop&w=800&q=80',
    category: 'buying-guide',
    categoryName: 'دليل الشراء',
    readTime: '8 دقائق',
    date: '2025-01-15',
    featured: true,
    tags: ['شراء', 'اختيار', 'مساحة', 'حجم']
  },
  {
    id: 2,
    title: 'أفضل درجة حرارة للتكييف في الصيف والشتاء',
    excerpt: 'تعرف على الدرجة المثلى للتكييف لتوفير الطاقة والحصول على راحة مثالية. نصائح عملية لضبط درجة الحرارة حسب الموسم.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    category: 'tips',
    categoryName: 'نصائح',
    readTime: '5 دقائق',
    date: '2025-01-12',
    featured: false,
    tags: ['درجة حرارة', 'توفير طاقة', 'راحة']
  },
  {
    id: 3,
    title: 'صيانة التكييف: دليل المبتدئين الشامل',
    excerpt: 'خطوات بسيطة للحفاظ على تكييفك وإطالة عمره الافتراضي. تعلم كيفية تنظيف الفلاتر وفحص الوحدة بنفسك.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    category: 'maintenance',
    categoryName: 'صيانة',
    readTime: '10 دقائق',
    date: '2025-01-10',
    featured: true,
    tags: ['صيانة', 'تنظيف', 'فلاتر', 'عمر افتراضي']
  },
  {
    id: 4,
    title: 'كيفية توفير فاتورة الكهرباء مع التكييف',
    excerpt: 'استراتيجيات ذكية لتقليل استهلاك الطاقة دون التضحية بالراحة. تعرف على أحدث تقنيات التوفير في الطاقة.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    category: 'energy',
    categoryName: 'كفاءة الطاقة',
    readTime: '7 دقائق',
    date: '2025-01-08',
    featured: false,
    tags: ['توفير', 'كهرباء', 'طاقة', 'فاتورة']
  },
  {
    id: 5,
    title: 'مشاكل التكييف الشائعة وحلولها',
    excerpt: 'تشخيص وحل أكثر مشاكل التكييف شيوعاً بنفسك. متى تحتاج لاستدعاء فني متخصص ومتى يمكنك الإصلاح بنفسك.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
    category: 'troubleshooting',
    categoryName: 'حل المشاكل',
    readTime: '12 دقائق',
    date: '2025-01-05',
    featured: false,
    tags: ['مشاكل', 'حلول', 'تشخيص', 'إصلاح']
  },
  {
    id: 6,
    title: 'أنواع التكييفات ومميزات كل نوع',
    excerpt: 'مقارنة شاملة بين أنواع التكييفات المختلفة: سبليت، شباك، مركزي، محمول. اختر النوع الأنسب لاحتياجاتك.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    category: 'buying-guide',
    categoryName: 'دليل الشراء',
    readTime: '9 دقائق',
    date: '2025-01-03',
    featured: true,
    tags: ['أنواع', 'سبليت', 'شباك', 'مقارنة']
  },
  {
    id: 7,
    title: 'تركيب التكييف: ما تحتاج لمعرفته',
    excerpt: 'دليل شامل لعملية تركيب التكييف. الأدوات المطلوبة، الخطوات الأساسية، ونصائح السلامة المهمة.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    category: 'tips',
    categoryName: 'نصائح',
    readTime: '6 دقائق',
    date: '2025-01-01',
    featured: false,
    tags: ['تركيب', 'أدوات', 'سلامة', 'خطوات']
  },
  {
    id: 8,
    title: 'التكييف الذكي: مستقبل التبريد',
    excerpt: 'تعرف على أحدث تقنيات التكييف الذكي وكيف يمكن للذكاء الاصطناعي تحسين كفاءة التبريد وتوفير الطاقة.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    category: 'energy',
    categoryName: 'كفاءة الطاقة',
    readTime: '8 دقائق',
    date: '2024-12-28',
    featured: false,
    tags: ['ذكي', 'تقنية', 'ذكاء اصطناعي', 'مستقبل']
  }
];

export function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <>
      <SEOHead
        title="مقالات ونصائح التكييف | اير هاوس - دليلك الشامل للتكييف"
        description="اكتشف أحدث النصائح والإرشادات لاختيار وصيانة واستخدام أجهزة التكييف بكفاءة. مقالات متخصصة من خبراء اير هاوس."
        keywords="مقالات تكييف, نصائح تكييف, صيانة تكييف, دليل شراء تكييف, كفاءة الطاقة, توفير الكهرباء, أنواع التكييفات"
        url="https://frozeonix.netlify.app/articles"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            مقالات ونصائح التكييف
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث النصائح والإرشادات لاختيار وصيانة واستخدام أجهزة التكييف بكفاءة
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث في المقالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Articles */}
        {selectedCategory === 'all' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              المقالات المميزة
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        مميز
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {article.categoryName}
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
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/articles/${article.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      اقرأ المقال كاملاً
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Articles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === 'all' ? 'جميع المقالات' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="text-gray-500 text-lg font-normal mr-2">
              ({filteredArticles.length} مقال)
            </span>
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد مقالات</h3>
              <p className="text-gray-500">جرب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {article.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          مميز
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {article.categoryName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/articles/${article.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 text-sm group-hover:gap-3 transition-all"
                    >
                      اقرأ المزيد
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </>
  );
}