import { motion } from 'framer-motion';
import { Heart, Star, Trophy } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcons?: boolean;
}

export const LoadingSpinner = ({ 
  message = 'Carregando...', 
  size = 'md',
  showIcons = true 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Main Spinner */}
      <div className="relative">
        <motion.div
          className={`border-4 border-gray-200 border-t-primary-500 rounded-full ${sizeClasses[size]}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-primary-500 text-xs font-bold">
            ⚽
          </div>
        </div>
      </div>

      {/* Floating Icons */}
      {showIcons && (
        <div className="relative w-32 h-8">
          <motion.div
            className="absolute left-0 top-0"
            animate={{ 
              y: [0, -8, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 0
            }}
          >
            <Heart className={`${iconSize[size]} text-red-400`} />
          </motion.div>
          
          <motion.div
            className="absolute left-1/2 top-0 transform -translate-x-1/2"
            animate={{ 
              y: [0, -8, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 0.7
            }}
          >
            <Star className={`${iconSize[size]} text-yellow-400`} />
          </motion.div>
          
          <motion.div
            className="absolute right-0 top-0"
            animate={{ 
              y: [0, -8, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 1.4
            }}
          >
            <Trophy className={`${iconSize[size]} text-green-400`} />
          </motion.div>
        </div>
      )}

      {/* Loading Message */}
      <motion.p
        className="text-gray-600 text-sm font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
};