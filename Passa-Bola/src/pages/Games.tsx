import { useEffect, useState } from 'react';
import { getGames } from '../services/api';
import type { Game } from '../types';
import GameCard from '../components/modules/games/GameCard';
import { Spinner } from '../components/common/Spinner';
import { Heading } from '../components/common/Heading';
import { motion } from 'framer-motion';

const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const allGames = await getGames();
        setGames(allGames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Heading variant="section" className="text-center mb-10">
        Jogos e Resultados (Brasileirão Feminino)
      </Heading>
      {loading ? (
        <div className="flex justify-center mt-10"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.length > 0 ? (
            games.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <p className="col-span-full text-center text-medium-gray">Não foi possível carregar os jogos no momento. Tente novamente mais tarde.</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default GamesPage;