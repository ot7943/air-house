import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "أحمد محمد",
    rating: 5,
    date: "15 مارس 2025",
    review: "خدمة ممتازة وسرعة في التركيب. الفني كان محترف جداً وشرح كل شيء بالتفصيل. سعيد جداً بالتعامل معهم."
  },
  {
    id: 2,
    name: "سارة أحمد",
    rating: 5,
    date: "10 مارس 2025",
    review: "أسعار تنافسية وجودة عالية. التكييف يعمل بشكل ممتاز والضمان شامل. أنصح بالتعامل معهم."
  },
  {
    id: 3,
    name: "محمود عبدالله",
    rating: 5,
    date: "5 مارس 2025",
    review: "تجربة شراء رائعة من البداية للنهاية. فريق المبيعات متعاون جداً وساعدني في اختيار التكييف المناسب."
  },
  {
    id: 4,
    name: "فاطمة علي",
    rating: 5,
    date: "1 مارس 2025",
    review: "خدمة ما بعد البيع ممتازة. أي مشكلة يتم حلها بسرعة وبشكل احترافي. شركة تستحق الثقة."
  }
];

export function Reviews() {
  return (
    <div className="py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">آراء عملائنا</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-lg relative"
          >
            <Quote className="absolute top-4 right-4 text-blue-100 w-8 h-8" />
            <div className="flex items-center gap-1 mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 mb-4 relative z-10">{review.review}</p>
            <div className="mt-auto">
              <div className="font-semibold">{review.name}</div>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}