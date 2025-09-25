import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Badge } from './Badge';

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
  onClick: (productId: string) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
      onClick={() => onClick(product.id)}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Badge variant="danger">Esgotado</Badge>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 flex-grow mb-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
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
            e.stopPropagation(); // Evita que o clique no botão ative o onClick do card
            if (product.inStock) {
              alert(`Adicionado ${product.name} ao carrinho! (Funcionalidade a ser implementada)`);
            } else {
              toast.error('Produto esgotado!');
            }
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