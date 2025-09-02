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
        
        const sortedGames = allGames.sort((a, b) => {
            if (a.status === 'live' && b.status !== 'live') return -1;
            if (b.status === 'live' && a.status !== 'live') return 1;

            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);

            if (a.status === 'scheduled' && b.status === 'scheduled') {
                return dateA.getTime() - dateB.getTime();
            }
            if (a.status === 'finished' && b.status === 'finished') {
                return dateB.getTime() - dateA.getTime();
            }
            return 0;
        });
        setGames(sortedGames);
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
        Próximos Jogos & Resultados
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
            <p className="col-span-full text-center text-medium-gray">Não há jogos cadastrados no momento.</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default GamesPage;