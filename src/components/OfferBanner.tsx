import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Tag, Gift, CreditCard, Percent, Clock, ChevronRight, ChevronLeft, X, ChevronDown } from 'lucide-react';
import { useOffers } from '../hooks/useOffers';
import type { Offer } from '../types/offers';

const themes = {
  blue: {
    bg: "bg-gradient-to-r from-blue-50 to-blue-100/50",
    cardBg: "bg-white/95 backdrop-blur-md",
    title: "text-blue-900",
    description: "text-blue-700",
    highlight: "bg-blue-600 text-white",
    border: "border-blue-100",
    icon: CreditCard,
    badge: "bg-blue-100 text-blue-700",
    shadow: "shadow-blue-100/50"
  },
  green: {
    bg: "bg-gradient-to-r from-green-50 to-green-100/50",
    cardBg: "bg-white/95 backdrop-blur-md",
    title: "text-green-900",
    description: "text-green-700",
    highlight: "bg-green-600 text-white",
    border: "border-green-100",
    icon: Percent,
    badge: "bg-green-100 text-green-700",
    shadow: "shadow-green-100/50"
  },
  purple: {
    bg: "bg-gradient-to-r from-purple-50 to-purple-100/50",
    cardBg: "bg-white/95 backdrop-blur-md",
    title: "text-purple-900",
    description: "text-purple-700",
    highlight: "bg-purple-600 text-white",
    border: "border-purple-100",
    icon: Gift,
    badge: "bg-purple-100 text-purple-700",
    shadow: "shadow-purple-100/50"
  }
};

export function OfferBanner() {
  const { offers, loading } = useOffers();
  const [currentOffer, setCurrentOffer] = useState(0);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const location = useLocation();

  // Ensure this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only show on homepage
  const isHomePage = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/home.html';

  // Auto-rotate offers only on client
  useEffect(() => {
    if (!isClient || offers.length === 0) return;

    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [offers.length, isClient]);

  // Don't render anything during SSR or if not on homepage
  if (!isClient || !isHomePage) {
    return null;
  }

  // Show placeholder while loading or when no offers
  if (loading || offers.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 transition-colors duration-300 overflow-hidden mb-8 mt-2 sm:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop placeholder */}
          <div className="hidden sm:block py-6">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg shadow-gray-100/50 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="p-4 rounded-xl bg-gray-100 border border-gray-200 animate-pulse">
                        <div className="h-10 w-10 bg-gray-300 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />
                      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
                      <div className="flex gap-2">
                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile placeholder */}
          <div className="sm:hidden py-4">
            <div className="bg-white/95 p-4 rounded-xl shadow-lg backdrop-blur-lg border border-white/20 bg-gradient-to-br from-white/90 to-white/70">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 animate-pulse">
                    <div className="h-6 w-6 bg-gray-300 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-7 w-16 bg-gray-300 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const offer = offers[currentOffer];
  const theme = themes[offer.theme];
  const Icon = theme.icon;

  const handlePrevious = () => {
    setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleNext = () => {
    setCurrentOffer((prev) => (prev + 1) % offers.length);
  };

  const renderOfferDetails = () => {
    switch (offer.type) {
      case 'installment':
        return (
          <div className="flex flex-wrap gap-2">
            {offer.details?.downPayment !== undefined && (
              <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 ${theme.badge}`}>
                <CreditCard size={14} />
                {`مقدم ${offer.details.downPayment}%`}
              </span>
            )}
            {offer.details?.adminFees !== undefined && (
              <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 ${theme.badge}`}>
                <Tag size={14} />
                {`رسوم إدارية ${offer.details.adminFees}%`}
              </span>
            )}
            {offer.details?.interestRate !== undefined && (
              <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 ${theme.badge}`}>
                <Percent size={14} />
                {`فائدة ${offer.details.interestRate}%`}
              </span>
            )}
          </div>
        );
      case 'discount':
        return (
          <div className="flex flex-wrap gap-2">
            {offer.details?.discount && (
              <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 ${theme.badge}`}>
                <Percent size={14} />
                خصم {offer.details.discount}%
              </span>
            )}
            <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 ${theme.badge}`}>
              <Clock size={14} />
              عرض محدود
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${theme.bg} transition-colors duration-300 overflow-hidden mb-8 mt-2 sm:mt-0`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden sm:block py-6">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`${theme.cardBg} rounded-2xl shadow-lg ${theme.shadow} overflow-hidden`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative flex-shrink-0">
                        <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border}`}>
                          <Icon className={`h-10 w-10 ${theme.title}`} />
                        </div>
                        {offer.highlight && (
                          <span className={`absolute -top-2 -right-2 px-2.5 py-1 rounded-full text-xs font-bold ${theme.highlight} shadow-lg`}>
                            {offer.highlight}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${theme.title} mb-1`}>
                          {offer.title}
                        </h3>
                        <p className={`${theme.description} mb-3`}>
                          {offer.description}
                        </p>
                        {renderOfferDetails()}
                      </div>
                    </div>

                    {offer.logos.length > 0 && (
                      <div className="flex items-center gap-6 mr-auto p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl">
                        {offer.logos.map((logo, index) => (
                          <img
                            key={index}
                            src={logo}
                            alt={`Logo ${index + 1}`}
                            className="h-12 w-auto object-contain"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {offers.length > 1 && (
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4">
                <button
                  onClick={handlePrevious}
                  className={`${theme.cardBg} p-2 rounded-full shadow-lg pointer-events-auto opacity-75 hover:opacity-100 transition-opacity`}
                >
                  <ChevronRight className={`w-5 h-5 ${theme.title}`} />
                </button>
                <button
                  onClick={handleNext}
                  className={`${theme.cardBg} p-2 rounded-full shadow-lg pointer-events-auto opacity-75 hover:opacity-100 transition-opacity`}
                >
                  <ChevronLeft className={`w-5 h-5 ${theme.title}`} />
                </button>
              </div>
            )}
          </div>

          {offers.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentOffer(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentOffer === index ? `${theme.highlight}` : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className="sm:hidden py-4">
          <div className={`${theme.cardBg} p-4 rounded-xl shadow-lg backdrop-blur-lg border border-white/20 bg-gradient-to-br from-white/90 to-white/70`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${theme.bg} border ${theme.border} shadow-inner`}>
                  <Icon className={`h-6 w-6 ${theme.title}`} />
                </div>
                <div>
                  <h3 className={`text-base font-semibold ${theme.title} mb-0.5`}>
                    {offer.highlight || offer.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {offer.logos.length > 0 && (
                      <img
                        src={offer.logos[0]}
                        alt="Primary Logo"
                        className="h-5 w-auto object-contain"
                      />
                    )}
                    <span className="text-xs text-gray-600 line-clamp-1">
                      {offer.description}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowMobileDetails(true)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full ${theme.highlight} shadow-lg transition-all active:scale-95`}
              >
                التفاصيل
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showMobileDetails && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 sm:hidden"
                onClick={() => setShowMobileDetails(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="fixed inset-x-0 bottom-0 z-50 sm:hidden"
              >
                <div className={`${theme.cardBg} rounded-t-2xl shadow-xl p-4`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${theme.bg} border ${theme.border}`}>
                        <Icon className={`h-6 w-6 ${theme.title}`} />
                      </div>
                      {offer.highlight && (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${theme.highlight}`}>
                          {offer.highlight}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowMobileDetails(false)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <h3 className={`text-lg font-bold ${theme.title} mb-2`}>
                    {offer.title}
                  </h3>
                  <p className={`${theme.description} text-sm mb-4`}>
                    {offer.description}
                  </p>
                  
                  {renderOfferDetails()}
                  
                  {offer.logos.length > 0 && (
                    <div className="mt-4 flex items-center gap-4 p-3 bg-gray-50/80 rounded-xl">
                      {offer.logos.map((logo, index) => (
                        <img
                          key={index}
                          src={logo}
                          alt={`Logo ${index + 1}`}
                          className="h-8 w-auto object-contain"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}