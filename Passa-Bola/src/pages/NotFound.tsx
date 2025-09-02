import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Heading } from '../components/common/Heading';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-light-bg text-center p-4"
    >
      <Heading as="h1" variant="hero" className="text-primary mb-4">
        404
      </Heading>
      <Heading as="h2" variant="section" className="text-dark-text mb-4">
        Página Não Encontrada
      </Heading>
      <p className="text-medium-gray max-w-md mt-2 mb-8">
        A página que você está procurando não existe, foi removida ou o endereço foi digitado incorretamente.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Voltar para a Home
        </Button>
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;