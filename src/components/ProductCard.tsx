import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  index: number;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  index,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        onClick={() => navigate(`/product/${id}`)}
        className="bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 group cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-square">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
          <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            {category}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-400">
              Rs {price.toFixed(2)}
            </span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 hover:shadow-lg hover:shadow-blue-500/50">
              <ShoppingCart size={18} />
              <span className="font-medium">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
