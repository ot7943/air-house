/*
  # Seed homepage content tables with initial data

  1. Data Insertion
    - Insert 3 exclusive offers
    - Insert brand logos
    - Insert seasonal tips
    - Insert 3 maintenance guides
    - Insert sample articles
    - Insert customer reviews
*/

-- Insert exclusive offers (3 fixed cards)
INSERT INTO exclusive_offers (title, description, discount, valid_until, color_scheme, display_order) VALUES
('عرض الشتاء الحار', 'خصم 25% على جميع تكييفات التدفئة', '25%', '31 يناير 2025', 'from-red-500 to-orange-500', 1),
('تقسيط بدون فوائد', 'قسط مشترياتك على 24 شهر بدون فوائد', '0%', 'عرض دائم', 'from-blue-500 to-purple-500', 2),
('تركيب مجاني', 'تركيب وصيانة مجانية لمدة سنة كاملة', 'مجاني', '15 فبراير 2025', 'from-green-500 to-teal-500', 3);

-- Insert brand logos
INSERT INTO brand_logos (name, logo_url, description, link_path, display_order) VALUES
('Sharp', 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/SHARP.webp', 'تكنولوجيا يابانية متقدمة', '/brands/شارب', 1),
('Carrier', 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/CARRIER.webp', 'رائدة في حلول التكييف', '/brands/كاريير', 2),
('Media', 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/MIDEA.webp', 'كفاءة عالية في الطاقة', '/brands/ميديا', 3),
('Haier', 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/HAIER.webp', 'تصميم عصري وأداء قوي', '/brands/هايير', 4),
('Tornado', 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/TORNADO.webp', 'قوة تبريد استثنائية', '/brands/تورنيدو', 5),
('Fresh', 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/FRESH.webp', 'جودة مصرية موثوقة', '/brands/فريش', 6),
('Unionaire', 'https://xohlkwkewrgnhcxjlsbl.supabase.co/storage/v1/object/public/omar-technology/Web/UNIONAIRE.webp', 'خبرة عريقة في التكييف', '/brands/يونيون اير', 7);

-- Insert seasonal tips
INSERT INTO seasonal_tips (season, title, icon_name, color_scheme, tips, display_order) VALUES
('summer', 'نصائح التبريد الصيفي', 'Sun', 'from-orange-400 to-red-500', 
 '["اضبط درجة الحرارة على 24-26 درجة مئوية", "استخدم المراوح لتوزيع الهواء البارد", "أغلق النوافذ والستائر نهاراً", "نظف فلاتر التكييف شهرياً"]', 1),
('winter', 'نصائح التدفئة الشتوية', 'Snowflake', 'from-blue-400 to-cyan-500',
 '["اضبط درجة الحرارة على 20-22 درجة مئوية", "تأكد من عزل النوافذ والأبواب", "استخدم وضع التدفئة بكفاءة", "افحص التكييف قبل بداية الموسم"]', 2);

-- Insert maintenance guides (3 fixed cards)
INSERT INTO maintenance_guides (title, description, frequency, icon_name, display_order) VALUES
('الصيانة الدورية', 'نظف الفلاتر كل شهر واستبدلها كل 3 أشهر', 'شهرياً', 'Settings', 1),
('فحص الأداء', 'راقب كفاءة التبريد وتأكد من عدم وجود تسريبات', 'كل 3 أشهر', 'ThermometerSun', 2),
('الصيانة المتخصصة', 'فحص شامل من قبل فني متخصص', 'سنوياً', 'Wrench', 3);

-- Insert sample articles
INSERT INTO articles (title, excerpt, content, image_url, category, read_time, tags, featured) VALUES
('كيفية اختيار التكييف المناسب لمنزلك', 
 'دليل شامل لاختيار نوع وحجم التكييف المناسب حسب مساحة الغرفة واحتياجاتك. تعرف على العوامل المهمة التي يجب مراعاتها عند الشراء.',
 '<h2>مقدمة</h2><p>اختيار التكييف المناسب لمنزلك قرار مهم يؤثر على راحتك وفاتورة الكهرباء لسنوات قادمة...</p>',
 'https://images.unsplash.com/photo-1631083215283-b1e563f8c5d5?auto=format&fit=crop&w=800&q=80',
 'دليل الشراء', '8 دقائق', '{"شراء", "اختيار", "مساحة", "حجم"}', true),

('أفضل درجة حرارة للتكييف في الصيف والشتاء',
 'تعرف على الدرجة المثلى للتكييف لتوفير الطاقة والحصول على راحة مثالية. نصائح عملية لضبط درجة الحرارة حسب الموسم.',
 '<h2>الدرجة المثلى للتكييف</h2><p>ضبط درجة حرارة التكييف بشكل صحيح لا يؤثر فقط على راحتك...</p>',
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
 'نصائح', '5 دقائق', '{"درجة حرارة", "توفير طاقة", "راحة"}', false),

('صيانة التكييف: دليل المبتدئين الشامل',
 'خطوات بسيطة للحفاظ على تكييفك وإطالة عمره الافتراضي. تعلم كيفية تنظيف الفلاتر وفحص الوحدة بنفسك.',
 '<h2>أهمية الصيانة الدورية</h2><p>الصيانة الدورية للتكييف ليست مجرد توصية...</p>',
 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
 'صيانة', '10 دقائق', '{"صيانة", "تنظيف", "فلاتر", "عمر افتراضي"}', true);

-- Insert customer reviews
INSERT INTO customer_reviews (customer_name, rating, review_text, featured) VALUES
('أحمد محمد', 5, 'خدمة ممتازة وسرعة في التركيب. الفني كان محترف جداً وشرح كل شيء بالتفصيل.', true),
('سارة أحمد', 5, 'أسعار تنافسية وجودة عالية. التكييف يعمل بشكل ممتاز والضمان شامل. أنصح بالتعامل معهم.', true),
('محمود عبدالله', 5, 'تجربة شراء رائعة من البداية للنهاية. فريق المبيعات متعاون جداً وساعدني في اختيار التكييف المناسب.', true),
('فاطمة علي', 5, 'خدمة ما بعد البيع ممتازة. أي مشكلة يتم حلها بسرعة وبشكل احترافي. شركة تستحق الثقة.', true);