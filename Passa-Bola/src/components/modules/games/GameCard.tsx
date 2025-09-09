import type { Game } from '../../../types';
import { Card } from '../../ui/Card'; 

const GameCard = ({ game }: { game: Game }) => {
  const getStatusChip = () => {
    switch (game.status) {
      case 'live':
        return <span className="text-xs font-bold text-error animate-pulse bg-red-100 px-2 py-1 rounded-full">AO VIVO</span>;
      case 'finished':
        return <span className="text-xs font-bold text-medium-gray bg-gray-200 px-2 py-1 rounded-full">FINAL</span>;
      default: {
        const gameDate = new Date(`${game.date.split('/').reverse().join('-')}T${game.time}`);
        return <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-1 rounded-full">{gameDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>;
      }
    }
  };

  return (
    <Card className="flex flex-col h-full p-6">
      <div className="flex justify-between items-center mb-6 text-center">
        <span className="text-xs text-medium-gray font-semibold font-body">{new Date(game.date.split('/').reverse().join('-')).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}</span>
        {getStatusChip()}
      </div>

      <div className="flex-grow space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img src={game.homeTeamLogo} alt={game.homeTeam} className="w-8 h-8 object-contain" />
            <span className="font-bold text-dark-text truncate font-heading">{game.homeTeam}</span>
          </div>
          <span className="font-bold text-2xl text-pink-600 font-heading">{game.score ? game.score.split('-')[0] : ''}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img src={game.awayTeamLogo} alt={game.awayTeam} className="w-8 h-8 object-contain" />
            <span className="font-bold text-dark-text truncate font-heading">{game.awayTeam}</span>
          </div>
          <span className="font-bold text-2xl text-pink-600 font-heading">{game.score ? game.score.split('-')[1] : ''}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 mt-6 pt-4 text-center">
        <span className="text-xs text-medium-gray truncate">{game.venue}</span>
      </div>
    </Card>
  );
};

export default GameCard;