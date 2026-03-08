import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Heart,Truck } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';

export default function ProductDetails() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [iscartlisted, setIscartlisted] = useState(false);
  const handleOrderNow = () => {
  if (!product) return;

  navigate("/OrderSummary", {
    state: {
      products: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image_url: product.image_url,
          category: product.category,
        },
      ],
    },
  });
};
  useEffect(() => {
    if (!id) return;
    fetchProduct();
    
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        navigate('/');
        return;
      }
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    setCurrentUser(JSON.parse(user));
  }
}, []);
const toggleWishlist = async () => {
  if (!currentUser || !product) {
    console.log("Current User:", currentUser);
    console.log("Product:", product);
    return;
  }

  try {
    // Pehle check karo agar already wishlisted hai
    const { data: existing, error: checkError } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", currentUser.id)
      .eq("product_id", product.id)
      .limit(1);

    if (checkError) {
      console.log("Error checking wishlist:", checkError);
      return;
    }

    if (existing && existing.length >0) {
      // Agar already wishlist me hai → delete karo
      const { error: deleteError } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", existing[0].id);

      if (deleteError) {
        console.log("Delete Error:", deleteError);
        return;
      }

      setIsWishlisted(false);
      console.log("Removed from wishlist");
    } else {
      // Agar nahi hai → insert karo
      console.log("USER:",currentUser);
      console.log("Product:",product);
      const { data: insertData, error: insertError } = await supabase
        .from("wishlist")
        .insert([
          {
            user_id: currentUser.id,
            product_id: product.id,
            product_name: product.name,
            product_image: product.image_url,
            product_price: Number(product.price)
          },
        ])
        .select();

      if (insertError) {
        console.log("Insert Error:", insertError);
        return;
      }

      setIsWishlisted(true);
      console.log("Added to wishlist:", insertData);
    }
  } catch (err) {
    console.log("Wishlist toggle failed:", err);
  }
};
const togglecartlist = async () => {
  if (!currentUser || !product) {
    console.log("Current User:", currentUser);
    console.log("Product:", product);
    return;
  }

  try {
    // Pehle check karo agar already wishlisted hai
    const { data: existing, error: checkError } = await supabase
      .from("cart")
      .select("id")
      .eq("user_id", currentUser.id)
      .eq("product_id", product.id)
      .limit(1);

    if (checkError) {
      console.log("Error checking wishlist:", checkError);
      return;
    }

    if (existing?.length && existing.length >0) {
      // Agar already wishlist me hai → delete karo
      const { error: deleteError } = await supabase
        .from("cart")
        .delete()
        .eq("id", existing[0].id);

      if (deleteError) {
        console.log("Delete Error:", deleteError);
        return;
      }

      setIscartlisted(false);
      console.log("Removed from wishlist");
    } else {
      // Agar nahi hai → insert karo
      console.log("USER:",currentUser);
      console.log("Product:",product);
      const { data: insertData, error: insertError } = await supabase
        .from("cart")
        .insert([
          {
            user_id: currentUser.id,
            product_id: product.id,
            product_name: product.name,
            product_image: product.image_url,
            product_price: Number(product.price)
          },
        ])
        .select();

      if (insertError) {
        console.log("Insert Error:", insertError);
        return;
      }

      setIscartlisted(true);
      console.log("Added to wishlist:", insertData);
    }
  } catch (err) {
    console.log("Wishlist toggle failed:", err);
  }
};
// const checkWishlistStatus = async () => {
//   // const { data: { user } } = await supabase.auth.getUser();
//   // if (!user || !product) return;
//     const userId = "test-user-123";
//     user_Id = userId;
//   const { data, error } = await supabase
//     .from('wishlist')
//     .select('*')
//     .eq('user_id', user.id)
//     .eq('product_id', product.id)
//     .maybeSingle();
//   if(error) {
//     console.log("Some, error occured");
//     return;
//   }
//   if (data) {
//     setIsWishlisted(true);
//   } else {
//     setIsWishlisted(false);
//   }
// };
const checkcartlistStatus = async () => {
  //const { data: { user } } = await supabase.auth.getUser();
  if (!currentUser || !product) return;

  const { data } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", currentUser.id)
    .eq("product_id", product.id)
    .maybeSingle();

  if (data) {
    setIscartlisted(true);
  } else {
    setIscartlisted(false);
  }
}
  const checkWishlistStatus = async () => {
  //const { data: { user } } = await supabase.auth.getUser();
  if (!currentUser || !product) return;

  const { data } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", currentUser.id)
    .eq("product_id", product.id)
    .maybeSingle();

  if (data) {
    setIsWishlisted(true);
  } else {
    setIsWishlisted(false);
  }
  // if (error) {
  //   console.log("Error checking wishlist:", error);
  //   return;
  // }

  // setIsWishlisted(!!data);
};
//   useEffect(() => {
//   if (product) {
//     checkWishlistStatus();
//     const user = localStorage.getItem("user");
//     if (user) {
//     setCurrentUser(JSON.parse(user));
//     }
//   }
// }, [product]);
  useEffect(() => {
  if (product && currentUser) {
    checkWishlistStatus();
    checkcartlistStatus();
  }
}, [product, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative">
      <div className="relative z-10">
        <button
          onClick={() => navigate('/')}
          className="sticky top-4 left-4 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 hover:shadow-lg hover:shadow-blue-500/50"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square rounded-xl overflow-hidden border border-blue-500/20">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < 4
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(128 reviews)</span>
              </div>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-8">
                <p className="text-gray-400 text-sm mb-2">Premium Quality</p>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ 100% Authentic & Original</li>
                  <li>✓ Free Shipping on Orders</li>
                  <li>✓ 30-Day Money Back Guarantee</li>
                  <li>✓ 1 Year Warranty Included</li>
                </ul>
              </div>

              <div className="border-t border-blue-500/20 pt-8">
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-5xl font-bold text-blue-400">
                    Rs{product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through text-lg">
                    Rs{(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm font-medium">
                    Save 20%
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border border-blue-500/20 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 text-white font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {Math.floor(Math.random() * 50) + 10} in stock
                  </span>
                </div>

                <div className="flex gap-4">
                  <button onClick={togglecartlist} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
    ${iscartlisted 
      ? 'bg-green-500 text-white shadow-lg scale-105' 
      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50'
    }`}>
                    <ShoppingCart size={22} />
                     {iscartlisted ? 'Added!' : 'Add to Cart'}
                  </button>
                  <button onClick={handleOrderNow} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
    <Truck size={20} />
    Order Now
  </button>
                  <button
                    onClick={toggleWishlist}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                      isWishlisted
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-gray-900/40 text-gray-300 border border-blue-500/20 hover:border-blue-400/40'
                    }`}
                  >
                    <Heart
                      size={22}
                      fill={isWishlisted ? 'currentColor' : 'none'}
                    />
                    Wishlist
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-gray-900/40 border border-blue-500/20 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Delivery</p>
                    <p className="text-white font-semibold">Free Shipping</p>
                  </div>
                  <div className="bg-gray-900/40 border border-blue-500/20 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Returns</p>
                    <p className="text-white font-semibold">30 Days Easy</p>
                  </div>
                  <div className="bg-gray-900/40 border border-blue-500/20 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Support</p>
                    <p className="text-white font-semibold">24/7 Help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
