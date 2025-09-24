import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Star, 
  ArrowRight,
  MapPin,
  Calendar,
  DollarSign,
  Trophy,
  Zap
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { StatsCard } from '../components/ui/StatsCard';
import { cn } from '../lib/utils';

interface PlayerTransfer {
  id: string;
  playerName: string;
  playerAvatar: string;
  position: string;
  age: number;
  nationality: string;
  fromClub: string;
  fromClubLogo: string;
  toClub: string;
  toClubLogo: string;
  transferValue?: number;
  transferType: 'permanent' | 'loan' | 'free' | 'return';
  contractLength?: string;
  announcedDate: string;
  status: 'confirmed' | 'rumor' | 'negotiating';
  category: 'high-profile' | 'international' | 'domestic' | 'youth';
  marketValue: number;
  previousSeasonStats?: {
    goals: number;
    assists: number;
    matches: number;
  };
}

// Dados realistas de transferências do futebol feminino brasileiro
const mockTransfers: PlayerTransfer[] = [
  {
    id: '1',
    playerName: 'Geyse Ferreira',
    playerAvatar: '/attached_assets/stock_images/women_soccer_players_c153866f.jpg',
    position: 'Atacante',
    age: 25,
    nationality: 'Brasil',
    fromClub: 'Manchester United',
    fromClubLogo: '/attached_assets/stock_images/soccer_club_logo_emb_27837489.jpg',
    toClub: 'Chelsea',
    toClubLogo: '/attached_assets/stock_images/soccer_club_logo_emb_688b9c9f.jpg',
    transferValue: 800000,
    transferType: 'permanent',
    contractLength: '3 anos',
    announcedDate: '2024-03-18T10:00:00Z',
    status: 'confirmed',
    category: 'high-profile',
    marketValue: 1200000,
    previousSeasonStats: {
      goals: 14,
      assists: 8,
      matches: 28
    }
  },
  {
    id: '2',
    playerName: 'Kerolin',
    playerAvatar: '/attached_assets/stock_images/women_soccer_players_5b7250b8.jpg',
    position: 'Meia-Atacante',
    age: 24,
    nationality: 'Brasil',
    fromClub: 'North Carolina Courage',
    fromClubLogo: '/attached_assets/stock_images/football_club_logo_d_3ba57abe.jpg',
    toClub: 'Corinthians',
    toClubLogo: '/attached_assets/stock_images/football_club_logo_d_17ab4211.jpg',
    transferType: 'permanent',
    contractLength: '2 anos',
    announcedDate: '2024-03-17T14:30:00Z',
    status: 'confirmed',
    category: 'international',
    marketValue: 950000,
    previousSeasonStats: {
      goals: 11,
      assists: 12,
      matches: 24
    }
  },
  {
    id: '3',
    playerName: 'Vic Albuquerque',
    playerAvatar: '/attached_assets/stock_images/women_soccer_players_91702f6c.jpg',
    position: 'Atacante',
    age: 26,
    nationality: 'Brasil',
    fromClub: 'Corinthians',
    fromClubLogo: '/attached_assets/stock_images/soccer_club_logo_emb_f6347b2c.jpg',
    toClub: 'Angel City FC',
    toClubLogo: '/attached_assets/stock_images/soccer_club_logo_emb_45e812dc.jpg',
    transferValue: 600000,
    transferType: 'permanent',
    contractLength: '2 anos',
    announcedDate: '2024-03-16T09:15:00Z',
    status: 'confirmed',
    category: 'international',
    marketValue: 750000,
    previousSeasonStats: {
      goals: 18,
      assists: 5,
      matches: 26
    }
  },
  {
    id: '4',
    playerName: 'Luana Bertolucci',
    playerAvatar: '/attached_assets/stock_images/women_soccer_players_4ab20e2b.jpg',
    position: 'Goleira',
    age: 28,
    nationality: 'Brasil',
    fromClub: 'Palmeiras',
    fromClubLogo: '/attached_assets/stock_images/football_club_logo_d_c4d31d1b.jpg',
    toClub: 'Santos',
    toClubLogo: '/attached_assets/stock_images/football_club_logo_d_bda2545f.jpg',
    transferType: 'free',
    contractLength: '1 ano',
    announcedDate: '2024-03-15T11:00:00Z',
    status: 'rumor',
    category: 'domestic',
    marketValue: 120000
  }
];

const transferStats = [
  { label: 'Transferências Confirmadas', value: 47, change: 23, trend: 'up' as const },
  { label: 'Valor Total Movimentado', value: 'R$ 12.4M', change: 18, trend: 'up' as const },
  { label: 'Jogadoras Brasileiras', value: 28, change: 15, trend: 'up' as const },
  { label: 'Transferências Internacionais', value: 19, change: 31, trend: 'up' as const }
];

const getTransferTypeLabel = (type: string) => {
  const types = {
    permanent: 'Definitiva',
    loan: 'Empréstimo', 
    free: 'Livre',
    return: 'Retorno'
  };
  return types[type as keyof typeof types] || type;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'success';
    case 'negotiating': return 'warning';
    case 'rumor': return 'info';
    default: return 'default';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'high-profile': return <Star className="w-4 h-4 text-yellow-500" />;
    case 'international': return <MapPin className="w-4 h-4 text-blue-500" />;
    case 'domestic': return <Trophy className="w-4 h-4 text-green-500" />;
    case 'youth': return <Zap className="w-4 h-4 text-purple-500" />;
    default: return null;
  }
};

export default function TransfersPage() {
  const [transfers, setTransfers] = useState<PlayerTransfer[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<PlayerTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simular carregamento de dados
    const loadTransfers = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTransfers(mockTransfers);
      setFilteredTransfers(mockTransfers);
      setLoading(false);
    };

    loadTransfers();
  }, []);

  useEffect(() => {
    let filtered = transfers;

    // Filtro por categoria
    if (activeFilter !== 'all') {
      filtered = filtered.filter(transfer => transfer.category === activeFilter);
    }

    // Filtro por busca
    if (searchQuery) {
      filtered = filtered.filter(transfer => 
        transfer.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transfer.fromClub.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transfer.toClub.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTransfers(filtered);
  }, [transfers, activeFilter, searchQuery]);

  const formatTransferValue = (value?: number) => {
    if (!value) return 'Não divulgado';
    if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `€${(value / 1000).toFixed(0)}K`;
    return `€${value}`;
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

          {/* Stats skeleton */}
          <div className="mb-6">
            <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
          </div>

          {/* Transfer cards skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-card">
                <div className="animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32" />
                      <div className="h-3 bg-gray-200 rounded w-48" />
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
            Mercado de Transferências
          </h1>
          <p className="text-gray-600">
            Acompanhe todas as movimentações do futebol feminino brasileiro e internacional
          </p>
        </div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <span>Mercado 2024</span>
            </h2>
            <Badge variant="success" size="sm">
              Janela Aberta
            </Badge>
          </div>

          <StatsCard
            title="Atividade do Mercado"
            stats={transferStats}
            icon={DollarSign}
            variant="compact"
            theme="success"
          />
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar jogadoras, clubes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger 
                value="all"
                onClick={() => setActiveFilter('all')}
              >
                Todas ({transfers.length})
              </TabsTrigger>
              <TabsTrigger 
                value="high-profile"
                onClick={() => setActiveFilter('high-profile')}
              >
                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                Destaques
              </TabsTrigger>
              <TabsTrigger 
                value="international"
                onClick={() => setActiveFilter('international')}
              >
                <MapPin className="w-3 h-3 mr-1" />
                Internacionais
              </TabsTrigger>
              <TabsTrigger 
                value="domestic"
                onClick={() => setActiveFilter('domestic')}
              >
                Nacionais
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Transfers List */}
        <AnimatePresence mode="wait">
          {filteredTransfers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma transferência encontrada
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery 
                  ? `Não encontramos transferências para "${searchQuery}"`
                  : 'Não há transferências para este filtro'
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
              {filteredTransfers.map((transfer, index) => (
                <motion.div
                  key={transfer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    'bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer',
                    'border border-gray-100 hover:border-primary-200',
                    transfer.category === 'high-profile' && 'ring-1 ring-yellow-200 bg-yellow-50/30'
                  )}
                >
                  <div className="flex items-start space-x-4">
                    {/* Player Avatar */}
                    <div className="relative flex-shrink-0">
                      <Avatar
                        src={transfer.playerAvatar}
                        alt={transfer.playerName}
                        size="xl"
                        className="ring-2 ring-primary-100"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                        {getCategoryIcon(transfer.category)}
                      </div>
                    </div>

                    {/* Transfer Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {transfer.playerName}
                          </h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span>{transfer.position}</span>
                            <span>•</span>
                            <span>{transfer.age} anos</span>
                            <span>•</span>
                            <span>{transfer.nationality}</span>
                          </div>
                        </div>

                        <Badge 
                          variant={getStatusColor(transfer.status) as any}
                          size="sm"
                        >
                          {transfer.status === 'confirmed' ? 'Confirmada' : 
                           transfer.status === 'negotiating' ? 'Negociando' : 'Rumor'}
                        </Badge>
                      </div>

                      {/* Transfer Direction */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          {/* From Club */}
                          <div className="flex items-center space-x-3">
                            <img
                              src={transfer.fromClubLogo}
                              alt={transfer.fromClub}
                              className="w-8 h-8 rounded"
                            />
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">
                                {transfer.fromClub}
                              </div>
                              <div className="text-xs text-gray-500">Origem</div>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex items-center space-x-2 px-4">
                            <ArrowRight className="w-5 h-5 text-primary-500" />
                            <Badge variant="outlined" size="sm">
                              {getTransferTypeLabel(transfer.transferType)}
                            </Badge>
                          </div>

                          {/* To Club */}
                          <div className="flex items-center space-x-3">
                            <img
                              src={transfer.toClubLogo}
                              alt={transfer.toClub}
                              className="w-8 h-8 rounded"
                            />
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">
                                {transfer.toClub}
                              </div>
                              <div className="text-xs text-gray-500">Destino</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Transfer Info */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500 mb-1">Valor</div>
                          <div className="font-semibold text-gray-900">
                            {formatTransferValue(transfer.transferValue)}
                          </div>
                        </div>
                        
                        {transfer.contractLength && (
                          <div>
                            <div className="text-gray-500 mb-1">Contrato</div>
                            <div className="font-semibold text-gray-900">
                              {transfer.contractLength}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <div className="text-gray-500 mb-1">Valor de Mercado</div>
                          <div className="font-semibold text-gray-900">
                            {formatTransferValue(transfer.marketValue)}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-gray-500 mb-1">Anunciado</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(transfer.announcedDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>

                      {/* Previous Season Stats */}
                      {transfer.previousSeasonStats && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500 mb-2">Temporada Anterior</div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center bg-primary-50 rounded-lg py-2">
                              <div className="font-bold text-primary-600">
                                {transfer.previousSeasonStats.goals}
                              </div>
                              <div className="text-xs text-gray-600">Gols</div>
                            </div>
                            <div className="text-center bg-success-50 rounded-lg py-2">
                              <div className="font-bold text-success-600">
                                {transfer.previousSeasonStats.assists}
                              </div>
                              <div className="text-xs text-gray-600">Assistências</div>
                            </div>
                            <div className="text-center bg-blue-50 rounded-lg py-2">
                              <div className="font-bold text-blue-600">
                                {transfer.previousSeasonStats.matches}
                              </div>
                              <div className="text-xs text-gray-600">Jogos</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}