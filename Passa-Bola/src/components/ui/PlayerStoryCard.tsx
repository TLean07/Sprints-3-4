import { forwardRef } from 'react';
import { Heart, Share2, MessageCircle, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar } from './Avatar';
import { Badge } from './Badge';

interface PlayerStory {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  playerPosition: string;
  playerTeam: string;
  storyTitle: string;
  storyContent: string;
  storyImage: string;
  publishedAt: string;
  likes: number;
  comments: number;
  shares: number;
  featured: boolean;
  category: 'inspiration' | 'achievement' | 'community' | 'training';
}

interface PlayerStoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  story: PlayerStory;
  variant?: 'default' | 'compact' | 'featured';
  onStoryClick?: (story: PlayerStory) => void;
  onPlayerClick?: (playerId: string) => void;
}

const categoryStyles = {
  inspiration: 'bg-purple-50 text-purple-700 border-purple-200',
  achievement: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  community: 'bg-pink-50 text-pink-700 border-pink-200',
  training: 'bg-blue-50 text-blue-700 border-blue-200',
};

const categoryLabels = {
  inspiration: 'Inspiração',
  achievement: 'Conquista',
  community: 'Comunidade',
  training: 'Treinamento',
};

export const PlayerStoryCard = forwardRef<HTMLDivElement, PlayerStoryCardProps>(
  ({ story, variant = 'default', onStoryClick, onPlayerClick, className, ...props }, ref) => {
    const handleStoryClick = () => {
      if (onStoryClick) {
        onStoryClick(story);
      }
    };

    const handlePlayerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onPlayerClick) {
        onPlayerClick(story.playerId);
      }
    };

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          onClick={handleStoryClick}
          className={cn(
            'bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all cursor-pointer',
            'border border-gray-100 hover:border-gray-200',
            className
          )}
          {...props}
        >
          <div className="flex space-x-3">
            <div 
              className="flex-shrink-0 cursor-pointer"
              onClick={handlePlayerClick}
            >
              <Avatar 
                src={story.playerAvatar} 
                alt={story.playerName} 
                size="md"
                className="ring-2 ring-primary-100"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant="outlined" 
                  size="sm"
                  className={categoryStyles[story.category]}
                >
                  {categoryLabels[story.category]}
                </Badge>
                {story.featured && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                {story.storyTitle}
              </h3>
              
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {story.storyContent}
              </p>
              
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center space-x-1 cursor-pointer hover:text-primary-600"
                  onClick={handlePlayerClick}
                >
                  <span className="text-xs font-medium text-gray-700">
                    {story.playerName}
                  </span>
                  <span className="text-2xs text-gray-500">
                    • {story.playerTeam}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-2xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{story.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{story.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (variant === 'featured') {
      return (
        <div
          ref={ref}
          onClick={handleStoryClick}
          className={cn(
            'relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer',
            'border border-gray-100 hover:border-primary-200',
            className
          )}
          {...props}
        >
          {/* Hero Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={story.storyImage} 
              alt={story.storyTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Featured Badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="live" size="sm" className="bg-yellow-500">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Destaque
              </Badge>
            </div>
            
            {/* Category */}
            <div className="absolute top-4 left-4">
              <Badge 
                variant="outlined" 
                size="sm"
                className="bg-white/90 backdrop-blur-sm border-white/20 text-gray-800"
              >
                {categoryLabels[story.category]}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {story.storyTitle}
            </h2>
            
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {story.storyContent}
            </p>

            {/* Player Info */}
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                onClick={handlePlayerClick}
              >
                <Avatar 
                  src={story.playerAvatar} 
                  alt={story.playerName} 
                  size="sm"
                  className="ring-2 ring-primary-100"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {story.playerName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {story.playerPosition} • {story.playerTeam}
                  </p>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{story.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{story.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">{story.shares}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        onClick={handleStoryClick}
        className={cn(
          'bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all cursor-pointer overflow-hidden',
          'border border-gray-100 hover:border-primary-200',
          className
        )}
        {...props}
      >
        {/* Story Image */}
        {story.storyImage && (
          <div className="relative h-40 overflow-hidden">
            <img 
              src={story.storyImage} 
              alt={story.storyTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge 
                variant="outlined" 
                size="sm"
                className="bg-white/90 backdrop-blur-sm border-white/20"
              >
                {categoryLabels[story.category]}
              </Badge>
            </div>
            {story.featured && (
              <div className="absolute top-3 right-3">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {story.storyTitle}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {story.storyContent}
          </p>

          {/* Player Info */}
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors"
              onClick={handlePlayerClick}
            >
              <Avatar 
                src={story.playerAvatar} 
                alt={story.playerName} 
                size="sm"
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {story.playerName}
                </p>
                <p className="text-xs text-gray-500">
                  {story.playerPosition} • {story.playerTeam}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{story.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{story.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PlayerStoryCard.displayName = 'PlayerStoryCard';