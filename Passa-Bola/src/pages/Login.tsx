import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Heart,
  Star,
  Trophy
} from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('✨ Login realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error("Erro no login com Google:", error);
      toast.error('Erro ao fazer login com Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('🎉 Bem-vinda de volta!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('🌟 Conta criada com sucesso!');
      }
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.code === 'auth/user-not-found' ? 'Usuário não encontrado' :
        error.code === 'auth/wrong-password' ? 'Senha incorreta' :
        error.code === 'auth/email-already-in-use' ? 'E-mail já está em uso' :
        error.code === 'auth/weak-password' ? 'Senha muito fraca (mín. 6 caracteres)' :
        'Erro na autenticação';
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/attached_assets/stock_images/mobile_app_login_bac_46f0d577.jpg" 
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-pink-500/10" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-300/20 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300/20 rounded-full animate-bounce delay-1000" />
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse delay-500" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300 active:scale-95"
          >
            <div className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Voltar</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/80 backdrop-blur-sm rounded-full">
              <Heart className="w-4 h-4 text-primary-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Logo and Welcome */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="relative inline-block mb-6"
              >
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <div className="text-3xl font-bold text-primary-600">⚽</div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {isLogin ? 'Bem-vinda de volta!' : 'Junte-se a nós!'}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 max-w-sm mx-auto"
              >
                {isLogin 
                  ? 'Entre na maior comunidade de futebol feminino da América Latina'
                  : 'Crie sua conta e faça parte da revolução do futebol feminino'
                }
              </motion.p>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Aguarde...</span>
                    </div>
                  ) : (
                    isLogin ? 'Entrar' : 'Criar Conta'
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                {/* Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-3 shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continuar com Google</span>
                </button>
              </form>

              {/* Switch Mode */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {isLogin ? 'Criar conta' : 'Fazer login'}
                  </button>
                </p>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-4 text-center"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                <Heart className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Comunidade</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Conteúdo</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                <Trophy className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Empoderamento</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;