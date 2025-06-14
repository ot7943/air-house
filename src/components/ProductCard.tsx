import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, X, Tag, Zap, Award } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
    >
      <Link 
        to={`/p/${product.id}`}
        className="block relative aspect-[4/3] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Brand Badge */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <Award size={14} className="text-blue-600" />
          <span className="text-sm font-medium">{product.features.brand}</span>
        </div>
      </Link>
      
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <Link 
          to={`/p/${product.id}`}
          className="block hover:text-blue-600 transition-colors mb-2"
        >
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex-1 flex flex-col justify-between gap-3">
          {/* Price Section */}
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <Tag size={16} className="text-blue-600 flex-shrink-0" />
              <div className="flex flex-wrap items-baseline gap-1.5">
                {product.discountedPrice ? (
                  <>
                    <span className="text-base sm:text-lg font-bold text-blue-600" style={{ direction: 'ltr' }}>
                      {product.discountedPrice.toLocaleString('en-US')} EGP
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through" style={{ direction: 'ltr' }}>
                      {product.price.toLocaleString('en-US')} EGP
                    </span>
                  </>
                ) : (
                  <span className="text-base sm:text-lg font-bold text-blue-600" style={{ direction: 'ltr' }}>
                    {product.price.toLocaleString('en-US')} EGP
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-gray-200 pt-2">
              <Zap size={16} className="text-amber-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600">{product.capacity}</span>
            </div>
          </div>

          {/* Status and Action Section */}
          <div className="space-y-2">
            <span className={`text-xs sm:text-sm flex items-center gap-1.5 ${
              product.available ? 'text-green-500' : 'text-red-500'
            }`}>
              {product.available ? (
                <>
                  <Check size={16} className="flex-shrink-0" />
                  متوفر
                </>
              ) : (
                <>
                  <X size={16} className="flex-shrink-0" />
                  غير متوفر
                </>
              )}
            </span>
            <button
              onClick={() => product.available && addToCart(product)}
              disabled={!product.available}
              className={`w-full px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors ${
                product.available
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={16} className="flex-shrink-0" />
              أضف للسلة
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}