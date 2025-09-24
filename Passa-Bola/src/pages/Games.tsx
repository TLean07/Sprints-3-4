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
  Target,
  Zap,
  Users,
  Star,
  MoreHorizontal,
  RefreshCw
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
    homeTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_27837489.jpg',
    awayTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_688b9c9f.jpg',
    date: '24/09/2024',
    time: '16:00',
    venue: 'Neo Química Arena',
    league: 'Brasileirão Feminino',
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
    league: 'Brasileirão Feminino',
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
    league: 'Brasileirão Feminino',
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
    league: 'Brasileirão Feminino',
    status: 'scheduled'
  },
  {
    id: '5',
    homeTeam: 'Botafogo Feminino',
    awayTeam: 'Fluminense Feminino', 
    homeTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_f3f6c33c.jpg',
    awayTeamLogo: '/attached_assets/stock_images/soccer_club_logo_emb_5469a881.jpg',
    date: '25/09/2024',
    time: '19:00',
    venue: 'Nilton Santos',
    league: 'Carioca Feminino',
    status: 'scheduled'
  },
  {
    id: '6',
    homeTeam: 'Cruzeiro Feminino',
    awayTeam: 'América-MG Feminino', 
    homeTeamLogo: '/attached_assets/stock_images/football_club_logo_d_e8a6b7f2.jpg',
    awayTeamLogo: '/attached_assets/stock_images/football_club_logo_d_3af2e9d1.jpg',
    date: '26/09/2024',
    time: '16:30',
    venue: 'Mineirão',
    league: 'Mineiro Feminino',
    status: 'scheduled'
  }
];

type FilterType = 'all' | 'live' | 'today' | 'upcoming' | 'finished';
type LeagueType = 'all' | 'Brasileirão Feminino' | 'Carioca Feminino' | 'Mineiro Feminino';

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [leagueFilter, setLeagueFilter] = useState<LeagueType>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    setLoading(true);
    try {
      const apiGames = await getGames();
      setGames(apiGames.length > 0 ? apiGames : mockGames);
      console.log(`⚽ Carregados ${apiGames.length > 0 ? apiGames.length : mockGames.length} jogos`);
    } catch (error) {
      console.log('Usando dados mock para jogos');
      setGames(mockGames);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadGames();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || game.status === filter ||
                         (filter === 'today' && new Date(game.date.split('/').reverse().join('-')).toDateString() === new Date().toDateString()) ||
                         (filter === 'upcoming' && game.status === 'scheduled');
    
    const matchesLeague = leagueFilter === 'all' || game.league === leagueFilter;
    
    return matchesSearch && matchesFilter && matchesLeague;
  });

  const liveGames = filteredGames.filter(game => game.status === 'live');
  const todayGames = filteredGames.filter(game => 
    new Date(game.date.split('/').reverse().join('-')).toDateString() === new Date().toDateString()
  );
  const upcomingGames = filteredGames.filter(game => game.status === 'scheduled');
  const finishedGames = filteredGames.filter(game => game.status === 'finished');

  const getFilterCount = (filterType: FilterType) => {
    switch (filterType) {
      case 'live': return liveGames.length;
      case 'today': return todayGames.length;
      case 'upcoming': return upcomingGames.length;
      case 'finished': return finishedGames.length;
      default: return filteredGames.length;
    }
  };

  const FilterButton = ({ type, label, icon }: { type: FilterType; label: string; icon: React.ReactNode }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setFilter(type)}
      className={cn(
        'flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium text-sm transition-all duration-200',
        'border border-white/20 backdrop-blur-sm',
        filter === type 
          ? 'bg-white text-primary-600 shadow-lg border-white' 
          : 'bg-white/20 text-white hover:bg-white/30'
      )}
    >
      {icon}
      <span>{label}</span>
      <Badge variant="secondary" className="bg-white/20 text-white text-xs">
        {getFilterCount(type)}
      </Badge>
    </motion.button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 font-medium">Carregando jogos...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 pb-20 lg:pb-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-pink-600" />
        <div className="absolute inset-0 bg-[url('/attached_assets/stock_images/soccer_stadium_aerial_view.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative z-10 px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-semibold">Jogos em Tempo Real</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              Futebol Feminino
            </h1>
            <p className="text-white/80 text-lg max-w-md mx-auto">
              Acompanhe todos os jogos do futebol feminino brasileiro ao vivo
            </p>
          </motion.div>

          {/* Search and Refresh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar times, estádios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-gray-700 placeholder-gray-500"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRefresh}
                disabled={refreshing}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={cn("w-3 h-3", refreshing && "animate-spin")} />
              </motion.button>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            <FilterButton type="all" label="Todos" icon={<Target className="w-4 h-4" />} />
            <FilterButton type="live" label="Ao Vivo" icon={<Play className="w-4 h-4" />} />
            <FilterButton type="today" label="Hoje" icon={<Calendar className="w-4 h-4" />} />
            <FilterButton type="upcoming" label="Próximos" icon={<Clock className="w-4 h-4" />} />
            <FilterButton type="finished" label="Finalizados" icon={<Trophy className="w-4 h-4" />} />
          </motion.div>

          {/* Advanced Filters Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white rounded-xl px-4 py-2 hover:bg-white/20 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtros Avançados</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
            </motion.button>
          </motion.div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 max-w-md mx-auto"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="space-y-3">
                    <div>
                      <label className="text-white text-sm font-medium block mb-2">Liga</label>
                      <select
                        value={leagueFilter}
                        onChange={(e) => setLeagueFilter(e.target.value as LeagueType)}
                        className="w-full bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-gray-700 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                      >
                        <option value="all">Todas as Ligas</option>
                        <option value="Brasileirão Feminino">Brasileirão Feminino</option>
                        <option value="Carioca Feminino">Carioca Feminino</option>
                        <option value="Mineiro Feminino">Mineiro Feminino</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Live Games Section */}
        {liveGames.length > 0 && (filter === 'all' || filter === 'live') && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl shadow-lg">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <Zap className="w-4 h-4" />
                <span className="font-bold text-sm">AO VIVO</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Jogos Acontecendo Agora</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {liveGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GameCard game={game} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* Today's Games */}
        {todayGames.length > 0 && (filter === 'all' || filter === 'today') && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-2xl shadow-lg">
                <Calendar className="w-4 h-4" />
                <span className="font-bold text-sm">HOJE</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Jogos de Hoje</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {todayGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GameCard game={game} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* Upcoming Games */}
        {upcomingGames.length > 0 && (filter === 'all' || filter === 'upcoming') && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl shadow-lg">
                <Clock className="w-4 h-4" />
                <span className="font-bold text-sm">PRÓXIMOS</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Próximos Jogos</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {upcomingGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GameCard game={game} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* Finished Games */}
        {finishedGames.length > 0 && (filter === 'all' || filter === 'finished') && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-2xl shadow-lg">
                <Trophy className="w-4 h-4" />
                <span className="font-bold text-sm">FINALIZADOS</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Jogos Finalizados</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {finishedGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GameCard game={game} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* No Results */}
        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum jogo encontrado</h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                  setLeagueFilter('all');
                }}
                className="bg-gradient-to-r from-primary-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
              >
                Limpar Filtros
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}