import { motion } from 'framer-motion';
import type { Game } from '../../../types';
import { Card } from '../../ui/Card';

type GameCardProps = {
  game: Game;
};

const GameCard = ({ game }: GameCardProps) => {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    live: 'bg-error text-white animate-pulse',
    finished: 'bg-success text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center text-sm text-medium-gray mb-4">
          <span>{game.date} - {game.time}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[game.status]}`}>
            {game.status === 'scheduled' ? 'Agendado' : game.status === 'live' ? 'Ao Vivo' : 'Finalizado'}
          </span>
        </div>
        
        <div className="flex items-center justify-center text-center gap-4 py-4">
          <div className="flex flex-col items-center flex-1">
            <img src={game.homeTeamLogo} alt={game.homeTeam} className="w-12 h-12 object-contain mb-2" />
            <span className="font-heading font-bold text-lg text-dark-text">{game.homeTeam}</span>
          </div>
          
          <div className="font-heading font-bold text-3xl text-primary flex-shrink-0">
            {game.score ? game.score : 'VS'}
          </div>
          
          <div className="flex flex-col items-center flex-1">
            <img src={game.awayTeamLogo} alt={game.awayTeam} className="w-12 h-12 object-contain mb-2" />
            <span className="font-heading font-bold text-lg text-dark-text">{game.awayTeam}</span>
          </div>
        </div>

        <div className="text-center text-sm text-medium-gray mt-4">
          <p>{game.venue}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default GameCard;