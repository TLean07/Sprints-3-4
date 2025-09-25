import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Heart } from 'lucide-react';
import type { PlayerStory } from '../components/ui/PlayerStoryCard';
import { Avatar } from '../components/ui/Avatar';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const StoryPage = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<PlayerStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Tentando renderizar StoryPage para storyId:", storyId); // Log de depuração

    const fetchStory = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/stories.json');
        if (!response.ok) {
          throw new Error('Arquivo de histórias não encontrado');
        }
        const stories: PlayerStory[] = await response.json();
        const foundStory = stories.find(s => s.id === storyId);
        setStory(foundStory || null);
      } catch (error) {
        console.error("Falha ao buscar a história:", error);
        setStory(null);
      } finally {
        setLoading(false);
      }
    };

    if (storyId) {
      fetchStory();
    } else {
      setLoading(false);
    }
  }, [storyId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-pink-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-primary-50 to-pink-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">História não encontrada</h1>
        <p className="text-gray-600 mb-6">O conteúdo que você está procurando não existe ou foi movido.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para a Home</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-pink-50 min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 font-semibold mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para a Home</span>
        </button>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={story.storyImage}
            alt={story.storyTitle}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {story.storyTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-b border-gray-200 py-4 mb-8">
              <div 
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <Avatar src={story.playerAvatar} alt={story.playerName} size="lg" className="group-hover:ring-primary-300 transition-shadow"/>
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{story.playerName}</p>
                  <p className="text-sm text-gray-500">{story.playerPosition} • {story.playerTeam}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Publicado em {new Date(story.publishedAt).toLocaleDateString('pt-BR', { dateStyle: 'long' })}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{story.likes.toLocaleString('pt-BR')} curtidas</span>
              </div>
            </div>
            
            <article className="prose prose-lg max-w-none text-gray-800">
              <p className="whitespace-pre-line leading-relaxed">
                {story.storyContent}
              </p>
            </article>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StoryPage;