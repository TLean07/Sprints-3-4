import { useEffect, useState } from 'react';
import { getNewsFromAPI } from '../services/api';
import type { NewsArticle } from '../types';
import NewsCard from '../components/modules/news/NewsCard';
import { Spinner } from '../components/common/Spinner';
import { Heading } from '../components/common/Heading';
import { motion } from 'framer-motion';

const NewsPage = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const allNews = await getNewsFromAPI();
        setNews(allNews);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Heading variant="section" className="text-center mb-10">
        Todas as Notícias
      </Heading>
      {loading ? (
        <div className="flex justify-center mt-10"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.length > 0 ? (
            news.map(article => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <p className="col-span-full text-center text-medium-gray text-lg">Não foi possível carregar as notícias no momento.</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default NewsPage;