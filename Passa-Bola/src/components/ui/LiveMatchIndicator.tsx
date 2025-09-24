import { useState, useEffect } from 'react';
import { Clock, Zap, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';
import type { LiveMatchData, MatchEvent } from '../../types';

interface LiveMatchIndicatorProps {
  liveData: LiveMatchData;
  recentEvents?: MatchEvent[];
  className?: string;
  variant?: 'minimal' | 'detailed';
}

export const LiveMatchIndicator = ({ 
  liveData, 
  recentEvents = [], 
  className,
  variant = 'minimal' 
}: LiveMatchIndicatorProps) => {
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPeriod = (period: string) => {
    const periodMap = {
      'first_half': '1º Tempo',
      'halftime': 'Intervalo',
      'second_half': '2º Tempo',
      'extra_time_first': 'Prorrogação 1º',
      'extra_time_second': 'Prorrogação 2º',
      'penalties': 'Pênaltis'
    };
    return periodMap[period as keyof typeof periodMap] || period;
  };

  const getMomentumColor = (momentum?: { home: number; away: number }) => {
    if (!momentum) return 'bg-gray-300';
    const diff = momentum.home - momentum.away;
    if (Math.abs(diff) < 10) return 'bg-yellow-400';
    return diff > 0 ? 'bg-primary-500' : 'bg-error-500';
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <div className={cn(
          'w-2 h-2 rounded-full bg-live transition-all duration-300',
          pulse ? 'scale-125' : 'scale-100'
        )} />
        <span className="text-sm font-medium text-live">
          {liveData.currentMinute}'
          {liveData.addedTime && `+${liveData.addedTime}`}
        </span>
        <Badge variant="live" size="sm">
          AO VIVO
        </Badge>
      </div>
    );
  }

  return (
    <div className={cn('bg-live/5 border border-live/20 rounded-xl p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={cn(
            'w-3 h-3 rounded-full bg-live transition-all duration-300',
            pulse ? 'scale-125 shadow-lg shadow-live/50' : 'scale-100'
          )} />
          <span className="font-bold text-live text-lg">
            {liveData.currentMinute}'
            {liveData.addedTime && (
              <span className="text-sm">+{liveData.addedTime}</span>
            )}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-live" />
          <Badge variant="live" size="sm" className="animate-pulse">
            AO VIVO
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {/* Period */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Período:</span>
          <span className="font-medium text-gray-900">
            {formatPeriod(liveData.period)}
          </span>
        </div>

        {/* Momentum */}
        {liveData.momentum && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>Momento do Jogo:</span>
              </span>
            </div>
            
            <div className="relative">
              <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="bg-primary-500 transition-all duration-700"
                  style={{ width: `${liveData.momentum.home}%` }}
                />
                <div 
                  className="bg-error-500 transition-all duration-700"
                  style={{ width: `${liveData.momentum.away}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span className="font-medium">Casa {liveData.momentum.home}%</span>
                <span className="font-medium">Visitante {liveData.momentum.away}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Recent Events */}
        {recentEvents.length > 0 && (
          <div className="pt-3 border-t border-live/10">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-3 h-3 text-warning-500" />
              <span className="text-xs font-medium text-gray-600">Eventos Recentes</span>
            </div>
            
            <div className="space-y-1">
              {recentEvents.slice(0, 2).map((event) => (
                <div key={event.id} className="flex items-center justify-between text-xs">
                  <span className="text-gray-900">
                    {event.minute}' - {event.description}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {event.player.displayName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last Update */}
        <div className="flex items-center justify-center pt-2 border-t border-live/10">
          <span className="text-2xs text-gray-500">
            Última atualização: {new Date(liveData.lastUpdate).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};