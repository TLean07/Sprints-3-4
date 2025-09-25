import { motion } from 'framer-motion';
import { Shirt } from 'lucide-react';
import type { SimplifiedLineupPlayer } from '../../types'; // Ajuste aqui para o tipo correto
import { Badge } from './Badge'; // <--- ADICIONE ESTA LINHA

interface FormationPitchProps {
  lineup: SimplifiedLineupPlayer[]; // Ajuste aqui para o tipo correto
  formation: string;
  teamColor: string;
  secondaryTeamColor?: string;
}

const parseFormation = (formation: string): number[] => {
  return formation.split('-').map(Number);
};

export const FormationPitch = ({ lineup, formation, teamColor, secondaryTeamColor }: FormationPitchProps) => {
  if (!lineup || lineup.length < 11 || !formation) {
    return <p className="text-center text-gray-500 py-4">Formação não disponível.</p>;
  }

  const formationLines = parseFormation(formation);
  const players = [...lineup];
  
  const goalkeeper = players.shift(); // Remove o goleiro da lista de jogadores de linha
  
  let lines: SimplifiedLineupPlayer[][] = [];
  let currentIndex = 0;
  formationLines.forEach(numPlayers => {
    // Garante que não tentará pegar mais jogadores do que o disponível
    const playersInLine = players.slice(currentIndex, currentIndex + numPlayers);
    lines.push(playersInLine);
    currentIndex += numPlayers;
  });

  // Revertemos a ordem para que o goleiro fique na parte inferior do campo visualmente
  const allLines = [goalkeeper ? [goalkeeper] : [], ...lines].reverse();

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[7/10] bg-field rounded-lg p-4 flex flex-col justify-between overflow-hidden shadow-inner border-4 border-field-border">
      {/* Linhas do Campo */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30"></div> {/* Linha do meio */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/30 rounded-full"></div> {/* Círculo central */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[60%] h-20 border-2 border-white/30 border-t-0 rounded-b-lg"></div> {/* Grande Área de cima */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[30%] h-10 border-2 border-white/30 border-t-0 rounded-b-lg"></div> {/* Pequena Área de cima */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-20 border-2 border-white/30 border-b-0 rounded-t-lg"></div> {/* Grande Área de baixo */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[30%] h-10 border-2 border-white/30 border-b-0 rounded-t-lg"></div> {/* Pequena Área de baixo */}
      
      {/* Jogadores */}
      <div className="relative z-10 h-full flex flex-col justify-around">
        {allLines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            className="flex justify-around"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: lineIndex * 0.1 }}
          >
            {line.map((player) => (
              <motion.div
                key={player.number}
                className="flex flex-col items-center group relative cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div
                  className="relative w-10 h-10 flex items-center justify-center rounded-lg mb-1 shadow-md border-2 border-white/50"
                  style={{ 
                    backgroundColor: teamColor || '#374151',
                    color: secondaryTeamColor || 'white',
                    boxShadow: `0px 4px 12px -2px ${teamColor}80`
                  }}
                >
                  <Shirt className="absolute inset-0 w-full h-full p-1 opacity-20" style={{color: secondaryTeamColor || 'white'}} />
                  <span className="relative text-base font-extrabold">{player.number}</span>
                  {player.rating && player.rating > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm"
                    >
                      {player.rating.toFixed(1)}
                    </Badge>
                  )}
                </div>
                <p className="text-white text-xs font-semibold bg-black/40 px-2 py-0.5 rounded-full truncate max-w-[80px] group-hover:max-w-none group-hover:bg-black/60 transition-all duration-200">
                  {player.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};