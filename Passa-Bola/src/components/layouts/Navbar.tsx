import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User, Menu, X } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Você saiu com sucesso!');
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error('Erro ao sair.');
    }
  };

  const navItems = (
    <>
      <NavLink 
        to="/" 
        className={({isActive}) => `font-semibold hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-dark-text'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink 
        to="/noticias" 
        className={({isActive}) => `font-semibold hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-dark-text'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Notícias
      </NavLink>
      <NavLink 
        to="/jogos" 
        className={({isActive}) => `font-semibold hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-dark-text'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Jogos
      </NavLink>
      <NavLink 
        to="/transferencias" 
        className={({isActive}) => `font-semibold hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-dark-text'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Transferências
      </NavLink>
      <NavLink 
        to="/inscrever-campeonato" 
        className="font-semibold bg-primary text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
        onClick={() => setIsMenuOpen(false)}
      >
        Inscreva-se
      </NavLink>
      {user ? (
        <>
          <NavLink 
            to="/perfil" 
            className={({isActive}) => `font-semibold hover:text-primary transition-colors flex items-center gap-2 ${isActive ? 'text-primary' : 'text-dark-text'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <User size={20} /> <span className='md:hidden lg:inline'>Perfil</span>
          </NavLink>
          <button onClick={handleLogout} className="font-semibold text-dark-text hover:text-primary transition-colors flex items-center gap-2">
            <LogOut size={20} /> <span className='md:hidden lg:inline'>Sair</span>
          </button>
        </>
      ) : (
        <NavLink 
          to="/login" 
          className="font-semibold text-dark-text hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Entrar
        </NavLink>
      )}
    </>
  );

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
            <img className="h-10 w-auto" src="/logo.png" alt="Passa a Bola Logo" />
            <span className="font-heading font-bold text-xl text-secondary">
              Passa a Bola
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            {navItems}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-dark-text focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-sm shadow-inner py-4"
          >
            <div className="flex flex-col items-center space-y-4 px-4">
              {navItems}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};