import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Newspaper, 
  RefreshCcw, 
  User,
  Menu,
  X,
  Bell,
  ShoppingBag
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth'; // Assumindo que você usa este hook
import { Avatar } from '../ui/Avatar';
import { useCart } from '../../contexts/CartContext'; // Importar useCart
import { CartModal } from '../ui/CartModal'; // Importar o Modal de Carrinho
import { toast } from 'react-hot-toast'; // Importar toast para notificações

const navItems = [
  { id: 'home', label: 'Início', icon: Home, path: '/' },
  { id: 'matches', label: 'Jogos', icon: Calendar, path: '/jogos' },
  { id: 'news', label: 'Notícias', icon: Newspaper, path: '/noticias' },
  { id: 'transfers', label: 'Transferências', icon: RefreshCcw, path: '/transferencias' },
  { id: 'shop', label: 'Loja', icon: ShoppingBag, path: '/loja' },
];

export default function MobileLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar o modal do carrinho
  const { user, signOut } = useAuth();
  const { cartCount } = useCart(); // Pega a contagem de itens do carrinho
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleProfileNavigation = () => {
    if (user) {
      navigate('/perfil');
    } else {
      toast.error('Você precisa estar logado para acessar o perfil.');
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> {/* O Modal do Carrinho */}

      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <h1 className="text-xl font-bold text-primary-600">
              Passa Bola
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-live rounded-full" />
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)} // Botão do carrinho no header mobile
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </div>
              )}
            </button>
            
            {user ? (
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
                size="sm"
                className="cursor-pointer"
                onClick={handleProfileNavigation}
              />
            ) : (
              <button
                onClick={handleProfileNavigation}
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Entrar
              </button>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
            
            <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.path)}
                      className={cn(
                        'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {user && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Avatar
                      src={user.photoURL}
                      alt={user.displayName}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={signOut}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6">
            <h1 className="text-2xl font-bold text-primary-600">
              Passa Bola
            </h1>
          </div>
          
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {/* Adiciona o botão de Perfil na barra lateral do desktop */}
            <button
              onClick={handleProfileNavigation}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors',
                currentPath === '/perfil'
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </button>
          </nav>

          {user && (
            <div className="flex-shrink-0 px-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {user.displayName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={signOut}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:pl-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 z-30 shadow-2xl">
        <div className="flex items-center px-2 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  'flex-1 flex flex-col items-center py-3 px-2 mx-1 rounded-2xl transition-all duration-300 relative overflow-hidden active:scale-95',
                  isActive
                    ? 'text-primary-600 bg-primary-100 shadow-lg transform scale-105'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-2xl" />
                )}
                <Icon className={cn(
                  "transition-all duration-300 relative z-10",
                  isActive ? "w-7 h-7 mb-1" : "w-6 h-6 mb-0.5"
                )} />
                <span className={cn(
                  "text-2xs font-medium transition-all duration-300 relative z-10",
                  isActive ? "font-semibold text-primary-700" : ""
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-6 h-1 bg-primary-500 rounded-full" />
                )}
              </button>
            );
          })}
          
          <button
            onClick={handleProfileNavigation}
            className={cn(
              'flex-1 flex flex-col items-center py-3 px-2 mx-1 rounded-2xl transition-all duration-300 relative overflow-hidden active:scale-95',
              currentPath === '/perfil'
                ? 'text-primary-600 bg-primary-100 shadow-lg transform scale-105'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
          >
            {currentPath === '/perfil' && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-2xl" />
            )}
            <User className={cn(
              "transition-all duration-300 relative z-10",
              currentPath === '/perfil' ? "w-7 h-7 mb-1" : "w-6 h-6 mb-0.5"
            )} />
            <span className={cn(
              "text-2xs font-medium transition-all duration-300 relative z-10",
              currentPath === '/perfil' ? "font-semibold text-primary-700" : ""
            )}>
              Perfil
            </span>
            {currentPath === '/perfil' && (
              <div className="absolute bottom-0 w-6 h-1 bg-primary-500 rounded-full" />
            )}
          </button>
        </div>
      </nav>

      <div className="h-20 lg:hidden" />
    </div>
  );
}