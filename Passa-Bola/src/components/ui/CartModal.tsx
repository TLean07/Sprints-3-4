import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-end"
        >
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-white flex flex-col"
          >
            <header className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                Meu Carrinho ({cartCount})
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </header>

            {cartItems.length > 0 ? (
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-primary-600 font-bold">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-l-lg"><Minus className="w-4 h-4" /></button>
                        <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-r-lg"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-500 hover:text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">Seu carrinho está vazio</h3>
                <p className="text-gray-500 mt-2">Adicione produtos da loja para começar suas compras!</p>
              </div>
            )}

            <footer className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700">Subtotal:</span>
                <span className="text-2xl font-bold text-gray-900">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="space-y-3">
                <button
                  disabled={cartItems.length === 0}
                  className="w-full bg-gradient-to-r from-primary-500 to-pink-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                  onClick={() => alert('Funcionalidade de checkout a ser implementada!')}
                >
                  Finalizar Compra
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};