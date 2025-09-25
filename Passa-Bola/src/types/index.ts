// Core Entities
export interface TeamColors {
  primary: string;
  secondary: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  formation?: string; // Adicionado para ser usado no Match, mas pode ser redundante se MatchLineups.formation for o principal
  colors?: TeamColors; // Opcional aqui, mas preferencialmente deve ser definido
  founded?: number; // Tornado opcional, pois nem sempre é necessário nos detalhes da partida
  stadium?: string; // Tornado opcional
  city?: string; // Tornado opcional
  country?: string; // Tornado opcional
}

export interface Player {
  id: string;
  name: string;
  displayName?: string; // Opcional, se o 'name' já for suficiente
  avatar?: string; // Opcional, se não for sempre usado
  position: 'GK' | 'DEF' | 'MID' | 'FWD' | string; // Permitindo string para posições mais variadas
  shirtNumber?: number; // Tornou-se opcional para LineupPlayer, que usa 'number'
  age?: number;
  height?: number;
  weight?: number;
  nationality?: string;
  teamId?: string;
  stats?: PlayerStats;
  rating?: number; // Adicionado aqui para ser o rating principal do jogador
}

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating: number; // Mantenho aqui também se você quiser um rating genérico no Player, mas o MatchLineupPlayer pode sobrescrever
}

// Match System
export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  competition: Competition;
  venue: Venue;
  startTime: string;
  status: MatchStatus;
  matchDay?: number; // Tornado opcional
  round?: string;
  score?: MatchScore | null; // Pode ser null para partidas agendadas
  events: MatchEvent[];
  lineups: MatchLineups; // Agora é obrigatório
  statistics?: MatchStatistics | null; // Pode ser null
  liveData?: LiveMatchData; // Tornado opcional
  winProbability?: WinProbability; // Agora é obrigatório
}

export interface MatchScore {
  home: number;
  away: number;
  halfTime?: {
    home: number;
    away: number;
  };
  fullTime?: {
    home: number;
    away: number;
  };
  extraTime?: {
    home: number;
    away: number;
  };
  penalty?: {
    home: number;
    away: number;
  };
}

export interface Competition {
  id: string;
  name: string;
  shortName?: string; // Tornado opcional
  logo: string;
  country?: string; // Tornado opcional
  season?: string; // Tornado opcional
  type?: 'league' | 'cup' | 'international'; // Tornado opcional
}

export interface Venue {
  id?: string; // Tornado opcional, pode não vir do JSON
  name: string;
  city?: string; // Tornado opcional
  capacity?: number; // Tornado opcional
  surface?: string; // Tornado opcional
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type MatchStatus =
  | 'scheduled'
  | 'delayed'
  | 'postponed'
  | 'cancelled'
  | 'live'
  | 'halftime'
  | 'finished'
  | 'awarded';

// Match Events
export interface MatchEvent {
  id: string;
  matchId?: string; // Tornado opcional se já estiver no contexto do Match
  minute: number;
  extraMinute?: number;
  type: EventType;
  player: string; // Simplificado para string para casos onde o objeto Player completo não é necessário
  assist?: string; // Nome do assistente, simplificado
  team: 'home' | 'away'; // Ou pode ser Team se precisar do objeto completo
  description?: string; // Opcional
  coordinates?: {
    x: number; // 0-100 (field width)
    y: number; // 0-100 (field length)
  };
}

export type EventType =
  | 'goal'
  | 'own_goal'
  | 'penalty_goal'
  | 'yellow_card'
  | 'red_card'
  | 'substitution'
  | 'penalty_missed'
  | 'offside'
  | 'corner'
  | 'free_kick'
  | 'injury';

// Lineups
// Reorganizei para a estrutura usada no JSON de mock e no FormationPitch
export interface MatchLineups {
  home: SimplifiedLineupPlayer[];
  away: SimplifiedLineupPlayer[];
  home_substitutes?: SimplifiedLineupPlayer[];
  away_substitutes?: SimplifiedLineupPlayer[];
}

// SimplifiedLineupPlayer para o componente FormationPitch e MatchDetailPage
// Adapta-se ao formato do JSON de mock e do FormationPitch
export interface SimplifiedLineupPlayer {
  number: number; // Número da camisa
  name: string;
  position: string; // Posição como string (ex: "Goleira", "Atacante")
  rating?: number; // Rating específico para a partida
}


export interface TeamLineup { // Mantido para compatibilidade, mas o MatchLineups acima é preferível
  teamId: string;
  formation: string;
  coach: Coach;
  startingXI: DetailedLineupPlayer[];
  substitutes: DetailedLineupPlayer[];
  unavailable?: UnavailablePlayer[];
}

export interface DetailedLineupPlayer { // Mantido para compatibilidade com sua estrutura original Player
  player: Player;
  position: FieldPosition; // Posição detalhada do campo
  captain?: boolean;
  substitute?: boolean;
  substitutedIn?: number;
  substitutedOut?: number;
  rating?: number; // Rating específico para a partida
}


export interface UnavailablePlayer {
  player: Player;
  reason: 'injured' | 'suspended' | 'personal' | 'technical';
}

export interface Coach {
  id: string;
  name: string;
  avatar?: string; // Opcional
  nationality?: string; // Opcional
  age?: number; // Opcional
}

export interface FieldPosition { // Mantido para compatibilidade, mas a posição do SimplifiedLineupPlayer é uma string
  id: string;
  name: string;
  coordinates: {
    x: number; // 0-100 (field width)
    y: number; // 0-100 (field length)
  };
}

// Statistics
export interface MatchStatistics {
  home: TeamMatchStats;
  away: TeamMatchStats;
}

export interface TeamMatchStats {
  possession: number;
  shots: {
    total: number;
    onTarget: number;
    blocked?: number; // Opcional
    offTarget?: number; // Opcional
  };
  passes?: { // Tornadas opcionais
    total: number;
    accurate: number;
    accuracy: number;
  };
  fouls: number;
  corners: number;
  offside?: number; // Opcional
  yellowCards?: number; // Opcional
  redCards?: number; // Opcional
  saves?: number; // Opcional
}

// Live Data
export interface LiveMatchData {
  currentMinute: number;
  addedTime?: number;
  period: 'first_half' | 'halftime' | 'second_half' | 'extra_time_first' | 'extra_time_second' | 'penalties' | string; // Adicionado string para flexibilidade
  lastUpdate: string;
  momentum?: {
    home: number;
    away: number;
  };
}

export interface WinProbability {
  home: number;
  draw: number;
  away: number;
  lastUpdate?: string; // Tornada opcional
}

// Legacy Types (for backward compatibility)
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  content?: string;
}

export interface Game { // Este tipo é muito semelhante a Match, sugiro revisar para usar Match diretamente
  id: string;
  homeTeam: string; // ID ou nome?
  awayTeam: string; // ID ou nome?
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  time: string;
  venue: string;
  league?: string;
  score?: string | null; // string para placar é menos ideal que MatchScore
  status: 'scheduled' | 'live' | 'finished';
}

export interface Transfer {
  id: string;
  playerName: string;
  playerImageUrl: string;
  oldClub: string;
  newClub: string;
  fee?: string | null;
  date: string;
  status: 'confirmed' | 'rumor';
}

// UI Types
export interface TabItem {
  id: string;
  label: string;
  icon?: string; // Ícone como string, talvez o nome do componente LucideIcon
  badge?: number;
  disabled?: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
  value: any;
  selected?: boolean;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}