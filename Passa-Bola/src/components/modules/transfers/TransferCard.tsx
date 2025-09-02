import { motion } from 'framer-motion';
import type { Transfer } from '../../../types';
import { Card } from '../../ui/Card';
import { ArrowRight } from 'lucide-react';

type TransferCardProps = {
  transfer: Transfer;
};

const TransferCard = ({ transfer }: TransferCardProps) => {
  const statusColor = transfer.status === 'confirmed' ? 'text-success' : 'text-orange-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="flex items-center gap-4 hover:shadow-xl transition-shadow duration-300">
        <img src={transfer.playerImageUrl} alt={transfer.playerName} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
        <div className="flex-grow">
          <h3 className="font-heading font-bold text-xl text-dark-text">{transfer.playerName}</h3>
          <div className="flex items-center text-medium-gray text-sm mt-1">
            <span>{transfer.oldClub}</span>
            <ArrowRight size={16} className="mx-2 text-primary" />
            <span>{transfer.newClub}</span>
          </div>
          <p className="text-sm mt-1">
            <span className="font-semibold text-primary">Taxa:</span> {transfer.fee || 'Não Divulgado'}
          </p>
          <p className={`text-xs mt-1 font-semibold ${statusColor}`}>
            {transfer.status === 'confirmed' ? 'Confirmado' : 'Rumor'} em {transfer.date}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransferCard;