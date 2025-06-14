import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, Share2, BookOpen, ThumbsUp, MessageCircle, Eye, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const articles = {
  1: {
    title: 'كيفية اختيار التكييف المناسب لمنزلك',
    content: `
      <h2>مقدمة</h2>
      <p>اختيار التكييف المناسب لمنزلك قرار مهم يؤثر على راحتك وفاتورة الكهرباء لسنوات قادمة. في هذا الدليل الشامل، سنساعدك على اتخاذ القرار الصحيح.</p>

      <h2>العوامل الأساسية في الاختيار</h2>
      
      <h3>1. حساب المساحة المطلوب تبريدها</h3>
      <p>أول خطوة في اختيار التكييف هي حساب مساحة الغرفة بدقة. القاعدة العامة هي:</p>
      <ul>
        <li>غرفة 12-16 متر مربع: تكييف 1.5 حصان</li>
        <li>غرفة 16-20 متر مربع: تكييف 2.25 حصان</li>
        <li>غرفة 20-30 متر مربع: تكييف 3 حصان</li>
      </ul>

      <h3>2. نوع التكييف</h3>
      <p>هناك عدة أنواع من التكييفات، كل منها له مميزاته:</p>
      
      <h4>التكييف السبليت</h4>
      <p>الأكثر شيوعاً ومناسب للغرف الفردية. يتميز بالهدوء وسهولة التحكم.</p>
      
      <h4>التكييف الشباك</h4>
      <p>اقتصادي ومناسب للمساحات الصغيرة، لكنه أكثر ضوضاء.</p>
      
      <h4>التكييف المركزي</h4>
      <p>مثالي للمنازل الكبيرة والمكاتب، يوفر تبريد موحد لكامل المبنى.</p>

      <h3>3. كفاءة الطاقة</h3>
      <p>ابحث عن التكييفات ذات تصنيف الطاقة العالي (A++ أو A+++). هذا سيوفر عليك الكثير في فاتورة الكهرباء على المدى الطويل.</p>

      <h2>نصائح إضافية</h2>
      <ul>
        <li>تأكد من وجود ضمان شامل</li>
        <li>اختر علامة تجارية موثوقة</li>
        <li>فكر في التكييف الانفرتر لتوفير أكبر في الطاقة</li>
        <li>تأكد من توفر قطع الغيار وخدمة الصيانة</li>
      </ul>

      <h2>الخلاصة</h2>
      <p>اختيار التكييف المناسب يتطلب دراسة عدة عوامل. خذ وقتك في البحث والمقارنة، ولا تتردد في استشارة الخبراء. استثمارك في تكييف جيد سيضمن راحتك لسنوات قادمة.</p>
    `,
    image: 'https://images.unsplash.com/photo-1631083215283-b1e563f8c5d5?auto=format&fit=crop&w=1200&q=80',
    category: 'دليل الشراء',
    readTime: '8 دقائق',
    date: '2025-01-15',
    tags: ['شراء', 'اختيار', 'مساحة', 'حجم'],
    views: 1250,
    likes: 89,
    comments: 23
  },
  2: {
    title: 'أفضل درجة حرارة للتكييف في الصيف والشتاء',
    content: `
      <h2>الدرجة المثلى للتكييف</h2>
      <p>ضبط درجة حرارة التكييف بشكل صحيح لا يؤثر فقط على راحتك، بل أيضاً على فاتورة الكهرباء وصحتك العامة.</p>

      <h2>درجة الحرارة في الصيف</h2>
      <p>الدرجة المثلى للتكييف في الصيف هي <strong>24-26 درجة مئوية</strong>. هذه الدرجة توفر التوازن المثالي بين الراحة وتوفير الطاقة.</p>

      <h3>لماذا هذه الدرجة؟</h3>
      <ul>
        <li>توفر راحة مثالية للجسم</li>
        <li>تقلل استهلاك الكهرباء بنسبة تصل إلى 30%</li>
        <li>تمنع الصدمة الحرارية عند الخروج</li>
        <li>تحافظ على رطوبة مناسبة</li>
      </ul>

      <h2>درجة الحرارة في الشتاء</h2>
      <p>في فصل الشتاء، الدرجة المثلى للتدفئة هي <strong>20-22 درجة مئوية</strong>.</p>

      <h2>نصائح لتوفير الطاقة</h2>
      <ul>
        <li>كل درجة أقل في الصيف توفر 6-8% من الكهرباء</li>
        <li>استخدم المراوح لتوزيع الهواء البارد</li>
        <li>أغلق النوافذ والستائر نهاراً</li>
        <li>استخدم وضع النوم ليلاً</li>
      </ul>

      <h2>تأثير درجة الحرارة على الصحة</h2>
      <p>درجة الحرارة المناسبة تؤثر على:</p>
      <ul>
        <li>جودة النوم</li>
        <li>التركيز والإنتاجية</li>
        <li>الجهاز التنفسي</li>
        <li>مستوى الرطوبة في الجسم</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    category: 'نصائح',
    readTime: '5 دقائق',
    date: '2025-01-12',
    tags: ['درجة حرارة', 'توفير طاقة', 'راحة'],
    views: 890,
    likes: 67,
    comments: 15
  },
  3: {
    title: 'صيانة التكييف: دليل المبتدئين الشامل',
    content: `
      <h2>أهمية الصيانة الدورية</h2>
      <p>الصيانة الدورية للتكييف ليست مجرد توصية، بل ضرورة للحفاظ على كفاءة الجهاز وإطالة عمره الافتراضي.</p>

      <h2>الصيانة الشهرية</h2>
      
      <h3>تنظيف الفلاتر</h3>
      <p>أهم خطوة في صيانة التكييف:</p>
      <ol>
        <li>أطفئ التكييف واقطع الكهرباء</li>
        <li>اخرج الفلاتر بحذر</li>
        <li>اغسلها بالماء والصابون</li>
        <li>اتركها تجف تماماً قبل إعادة تركيبها</li>
      </ol>

      <h3>تنظيف الوحدة الخارجية</h3>
      <ul>
        <li>أزل الأوراق والأتربة من حول الوحدة</li>
        <li>نظف الزعانف بفرشاة ناعمة</li>
        <li>تأكد من عدم وجود عوائق حول الوحدة</li>
      </ul>

      <h2>الصيانة الفصلية</h2>
      
      <h3>فحص مستوى الفريون</h3>
      <p>علامات نقص الفريون:</p>
      <ul>
        <li>ضعف في التبريد</li>
        <li>تكون جليد على الأنابيب</li>
        <li>ارتفاع فاتورة الكهرباء</li>
      </ul>

      <h3>فحص التوصيلات الكهربائية</h3>
      <p>تأكد من سلامة جميع التوصيلات وعدم وجود تآكل أو تلف.</p>

      <h2>الصيانة السنوية</h2>
      <p>يُنصح بعمل صيانة شاملة سنوياً بواسطة فني متخصص تشمل:</p>
      <ul>
        <li>فحص شامل للنظام</li>
        <li>تنظيف عميق للوحدتين</li>
        <li>فحص مستوى الفريون وإعادة تعبئته</li>
        <li>فحص الضاغط والمحرك</li>
        <li>معايرة الثرموستات</li>
      </ul>

      <h2>علامات تستدعي الصيانة الفورية</h2>
      <ul>
        <li>أصوات غريبة من الوحدة</li>
        <li>تسرب مياه داخل الغرفة</li>
        <li>رائحة كريهة من التكييف</li>
        <li>عدم تبريد أو تدفئة كافية</li>
        <li>ارتفاع مفاجئ في فاتورة الكهرباء</li>
      </ul>

      <h2>نصائح للحفاظ على التكييف</h2>
      <ul>
        <li>لا تشغل التكييف على درجات حرارة متطرفة</li>
        <li>استخدم مؤقت التشغيل</li>
        <li>تأكد من إغلاق النوافذ والأبواب</li>
        <li>نظف المنطقة حول الوحدة الخارجية</li>
        <li>استبدل الفلاتر كل 3-6 أشهر</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    category: 'صيانة',
    readTime: '10 دقائق',
    date: '2025-01-10',
    tags: ['صيانة', 'تنظيف', 'فلاتر', 'عمر افتراضي'],
    views: 1450,
    likes: 112,
    comments: 34
  }
};

const relatedArticles = [
  {
    id: 4,
    title: 'كيفية توفير فاتورة الكهرباء مع التكييف',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
    readTime: '7 دقائق'
  },
  {
    id: 5,
    title: 'مشاكل التكييف الشائعة وحلولها',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80',
    readTime: '12 دقائق'
  },
  {
    id: 6,
    title: 'أنواع التكييفات ومميزات كل نوع',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
    readTime: '9 دقائق'
  }
];

export function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">المقال غير موجود</h2>
        <button
          onClick={() => navigate('/articles')}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="ml-2" />
          العودة للمقالات
        </button>
      </div>
    );
  }

  const articleUrl = `https://frozeonix.netlify.app/articles/${id}`;
  const articleKeywords = [article.category, ...article.tags, 'تكييف', 'اير هاوس'].join(', ');

  return (
    <>
      <SEOHead
        title={`${article.title} | اير هاوس`}
        description={article.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        keywords={articleKeywords}
        image={article.image}
        url={articleUrl}
        type="article"
        article={{
          publishedTime: article.date,
          modifiedTime: article.date,
          author: "اير هاوس",
          section: article.category,
          tags: article.tags
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/articles')}
          className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="ml-2" />
          العودة للمقالات
        </motion.button>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 sm:h-96 object-cover"
          />
          
          <div className="p-6 sm:p-8">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
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
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views} مشاهدة
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Article Stats */}
            <div className="flex items-center gap-6 mb-8 pb-6 border-b">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>{article.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{article.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>مشاركة</span>
              </button>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Related Articles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            مقالات ذات صلة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle, index) => (
              <motion.div
                key={relatedArticle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <img
                  src={relatedArticle.image}
                  alt={relatedArticle.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {relatedArticle.readTime}
                    </span>
                    <Link
                      to={`/articles/${relatedArticle.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                      اقرأ
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </>
  );
}