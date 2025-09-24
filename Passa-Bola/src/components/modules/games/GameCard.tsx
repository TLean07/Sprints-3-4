import type { Game } from '../../../types';
import { motion } from 'framer-motion';
import { 
  Play, 
  Clock, 
  Trophy, 
  MapPin,
  Calendar
} from 'lucide-react';

const GameCard = ({ game }: { game: Game }) => {
  const getStatusInfo = () => {
    switch (game.status) {
      case 'live':
        return {
          label: 'AO VIVO',
          icon: <Play className="w-3 h-3" />,
          color: 'bg-red-100 text-red-700 border-red-200',
          pulseColor: 'bg-red-500'
        };
      case 'finished':
        return {
          label: 'FINAL',
          icon: <Trophy className="w-3 h-3" />,
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          pulseColor: 'bg-gray-500'
        };
      default: {
        const gameDate = new Date(`${game.date.split('/').reverse().join('-')}T${game.time}`);
        return {
          label: gameDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          icon: <Clock className="w-3 h-3" />,
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          pulseColor: 'bg-blue-500'
        };
      }
    }
  };

  const statusInfo = getStatusInfo();
  const gameDate = new Date(game.date.split('/').reverse().join('-'));

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-3xl p-6 shadow-card border border-white hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-medium">
            {gameDate.toLocaleDateString('pt-BR', { 
              weekday: 'short', 
              day: '2-digit', 
              month: 'short' 
            })}
          </span>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-bold ${statusInfo.color}`}>
          {game.status === 'live' && (
            <div className={`w-2 h-2 rounded-full animate-pulse ${statusInfo.pulseColor}`} />
          )}
          {statusInfo.icon}
          <span>{statusInfo.label}</span>
        </div>
      </div>

      {/* Teams and Score */}
      <div className="space-y-5">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img 
                src={game.homeTeamLogo} 
                alt={game.homeTeam} 
                className="w-8 h-8 object-contain" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.textContent = game.homeTeam.charAt(0).toUpperCase();
                }}
              />
              <span className="hidden text-sm font-bold text-gray-600"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate text-sm">
                {game.homeTeam.replace(' Feminino', '')}
              </p>
              <p className="text-xs text-gray-500 truncate">Casa</p>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0 ml-4">
            <p className="text-2xl font-bold text-primary-600">
              {game.score ? game.score.split('-')[0] : '-'}
            </p>
          </div>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-xs font-medium text-gray-400 bg-gray-50 rounded-full">VS</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img 
                src={game.awayTeamLogo} 
                alt={game.awayTeam} 
                className="w-8 h-8 object-contain" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.textContent = game.awayTeam.charAt(0).toUpperCase();
                }}
              />
              <span className="hidden text-sm font-bold text-gray-600"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate text-sm">
                {game.awayTeam.replace(' Feminino', '')}
              </p>
              <p className="text-xs text-gray-500 truncate">Visitante</p>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0 ml-4">
            <p className="text-2xl font-bold text-primary-600">
              {game.score ? game.score.split('-')[1] : '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Stadium Info */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-gray-500">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs truncate">{game.venue}</span>
        </div>
      </div>

      {/* Live indicator animation */}
      {game.status === 'live' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"
        />
      )}
    </motion.div>
  );
};

export default GameCard;