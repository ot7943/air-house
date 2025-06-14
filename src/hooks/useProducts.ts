import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

interface FilterOptions {
  brand?: string;
}

export function useProducts(page: number = 1, perPage: number = 9, filters: FilterOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase
          .from('products')
          .select('*', { count: 'exact' });

        // Apply filters
        if (filters.brand) {
          query = query.eq('brand', filters.brand);
        }

        // Get total count
        const { count, error: countError } = await query.select('*', { 
          count: 'exact',
          head: true 
        });

        if (countError) throw countError;
        setTotalCount(count || 0);

        // Fetch paginated data
        const { data, error } = await query
          .range((page - 1) * perPage, page * perPage - 1)
          .order('created_at', { ascending: false })
          .order('price', { ascending: false })
          .order('available', { ascending: false });

        if (error) throw error;

        const transformedProducts: Product[] = data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          discountedPrice: item.discounted_price || undefined,
          image: item.image,
          available: item.available,
          capacity: item.capacity,
          condition: item.condition,
          delivery: item.delivery,
          warranty: item.warranty,
          features: {
            brand: item.brand,
            model: item.model,
            color: item.color,
            type: item.type,
            power: item.cooling_capacity,
            coolingSystem: item.cooling_system,
            classification: item.classification,
            energyEfficiencyRatio: item.energy_efficiency_ratio,
            energyEfficiencyLevel: item.energy_efficiency_level,
            coolingCapacity: item.cooling_capacity,
            dimensions: {
              indoor: {
                width: item.indoor_width,
                height: item.indoor_height,
                depth: item.indoor_depth,
              },
              outdoor: {
                width: item.outdoor_width,
                height: item.outdoor_height,
                depth: item.outdoor_depth,
              },
              connectionLength: item.connection_length,
            },
            weight: {
              net: item.net_weight,
              total: item.gross_weight,
            },
            features: [
              item.feature_1,
              item.feature_2,
              item.feature_3,
              item.feature_4,
              item.feature_5,
              item.feature_6,
              item.feature_7,
              item.feature_8,
              item.feature_9,
              item.feature_10,
              item.feature_11,
              item.feature_12,
              item.feature_13,
              item.feature_14,
              item.feature_15,
              item.feature_16,
              item.feature_17,
              item.feature_18,
              item.feature_19,
              item.feature_20,
            ].filter(Boolean) as string[],
          }
        }));

        setProducts(transformedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, perPage, filters.brand]);

  return { products, loading, error, totalCount };
}