import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { 
  ArrowLeft,
  Mail,
  Shield,
  CheckCircle,
  AlertCircle,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor, insira seu e-mail');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      toast.success('✉️ E-mail de redefinição enviado!');
    } catch (error: any) {
      const errorMessage = 
        error.code === 'auth/user-not-found' ? 'E-mail não encontrado' :
        error.code === 'auth/invalid-email' ? 'E-mail inválido' :
        error.code === 'auth/too-many-requests' ? 'Muitas tentativas. Tente novamente mais tarde' :
        'Erro ao enviar e-mail de redefinição';
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    handleSubmit({ preventDefault: () => {} } as FormEvent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-300/20 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300/20 rounded-full animate-bounce delay-1000" />
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse delay-500" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <button 
            onClick={() => navigate('/configuracoes')}
            className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300 active:scale-95"
          >
            <div className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Voltar</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Icon and Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="relative inline-block mb-6"
              >
                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  {emailSent ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <Shield className="w-8 h-8 text-primary-600" />
                  )}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {emailSent ? 'E-mail Enviado!' : 'Redefinir Senha'}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 max-w-sm mx-auto"
              >
                {emailSent 
                  ? 'Verificamos sua caixa de e-mail para redefinir sua senha'
                  : 'Insira seu e-mail para receber as instruções de redefinição'
                }
              </motion.p>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              {!emailSent ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      placeholder="Seu e-mail cadastrado"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      required
                    />
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
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      'Enviar E-mail'
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  {/* Success Message */}
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <div className="flex items-center space-x-3 text-green-800">
                      <CheckCircle className="w-6 h-6" />
                      <div className="text-left">
                        <h3 className="font-semibold">E-mail enviado com sucesso!</h3>
                        <p className="text-sm mt-1">
                          Verifique sua caixa de entrada em <strong>{email}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-left space-y-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">Próximos passos:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Verifique sua caixa de entrada e spam</li>
                          <li>• Clique no link de redefinição</li>
                          <li>• Crie uma nova senha segura</li>
                          <li>• Faça login com a nova senha</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleResendEmail}
                      disabled={loading}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-2xl font-medium transition-all disabled:opacity-70"
                    >
                      Reenviar E-mail
                    </button>
                    
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full bg-primary-100 hover:bg-primary-200 text-primary-700 py-3 rounded-2xl font-medium transition-all"
                    >
                      Voltar ao Login
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;