import { useEffect, useState } from 'react';
import { getNewsFromAPI, getGames, getTransfers } from '../services/api';
import type { NewsArticle, Game, Transfer } from '../types';
import NewsCard from '../components/modules/news/NewsCard';
import GameCard from '../components/modules/games/GameCard';
import TransferCard from '../components/modules/transfers/TransferCard';
import { Spinner } from '../components/common/Spinner';
import { Heading } from '../components/common/Heading';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [recentTransfers, setRecentTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const news = await getNewsFromAPI();
        setLatestNews(news.slice(0, 3));

        const games = await getGames();
        setUpcomingGames(games.filter(g => g.status === 'scheduled').slice(0, 3));

        const transfers = await getTransfers();
        setRecentTransfers(transfers.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="relative bg-secondary text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary to-secondary opacity-70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h1" variant="hero" className="text-white mb-4">
              O Futebol Feminino na Palma da Sua Mão
            </Heading>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-white/90">
              Conectando tecnologia e paixão, Passa a Bola é o seu portal completo para o universo do futebol feminino. Notícias, jogos, transferências e muito mais.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/noticias">
                <Button variant="primary" size="lg">Ver Notícias</Button>
              </Link>
              <Link to="/jogos">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">Próximos Jogos</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Heading variant="section" className="text-center mb-10">
            Últimas Notícias
          </Heading>
          {loading ? (
            <div className="flex justify-center"><Spinner /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/noticias">
              <Button variant="secondary" size="md">Ver Todas as Notícias</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Heading variant="section" className="text-center mb-10">
            Próximos Jogos
          </Heading>
          {loading ? (
            <div className="flex justify-center"><Spinner /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/jogos">
              <Button variant="primary" size="md">Ver Todos os Jogos</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Heading variant="section" className="text-center mb-10">
            Mercado de Transferências
          </Heading>
          {loading ? (
            <div className="flex justify-center"><Spinner /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentTransfers.map(transfer => (
                <TransferCard key={transfer.id} transfer={transfer} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/transferencias">
              <Button variant="secondary" size="md">Ver Todas as Transferências</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;