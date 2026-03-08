/*
  # Create products table for e-commerce

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Product price
      - `image_url` (text) - URL to product image
      - `category` (text) - Product category
      - `created_at` (timestamptz) - Timestamp when product was created
  
  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (e-commerce products are public)
*/

-- CREATE TABLE IF NOT EXISTS products (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   name text NOT NULL,
--   description text NOT NULL,
--   price numeric NOT NULL CHECK (price >= 0),
--   image_url text NOT NULL,
--   category text NOT NULL DEFAULT 'general',
--   created_at timestamptz DEFAULT now()
-- );

-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Anyone can view products"
--   ON products FOR SELECT
--   TO anon, authenticated
--   USING (true);
-- Create table first
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Insert data
INSERT INTO products (name, description, price, image_url, category)
VALUES
('Nike Air Max', 'Comfortable running shoes', 4999, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'shoes'),
('Adidas Hoodie', 'Premium cotton hoodie', 2999, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', 'clothing'),
('iPhone 14', 'Latest Apple smartphone', 79999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', 'electronics'),
('Gaming Laptop', 'High performance gaming laptop', 95000, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', 'electronics'),
('Leather Jacket', 'Stylish black leather jacket', 5499, 'https://images.unsplash.com/photo-1520975928316-3e2d1e2b3a4f', 'clothing'),
('Smart Watch', 'Fitness tracking smartwatch', 6999, 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b', 'electronics'),
('Running Shorts', 'Lightweight sports shorts', 999, 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7', 'clothing'),
('Bluetooth Headphones', 'Noise cancelling headphones', 3999, 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd', 'electronics'),
('Formal Shoes', 'Elegant office wear shoes', 3499, 'https://images.unsplash.com/photo-1491553895911-0055eca6402d', 'shoes'),
('Backpack', 'Durable travel backpack', 1999, 'https://images.unsplash.com/photo-1509762774605-f07235a08f1f', 'general');