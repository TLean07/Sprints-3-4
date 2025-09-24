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
  Bell
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../ui/Avatar';

const navItems = [
  { id: 'home', label: 'Início', icon: Home, path: '/' },
  { id: 'matches', label: 'Jogos', icon: Calendar, path: '/jogos' },
  { id: 'news', label: 'Notícias', icon: Newspaper, path: '/noticias' },
  { id: 'transfers', label: 'Transferências', icon: RefreshCcw, path: '/transferencias' },
];

export default function MobileLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
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
            
            {user ? (
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
                size="sm"
                className="cursor-pointer"
                onClick={() => navigate('/perfil')}
              />
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Entrar
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
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

      {/* Desktop Sidebar */}
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
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="flex">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  'flex-1 flex flex-col items-center py-2 px-1 transition-colors',
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-2xs font-medium mt-1">
                  {item.label}
                </span>
              </button>
            );
          })}
          
          <button
            onClick={() => navigate(user ? '/perfil' : '/login')}
            className={cn(
              'flex-1 flex flex-col items-center py-2 px-1 transition-colors',
              currentPath === '/perfil'
                ? 'text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <User className="w-6 h-6" />
            <span className="text-2xs font-medium mt-1">
              Perfil
            </span>
          </button>
        </div>
      </nav>

      {/* Bottom padding to account for mobile navigation */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}