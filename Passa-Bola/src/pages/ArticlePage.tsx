import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import type { NewsArticle } from './News';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch('/data/news.json');
        const articles: NewsArticle[] = await response.json();
        const foundArticle = articles.find(a => a.id === articleId);
        setArticle(foundArticle || null);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Notícia não encontrada</h1>
        <p className="text-gray-600 mb-6">O artigo que você está procurando não existe ou foi movido.</p>
        <button
          onClick={() => navigate('/noticias')}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para Notícias</span>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <header className="mb-8">
        <button
          onClick={() => navigate('/noticias')}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 font-semibold mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para todas as notícias</span>
        </button>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          {article.subtitle}
        </p>

        <div className="mt-6 flex items-center space-x-4 border-t border-b border-gray-200 py-4">
          <div className="flex items-center space-x-3">
            <Avatar src={article.authorAvatar} alt={article.authorName} size="md" />
            <div>
              <p className="font-semibold text-gray-800">{article.authorName}</p>
              <p className="text-sm text-gray-500">Autor(a)</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR', { dateStyle: 'long' })}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} min de leitura</span>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <article className="prose prose-lg max-w-none w-full lg:w-2/3">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full rounded-lg mb-8 shadow-lg"
          />
          <p className="text-gray-700 whitespace-pre-line">
            {article.content}
          </p>
        </article>

        <aside className="w-full lg:w-1/3 lg:sticky top-24 self-start">
          <div className="bg-white p-6 rounded-lg shadow-card border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-primary-600"/>
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Badge key={tag} variant="default" size="md">
                  {tag}
                </Badge>
              ))}
            </div>

            {article.relatedPlayer && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary-600"/>
                  Atleta em Destaque
                </h3>
                <div className="flex items-center space-x-3">
                  <Avatar src={article.relatedPlayer.avatar} alt={article.relatedPlayer.name} size="lg" />
                  <div>
                    <p className="font-semibold text-gray-800">{article.relatedPlayer.name}</p>
                    <p className="text-sm text-gray-500">{article.relatedPlayer.team}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default ArticlePage;