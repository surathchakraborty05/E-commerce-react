import { useEffect, useState } from 'react';
import { ShoppingBag, Search,Shirt,Laptop } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import ProductCard from './components/ProductCard';
import ProfileDropdown from './components/ProfileDropdown';
import { supabase, Product } from './lib/supabase';
import HeroCarousel from './components/HeroCarousel'
import { GiRunningShoe } from "react-icons/gi"
const categoryIcons: Record<string, React.ReactNode> = {
  shoes: <GiRunningShoe className="w-4 h-4" />,
  electronics: <Laptop className="w-4 h-4" />,
  clothing: <Shirt className="w-4 h-4" />,
  general: <ShoppingBag className="w-4 h-4" />,
}
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className=" min-h-screen bg-black relative overflow-x-hidden ">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="border-b border-blue-500/20 bg-black/40 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-blue-400" size={32} />
                <h1 className="text-2xl font-bold text-white">
                  Lux<span className="text-blue-400"> Store</span>
                </h1>
              </div>

              <div className="flex items-center gap-4 relative">
                <div className="relative w-40 sm:w-56 md:w-64">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Premium Products
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our curated collection of high-quality items
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12 items-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`hover:scale-105 flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-900/40 text-gray-300 border border-blue-500/20 hover:border-blue-400/40 hover:text-white'
                }`}
              >
                {categoryIcons[category.toLowerCase()]}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
            <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section>
        <HeroCarousel />
      </section> </div>
          {loading ? (
            
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              <p className="text-xl">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.image_url}
                  category={product.category}
                  index={index % 3}
                />
              ))}
            </div>
          )}
      
        </main>

        <footer className="border-t border-blue-500/20 bg-black/40 backdrop-blur-md mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-400">
              <p>© 2026 LuxStore. Premium e-commerce experience. Developed By Surath</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
