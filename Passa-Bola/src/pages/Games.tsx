import { useEffect, useState } from 'react';
import { getGames } from '../services/api';
import type { Game } from '../types';
import GameCard from '../components/modules/games/GameCard';
import { Spinner } from '../components/common/Spinner';
import { Heading } from '../components/common/Heading';
import { motion } from 'framer-motion';

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
  },
};

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Heading variant="section">Jogos e Resultados</Heading>
        <p className="text-medium-gray mt-2 font-body text-lg">Acompanhe as partidas do Brasileirão Feminino.</p>
      </div>

      {loading ? (
        <div className="flex justify-center mt-10"><Spinner /></div>
      ) : (
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {games.length > 0 ? (
            games.map(game => (
              <motion.div 
                key={game.id} 
                variants={itemVariant}
              >
                <GameCard game={game} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-medium-gray text-lg">Não foi possível carregar os jogos no momento.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default GamesPage;