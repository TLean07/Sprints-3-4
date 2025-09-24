import { forwardRef } from 'react';
import { User, TrendingUp, Award } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import type { Player } from '../../types';

interface PlayerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  player: Player;
  variant?: 'default' | 'compact' | 'stats';
  showStats?: boolean;
  onPlayerClick?: (player: Player) => void;
}

const positionColors = {
  GK: 'bg-yellow-100 text-yellow-800',
  DEF: 'bg-blue-100 text-blue-800',
  MID: 'bg-green-100 text-green-800',
  FWD: 'bg-red-100 text-red-800',
};

const positionLabels = {
  GK: 'Goleira',
  DEF: 'Defesa',
  MID: 'Meio-campo',
  FWD: 'Ataque',
};

export const PlayerCard = forwardRef<HTMLDivElement, PlayerCardProps>(
  ({ player, variant = 'default', showStats = false, onPlayerClick, className, ...props }, ref) => {
    const handleClick = () => {
      if (onPlayerClick) {
        onPlayerClick(player);
      }
    };

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          onClick={handleClick}
          className={cn(
            'flex items-center space-x-3 p-3 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all cursor-pointer',
            'border border-gray-100 hover:border-gray-200',
            className
          )}
          {...props}
        >
          <div className="relative">
            <Avatar 
              src={player.avatar} 
              alt={player.name} 
              size="md"
              fallback={player.displayName.split(' ').map(n => n[0]).join('')}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {player.shirtNumber}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">
              {player.displayName}
            </h4>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outlined" 
                size="sm"
                className={positionColors[player.position]}
              >
                {positionLabels[player.position]}
              </Badge>
              <span className="text-sm text-gray-500">
                {player.age} anos
              </span>
            </div>
          </div>

          {showStats && (
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {player.stats.goals}G
              </div>
              <div className="text-xs text-gray-500">
                {player.stats.assists}A
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={cn(
          'bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer',
          'border border-gray-100 hover:border-gray-200',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <Avatar 
              src={player.avatar} 
              alt={player.name} 
              size="xl"
              fallback={player.displayName.split(' ').map(n => n[0]).join('')}
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-800 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-sm">
              {player.shirtNumber}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 truncate">
              {player.displayName}
            </h3>
            <p className="text-sm text-gray-500 truncate mb-2">
              {player.name}
            </p>
            
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outlined"
                className={positionColors[player.position]}
              >
                {positionLabels[player.position]}
              </Badge>
              <span className="text-sm text-gray-500">
                {player.nationality}
              </span>
            </div>
          </div>

          {/* Rating */}
          {player.stats.rating > 0 && (
            <div className="text-center">
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold',
                player.stats.rating >= 8.0 ? 'bg-green-500' :
                player.stats.rating >= 7.0 ? 'bg-yellow-500' :
                player.stats.rating >= 6.0 ? 'bg-orange-500' : 'bg-red-500'
              )}>
                {player.stats.rating.toFixed(1)}
              </div>
              <span className="text-xs text-gray-500 mt-1">Rating</span>
            </div>
          )}
        </div>

        {/* Physical Info */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {player.age}
            </div>
            <div className="text-xs text-gray-500">Anos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {player.height}cm
            </div>
            <div className="text-xs text-gray-500">Altura</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {player.weight}kg
            </div>
            <div className="text-xs text-gray-500">Peso</div>
          </div>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-success-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success-600" />
                <span className="text-sm font-medium text-success-800">Desempenho</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-success-700">Gols:</span>
                  <span className="font-semibold text-success-900">{player.stats.goals}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-success-700">Assistências:</span>
                  <span className="font-semibold text-success-900">{player.stats.assists}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-success-700">Jogos:</span>
                  <span className="font-semibold text-success-900">{player.stats.appearances}</span>
                </div>
              </div>
            </div>

            <div className="bg-warning-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-4 h-4 text-warning-600" />
                <span className="text-sm font-medium text-warning-800">Disciplina</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-warning-700">Cartões Amarelos:</span>
                  <span className="font-semibold text-warning-900">{player.stats.yellowCards}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warning-700">Cartões Vermelhos:</span>
                  <span className="font-semibold text-warning-900">{player.stats.redCards}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warning-700">Minutos:</span>
                  <span className="font-semibold text-warning-900">{player.stats.minutesPlayed}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PlayerCard.displayName = 'PlayerCard';