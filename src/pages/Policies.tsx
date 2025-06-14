import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Truck, RefreshCcw, Mail, Phone, MapPin } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const policies = {
  terms: {
    title: 'الشروط والأحكام',
    content: `
      <h2>1. القبول بالشروط والأحكام</h2>
      <p>باستخدامك لموقع اير هاوس، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام موقعنا.</p>

      <h2>2. استخدام الموقع</h2>
      <p>يجب استخدام الموقع فقط للأغراض المشروعة وبطريقة لا تنتهك حقوق الآخرين أو تقيد استخدامهم للموقع.</p>

      <h2>3. حسابات المستخدمين</h2>
      <p>أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور الخاصة بك. يجب إخطارنا فوراً بأي استخدام غير مصرح به لحسابك.</p>

      <h2>4. المنتجات والأسعار</h2>
      <p>نحتفظ بالحق في تغيير أسعار المنتجات في أي وقت دون إشعار مسبق. جميع الأسعار بالجنيه المصري وتشمل ضريبة القيمة المضافة.</p>

      <h2>5. الطلبات والدفع</h2>
      <p>تخضع جميع الطلبات للتوفر والقبول. نحتفظ بالحق في رفض أي طلب لأي سبب من الأسباب.</p>
    `
  },
  refund: {
    title: 'سياسة الاسترجاع',
    content: `
      <h2>1. شروط الاسترجاع</h2>
      <p>يمكن استرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام، شريطة أن تكون في حالتها الأصلية وغير مستخدمة.</p>

      <h2>2. عملية الاسترجاع</h2>
      <p>لبدء عملية الاسترجاع، يرجى الاتصال بخدمة العملاء على الرقم 01027755778. سيقوم فريقنا بإرشادك خلال العملية.</p>

      <h2>3. استرداد المبلغ</h2>
      <p>سيتم رد المبلغ خلال 7-14 يوم عمل من تاريخ استلام المنتج المرتجع والتأكد من حالته.</p>

      <h2>4. تكاليف الشحن</h2>
      <p>تكاليف الشحن للمنتجات المرتجعة يتحملها العميل، إلا في حالة وجود عيب مصنعي.</p>
    `
  },
  privacy: {
    title: 'سياسة الخصوصية',
    content: `
      <h2>1. جمع المعلومات</h2>
      <p>نقوم بجمع المعلومات الشخصية التي تقدمها لنا عند إنشاء حساب أو إجراء عملية شراء، مثل الاسم وعنوان البريد الإلكتروني ورقم الهاتف والعنوان.</p>

      <h2>2. استخدام المعلومات</h2>
      <p>نستخدم معلوماتك الشخصية لتنفيذ طلباتك وتحسين خدماتنا وتواصلنا معك بشأن المنتجات والعروض.</p>

      <h2>3. حماية المعلومات</h2>
      <p>نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح.</p>

      <h2>4. مشاركة المعلومات</h2>
      <p>لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. نشارك المعلومات فقط مع مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا وخدمة عملائنا.</p>
    `
  },
  shipping: {
    title: 'سياسة الشحن',
    content: `
      <h2>1. مناطق التغطية</h2>
      <p>نقدم خدمة الشحن لجميع محافظات مصر. تختلف أوقات التوصيل حسب المنطقة.</p>

      <h2>2. تكاليف الشحن</h2>
      <p>تكاليف الشحن مجانية للطلبات التي تزيد عن 5000 جنيه مصري. للطلبات الأقل، يتم احتساب تكلفة الشحن حسب المنطقة.</p>

      <h2>3. وقت التوصيل</h2>
      <p>يتم التوصيل خلال 2-5 أيام عمل في القاهرة والجيزة، و5-7 أيام عمل للمحافظات الأخرى.</p>

      <h2>4. تتبع الشحنة</h2>
      <p>سيتم تزويدك برقم تتبع الشحنة عبر رسالة نصية ويمكنك متابعة حالة طلبك من خلال موقعنا.</p>
    `
  },
  about: {
    title: 'من نحن',
    content: `
      <h2>قصتنا</h2>
      <p>اير هاوس هي شركة رائدة في مجال حلول التكييف المتكاملة في مصر. تأسست عام 2010 بهدف تقديم أفضل خدمات التكييف بأسعار تنافسية.</p>

      <h2>رؤيتنا</h2>
      <p>نسعى لأن نكون الخيار الأول للعملاء في مجال التكييف من خلال تقديم منتجات عالية الجودة وخدمة عملاء متميزة.</p>

      <h2>قيمنا</h2>
      <ul>
        <li>الجودة العالية في المنتجات والخدمات</li>
        <li>الشفافية في التعامل مع العملاء</li>
        <li>الالتزام بمواعيد التسليم</li>
        <li>خدمة ما بعد البيع المتميزة</li>
      </ul>

      <h2>فريقنا</h2>
      <p>يضم فريقنا نخبة من المتخصصين في مجال التكييف والتبريد، مع خبرة تزيد عن 15 عاماً في السوق المصري.</p>
    `
  }
};

export function Policies() {
  const { type } = useParams<{ type: keyof typeof policies }>();
  const policy = type ? policies[type] : null;

  if (!policy) {
    return (
      <>
        <SEOHead
          title="السياسات والشروط | اير هاوس"
          description="تعرف على سياسات وشروط اير هاوس للتكييف. سياسة الخصوصية، شروط الاستخدام، سياسة الاسترجاع والشحن."
          keywords="سياسات اير هاوس, شروط الاستخدام, سياسة الخصوصية, سياسة الاسترجاع, سياسة الشحن"
          url="https://frozeonix.netlify.app/policies"
        />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-8">السياسات والشروط</h1>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(policies).map(([key, value]) => (
              <Link
                key={key}
                to={`/policies/${key}`}
                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{value.title}</h2>
                <p className="text-gray-600">اضغط للمزيد من التفاصيل</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">معلومات الاتصال</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-blue-600 flex-shrink-0" />
                <div>
                  <a href="tel:01027755778" className="block hover:text-blue-600">01027755778</a>
                  <a href="tel:01005626294" className="block hover:text-blue-600">01005626294</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600 flex-shrink-0" />
                <a href="mailto:airhouse@gmail.com" className="hover:text-blue-600">
                  airhouse@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-600 flex-shrink-0 mt-1" />
                <p>25 شارع العشرين بجوار شركة الاتصالات فيصل</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const policyUrl = `https://frozeonix.netlify.app/policies/${type}`;

  return (
    <>
      <SEOHead
        title={`${policy.title} | اير هاوس`}
        description={policy.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        keywords={`${policy.title}, اير هاوس, سياسات, شروط`}
        url={policyUrl}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            to="/policies"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" />
            العودة للسياسات
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-l from-blue-600 to-blue-700">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{policy.title}</h1>
          </div>
          <div 
            className="p-6 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />
        </motion.div>
      </div>
    </>
  );
}