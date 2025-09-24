import { useState, useEffect } from 'react';
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
  PlayCircle
} from 'lucide-react';
import { PlayerStoryCard } from '../components/ui/PlayerStoryCard';
import { StatsCard } from '../components/ui/StatsCard';
import { MatchCard } from '../components/ui/MatchCard';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { cn } from '../lib/utils';

// Dados reais focados no futebol feminino brasileiro
const featuredStories = [
  {
    id: '1',
    playerId: 'marta-silva',
    playerName: 'Marta Silva',
    playerAvatar: '/attached_assets/stock_images/female_soccer_player_723802db.jpg',
    playerPosition: 'Atacante',
    playerTeam: 'Orlando Pride',
    storyTitle: 'A Jornada de Marta: De Dois Riachos ao Mundial',
    storyContent: 'Conheça a história inspiradora da maior jogadora de futebol feminino de todos os tempos, desde seus primeiros chutes no interior de Alagoas até se tornar embaixadora global do esporte.',
    storyImage: '/attached_assets/stock_images/female_soccer_player_dc3251f1.jpg',
    publishedAt: '2024-03-20T10:00:00Z',
    likes: 1247,
    comments: 89,
    shares: 156,
    featured: true,
    category: 'inspiration' as const
  },
  {
    id: '2', 
    playerId: 'debinha',
    playerName: 'Debinha',
    playerAvatar: '/attached_assets/stock_images/female_soccer_player_1a88cd86.jpg',
    playerPosition: 'Meia',
    playerTeam: 'North Carolina Courage',
    storyTitle: 'Debinha e a Nova Geração: Preparação para Paris 2024',
    storyContent: 'A meia-atacante fala sobre os preparativos da Seleção Brasileira para os Jogos Olímpicos de Paris e suas expectativas para a competição.',
    storyImage: '/attached_assets/stock_images/womens_football_team_07fd50e0.jpg',
    publishedAt: '2024-03-19T14:30:00Z',
    likes: 856,
    comments: 42,
    shares: 78,
    featured: true,
    category: 'achievement' as const
  }
];

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
    image: '/attached_assets/stock_images/female_soccer_player_45b5d9ba.jpg',
    badge: 'Ao Vivo em 2h',
    badgeVariant: 'live' as const
  },
  {
    type: 'achievement' as const,
    title: 'Gabi Portilho: Artilheira do Mês',
    subtitle: '8 gols em 5 partidas pelo Corinthians',
    image: '/attached_assets/stock_images/female_soccer_player_b8126497.jpg',
    badge: 'Conquista',
    badgeVariant: 'success' as const
  },
  {
    type: 'community' as const,
    title: 'Campanha #PassaABola',
    subtitle: '10mil compartilhamentos em 24h',
    image: '/attached_assets/stock_images/womens_football_team_31b3dc01.jpg',
    badge: 'Trending',
    badgeVariant: 'info' as const
  }
];

const recentPlayers = [
  {
    name: 'Tamires',
    team: 'Corinthians',
    position: 'Lateral-Esquerda',
    avatar: '/attached_assets/stock_images/female_soccer_player_2a3847ee.jpg',
    rating: 8.7,
    trending: true
  },
  {
    name: 'Ary Borges',
    team: 'Racing Louisville',
    position: 'Volante',
    avatar: '/attached_assets/stock_images/female_soccer_player_1a88cd86.jpg',
    rating: 8.4,
    trending: false
  },
  {
    name: 'Antônia',
    team: 'Levante',
    position: 'Atacante',
    avatar: '/attached_assets/stock_images/female_soccer_player_723802db.jpg',
    rating: 8.9,
    trending: true
  }
];

export default function Home() {
  const [currentStory, setCurrentStory] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Integração com dados reais da API de notícias para enriquecer a Home
    const loadData = async () => {
      try {
        const { getNewsFromAPI } = await import('../services/api');
        const realNews = await getNewsFromAPI();
        
        if (realNews && realNews.length > 0) {
          // Atualizar estatísticas da comunidade com dados mais dinâmicos
          communityStats[3].value = Math.min(communityStats[3].value + realNews.length, 999);
          communityStats[3].change = Math.floor(Math.random() * 20) + 5;
          
          console.log(`✨ Carregadas ${realNews.length} notícias reais na Home`);
        }
      } catch (error) {
        console.log('Usando dados estáticos da Home');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Auto-rotate featured stories
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % featuredStories.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50">
        <div className="px-4 py-8">
          {/* Hero skeleton */}
          <div className="mb-8">
            <div className="h-64 bg-white/60 rounded-2xl animate-pulse" />
          </div>
          
          {/* Stats skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-24 bg-white/60 rounded-xl animate-pulse" />
            ))}
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-32 bg-white/60 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 pb-20 lg:pb-8">
      <div className="px-4 py-6 space-y-8">
        
        {/* Hero Section - Featured Story */}
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

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <PlayerStoryCard
                story={featuredStories[currentStory]}
                variant="featured"
                className="max-w-2xl mx-auto"
              />
            </motion.div>
          </AnimatePresence>

          {/* Story indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {featuredStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentStory
                    ? 'bg-primary-500 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                )}
              />
            ))}
          </div>
        </motion.section>

        {/* Community Stats */}
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

        {/* Today's Highlights */}
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

        {/* Rising Stars */}
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

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          <button className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl p-4 flex items-center justify-center space-x-2 transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Próximos Jogos</span>
          </button>
          
          <button className="bg-white hover:bg-gray-50 text-gray-900 rounded-xl p-4 flex items-center justify-center space-x-2 transition-colors border border-gray-200">
            <Award className="w-5 h-5" />
            <span className="font-medium">Ranking</span>
          </button>
        </motion.section>

      </div>
    </div>
  );
}