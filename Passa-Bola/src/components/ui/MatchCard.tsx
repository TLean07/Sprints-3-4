import { forwardRef } from 'react';
import { Calendar, MapPin, Clock, TrendingUp } from 'lucide-react';
import { cn, formatDate, formatTime, getMatchStatus } from '../../lib/utils';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { WinProbabilityChart } from './WinProbabilityChart';
import { LiveMatchIndicator } from './LiveMatchIndicator';
import type { Match } from '../../types';

interface MatchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  match: Match;
  variant?: 'default' | 'compact' | 'detailed';
  showProbability?: boolean;
  onMatchClick?: (match: Match) => void;
}

export const MatchCard = forwardRef<HTMLDivElement, MatchCardProps>(
  ({ match, variant = 'default', showProbability = false, onMatchClick, className, ...props }, ref) => {
    const { label: statusLabel, color: statusColor } = getMatchStatus(match.status);
    const isLive = match.status === 'live';
    const isFinished = match.status === 'finished';
    
    const handleClick = () => {
      if (onMatchClick) {
        onMatchClick(match);
      }
    };

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          onClick={handleClick}
          className={cn(
            'bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer',
            'border border-gray-100 hover:border-gray-200',
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <Avatar src={match.homeTeam.logo} alt={match.homeTeam.name} size="sm" />
              <span className="font-medium text-gray-900 text-sm truncate">
                {match.homeTeam.shortName}
              </span>
            </div>
            
            {/* Score or Time */}
            <div className="flex items-center px-3">
              {match.score ? (
                <span className={cn(
                  'text-lg font-bold',
                  isLive ? 'text-live' : 'text-gray-900'
                )}>
                  {match.score.home} - {match.score.away}
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  {formatTime(match.startTime)}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3 flex-1 justify-end">
              <span className="font-medium text-gray-900 text-sm truncate">
                {match.awayTeam.shortName}
              </span>
              <Avatar src={match.awayTeam.logo} alt={match.awayTeam.name} size="sm" />
            </div>
          </div>
          
          {/* Status */}
          <div className="mt-3 flex items-center justify-center">
            <Badge variant={statusColor as any} size="sm">
              {statusLabel}
            </Badge>
          </div>
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
          isLive && 'ring-2 ring-live/20',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img 
              src={match.competition.logo} 
              alt={match.competition.name}
              className="w-5 h-5 rounded"
            />
            <span className="text-sm font-medium text-gray-600">
              {match.competition.shortName}
            </span>
          </div>
          
          <Badge 
            variant={statusColor as any} 
            size="sm"
            className={isLive ? 'animate-pulse' : ''}
          >
            {statusLabel}
          </Badge>
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between mb-4">
          {/* Home Team */}
          <div className="flex items-center space-x-3 flex-1">
            <Avatar 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name} 
              size="lg"
              className="shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {match.homeTeam.shortName}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {match.homeTeam.name}
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="flex-shrink-0 text-center px-4">
            {match.score ? (
              <div>
                <div className={cn(
                  'text-3xl font-bold',
                  isLive ? 'text-live' : 'text-gray-900'
                )}>
                  {match.score.home} - {match.score.away}
                </div>
                {match.liveData && (
                  <div className="text-xs text-gray-500 mt-1">
                    {match.liveData.currentMinute}'
                    {match.liveData.addedTime && `+${match.liveData.addedTime}`}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="text-lg font-semibold text-gray-700">
                  {formatTime(match.startTime)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatDate(match.startTime)}
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="min-w-0 flex-1 text-right">
              <h3 className="font-semibold text-gray-900 truncate">
                {match.awayTeam.shortName}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {match.awayTeam.name}
              </p>
            </div>
            <Avatar 
              src={match.awayTeam.logo} 
              alt={match.awayTeam.name} 
              size="lg"
              className="shadow-sm"
            />
          </div>
        </div>

        {/* Win Probability - Enhanced */}
        {showProbability && match.winProbability && (
          <div className="mb-4">
            <WinProbabilityChart 
              probability={match.winProbability} 
              variant="compact"
            />
          </div>
        )}

        {/* Live Match Data */}
        {isLive && match.liveData && (
          <div className="mb-4">
            <LiveMatchIndicator 
              liveData={match.liveData}
              recentEvents={match.events?.slice(-2)}
              variant="detailed"
            />
          </div>
        )}

        {/* Match Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{match.venue.name}</span>
            </div>
            {match.round && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{match.round}</span>
              </div>
            )}
          </div>
          
          {isLive && match.liveData && (
            <div className="flex items-center space-x-1 text-live">
              <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
              <Clock className="w-3 h-3" />
              <span>Ao Vivo</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MatchCard.displayName = 'MatchCard';