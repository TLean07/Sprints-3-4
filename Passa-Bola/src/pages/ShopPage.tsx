import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search } from 'lucide-react';
import { ProductCard, type Product } from '../components/ui/ProductCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast';

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/products.json');
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let currentProducts = products;
    if (selectedCategory !== 'Todos') {
      currentProducts = currentProducts.filter(product => product.category === selectedCategory);
    }
    if (searchTerm) {
      currentProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(currentProducts);
  }, [searchTerm, selectedCategory, products]);

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error('Este produto está esgotado!');
      return;
    }
    addToCart(product);
  };
  
  const handleProductClick = (productId: string) => {
    alert(`Visualizando detalhes do produto: ${productId} (Página de detalhes a ser criada)`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-pink-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 pb-20 lg:pb-8">
      <div className="px-4 py-6 space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <ShoppingBag className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-600">
              Loja Oficial Passa a Bola
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Produtos Exclusivos
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Apoie o futebol feminino e mostre seu amor pelo esporte com nossos produtos únicos.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-card flex flex-col space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onCardClick={handleProductClick}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-600">
              <p className="text-lg">Nenhum produto encontrado para sua busca ou filtro.</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default ShopPage;