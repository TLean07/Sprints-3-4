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
      <Card className="flex items-center gap-4 hover:shadow-2xl transition-shadow duration-300 p-4 md:p-6 overflow-hidden">
        <div className="flex-shrink-0">
          <img src={transfer.playerImageUrl} alt={transfer.playerName} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-primary-200" />
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <h3 className="font-bold text-lg md:text-xl text-gray-900 truncate">{transfer.playerName}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1 overflow-hidden">
            <span className="truncate flex-shrink-0 max-w-24">{transfer.oldClub}</span>
            <ArrowRight size={16} className="mx-2 text-primary-600 flex-shrink-0" />
            <span className="truncate flex-shrink-0 max-w-24">{transfer.newClub}</span>
          </div>
          <p className="text-sm mt-2 font-semibold text-gray-700 truncate">
            <span className="text-primary-600">Taxa:</span> {transfer.fee || 'Não Divulgado'}
          </p>
          <p className={`text-xs mt-1 font-semibold truncate ${statusColor}`}>
            {transfer.status === 'confirmed' ? 'Confirmado' : 'Rumor'} em {transfer.date}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransferCard;