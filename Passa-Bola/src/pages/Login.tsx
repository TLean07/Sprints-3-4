import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Login com Google realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error("Erro no login com Google:", error);
      toast.error('Falha ao fazer login com o Google.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login realizado com sucesso!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Conta criada com sucesso!');
      }
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ocorreu um erro desconhecido.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg p-4 relative">
      <Link to="/" className="absolute top-8 left-8 text-gray-900 hover:text-pink-600 transition-colors flex items-center gap-2 font-semibold">
        <ArrowLeft size={24} /> Voltar para Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo Passa a Bola" className="w-24 h-24 mx-auto mb-4" />
          <h2 className="text-4xl font-bold font-heading text-dark-text">
            {isLogin ? 'Bem-vinda de Volta!' : 'Crie sua Conta'}
          </h2>
          <p className="text-medium-gray mt-2 font-body">
            {isLogin ? 'Acesse sua conta para continuar.' : 'Junte-se à comunidade do futebol feminino!'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            required
            minLength={6}
          />
          <Button
            type="submit"
            className="w-full"
            variant="primary"
            size="lg"
          >
            {isLogin ? 'Entrar' : 'Registrar'}
          </Button>
        </form>

        <div className="my-8 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-medium-gray font-body">OU</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <Button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border-gray-300 text-dark-text bg-white hover:bg-gray-50 transition-colors"
          variant="secondary"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
          Continuar com o Google
        </Button>

        <p className="mt-8 text-center text-sm text-medium-gray">
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-pink-600 hover:underline ml-1"
          >
            {isLogin ? 'Registre-se' : 'Faça login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;