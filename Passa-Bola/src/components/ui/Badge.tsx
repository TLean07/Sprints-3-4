import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'live' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-success-50 text-success-700 border-success-200',
  error: 'bg-error-50 text-error-700 border-error-200',
  warning: 'bg-warning-50 text-warning-700 border-warning-200', 
  info: 'bg-primary-50 text-primary-700 border-primary-200',
  live: 'bg-live text-white animate-pulse-slow',
  outlined: 'bg-transparent border border-gray-300 text-gray-700',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-2xs font-medium',
  md: 'px-2.5 py-1 text-xs font-medium',
  lg: 'px-3 py-1.5 text-sm font-semibold',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-md border-0',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';