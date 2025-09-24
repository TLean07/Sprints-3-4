import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { WinProbability } from '../../types';

interface WinProbabilityChartProps {
  probability: WinProbability;
  className?: string;
  variant?: 'compact' | 'detailed';
}

export const WinProbabilityChart = ({ 
  probability, 
  className, 
  variant = 'compact' 
}: WinProbabilityChartProps) => {
  const { home, draw, away } = probability;
  
  const maxProb = Math.max(home, draw, away);
  const homeWidth = (home / 100) * 100;
  const drawWidth = (draw / 100) * 100;  
  const awayWidth = (away / 100) * 100;

  const getIcon = (value: number) => {
    if (value === maxProb && value > 40) return <TrendingUp className="w-3 h-3" />;
    if (value < 25) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getColor = (value: number) => {
    if (value >= 70) return 'text-win font-bold';
    if (value >= 45) return 'text-warning-600 font-semibold';
    if (value >= 25) return 'text-gray-600 font-medium';
    return 'text-loss font-medium';
  };

  if (variant === 'compact') {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="flex items-center space-x-1">
            {getIcon(home)}
            <span>Casa</span>
          </span>
          <span>Probabilidade de Vitória</span>
          <span className="flex items-center space-x-1">
            <span>Visitante</span>
            {getIcon(away)}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 h-2">
          <div 
            className="bg-primary-500 h-full rounded-l-full transition-all duration-500"
            style={{ width: `${homeWidth}%` }}
          />
          <div 
            className="bg-gray-300 h-full transition-all duration-500"
            style={{ width: `${drawWidth}%` }}
          />
          <div 
            className="bg-error-500 h-full rounded-r-full transition-all duration-500"
            style={{ width: `${awayWidth}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs">
          <span className={cn('flex items-center space-x-1', getColor(home))}>
            <span>{home}%</span>
          </span>
          <span className={cn('text-gray-500', draw > 20 && 'font-medium')}>
            Empate {draw}%
          </span>
          <span className={cn('flex items-center space-x-1', getColor(away))}>
            <span>{away}%</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-gray-50 rounded-xl p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">Probabilidade de Vitória</h4>
        <TrendingUp className="w-4 h-4 text-gray-500" />
      </div>

      <div className="space-y-4">
        {/* Casa */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Casa</span>
          <div className="flex items-center space-x-3 flex-1 ml-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${home}%` }}
              />
            </div>
            <span className={cn('text-sm font-bold min-w-[40px] text-right', getColor(home))}>
              {home}%
            </span>
          </div>
        </div>

        {/* Empate */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Empate</span>
          <div className="flex items-center space-x-3 flex-1 ml-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${draw}%` }}
              />
            </div>
            <span className={cn('text-sm min-w-[40px] text-right', draw > 25 ? 'font-semibold text-gray-700' : 'font-medium text-gray-500')}>
              {draw}%
            </span>
          </div>
        </div>

        {/* Visitante */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Visitante</span>
          <div className="flex items-center space-x-3 flex-1 ml-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-error-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${away}%` }}
              />
            </div>
            <span className={cn('text-sm font-bold min-w-[40px] text-right', getColor(away))}>
              {away}%
            </span>
          </div>
        </div>
      </div>

      {/* Prediction insight */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-2xs text-gray-500">
          <span>Atualizado</span>
          <span>•</span>
          <span>{new Date(probability.lastUpdate).toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}</span>
        </div>
      </div>
    </div>
  );
};