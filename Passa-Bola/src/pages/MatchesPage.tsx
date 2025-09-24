import { useEffect, useState } from 'react';
import { Filter, Search, Calendar, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatchCard } from '../components/ui/MatchCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';
import type { Match } from '../types';

// Mock data - seria substituído por dados reais da API
const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: {
      id: '1',
      name: 'Sport Club Corinthians Paulista',
      shortName: 'Corinthians',
      logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/874.png',
      colors: { primary: '#000000', secondary: '#FFFFFF' },
      founded: 1910,
      stadium: 'Neo Química Arena',
      city: 'São Paulo',
      country: 'Brasil'
    },
    awayTeam: {
      id: '2',
      name: 'Sociedade Esportiva Palmeiras',
      shortName: 'Palmeiras',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/250px-Palmeiras_logo.svg.png',
      colors: { primary: '#006B3F', secondary: '#FFFFFF' },
      founded: 1914,
      stadium: 'Allianz Parque',
      city: 'São Paulo',
      country: 'Brasil'
    },
    competition: {
      id: '1',
      name: 'Campeonato Brasileiro Feminino',
      shortName: 'Brasileirão Fem',
      logo: 'https://upload.wikimedia.org/wikipedia/pt/a/ae/BR_fem_2018_logo.png',
      country: 'Brasil',
      season: '2024',
      type: 'league'
    },
    venue: {
      id: '1',
      name: 'Neo Química Arena',
      city: 'São Paulo',
      capacity: 49205,
      surface: 'Grass',
      coordinates: { lat: -23.545, lng: -46.473 }
    },
    startTime: '2024-03-20T19:00:00Z',
    status: 'live',
    matchDay: 15,
    round: '15ª Rodada',
    score: {
      home: 1,
      away: 2,
      halfTime: { home: 0, away: 1 }
    },
    events: [],
    liveData: {
      currentMinute: 78,
      addedTime: 3,
      period: 'second_half',
      lastUpdate: '2024-03-20T20:18:00Z',
      momentum: { home: 35, away: 65 }
    },
    winProbability: {
      home: 25,
      draw: 20,
      away: 55,
      lastUpdate: '2024-03-20T20:18:00Z'
    }
  },
  // Adicionar mais partidas mock...
];

const filterTabs = [
  { id: 'all', label: 'Todas', value: 'all' },
  { id: 'live', label: 'Ao Vivo', value: 'live' },
  { id: 'today', label: 'Hoje', value: 'today' },
  { id: 'finished', label: 'Finalizadas', value: 'finished' }
];

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simular carregamento de dados
    const loadMatches = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMatches(mockMatches);
      setFilteredMatches(mockMatches);
      setLoading(false);
    };

    loadMatches();
  }, []);

  useEffect(() => {
    let filtered = matches;

    // Filtro por status
    if (activeFilter !== 'all') {
      if (activeFilter === 'live') {
        filtered = filtered.filter(match => match.status === 'live');
      } else if (activeFilter === 'today') {
        const today = new Date().toDateString();
        filtered = filtered.filter(match => 
          new Date(match.startTime).toDateString() === today
        );
      } else if (activeFilter === 'finished') {
        filtered = filtered.filter(match => match.status === 'finished');
      }
    }

    // Filtro por busca
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

  const handleMatchClick = (match: Match) => {
    // Navegar para detalhes da partida
    console.log('Match clicked:', match);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 py-6">
          {/* Header skeleton */}
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
          </div>

          {/* Tabs skeleton */}
          <div className="mb-6">
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 bg-gray-200 rounded-lg w-20 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Match cards skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-card">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gray-200 rounded-full" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-20" />
                        <div className="h-3 bg-gray-200 rounded w-32" />
                      </div>
                    </div>
                    
                    <div className="text-center px-4">
                      <div className="h-8 bg-gray-200 rounded w-16" />
                    </div>
                    
                    <div className="flex items-center space-x-3 flex-1 justify-end">
                      <div className="space-y-2 text-right">
                        <div className="h-4 bg-gray-200 rounded w-20" />
                        <div className="h-3 bg-gray-200 rounded w-32" />
                      </div>
                      <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Partidas
          </h1>
          <p className="text-gray-600">
            Acompanhe todas as partidas do futebol feminino brasileiro
          </p>
        </div>

        {/* Search and Filters */}
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

          {/* Filter Tabs */}
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
                badge={liveMatchesCount}
              >
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
                  <span>Ao Vivo</span>
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

        {/* Live Matches Highlight */}
        {liveMatchesCount > 0 && activeFilter === 'all' && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-live rounded-full animate-pulse" />
              <h2 className="text-lg font-semibold text-gray-900">
                Ao Vivo Agora
              </h2>
              <Badge variant="live" size="sm">
                {liveMatchesCount}
              </Badge>
            </div>
            <div className="space-y-4">
              {matches
                .filter(match => match.status === 'live')
                .map((match) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MatchCard
                      match={match}
                      variant="detailed"
                      showProbability={true}
                      onMatchClick={handleMatchClick}
                      className="ring-2 ring-live/10 border-live/20"
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Matches */}
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
                      onMatchClick={handleMatchClick}
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