import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Trophy, Users, BarChart2, Star, Dices, Goal, RectangleVertical, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { FormationPitch } from '../components/ui/FormationPitch';
import { WinProbabilityChart } from '../components/ui/WinProbabilityChart';
import type { Match, LineupPlayer } from '../types';

// Função auxiliar para determinar a cor do time com base no ID
const getTeamColors = (teamId: string) => {
  switch (teamId) {
    case 'corinthians': return { primary: '#222222', secondary: '#FFFFFF' };
    case 'palmeiras': return { primary: '#006437', secondary: '#FFFFFF' };
    case 'santos': return { primary: '#000000', secondary: '#FFFFFF' };
    case 'ferroviaria': return { primary: '#512a48', secondary: '#FFFFFF' };
    case 'flamengo': return { primary: '#D32F2F', secondary: '#101010' };
    case 'internacional': return { primary: '#C40222', secondary: '#FFFFFF' };
    default: return { primary: '#3b82f6', secondary: '#FFFFFF' }; // Cor padrão
  }
};


const MatchDetailPage = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayingHomeLineup, setDisplayingHomeLineup] = useState(true); // Controla qual escalação está sendo exibida

  useEffect(() => {
    const fetchMatch = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/matches.json');
        const matches: Match[] = await response.json();
        const foundMatch = matches.find(m => m.id === matchId);
        setMatch(foundMatch || null);
      } catch (error) {
        console.error("Failed to fetch match details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
  }, [matchId]);

  // Resetar a visualização da escalação ao mudar de jogo
  useEffect(() => {
    setDisplayingHomeLineup(true);
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-pink-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Partida não encontrada</h1>
        <button
          onClick={() => navigate('/jogos')}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para Jogos</span>
        </button>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    if (status === 'live') return { label: 'AO VIVO', color: 'bg-live text-white animate-pulse' };
    if (status === 'finished') return { label: 'FINALIZADO', color: 'bg-gray-700 text-white' };
    return { label: 'AGENDADO', color: 'bg-blue-500 text-white' };
  };

  const getEventIcon = (type: string) => {
    if (type === 'goal') return <Goal className="w-5 h-5 text-green-500" />;
    if (type === 'yellow_card') return <RectangleVertical className="w-5 h-5 text-yellow-400 fill-current" />;
    return <Star className="w-5 h-5 text-gray-400" />;
  };

  const statusInfo = getStatusInfo(match.status);
  
  const homeTeamColors = getTeamColors(match.homeTeam.id);
  const awayTeamColors = getTeamColors(match.awayTeam.id);

  const currentLineupTeam = displayingHomeLineup ? match.homeTeam : match.awayTeam;
  const currentLineupPlayers = displayingHomeLineup ? match.lineups.home : match.lineups.away;
  const currentSubstitutes = displayingHomeLineup ? match.lineups.home_substitutes : match.lineups.away_substitutes;
  const currentTeamColors = displayingHomeLineup ? homeTeamColors : awayTeamColors;

  const SubstitutesList = ({ title, players }: { title: string, players: LineupPlayer[] }) => (
    <div className="mt-8">
      <h4 className="font-bold text-center mb-4 text-gray-800">{title}</h4>
      <div className="space-y-3">
        {players.map(player => (
          <div key={player.number} className="flex items-center bg-gray-50 p-2 rounded-lg shadow-sm">
            <span className="w-8 h-8 flex items-center justify-center font-bold bg-gray-200 text-gray-700 rounded-full mr-3 text-sm">{player.number}</span>
            <div>
              <p className="font-medium text-sm">{player.name}</p>
              <p className="text-xs text-gray-500">{player.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-4"
    >
      <button
        onClick={() => navigate('/jogos')}
        className="flex items-center space-x-2 text-primary-600 font-semibold mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar para todas as partidas</span>
      </button>

      {/* Header com Estádio, Placar e Probabilidade */}
      <div className="relative bg-white rounded-2xl shadow-card mb-6 overflow-hidden">
        <img src="/attached_assets/stock_images/soccer_stadium_aerial_view.jpg" alt="Estádio" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/90" />
        <div className="relative p-6 md:p-8">
          <div className="text-center mb-4">
            <p className="font-semibold text-primary-600">{match.competition.name}</p>
            <p className="text-sm text-gray-500">{match.round}</p>
          </div>

          {/* Placar Principal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex flex-col items-center flex-1 min-w-0">
              <Avatar src={match.homeTeam.logo} alt={match.homeTeam.name} size="xl" />
              <h2 className="text-lg font-bold mt-2 text-center truncate w-full">{match.homeTeam.name}</h2>
            </div>

            <div className="flex-shrink-0 text-center">
              {match.score ? (
                <div className="flex items-baseline justify-center gap-1 sm:gap-2">
                  <span className="text-5xl sm:text-6xl font-extrabold text-gray-900">{match.score.home}</span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-gray-600">-</span>
                  <span className="text-5xl sm:text-6xl font-extrabold text-gray-900">{match.score.away}</span>
                </div>
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">{new Date(match.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</h1>
              )}
              <Badge className={`mt-2 ${statusInfo.color}`}>{statusInfo.label}</Badge>
            </div>

            <div className="flex flex-col items-center flex-1 min-w-0">
              <Avatar src={match.awayTeam.logo} alt={match.awayTeam.name} size="xl" />
              <h2 className="text-lg font-bold mt-2 text-center truncate w-full">{match.awayTeam.name}</h2>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-600 text-sm mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{new Date(match.startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{match.venue.name}</span>
            </div>
          </div>

          {match.winProbability && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center justify-center mb-3">
                <Dices className="w-5 h-5 mr-2 text-primary-600" />
                Probabilidade de Vitória
              </h3>
              <WinProbabilityChart 
                probability={match.winProbability} 
                homeTeamName={match.homeTeam.shortName || match.homeTeam.name}
                awayTeamName={match.awayTeam.shortName || match.awayTeam.name}
              />
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1 mb-4 shadow-sm">
          <TabsTrigger value="events" className="flex items-center justify-center py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-md rounded-lg transition-all">
            <Star className="w-4 h-4 mr-2" />Eventos
          </TabsTrigger>
          <TabsTrigger value="lineups" className="flex items-center justify-center py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-md rounded-lg transition-all">
            <Users className="w-4 h-4 mr-2" />Escalações
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center justify-center py-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-md rounded-lg transition-all">
            <BarChart2 className="w-4 h-4 mr-2" />Estatísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="bg-white rounded-xl shadow-card p-6 md:p-8">
          {match.events?.length > 0 ? (
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-3 md:left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-200 to-pink-200 rounded-full" />
              {match.events.map(event => (
                <div key={event.id} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow-md z-10">
                    <div className="w-8 h-8 flex items-center justify-center bg-primary-50 rounded-full text-primary-600">
                      {getEventIcon(event.type)}
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-gray-800">{event.type === 'goal' ? 'GOL!' : 'Cartão Amarelo'}</p>
                      <p className="text-lg font-bold text-gray-500">{event.minute}'</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">{event.player}</span> ({event.team === 'home' ? match.homeTeam.shortName : match.awayTeam.shortName})
                    </p>
                    {event.assist && <p className="text-xs text-gray-500">Assistência: {event.assist}</p>}
                  </motion.div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <ChevronsRight className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Nenhum evento importante na partida até o momento.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="lineups" className="bg-white rounded-xl shadow-card p-6 md:p-8">
          {/* Navegação entre escalações */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setDisplayingHomeLineup(true)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                displayingHomeLineup
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {match.homeTeam.shortName || match.homeTeam.name}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setDisplayingHomeLineup(false)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                !displayingHomeLineup
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {match.awayTeam.shortName || match.awayTeam.name}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={displayingHomeLineup ? 'home' : 'away'}
              initial={{ opacity: 0, x: displayingHomeLineup ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: displayingHomeLineup ? 50 : -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10"
            >
              <div>
                <h3 className="font-bold text-center mb-4 text-xl text-gray-800">{currentLineupTeam.name}</h3>
                <p className="text-center text-gray-600 mb-6">Formação: <span className="font-semibold">{currentLineupTeam.formation}</span></p>
                <FormationPitch 
                  lineup={currentLineupPlayers} 
                  formation={currentLineupTeam.formation} 
                  teamColor={currentTeamColors.primary} 
                  secondaryTeamColor={currentTeamColors.secondary}
                />
              </div>
              <div>
                {currentSubstitutes && currentSubstitutes.length > 0 ? (
                  <SubstitutesList title="Reservas" players={currentSubstitutes} />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Nenhum jogador reserva disponível.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="stats" className="bg-white rounded-xl shadow-card p-6 md:p-8">
           {match.statistics ? (
            <div className="space-y-5">
              {[
                { label: 'Posse de Bola', home: match.statistics.home.possession, away: match.statistics.away.possession, unit: '%' },
                { label: 'Finalizações', home: match.statistics.home.shots, away: match.statistics.away.shots },
                { label: 'No Gol', home: match.statistics.home.onTarget, away: match.statistics.away.onTarget },
                { label: 'Faltas', home: match.statistics.home.fouls, away: match.statistics.away.fouls },
                { label: 'Escanteios', home: match.statistics.home.corners, away: match.statistics.away.corners },
              ].map(stat => {
                const total = stat.home + stat.away;
                const homePercentage = total > 0 ? (stat.home / total) * 100 : 0;
                const awayPercentage = total > 0 ? (stat.away / total) * 100 : 0;

                return (
                  <div key={stat.label}>
                    <div className="flex justify-between items-center text-sm font-semibold mb-2">
                      <span className="w-12 text-left text-primary-600">{stat.home}{stat.unit || ''}</span>
                      <span className="text-gray-600">{stat.label}</span>
                      <span className="w-12 text-right text-red-600">{stat.away}{stat.unit || ''}</span>
                    </div>
                    <div className="flex w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-primary-500 h-full transition-all duration-500 ease-out" style={{ width: `${homePercentage}%` }}></div>
                      <div className="bg-red-500 h-full transition-all duration-500 ease-out" style={{ width: `${awayPercentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <BarChart2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Estatísticas não disponíveis para esta partida.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default MatchDetailPage;