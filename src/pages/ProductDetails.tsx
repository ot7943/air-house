import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  ArrowLeft,
  Check,
  X,
  Truck,
  Shield,
  Box,
  Cpu,
  Ruler,
  Weight,
  Zap,
  Palette,
  Tag,
  Power,
  Thermometer,
  Award,
  CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { useState, useEffect } from 'react';
import { WindLoader } from '../components/WindLoader';
import { SEOHead } from '../components/SEOHead';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to check if dimensions data exists
  const hasDimensionsData = (product: Product) => {
    const { indoor, outdoor } = product.features.dimensions;
    return indoor.width && indoor.height && indoor.depth &&
           outdoor.width && outdoor.height && outdoor.depth;
  };

  // Helper function to check if weight data exists
  const hasWeightData = (product: Product) => {
    const { weight, dimensions } = product.features;
    return weight.net && weight.total && dimensions.connectionLength;
  };

  // Helper function to check if features exist
  const hasFeatures = (product: Product) => {
    return product.features.features.length > 0;
  };

  // Calculate installment prices
  const calculateInstallmentPrices = (basePrice: number) => {
    const totalWithMarkup = basePrice * 1.3; // 30% increase
    const monthlyPayment = totalWithMarkup / 30; // Divided by 30 months
    return {
      total: totalWithMarkup,
      monthly: monthlyPayment
    };
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          // Transform Supabase data to match our Product type
          const transformedProduct: Product = {
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            discountedPrice: data.discounted_price || undefined,
            image: data.image,
            available: data.available,
            capacity: data.capacity,
            condition: data.condition,
            delivery: data.delivery,
            warranty: data.warranty,
            features: {
              brand: data.brand,
              model: data.model,
              color: data.color,
              type: data.type,
              power: data.cooling_capacity,
              coolingSystem: data.cooling_system,
              classification: data.classification,
              energyEfficiencyRatio: data.energy_efficiency_ratio,
              energyEfficiencyLevel: data.energy_efficiency_level,
              coolingCapacity: data.cooling_capacity,
              dimensions: {
                indoor: {
                  width: data.indoor_width,
                  height: data.indoor_height,
                  depth: data.indoor_depth,
                },
                outdoor: {
                  width: data.outdoor_width,
                  height: data.outdoor_height,
                  depth: data.outdoor_depth,
                },
                connectionLength: data.connection_length,
              },
              weight: {
                net: data.net_weight,
                total: data.gross_weight,
              },
              features: [
                data.feature_1,
                data.feature_2,
                data.feature_3,
                data.feature_4,
                data.feature_5,
                data.feature_6,
                data.feature_7,
                data.feature_8,
                data.feature_9,
                data.feature_10,
                data.feature_11,
                data.feature_12,
                data.feature_13,
                data.feature_14,
                data.feature_15,
                data.feature_16,
                data.feature_17,
                data.feature_18,
                data.feature_19,
                data.feature_20,
              ].filter(Boolean) as string[],
            }
          };
          setProduct(transformedProduct);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the product');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <WindLoader />;
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">المنتج غير موجود</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="ml-2" />
          العودة للمنتجات
        </button>
      </div>
    );
  }

  const basePrice = product.discountedPrice || product.price;
  const installmentPrices = calculateInstallmentPrices(basePrice);

  // Generate SEO-friendly product URL
  const productUrl = `https://frozeonix.netlify.app/p/${product.id}`;
  
  // Create product-specific keywords
  const productKeywords = [
    product.features.brand,
    product.features.model,
    product.capacity,
    'تكييف',
    product.features.type,
    'شراء تكييف',
    `تكييف ${product.features.brand}`,
    `${product.capacity} حصان`,
    'اير هاوس'
  ].filter(Boolean).join(', ');

  return (
    <>
      <SEOHead
        title={`${product.name} - ${product.features.brand} ${product.capacity} | اير هاوس`}
        description={`اشتري ${product.name} من ${product.features.brand} بقدرة ${product.capacity} بأفضل سعر. ${product.description}. ضمان شامل وتوصيل مجاني.`}
        keywords={productKeywords}
        image={product.image}
        url={productUrl}
        type="product"
        product={{
          name: product.name,
          brand: product.features.brand,
          price: basePrice,
          priceCurrency: "EGP",
          availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          condition: "https://schema.org/NewCondition",
          category: "Air Conditioners",
          sku: product.id,
          color: product.features.color,
          weight: `${product.features.weight.net}kg`,
          size: product.capacity
        }}
        breadcrumbs={[
          {
            name: "الرئيسية",
            item: "https://frozeonix.netlify.app/",
            position: 1
          },
          {
            name: "المنتجات",
            item: "https://frozeonix.netlify.app/#products",
            position: 2
          },
          {
            name: product.name,
            item: productUrl,
            position: 3
          }
        ]}
        openGraph={{
          title: `${product.name} - ${product.features.brand} ${product.capacity}`,
          description: `اشتري ${product.name} من ${product.features.brand} بقدرة ${product.capacity} بأفضل سعر`,
          image: product.image,
          imageAlt: `صورة ${product.name} من ${product.features.brand}`,
          type: "product"
        }}
        twitter={{
          card: "summary_large_image",
          title: `${product.name} - ${product.features.brand}`,
          description: `اشتري ${product.name} بأفضل سعر من اير هاوس`,
          image: product.image,
          imageAlt: `صورة ${product.name}`
        }}
        faq={[
          {
            question: `ما هي مواصفات ${product.name}؟`,
            answer: `${product.name} من ${product.features.brand} بقدرة ${product.capacity}، ${product.description}`
          },
          {
            question: "هل يشمل السعر التركيب؟",
            answer: "نعم، نقدم خدمة التركيب المجانية مع ضمان شامل على التركيب والمنتج."
          },
          {
            question: "ما هي مدة الضمان؟",
            answer: `${product.warranty} مع خدمة ما بعد البيع المتميزة.`
          }
        ]}
        customStructuredData={[
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "عملاء اير هاوس"
            },
            "reviewBody": `منتج ممتاز من ${product.features.brand} بجودة عالية وأداء متميز`
          }
        ]}
      />
      
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="ml-2" />
          العودة للمنتجات
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:flex-shrink-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-64 md:h-96 w-full object-cover md:w-[500px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 sm:p-8 flex-1"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center">
                  {product.available ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
                      <Check size={16} className="ml-1 flex-shrink-0" />
                      متوفر
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600">
                      <X size={16} className="ml-1 flex-shrink-0" />
                      غير متوفر
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {/* Regular Price */}
                <div className="bg-blue-50 rounded-lg p-3">
                  {product.discountedPrice ? (
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-blue-600 font-feature-arabic-numerals">
                          {product.discountedPrice.toLocaleString('ar-EG')}
                        </span>
                        <span className="text-lg text-blue-600">جنيه</span>
                      </div>
                      <div className="flex items-baseline gap-2 text-gray-500">
                        <span className="text-base sm:text-lg line-through font-feature-arabic-numerals">
                          {product.price.toLocaleString('ar-EG')}
                        </span>
                        <span className="text-sm">جنيه</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-blue-600 font-feature-arabic-numerals">
                        {product.price.toLocaleString('ar-EG')}
                      </span>
                      <span className="text-lg text-blue-600">جنيه</span>
                    </div>
                  )}
                </div>

                {/* Installment Price */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="text-purple-600" size={20} />
                    <h3 className="text-lg font-semibold text-purple-900">خيار التقسيط</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-purple-800">
                      <span className="font-semibold">السعر بالتقسيط: </span>
                      <span className="text-xl font-bold" style={{ direction: 'ltr' }}>
                        {installmentPrices.total.toLocaleString('ar-EG')} جنيه
                      </span>
                    </p>
                    <p className="text-purple-800">
                      <span className="font-semibold">القسط الشهري: </span>
                      <span className="text-lg font-bold" style={{ direction: 'ltr' }}>
                        {Math.ceil(installmentPrices.monthly).toLocaleString('ar-EG')} جنيه
                      </span>
                      <span className="text-sm text-purple-600"> (لمدة 30 شهر)</span>
                    </p>
                    <p className="text-sm text-purple-600 mt-2">
                      * السعر يشمل زيادة 30% على السعر الأساسي
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <span className="font-medium text-sm">السعة:</span>
                  <span className="text-sm">{product.capacity}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <span className="font-medium text-sm">الحالة:</span>
                  <span className="text-sm">{product.condition}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <Truck size={16} className="text-blue-600 flex-shrink-0" />
                  <span className="text-sm">{product.delivery}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                  <Shield size={16} className="text-blue-600 flex-shrink-0" />
                  <span className="text-sm">{product.warranty}</span>
                </div>
              </div>

              <button
                onClick={() => product.available && addToCart(product)}
                disabled={!product.available}
                className={`mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base sm:text-lg font-medium transition-colors ${
                  product.available
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} className="flex-shrink-0" />
                إضافة إلى السلة
              </button>
            </motion.div>
          </div>

          <div className="p-4 sm:p-8 border-t">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">مواصفات المنتج</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Basic Information - Always show */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-600">
                  <Box className="flex-shrink-0" size={24} />
                  المعلومات الأساسية
                </h4>
                <div className="space-y-3">
                  {product.features.brand && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">العلامة التجارية</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.brand}</span>
                    </div>
                  )}
                  {product.features.model && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Tag size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">الموديل</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.model}</span>
                    </div>
                  )}
                  {product.features.color && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Palette size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">اللون</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.color}</span>
                    </div>
                  )}
                  {product.features.type && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Box size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">النوع</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.type}</span>
                    </div>
                  )}
                  {product.features.power && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Power size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">القدرة</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.power}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Specifications - Always show */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-600">
                  <Cpu className="flex-shrink-0" size={24} />
                  المواصفات التقنية
                </h4>
                <div className="space-y-3">
                  {product.features.coolingSystem && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Thermometer size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">نظام التبريد</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.coolingSystem}</span>
                    </div>
                  )}
                  {product.features.classification && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">التصنيف</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.classification}</span>
                    </div>
                  )}
                  {product.features.energyEfficiencyRatio && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Zap size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">نسبة كفاءة الطاقة</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.energyEfficiencyRatio}</span>
                    </div>
                  )}
                  {product.features.energyEfficiencyLevel && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">مستوى كفاءة الطاقة</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.energyEfficiencyLevel}</span>
                    </div>
                  )}
                  {product.features.coolingCapacity && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Thermometer size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">قدرة التبريد</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.coolingCapacity}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dimensions - Only show if product is available and has data */}
              {product.available && hasDimensionsData(product) && (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-600">
                    <Ruler className="flex-shrink-0" size={24} />
                    الأبعاد
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium mb-3 text-gray-800">الوحدة الداخلية</h5>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <span className="block text-xs text-gray-600 mb-1">العرض</span>
                          <span className="text-sm font-medium">{product.features.dimensions.indoor.width} مم</span>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <span className="block text-xs text-gray-600 mb-1">الارتفاع</span>
                          <span className="text-sm font-medium">{product.features.dimensions.indoor.height} مم</span>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <span className="block text-xs text-gray-600 mb-1">العمق</span>
                          <span className="text-sm font-medium">{product.features.dimensions.indoor.depth} مم</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium mb-3 text-gray-800">الوحدة الخارجية</h5>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <span className="block text-xs text-gray-600 mb-1">العرض</span>
                          <span className="text-sm font-medium">{product.features.dimensions.outdoor.width} مم</span>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <span className="block text-xs text-gray-600 mb-1">الارتفاع</span>
                          <span className="text-sm font-medium">{product.features.dimensions.outdoor.height} مم</span>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <span className="block text-xs text-gray-600 mb-1">العمق</span>
                          <span className="text-sm font-medium">{product.features.dimensions.outdoor.depth} مم</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Weight and Connections - Only show if product is available and has data */}
              {product.available && hasWeightData(product) && (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-600">
                    <Weight className="flex-shrink-0" size={24} />
                    الوزن والتوصيلات
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Weight size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">الوزن الصافي</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.weight.net} كجم</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Weight size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">الوزن الإجمالي</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.weight.total} كجم</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Ruler size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base">طول التوصيلات</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base">{product.features.dimensions.connectionLength} متر</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features List - Only show if product is available and has features */}
            {product.available && hasFeatures(product) && (
              <div className="mt-8 bg-gray-50 rounded-lg p-4 sm:p-6">
                <h4 className="text-lg font-semibold mb-4">المميزات</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {product.features.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 bg-white p-2 rounded-lg"
                    >
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}