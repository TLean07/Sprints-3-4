import { forwardRef } from 'react';
import { TrendingUp, TrendingDown, Minus, Trophy, Users, Target } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  format?: 'number' | 'percentage' | 'currency' | 'time';
}

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  stats: StatItem[];
  icon?: React.ElementType;
  variant?: 'default' | 'compact' | 'highlight';
  theme?: 'primary' | 'success' | 'warning' | 'info';
}

const themeStyles = {
  primary: {
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    text: 'text-primary-700',
    icon: 'text-primary-600',
  },
  success: {
    bg: 'bg-success-50',
    border: 'border-success-200', 
    text: 'text-success-700',
    icon: 'text-success-600',
  },
  warning: {
    bg: 'bg-warning-50',
    border: 'border-warning-200',
    text: 'text-warning-700', 
    icon: 'text-warning-600',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-600',
  },
};

export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  ({ title, stats, icon: Icon = Trophy, variant = 'default', theme = 'primary', className, ...props }, ref) => {
    const formatValue = (value: string | number, format: StatItem['format'] = 'number') => {
      if (typeof value === 'string') return value;
      
      switch (format) {
        case 'percentage':
          return `${value}%`;
        case 'currency':
          return `R$ ${value.toLocaleString('pt-BR')}`;
        case 'time':
          return `${value}min`;
        default:
          return typeof value === 'number' ? value.toLocaleString('pt-BR') : value;
      }
    };

    const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
      switch (trend) {
        case 'up':
          return <TrendingUp className="w-3 h-3 text-success-600" />;
        case 'down':
          return <TrendingDown className="w-3 h-3 text-error-600" />;
        case 'stable':
          return <Minus className="w-3 h-3 text-gray-500" />;
        default:
          return null;
      }
    };

    const getTrendColor = (change?: number, trend?: 'up' | 'down' | 'stable') => {
      if (trend === 'stable' || !change) return 'text-gray-500';
      if (trend === 'up' || change > 0) return 'text-success-600';
      if (trend === 'down' || change < 0) return 'text-error-600';
      return 'text-gray-500';
    };

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          className={cn(
            'bg-white rounded-lg p-4 shadow-card border border-gray-100',
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={cn('p-1.5 rounded-md', themeStyles[theme].bg)}>
                <Icon className={cn('w-4 h-4', themeStyles[theme].icon)} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.slice(0, 4).map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {formatValue(stat.value, stat.format)}
                </div>
                <div className="text-2xs text-gray-500 truncate">
                  {stat.label}
                </div>
                {stat.change && (
                  <div className={cn('flex items-center justify-center space-x-1 text-2xs', getTrendColor(stat.change, stat.trend))}>
                    {getTrendIcon(stat.trend)}
                    <span>{stat.change > 0 ? '+' : ''}{stat.change}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (variant === 'highlight') {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-xl p-6 shadow-card border-2',
            themeStyles[theme].bg,
            themeStyles[theme].border,
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Icon className={cn('w-5 h-5', themeStyles[theme].icon)} />
              </div>
              <h3 className={cn('font-bold text-lg', themeStyles[theme].text)}>
                {title}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={cn('text-sm font-medium', themeStyles[theme].text)}>
                  {stat.label}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900">
                    {formatValue(stat.value, stat.format)}
                  </span>
                  {stat.change && (
                    <div className={cn('flex items-center space-x-1 text-sm', getTrendColor(stat.change, stat.trend))}>
                      {getTrendIcon(stat.trend)}
                      <span>{stat.change > 0 ? '+' : ''}{stat.change}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all',
          'border border-gray-100 hover:border-gray-200',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={cn('p-2 rounded-lg', themeStyles[theme].bg)}>
              <Icon className={cn('w-5 h-5', themeStyles[theme].icon)} />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {title}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">
                  {stat.label}
                </span>
                {getTrendIcon(stat.trend)}
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {formatValue(stat.value, stat.format)}
                </span>
                {stat.change && (
                  <span className={cn('text-sm font-medium', getTrendColor(stat.change, stat.trend))}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

StatsCard.displayName = 'StatsCard';