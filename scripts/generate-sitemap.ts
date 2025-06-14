import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Create Supabase client directly instead of importing from src
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateSitemap() {
  try {
    // Fetch all products from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('id, updated_at')
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Define static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: 'checkout', priority: '0.7', changefreq: 'monthly' },
      { url: 'brands/sharp', priority: '0.8', changefreq: 'weekly' },
      { url: 'brands/carrier', priority: '0.8', changefreq: 'weekly' },
      { url: 'brands/midea', priority: '0.8', changefreq: 'weekly' },
      { url: 'brands/haier', priority: '0.8', changefreq: 'weekly' },
      { url: 'brands/tornado', priority: '0.8', changefreq: 'weekly' },
      { url: 'brands/fresh', priority: '0.8', changefreq: 'weekly' },
      { url: 'brands/unionaire', priority: '0.8', changefreq: 'weekly' },
      { url: 'articles', priority: '0.7', changefreq: 'weekly' },
      { url: 'installment/bank', priority: '0.6', changefreq: 'monthly' },
      { url: 'info/contact', priority: '0.6', changefreq: 'monthly' },
      { url: 'policies', priority: '0.5', changefreq: 'monthly' },
    ];

    // Generate XML content
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    staticPages.forEach(page => {
      sitemapContent += `  <url>
    <loc>https://www.airhouse.shop/${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    // Add product pages
    products.forEach(product => {
      sitemapContent += `  <url>
    <loc>https://www.airhouse.shop/p/${product.id}</loc>
    <lastmod>${new Date(product.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    sitemapContent += `</urlset>`;

    // Ensure public directory exists
    const publicDir = join(rootDir, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Write sitemap file
    fs.writeFileSync(join(publicDir, 'sitemap.xml'), sitemapContent);
    console.log('✅ Sitemap generated successfully!');
    console.log(`📊 Total URLs: ${products.length + staticPages.length}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();