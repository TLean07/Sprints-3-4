import { motion } from 'framer-motion';
import type { Transfer } from '../../../types';
import { Card } from '../../ui/Card';
import { ArrowRight } from 'lucide-react';

type TransferCardProps = {
  transfer: Transfer;
};

const TransferCard = ({ transfer }: TransferCardProps) => {
  const statusColor = transfer.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="h-full"
    >
      <Card className="flex items-center gap-6 hover:shadow-2xl transition-shadow duration-300 p-6">
        <img src={transfer.playerImageUrl} alt={transfer.playerName} className="w-24 h-24 rounded-full object-cover flex-shrink-0 border-4 border-gold-accent" />
        <div className="flex-grow">
          <h3 className="font-heading font-extrabold text-xl text-dark-text">{transfer.playerName}</h3>
          <div className="flex items-center text-medium-gray text-sm mt-1">
            <span>{transfer.oldClub}</span>
            <ArrowRight size={18} className="mx-2 text-pink-600" />
            <span>{transfer.newClub}</span>
          </div>
          <p className="text-sm mt-2 font-semibold">
            <span className="text-purple-800">Taxa:</span> {transfer.fee || 'Não Divulgado'}
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