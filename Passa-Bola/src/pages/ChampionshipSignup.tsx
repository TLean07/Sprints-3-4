import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { saveChampionshipSignup } from '../services/api';
import { CheckCircle, Trophy, User, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  cpf: string;
}

const ChampionshipSignupPage = () => {
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '', cpf: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const formatCpf = (value: string) => {
    // Remove tudo que não for dígito
    const numericValue = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedValue = numericValue.substring(0, 11);

    // Aplica a máscara
    if (limitedValue.length <= 3) {
      return limitedValue;
    }
    if (limitedValue.length <= 6) {
      return `${limitedValue.substring(0, 3)}.${limitedValue.substring(3)}`;
    }
    if (limitedValue.length <= 9) {
      return `${limitedValue.substring(0, 3)}.${limitedValue.substring(3, 6)}.${limitedValue.substring(6)}`;
    }
    return `${limitedValue.substring(0, 3)}.${limitedValue.substring(3, 6)}.${limitedValue.substring(6, 9)}-${limitedValue.substring(9, 11)}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'cpf') {
      setFormData(prev => ({ ...prev, [name]: formatCpf(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Antes de enviar, remove a máscara para ter apenas números no CPF
      const dataToSend = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, '') // Remove pontos e traços
      };
      
      await saveChampionshipSignup(dataToSend);
      toast.success('Inscrição realizada com sucesso!');
      setIsSubmitted(true);
    } catch (error) {
      console.error("Erro ao realizar inscrição:", error);
      toast.error('Não foi possível concluir a inscrição. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Inscrição Confirmada!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Obrigado por se inscrever! Entraremos em contato em breve com mais informações.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105"
          >
            Voltar para a Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative inline-block mb-6"
          >
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <Trophy className="w-10 h-10 text-primary-600" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inscreva-se no Campeonato
          </h1>
          <p className="text-gray-600 max-w-sm mx-auto">
            Garanta sua vaga na próxima competição e mostre seu talento!
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                minLength={3}
                placeholder="Nome Completo"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                placeholder="Seu melhor e-mail"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="cpf"
                id="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
                // O pattern e maxLength são menos críticos com o formatador, mas mantidos para validação extra
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                maxLength={14} // 11 dígitos + 3 pontos + 1 traço = 14
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Finalizar Inscrição</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChampionshipSignupPage;