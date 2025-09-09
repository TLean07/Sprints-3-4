import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Card } from '../components/ui/Card';
import { Heading } from '../components/common/Heading';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { saveChampionshipSignup } from '../services/api';
import { CheckCircle } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  cpf: string;
}

const ChampionshipSignupPage = () => {
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '', cpf: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await saveChampionshipSignup(formData);
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 text-center"
      >
        <Card className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-success mb-4" />
          <Heading variant="subsection" className="mb-4">
            Inscrição Confirmada!
          </Heading>
          <p className="text-medium-gray">
            Obrigada por se inscrever! Entraremos em contato em breve com mais informações.
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12"
    >
      <Card>
        <div className="text-center mb-8">
          <Heading variant="section">Inscreva-se no Campeonato</Heading>
          <p className="text-medium-gray mt-2">
            Preencha o formulário abaixo para garantir sua vaga na próxima competição.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
              minLength={3}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Finalizar Inscrição'}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default ChampionshipSignupPage;