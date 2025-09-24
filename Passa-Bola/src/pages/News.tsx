import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Heart,
  MessageCircle,
  Share2,
  Clock,
  User,
  Award,
  Zap,
  Calendar
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { PlayerStoryCard } from '../components/ui/PlayerStoryCard';
import { cn } from '../lib/utils';

interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  coverImage: string;
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
  category: 'news' | 'interview' | 'analysis' | 'match-report' | 'feature';
  tags: string[];
  featured: boolean;
  trending: boolean;
  reactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  relatedPlayer?: {
    name: string;
    team: string;
    avatar: string;
  };
}

// Notícias realistas focadas no futebol feminino brasileiro
const mockNews: NewsArticle[] = [
  {
    id: 'news-mock-marta-aposentadoria-1',
    title: 'Marta Anuncia Aposentadoria da Seleção Brasileira Após Paris 2024',
    subtitle: 'A Rainha do Futebol se despedirá da camisa amarelinha nos Jogos Olímpicos',
    content: 'Em entrevista exclusiva, Marta confirmou que os Jogos Olímpicos de Paris 2024 serão sua última competição vestindo a camisa da Seleção Brasileira...',
    excerpt: 'Após 20 anos defendendo o Brasil, Marta anuncia que Paris 2024 será sua despedida da Seleção. A decisão marca o fim de uma era dourada do futebol feminino nacional.',
    coverImage: '/attached_assets/stock_images/female_soccer_player_dc3251f1.jpg',
    authorName: 'Carolina Santos',
    authorAvatar: '/attached_assets/stock_images/female_soccer_player_1a88cd86.jpg',
    publishedAt: '2024-03-20T08:30:00Z',
    readTime: 5,
    category: 'news',
    tags: ['Marta', 'Seleção Brasileira', 'Aposentadoria', 'Paris 2024'],
    featured: true,
    trending: true,
    reactions: {
      likes: 2847,
      comments: 312,
      shares: 156
    },
    relatedPlayer: {
      name: 'Marta Silva',
      team: 'Orlando Pride',
      avatar: '/attached_assets/stock_images/female_soccer_player_723802db.jpg'
    }
  },
  {
    id: 'news-mock-corinthians-palmeiras-2',
    title: 'Corinthians e Palmeiras Fazem Clássico Histórico Pelo Brasileirão Feminino',
    subtitle: 'Derby paulista promete emocionar 40 mil torcedores na Neo Química Arena',
    content: 'O clássico entre Corinthians e Palmeiras pela 15ª rodada do Brasileirão Feminino promete ser um dos jogos mais importantes da temporada...',
    excerpt: 'Neo Química Arena recebe mais de 40 mil torcedores para o maior clássico do futebol feminino brasileiro. Corinthians busca manter liderança.',
    coverImage: '/attached_assets/stock_images/womens_football_team_07fd50e0.jpg',
    authorName: 'Rafael Oliveira',
    authorAvatar: '/attached_assets/stock_images/female_soccer_player_2a3847ee.jpg',
    publishedAt: '2024-03-19T16:45:00Z',
    readTime: 3,
    category: 'match-report',
    tags: ['Corinthians', 'Palmeiras', 'Brasileirão Feminino', 'Clássico'],
    featured: true,
    trending: false,
    reactions: {
      likes: 1523,
      comments: 89,
      shares: 67
    }
  },
  {
    id: 'news-mock-gabi-portilho-3',
    title: 'Gabi Portilho: A Nova Estrela do Futebol Feminino Brasileiro',
    subtitle: 'Perfil da atacante que conquistou o coração da torcida corinthiana',
    content: 'Aos 26 anos, Gabi Portilho se estabeleceu como uma das principais atacantes do futebol feminino brasileiro...',
    excerpt: 'Com 18 gols em 20 jogos, Gabi Portilho se tornou a sensação do Corinthians e da Seleção Brasileira. Conheça sua trajetória inspiradora.',
    coverImage: '/attached_assets/stock_images/female_soccer_player_b8126497.jpg',
    authorName: 'Marina Costa',
    authorAvatar: '/attached_assets/stock_images/female_soccer_player_1a88cd86.jpg',
    publishedAt: '2024-03-18T14:20:00Z',
    readTime: 7,
    category: 'feature',
    tags: ['Gabi Portilho', 'Corinthians', 'Perfil', 'Seleção Brasileira'],
    featured: false,
    trending: true,
    reactions: {
      likes: 892,
      comments: 45,
      shares: 23
    },
    relatedPlayer: {
      name: 'Gabi Portilho',
      team: 'Corinthians',
      avatar: '/attached_assets/stock_images/female_soccer_player_b8126497.jpg'
    }
  },
  {
    id: 'news-mock-copa-america-4',
    title: 'CBF Anuncia Investimento de R$ 50 Mi no Futebol Feminino',
    subtitle: 'Recursos serão destinados à base, infraestrutura e profissionalização',
    content: 'A Confederação Brasileira de Futebol anunciou hoje o maior investimento da história no futebol feminino nacional...',
    excerpt: 'CBF destina R$ 50 milhões para desenvolvimento do futebol feminino, focando em categorias de base e melhoria da infraestrutura dos clubes.',
    coverImage: '/attached_assets/stock_images/womens_football_team_31b3dc01.jpg',
    authorName: 'Pedro Henrique',
    authorAvatar: '/attached_assets/stock_images/female_soccer_player_2a3847ee.jpg',
    publishedAt: '2024-03-17T10:15:00Z',
    readTime: 4,
    category: 'news',
    tags: ['CBF', 'Investimento', 'Infraestrutura', 'Base'],
    featured: false,
    trending: true,
    reactions: {
      likes: 1647,
      comments: 123,
      shares: 89
    }
  }
];

const categoryLabels = {
  news: 'Notícias',
  interview: 'Entrevistas', 
  analysis: 'Análises',
  'match-report': 'Jogos',
  feature: 'Especiais'
};

const categoryColors = {
  news: 'bg-blue-50 text-blue-700 border-blue-200',
  interview: 'bg-purple-50 text-purple-700 border-purple-200',
  analysis: 'bg-green-50 text-green-700 border-green-200',
  'match-report': 'bg-red-50 text-red-700 border-red-200',
  feature: 'bg-yellow-50 text-yellow-700 border-yellow-200'
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        // Primeiro, tenta buscar dados reais da NewsAPI
        const { getNewsFromAPI } = await import('../services/api');
        const realApiNews = await getNewsFromAPI();
        
        if (realApiNews && realApiNews.length > 0) {
          console.log(`📰 Carregadas ${realApiNews.length} notícias reais da NewsAPI`);
          
          // Converte dados da API para nosso formato
          const convertedRealNews = realApiNews.map((article, index): NewsArticle => ({
            id: article.id,
            title: article.title,
            subtitle: article.excerpt.slice(0, 120) + '...',
            content: article.content || article.excerpt,
            excerpt: article.excerpt,
            coverImage: article.imageUrl,
            authorName: article.category || 'Passa a Bola',
            authorAvatar: '/attached_assets/stock_images/beautiful_woman_foot_fc1a6e36.jpg',
            publishedAt: new Date(article.date.split('/').reverse().join('-')).toISOString(),
            readTime: Math.ceil(article.excerpt.length / 200) + Math.floor(Math.random() * 2) + 3,
            category: index === 0 ? 'news' : 
                     article.title.toLowerCase().includes('entrevista') ? 'interview' :
                     article.title.toLowerCase().includes('análise') ? 'analysis' :
                     article.title.toLowerCase().includes('jogo') ? 'match-report' : 'news',
            tags: [
              ...article.title.toLowerCase().includes('marta') ? ['Marta', 'Seleção'] : [],
              ...article.title.toLowerCase().includes('corinthians') ? ['Corinthians'] : [],
              ...article.title.toLowerCase().includes('palmeiras') ? ['Palmeiras'] : [],
              ...article.title.toLowerCase().includes('brasileiro') ? ['Brasileirão'] : [],
              'Futebol Feminino'
            ].filter(Boolean),
            featured: index === 0,
            trending: index < 3, // Primeiras 3 são trending
            reactions: {
              likes: Math.floor(Math.random() * 1500) + 300,
              comments: Math.floor(Math.random() * 150) + 15,
              shares: Math.floor(Math.random() * 100) + 8
            }
          }));
          
          // Combina notícias reais com algumas notícias mock para variedade
          // Remove duplicatas baseado no ID
          const mockNewsToAdd = mockNews.slice(0, 3).filter(mock => 
            !convertedRealNews.some(real => real.id === mock.id)
          );
          
          const combinedNews = [...convertedRealNews, ...mockNewsToAdd];
          setNews(combinedNews);
          setFilteredNews(combinedNews);
        } else {
          throw new Error('Nenhuma notícia real disponível');
        }
      } catch (error) {
        console.log('🔄 Usando dados de exemplo como fallback');
        setNews(mockNews);
        setFilteredNews(mockNews);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    let filtered = news;

    if (activeFilter !== 'all') {
      if (activeFilter === 'trending') {
        filtered = filtered.filter(article => article.trending);
      } else {
        filtered = filtered.filter(article => article.category === activeFilter);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredNews(filtered);
  }, [news, activeFilter, searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 py-6">
          <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
          
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featuredArticle = filteredNews.find(article => article.featured);
  const regularArticles = filteredNews.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Notícias
          </h1>
          <p className="text-gray-600">
            Acompanhe as últimas novidades do futebol feminino brasileiro e mundial
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar notícias, jogadoras, times..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger 
                value="all"
                onClick={() => setActiveFilter('all')}
              >
                Todas
              </TabsTrigger>
              <TabsTrigger 
                value="trending"
                onClick={() => setActiveFilter('trending')}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="news"
                onClick={() => setActiveFilter('news')}
              >
                Notícias
              </TabsTrigger>
              <TabsTrigger 
                value="feature"
                onClick={() => setActiveFilter('feature')}
              >
                Especiais
              </TabsTrigger>
              <TabsTrigger 
                value="match-report"
                onClick={() => setActiveFilter('match-report')}
              >
                Jogos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">Destaque</h2>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="outlined"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm border-white/20"
                  >
                    {categoryLabels[featuredArticle.category]}
                  </Badge>
                </div>

                {featuredArticle.trending && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="live" size="sm">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-white/90 text-lg line-clamp-2 mb-4">
                    {featuredArticle.subtitle}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        src={featuredArticle.authorAvatar}
                        alt={featuredArticle.authorName}
                        size="sm"
                        className="ring-2 ring-white/20"
                      />
                      <div>
                        <p className="text-white font-medium text-sm">
                          {featuredArticle.authorName}
                        </p>
                        <p className="text-white/70 text-xs">
                          {formatDate(featuredArticle.publishedAt)} • {featuredArticle.readTime}min leitura
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-white/70">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{featuredArticle.reactions.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{featuredArticle.reactions.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* News Grid */}
        <AnimatePresence mode="wait">
          {regularArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma notícia encontrada
              </h3>
              <p className="text-gray-500">
                {searchQuery 
                  ? `Não encontramos notícias para "${searchQuery}"`
                  : 'Não há notícias para este filtro'
                }
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {regularArticles.map((article, index) => (
                <motion.div
                  key={`news-article-${article.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge 
                          variant="outlined"
                          size="sm"
                          className={cn(
                            'bg-white/90 backdrop-blur-sm border-white/20',
                            categoryColors[article.category]
                          )}
                        >
                          {categoryLabels[article.category]}
                        </Badge>
                      </div>
                      {article.trending && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="warning" size="sm">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar
                            src={article.authorAvatar}
                            alt={article.authorName}
                            size="sm"
                          />
                          <div>
                            <p className="text-gray-900 font-medium text-sm">
                              {article.authorName}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{formatDate(article.publishedAt)}</span>
                              <span>•</span>
                              <span>{article.readTime}min</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{article.reactions.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{article.reactions.comments}</span>
                          </div>
                          <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Related Player */}
                      {article.relatedPlayer && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-500">Sobre:</span>
                            <div className="flex items-center space-x-2">
                              <Avatar
                                src={article.relatedPlayer.avatar}
                                alt={article.relatedPlayer.name}
                                size="xs"
                              />
                              <span className="font-medium text-gray-900">
                                {article.relatedPlayer.name}
                              </span>
                              <span className="text-gray-500">
                                • {article.relatedPlayer.team}
                              </span>
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