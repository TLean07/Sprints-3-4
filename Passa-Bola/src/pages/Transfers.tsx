import { useEffect, useState } from 'react';
import { getTransfers } from '../services/api';
import type { Transfer } from '../types';
import TransferCard from '../components/modules/transfers/TransferCard';
import { Spinner } from '../components/common/Spinner';
import { Heading } from '../components/common/Heading';
import { motion } from 'framer-motion';

const TransfersPage = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const allTransfers = await getTransfers();
        const sortedTransfers = allTransfers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTransfers(sortedTransfers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransfers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Heading variant="section" className="text-center mb-10">
        Mercado de Transferências
      </Heading>
      {loading ? (
        <div className="flex justify-center mt-10"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transfers.length > 0 ? (
            transfers.map(transfer => (
              <TransferCard key={transfer.id} transfer={transfer} />
            ))
          ) : (
            <p className="col-span-full text-center text-medium-gray">Não há transferências cadastradas no momento.</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TransfersPage;