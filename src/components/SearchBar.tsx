import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSearchProducts } from '../hooks/useSearchProducts';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
  const { products, loading } = useSearchProducts(query);

  // Ensure this only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelect = (productId: string) => {
    setQuery('');
    navigate(`/p/${productId}`);
  };

  // Don't show search results during SSR
  const showResults = isClient && query.trim() && products.length > 0;

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="ابحث عن المنتجات..."
          className="w-full px-4 py-2 pr-10 pl-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        {loading && isClient ? (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        )}
      </div>
      
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {products.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleSelect(product.id)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600" style={{ direction: 'ltr' }}>
                    {(product.discountedPrice || product.price).toLocaleString('en-US')} EGP
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}