import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar,
  Clock,
  MapPin,
  Trophy,
  TrendingUp,
  Play,
  Pause,
  ChevronDown,
  Target
} from 'lucide-react';
import { getGames } from '../services/api';
import type { Game } from '../types';
import GameCard from '../components/modules/games/GameCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

// Mock data para jogos quando não há dados da API
const mockGames: Game[] = [
  {
    id: '1',
    homeTeam: 'Corinthians Feminino',
    awayTeam: 'Palmeiras Feminino',
    homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png',
    awayTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_688b9c9f.jpg',
    date: '24/09/2024',
    time: '16:00',
    venue: 'Neo Química Arena',
    status: 'live',
    score: '2-1'
  },
  {
    id: '2', 
    homeTeam: 'Santos Feminino',
    awayTeam: 'São Paulo Feminino',
    homeTeamLogo: '/attached_assets/stock_images/football_club_logo_d_3ba57abe.jpg',
    awayTeamLogo: '/attached_assets/stock_images/football_club_logo_d_17ab4211.jpg',
    date: '24/09/2024',
    time: '18:30', 
    venue: 'Vila Belmiro',
    status: 'scheduled'
  },
  {
    id: '3',
    homeTeam: 'Flamengo Feminino', 
    awayTeam: 'Internacional Feminino',
    homeTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_f6347b2c.jpg',
    awayTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_45e812dc.jpg',
    date: '23/09/2024',
    time: '20:00',
    venue: 'Maracanã',
    status: 'finished',
    score: '3-0'
  },
  {
    id: '4',
    homeTeam: 'Grêmio Feminino',
    awayTeam: 'Atlético-MG Feminino', 
    homeTeamLogo: '/attached_assets/stock_images/football_club_logo_d_c4d31d1b.jpg',
    awayTeamLogo: '/attached_assets/stock_images/football_club_logo_d_bda2545f.jpg',
    date: '25/09/2024',
    time: '15:00',
    venue: 'Arena do Grêmio',
    status: 'scheduled'
  },
  {
    id: '5',
    homeTeam: 'Botafogo Feminino',
    awayTeam: 'Fluminense Feminino', 
    homeTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_f3f6c33c.jpg',
    awayTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_55069a47.jpg',
    date: '26/09/2024',
    time: '19:00',
    venue: 'Nilton Santos',
    status: 'scheduled'
  },
  {
    id: '6',
    homeTeam: 'Cruzeiro Feminino',
    awayTeam: 'Bahia Feminino', 
    homeTeamLogo: '/attached_assets/stock_images/football_club_logo_d_dd540ff3.jpg',
    awayTeamLogo: '/attached_assets/stock_images/football_club_logo_d_72741f7a.jpg',
    date: '27/09/2024',
    time: '15:30',
    venue: 'Mineirão',
    status: 'scheduled'
  }
];

const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'all', label: 'Todos', count: games.length },
    { id: 'live', label: 'Ao Vivo', count: games.filter(g => g.status === 'live').length },
    { id: 'scheduled', label: 'Agendados', count: games.filter(g => g.status === 'scheduled').length },
    { id: 'finished', label: 'Finalizados', count: games.filter(g => g.status === 'finished').length }
  ];

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const apiGames = await getGames();
        
        if (apiGames && apiGames.length > 0) {
          console.log(`🏆 Carregados ${apiGames.length} jogos da API`);
          setGames([...apiGames, ...mockGames.slice(0, 2)]);
        } else {
          console.log('🏟️ Usando jogos de exemplo');
          setGames(mockGames);
        }
      } catch (error) {
        console.log('🔄 Usando jogos de exemplo como fallback');
        setGames(mockGames);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  useEffect(() => {
    let filtered = games;

    // Filter by status
    if (activeFilter !== 'all') {
      filtered = filtered.filter(game => game.status === activeFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(game => 
        game.homeTeam.toLowerCase().includes(query) ||
        game.awayTeam.toLowerCase().includes(query) ||
        game.venue.toLowerCase().includes(query)
      );
    }

    setFilteredGames(filtered);
  }, [games, activeFilter, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-700 border-red-200';
      case 'finished': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <Play className="w-3 h-3" />;
      case 'finished': return <Trophy className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const liveGamesCount = games.filter(g => g.status === 'live').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 flex items-center justify-center">
        <LoadingSpinner message="Carregando jogos..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 pb-20 lg:pb-8">
      <div className="px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Jogos</h1>
              <p className="text-gray-600 text-sm">Brasileirão Feminino 2024</p>
            </div>
          </div>
          
          {liveGamesCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center space-x-2 bg-red-100 border border-red-200 px-4 py-2 rounded-full"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-700 font-medium text-sm">
                {liveGamesCount} jogo{liveGamesCount > 1 ? 's' : ''} ao vivo
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-card mb-6"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Buscar por time ou estádio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                showFilters ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Tabs */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                        activeFilter === filter.id
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {getStatusIcon(filter.id)}
                      <span>{filter.label}</span>
                      <Badge variant="secondary" size="sm">{filter.count}</Badge>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {filters.map((filter, index) => (
            <div
              key={filter.id}
              className={`bg-white rounded-2xl p-4 shadow-card border-2 transition-all ${
                activeFilter === filter.id ? 'border-primary-200 bg-primary-50' : 'border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getStatusColor(filter.id)}`}>
                  {getStatusIcon(filter.id)}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{filter.count}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{filter.label}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGames.map((game, index) => (
                <motion.div
                  key={`games-card-${game.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-3xl shadow-card"
            >
              <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum jogo encontrado
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery 
                  ? `Nenhum jogo corresponde à busca "${searchQuery}"`
                  : `Nenhum jogo ${activeFilter !== 'all' ? filters.find(f => f.id === activeFilter)?.label.toLowerCase() : ''} disponível`
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-medium transition-colors"
              >
                Ver Todos os Jogos
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Floating Live Games Indicator */}
        <AnimatePresence>
          {liveGamesCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed bottom-24 lg:bottom-8 right-4 z-50"
            >
              <button
                onClick={() => setActiveFilter('live')}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="font-medium text-sm">{liveGamesCount} AO VIVO</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamesPage;