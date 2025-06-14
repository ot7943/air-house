/*
  # Create homepage content tables

  1. New Tables
    - exclusive_offers: Stores the 3 fixed exclusive offer cards
    - brand_logos: Stores brand logos with activation status
    - seasonal_tips: Stores seasonal tips content
    - maintenance_guides: Stores the 3 maintenance guide cards
    - articles: Stores useful articles
    - customer_reviews: Stores customer opinions/reviews

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content
*/

-- Create exclusive_offers table (3 fixed cards)
CREATE TABLE IF NOT EXISTS exclusive_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  discount text NOT NULL,
  valid_until text NOT NULL,
  color_scheme text NOT NULL DEFAULT 'from-red-500 to-orange-500',
  active boolean DEFAULT true NOT NULL,
  display_order integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT exclusive_offers_display_order_check CHECK (display_order IN (1, 2, 3))
);

-- Create brand_logos table
CREATE TABLE IF NOT EXISTS brand_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  description text NOT NULL,
  link_path text NOT NULL,
  active boolean DEFAULT true NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create seasonal_tips table
CREATE TABLE IF NOT EXISTS seasonal_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season text NOT NULL,
  title text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Sun',
  color_scheme text NOT NULL DEFAULT 'from-orange-400 to-red-500',
  tips jsonb NOT NULL,
  active boolean DEFAULT true NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT seasonal_tips_season_check CHECK (season IN ('summer', 'winter', 'spring', 'autumn'))
);

-- Create maintenance_guides table (3 fixed cards)
CREATE TABLE IF NOT EXISTS maintenance_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  frequency text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Settings',
  active boolean DEFAULT true NOT NULL,
  display_order integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT maintenance_guides_display_order_check CHECK (display_order IN (1, 2, 3))
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  read_time text NOT NULL,
  tags text[] DEFAULT '{}',
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  comments integer DEFAULT 0,
  featured boolean DEFAULT false,
  active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create customer_reviews table
CREATE TABLE IF NOT EXISTS customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  review_date date NOT NULL DEFAULT CURRENT_DATE,
  active boolean DEFAULT true NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create updated_at triggers
CREATE TRIGGER update_exclusive_offers_updated_at
  BEFORE UPDATE ON exclusive_offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_brand_logos_updated_at
  BEFORE UPDATE ON brand_logos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_seasonal_tips_updated_at
  BEFORE UPDATE ON seasonal_tips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_maintenance_guides_updated_at
  BEFORE UPDATE ON maintenance_guides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_customer_reviews_updated_at
  BEFORE UPDATE ON customer_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS on all tables
ALTER TABLE exclusive_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasonal_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;

-- Create public read access policies
CREATE POLICY "Allow public read access to exclusive_offers"
  ON exclusive_offers
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Allow public read access to brand_logos"
  ON brand_logos
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Allow public read access to seasonal_tips"
  ON seasonal_tips
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Allow public read access to maintenance_guides"
  ON maintenance_guides
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Allow public read access to articles"
  ON articles
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Allow public read access to customer_reviews"
  ON customer_reviews
  FOR SELECT
  TO public
  USING (active = true);

-- Create admin management policies
CREATE POLICY "Allow authenticated users to manage exclusive_offers"
  ON exclusive_offers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage brand_logos"
  ON brand_logos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage seasonal_tips"
  ON seasonal_tips
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage maintenance_guides"
  ON maintenance_guides
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage articles"
  ON articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage customer_reviews"
  ON customer_reviews
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX exclusive_offers_display_order_idx ON exclusive_offers(display_order);
CREATE INDEX brand_logos_display_order_idx ON brand_logos(display_order);
CREATE INDEX seasonal_tips_display_order_idx ON seasonal_tips(display_order);
CREATE INDEX maintenance_guides_display_order_idx ON maintenance_guides(display_order);
CREATE INDEX articles_featured_idx ON articles(featured);
CREATE INDEX articles_category_idx ON articles(category);
CREATE INDEX customer_reviews_featured_idx ON customer_reviews(featured);
CREATE INDEX customer_reviews_rating_idx ON customer_reviews(rating);