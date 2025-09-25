import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { cn } from '../lib/utils';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export interface NewsArticle {
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
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/news.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: NewsArticle[] = await response.json();
        setNews(data);
        setFilteredNews(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
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
  
  const handleArticleClick = (articleId: string) => {
    navigate(`/noticias/${articleId}`);
  };

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  const featuredArticle = filteredNews.find(article => article.featured);
  const regularArticles = filteredNews.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 pb-20 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Notícias
          </h1>
          <p className="text-gray-600">
            Acompanhe as últimas novidades do futebol feminino brasileiro e mundial
          </p>
        </div>

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

            <div onClick={() => handleArticleClick(featuredArticle.id)} className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer">
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
                  onClick={() => handleArticleClick(article.id)}
                  className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                >
                  <div className="md:flex">
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

                    <div className="md:w-2/3 p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

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