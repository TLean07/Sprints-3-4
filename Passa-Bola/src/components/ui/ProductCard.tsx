import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

interface ProductCardProps {
  product: Product;
  onCardClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onCardClick, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full group"
      onClick={() => onCardClick(product.id)}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full">Esgotado</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xl font-bold text-primary-600">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({product.reviewsCount})</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={!product.inStock}
          className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-xl transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.inStock ? 'Adicionar ao Carrinho' : 'Esgotado'}</span>
        </button>
      </div>
    </motion.div>
  );
};