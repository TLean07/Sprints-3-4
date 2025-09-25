import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Heart, 
  Calendar,
  Award,
  Target,
  Star,
  ArrowRight,
  PlayCircle,
  Trophy
} from 'lucide-react';
import { PlayerStoryCard, type PlayerStory } from '../components/ui/PlayerStoryCard';
import { StatsCard } from '../components/ui/StatsCard';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { cn } from '../lib/utils';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const communityStats = [
  { label: 'Jogadoras Cadastradas', value: 2847, change: 12, trend: 'up' as const },
  { label: 'Torcedoras Ativas', value: 45620, change: 8, trend: 'up' as const },
  { label: 'Clubes Parceiros', value: 127, change: 5, trend: 'up' as const },
  { label: 'Histórias Publicadas', value: 892, change: 15, trend: 'up' as const }
];

const todaysHighlights = [
  {
    type: 'match' as const,
    title: 'Corinthians x Palmeiras - Hoje às 19h',
    subtitle: 'Clássico Paulista pelo Brasileirão Feminino',
    image: 'https://s2-ge.glbimg.com/pE0_NVQwlJDyrNURorgjxLjY0PM=/0x0:787x519/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/d/E/dPvWU2Q52YbQLc03zjAg/20210908145219-825.png',
    badge: 'Ao Vivo em 2h',
    badgeVariant: 'live' as const
  },
  {
    type: 'achievement' as const,
    title: 'Gabi Portilho: Artilheira do Mês',
    subtitle: '8 gols em 5 partidas pelo Corinthians',
    image: 'https://static.corinthians.com.br/uploads/1734460948ecb9fe2fbb99c31f567e9823e884dbec.jpg',
    badge: 'Conquista',
    badgeVariant: 'success' as const
  },
  {
    type: 'community' as const,
    title: 'Campanha #PassaABola',
    subtitle: '10mil compartilhamentos em 24h',
    image: '/attached_assets/stock_images/Gemini_Generated_Image_s2jcels2jcels2jc.png',
    badge: 'Trending',
    badgeVariant: 'info' as const
  }
];

const recentPlayers = [
  {
    name: 'Tamires',
    team: 'Corinthians',
    position: 'Lateral-Esquerda',
    avatar: 'https://centraldotimao.com.br/wp-content/uploads/2021/10/7b758aec-804b-4075-922c-28ec9248ea41.png',
    rating: 8.7,
    trending: true
  },
  {
    name: 'Ary Borges',
    team: 'Racing Louisville',
    position: 'Volante',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQKp-YrgHBkg11eR_UP4hb1EJbvoJh0Nj7_g&s',
    rating: 8.4,
    trending: false
  },
  {
    name: 'Antônia',
    team: 'Levante',
    position: 'Atacante',
    avatar: 'https://midias.correiobraziliense.com.br/_midias/jpg/2023/07/18/675x450/1_copadomundofeminina_selecaobrasileira_futebolfeminino_antonia_1_570x321_png-28517430.jpg?20230718121919?20230718121919',
    rating: 8.9,
    trending: true
  }
];

export default function Home() {
  const [stories, setStories] = useState<PlayerStory[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/stories.json');
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Failed to load stories:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, []);

  useEffect(() => {
    if (stories.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [stories]);

  const handleStoryClick = (storyId: string) => {
    navigate(`/historias/${storyId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-pink-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 pb-20 lg:pb-8">
      <div className="px-4 py-6 space-y-8">
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-600">
                Passa a Bola - América Latina
              </span>
            </motion.div>
            
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Celebrando o Futebol Feminino
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Histórias inspiradoras, dados em tempo real e a maior comunidade de futebol feminino da América Latina
            </p>
          </div>

          {stories.length > 0 && (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStoryIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <PlayerStoryCard
                    story={stories[currentStoryIndex]}
                    variant="featured"
                    className="max-w-2xl mx-auto"
                    onStoryClick={() => handleStoryClick(stories[currentStoryIndex].id)}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center space-x-2 mt-4">
                {stories.map((_, index) => (
                  <button
                    key={`story-indicator-${index}`}
                    onClick={() => setCurrentStoryIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      index === currentStoryIndex
                        ? 'bg-primary-500 w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary-600" />
              <span>Nossa Comunidade</span>
            </h2>
            <Badge variant="success" size="sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Crescendo
            </Badge>
          </div>

          <StatsCard
            title="Impacto do Passa a Bola"
            stats={communityStats}
            icon={Heart}
            variant="compact"
            theme="primary"
            className="mb-6"
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Destaques de Hoje</span>
            </h2>
            <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
              <span>Ver todos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todaysHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
              >
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={highlight.image} 
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <Badge variant={highlight.badgeVariant} size="sm">
                      {highlight.badge}
                    </Badge>
                  </div>
                  
                  {highlight.type === 'match' && (
                    <div className="absolute bottom-3 left-3">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {highlight.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary-600" />
              <span>Atletas em Destaque</span>
            </h2>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="space-y-4">
              {recentPlayers.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={player.avatar} 
                      alt={player.name} 
                      size="md"
                      className="ring-2 ring-primary-100"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">
                          {player.name}
                        </span>
                        {player.trending && (
                          <Badge variant="success" size="sm">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Alta
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {player.position} • {player.team}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={cn(
                      'text-lg font-bold',
                      player.rating >= 8.5 ? 'text-success-600' :
                      player.rating >= 8.0 ? 'text-warning-600' : 'text-gray-600'
                    )}>
                      {player.rating}
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="w-full flex items-center justify-center space-x-2 py-2 text-primary-600 hover:text-primary-700 font-medium">
                <span>Ver todas as atletas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <motion.div
            className="col-span-1 md:col-span-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button 
              onClick={() => navigate('/inscrever-campeonato')}
              className="w-full bg-gradient-to-r from-primary-500 to-pink-500 text-white rounded-xl p-4 flex items-center justify-center space-x-3 transition-all shadow-lg hover:shadow-xl"
            >
              <Trophy className="w-6 h-6" />
              <span className="font-semibold text-lg">Inscreva-se no Campeonato!</span>
            </button>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}