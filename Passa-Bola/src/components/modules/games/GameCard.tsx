import type { Game } from '../../../types';
import { motion } from 'framer-motion';
import { 
  Play, 
  Clock, 
  Trophy, 
  MapPin,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';

const GameCard = ({ game }: { game: Game }) => {
  const getStatusInfo = () => {
    switch (game.status) {
      case 'live':
        return {
          label: 'AO VIVO',
          icon: <Play className="w-3 h-3 fill-current" />,
          color: 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg',
          pulseColor: 'bg-red-400',
          glow: 'shadow-red-400/30'
        };
      case 'finished':
        return {
          label: 'FINAL',
          icon: <Trophy className="w-3 h-3" />,
          color: 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200',
          pulseColor: 'bg-emerald-500',
          glow: ''
        };
      default: {
        const gameDate = new Date(`${game.date.split('/').reverse().join('-')}T${game.time}`);
        return {
          label: gameDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          icon: <Clock className="w-3 h-3" />,
          color: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200',
          pulseColor: 'bg-blue-500',
          glow: ''
        };
      }
    }
  };

  const statusInfo = getStatusInfo();
  const gameDate = new Date(game.date.split('/').reverse().join('-'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-card border border-white/50 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer overflow-hidden ${game.status === 'live' ? 'ring-2 ring-red-400/20' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-pink-50/50 rounded-3xl" />
      
      {game.status === 'live' && (
        <>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8], 
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="absolute -inset-2 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-3xl blur-xl"
          />
          <div className="absolute top-3 right-3">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
            />
          </div>
        </>
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/60 rounded-xl backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">
                {gameDate.toLocaleDateString('pt-BR', { 
                  weekday: 'short', 
                  day: '2-digit', 
                  month: 'short' 
                })}
              </p>
              <p className="text-xs text-gray-500">{game.league}</p>
            </div>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold backdrop-blur-sm ${statusInfo.color} ${statusInfo.glow}`}
          >
            {game.status === 'live' && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className={`w-2 h-2 rounded-full ${statusInfo.pulseColor}`} 
              />
            )}
            {statusInfo.icon}
            <span>{statusInfo.label}</span>
          </motion.div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <motion.div 
            whileHover={{ x: 2 }}
            className="flex items-center space-x-2 sm:space-x-3 flex-1 w-0"
          >
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-shadow border border-gray-100">
                <img 
                  src={game.homeTeamLogo} 
                  alt={game.homeTeam} 
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.textContent = game.homeTeam.charAt(0).toUpperCase();
                  }}
                />
                <span className="hidden text-sm font-bold text-primary-600"></span>
              </div>
              {game.status === 'live' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate text-xs sm:text-sm md:text-base group-hover:text-primary-600 transition-colors">
                {game.homeTeam.replace(' Feminino', '')}
              </p>
              <p className="text-xs text-gray-500 font-medium">Casa</p>
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center flex-shrink-0">
            <motion.p 
              whileHover={{ scale: 1.1 }}
              className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent leading-none"
            >
              {game.score ? game.score.split('-')[0] : '-'}
            </motion.p>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 180 }}
              className="my-1 px-1.5 py-0.5 bg-gradient-to-r from-primary-100 to-pink-100 text-primary-600 rounded-full text-xs font-bold border border-primary-200"
            >
              VS
            </motion.div>
            <motion.p 
              whileHover={{ scale: 1.1 }}
              className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent leading-none"
            >
              {game.score ? game.score.split('-')[1] : '-'}
            </motion.p>
          </div>

          <motion.div 
            whileHover={{ x: -2 }}
            className="flex items-center space-x-2 sm:space-x-3 flex-1 w-0 justify-end"
          >
            <div className="flex-1 min-w-0 text-right">
              <p className="font-bold text-gray-900 truncate text-xs sm:text-sm md:text-base group-hover:text-primary-600 transition-colors">
                {game.awayTeam.replace(' Feminino', '')}
              </p>
              <p className="text-xs text-gray-500 font-medium">Visitante</p>
            </div>
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-shadow border border-gray-100">
                <img 
                  src={game.awayTeamLogo} 
                  alt={game.awayTeam} 
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.textContent = game.awayTeam.charAt(0).toUpperCase();
                  }}
                />
                <span className="hidden text-sm font-bold text-primary-600"></span>
              </div>
              {game.status === 'live' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 pt-4 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-primary-100 rounded-lg">
                <MapPin className="w-3 h-3 text-primary-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium truncate">{game.venue}</span>
            </div>
            
            {game.status === 'live' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 text-xs"
              >
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-semibold">Live</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 10000) + 5000}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;