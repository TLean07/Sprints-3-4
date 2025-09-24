import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

interface InteractionButtonsProps {
  initialLikes?: number;
  initialComments?: number;
  initialShares?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'minimal' | 'full';
  articleId?: string;
}

export const InteractionButtons = ({
  initialLikes = 0,
  initialComments = 0,
  initialShares = 0,
  size = 'md',
  variant = 'full',
  articleId
}: InteractionButtonsProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [shares, setShares] = useState(initialShares);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const paddingClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikes(prev => newIsLiked ? prev + 1 : Math.max(0, prev - 1));
    
    if (newIsLiked) {
      toast.success('❤️ Curtiu!', { duration: 1000 });
    }
  };

  const handleComment = () => {
    // Em uma app real, abriria modal de comentários
    toast.success('💬 Seção de comentários em breve!');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Passa a Bola - Futebol Feminino',
          text: 'Confira esta notícia incrível sobre futebol feminino!',
          url: window.location.href
        });
      } else {
        // Fallback para desktop
        await navigator.clipboard.writeText(window.location.href);
        toast.success('📋 Link copiado!');
      }
      setShares(prev => prev + 1);
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Erro ao compartilhar');
    }
  };

  const handleSave = () => {
    const newIsSaved = !isSaved;
    setIsSaved(newIsSaved);
    
    if (newIsSaved) {
      toast.success('📌 Salvo nos favoritos!');
    } else {
      toast.success('❌ Removido dos favoritos');
    }
  };

  const buttons = [
    {
      icon: Heart,
      count: likes,
      isActive: isLiked,
      activeColor: 'text-red-500',
      activeBg: 'bg-red-50',
      inactiveColor: 'text-gray-500',
      inactiveBg: 'bg-gray-50',
      onClick: handleLike,
      label: 'Curtir'
    },
    {
      icon: MessageCircle,
      count: comments,
      isActive: false,
      activeColor: 'text-blue-500',
      activeBg: 'bg-blue-50',
      inactiveColor: 'text-gray-500',
      inactiveBg: 'bg-gray-50',
      onClick: handleComment,
      label: 'Comentar'
    },
    {
      icon: Share,
      count: shares,
      isActive: false,
      activeColor: 'text-green-500',
      activeBg: 'bg-green-50',
      inactiveColor: 'text-gray-500',
      inactiveBg: 'bg-gray-50',
      onClick: handleShare,
      label: 'Compartilhar'
    }
  ];

  if (variant === 'minimal') {
    buttons.splice(1, 1); // Remove comments button for minimal version
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {buttons.map((button, index) => {
          const Icon = button.icon;
          return (
            <motion.button
              key={index}
              onClick={button.onClick}
              className={`
                flex items-center space-x-2 ${paddingClasses[size]} rounded-full transition-all duration-300
                ${button.isActive 
                  ? `${button.activeColor} ${button.activeBg}` 
                  : `${button.inactiveColor} ${button.inactiveBg} hover:${button.activeBg}`
                }
              `}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={button.isActive && button.icon === Heart ? {
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0]
                } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon 
                  className={`${sizeClasses[size]} ${
                    button.isActive && button.icon === Heart ? 'fill-current' : ''
                  }`} 
                />
              </motion.div>
              {button.count > 0 && (
                <AnimatePresence>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`${textSizeClasses[size]} font-medium`}
                  >
                    {button.count > 999 ? '999+' : button.count}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Save/Bookmark Button */}
      <motion.button
        onClick={handleSave}
        className={`
          ${paddingClasses[size]} rounded-full transition-all duration-300
          ${isSaved 
            ? 'text-primary-500 bg-primary-50' 
            : 'text-gray-500 bg-gray-50 hover:bg-primary-50 hover:text-primary-500'
          }
        `}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <Bookmark 
          className={`${sizeClasses[size]} ${isSaved ? 'fill-current' : ''}`} 
        />
      </motion.button>
    </div>
  );
};