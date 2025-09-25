import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search, Calendar, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatchCard } from '../components/ui/MatchCard';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';
import type { Match } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/matches.json');
        const data: Match[] = await response.json();
        setMatches(data);
        setFilteredMatches(data);
      } catch (error) {
        console.error("Failed to load matches:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, []);

  useEffect(() => {
    let filtered = matches;

    if (activeFilter !== 'all') {
      const today = new Date().toDateString();
      const now = new Date();
      
      switch (activeFilter) {
        case 'live':
          filtered = filtered.filter(match => match.status === 'live');
          break;
        case 'today':
          filtered = filtered.filter(match => new Date(match.startTime).toDateString() === today);
          break;
        case 'finished':
          filtered = filtered.filter(match => match.status === 'finished' && new Date(match.startTime) < now);
          break;
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(match => 
        match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.competition.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMatches(filtered);
  }, [matches, activeFilter, searchQuery]);

  const liveMatchesCount = matches.filter(m => m.status === 'live').length;
  const todayMatchesCount = matches.filter(m => 
    new Date(m.startTime).toDateString() === new Date().toDateString()
  ).length;

  const handleMatchClick = (matchId: string) => {
    navigate(`/jogos/${matchId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 pb-20 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Partidas
          </h1>
          <p className="text-gray-600">
            Acompanhe todas as partidas do futebol feminino brasileiro
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar times, competições..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger 
                value="all"
                onClick={() => setActiveFilter('all')}
              >
                Todas ({matches.length})
              </TabsTrigger>
              <TabsTrigger 
                value="live"
                onClick={() => setActiveFilter('live')}
              >
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
                  <span>Ao Vivo ({liveMatchesCount})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="today"
                onClick={() => setActiveFilter('today')}
              >
                Hoje ({todayMatchesCount})
              </TabsTrigger>
              <TabsTrigger 
                value="finished"
                onClick={() => setActiveFilter('finished')}
              >
                Finalizadas
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <AnimatePresence mode="wait">
            {filteredMatches.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma partida encontrada
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery 
                    ? `Não encontramos partidas para "${searchQuery}"`
                    : 'Não há partidas para este filtro'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Limpar busca
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <MatchCard
                      match={match}
                      variant={match.status === 'live' ? 'detailed' : 'default'}
                      showProbability={match.status === 'live'}
                      onMatchClick={() => handleMatchClick(match.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}