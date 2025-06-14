import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Wind, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { useCart } from '../context/CartContext';
import { OfferBanner } from './OfferBanner';
import { BrandSlider } from './BrandSlider';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { items, total } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/home.html';

  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Push page view event
    window.dataLayer.push({
      event: 'pageview',
      page: {
        path: location.pathname,
        title: document.title
      }
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <OfferBanner />
      
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
                <Wind className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-xl sm:text-2xl font-bold text-blue-600">Frozeonix</span>
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
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>

      {isHomePage && <BrandSlider />}

      <footer className="bg-white border-t w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!isHomePage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Phone className="text-blue-600" size={20} />
                  اتصل بنا
                </h3>
                <div className="space-y-2">
                  <a href="tel:01027755778" className="block text-blue-600 hover:text-blue-800 transition-colors">
                    📞 01027755778
                  </a>
                  <a href="tel:01005626294" className="block text-blue-600 hover:text-blue-800 transition-colors">
                    📞 01005626294
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="text-blue-600" size={20} />
                  العنوان
                </h3>
                <p className="text-gray-600">
                  📍 25 شارع العشرين بجوار شركة الاتصالات فيصل
                </p>
              </div>
            </div>
          )}

          <div className="text-center space-y-2 pt-8 border-t">
            <div className="text-gray-500">© 2025 Frozeonix. جميع الحقوق محفوظة</div>
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