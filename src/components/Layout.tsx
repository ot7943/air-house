import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Wind, Phone, MapPin, BookOpen, Users, Award, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { useCart } from '../context/CartContext';
import { OfferBanner } from './OfferBanner';
import { BrandSlider } from './BrandSlider';

export function Layout({ children }: { children: React.ReactNode }) {
  const { items, total } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/home.html';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
                <Wind className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-xl sm:text-2xl font-bold text-blue-600">Air House</span>
              </Link>
              
              <Link
                to="/checkout"
                className="sm:hidden relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                <ShoppingCart size={18} />
                <span className="text-sm font-medium" style={{ direction: 'ltr' }}>
                  {total.toLocaleString('en-US')} EGP
                </span>
                <AnimatePresence>
                  {items.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      {items.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
            
            <div className="flex-1 sm:mx-8">
              <SearchBar />
            </div>

            <Link
              to="/checkout"
              className="hidden sm:flex relative items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <ShoppingCart size={20} className="flex-shrink-0" />
              <span className="font-medium" style={{ direction: 'ltr' }}>
                {total.toLocaleString('en-US')} EGP
              </span>
              <AnimatePresence>
                {items.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    {items.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-6 py-2 overflow-x-auto">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                <Wind className="w-4 h-4" />
                الرئيسية
              </Link>
              <Link
                to="/articles"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                المقالات
              </Link>
              <Link
                to="/info/contact"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                اتصل بنا
              </Link>
              <Link
                to="/policies/about"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                <Users className="w-4 h-4" />
                من نحن
              </Link>
              <Link
                to="/installment/bank"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                <Award className="w-4 h-4" />
                التقسيط
              </Link>
              <Link
                to="/policies"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                <Settings className="w-4 h-4" />
                السياسات
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <OfferBanner />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>

      {isHomePage && <BrandSlider />}

      <footer className="bg-white border-t w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-blue-600">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-gray-600 hover:text-blue-600">
                    المقالات والنصائح
                  </Link>
                </li>
                <li>
                  <Link to="/policies/about" className="text-gray-600 hover:text-blue-600">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link to="/policies/shipping" className="text-gray-600 hover:text-blue-600">
                    سياسة الشحن
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">السياسات</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/policies/terms" className="text-gray-600 hover:text-blue-600">
                    الشروط والأحكام
                  </Link>
                </li>
                <li>
                  <Link to="/policies/privacy" className="text-gray-600 hover:text-blue-600">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link to="/policies/refund" className="text-gray-600 hover:text-blue-600">
                    سياسة الاسترجاع
                  </Link>
                </li>
                <li>
                  <Link to="/installment/bank" className="text-gray-600 hover:text-blue-600">
                    التقسيط البنكي
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <ul className="space-y-2">
                <li>
                  <a href="tel:01027755778" className="text-gray-600 hover:text-blue-600">
                    01027755778
                  </a>
                </li>
                <li>
                  <a href="tel:01005626294" className="text-gray-600 hover:text-blue-600">
                    01005626294
                  </a>
                </li>
                <li>
                  <a href="mailto:airhouse@gmail.com" className="text-gray-600 hover:text-blue-600">
                    airhouse@gmail.com
                  </a>
                </li>
                <li>
                  <Link to="/info/contact" className="text-gray-600 hover:text-blue-600">
                    صفحة الاتصال
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">العنوان</h3>
              <p className="text-gray-600">
                25 شارع العشرين بجوار شركة الاتصالات فيصل
              </p>
              <p className="text-gray-600 mt-2">
                ساعات العمل: السبت - الخميس 9 صباحاً - 12 مساءً
              </p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">تابعنا</h4>
                <div className="flex gap-2">
                  <a
                    href="https://www.facebook.com/share/1XtsCtVWrG/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    فيسبوك
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2 pt-8 border-t">
            <div className="text-gray-500">© 2025 Air House. جميع الحقوق محفوظة</div>
            <div className="text-gray-500">
              مشغل بواسطة{' '}
              <a 
                href="https://omar-technology.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                Omar Technology
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}