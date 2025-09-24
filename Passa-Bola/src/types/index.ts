// Core Entities
export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  founded: number;
  stadium: string;
  city: string;
  country: string;
}

export interface Player {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  shirtNumber: number;
  age: number;
  height: number;
  weight: number;
  nationality: string;
  teamId: string;
  stats: PlayerStats;
}

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating: number;
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
  matchDay: number;
  round?: string;
  score?: MatchScore;
  events: MatchEvent[];
  lineups?: MatchLineups;
  statistics?: MatchStatistics;
  liveData?: LiveMatchData;
  winProbability?: WinProbability;
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
  shortName: string;
  logo: string;
  country: string;
  season: string;
  type: 'league' | 'cup' | 'international';
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity: number;
  surface: string;
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
  matchId: string;
  minute: number;
  extraMinute?: number;
  type: EventType;
  player: Player;
  assistPlayer?: Player;
  team: Team;
  description: string;
  coordinates?: {
    x: number;
    y: number;
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
export interface MatchLineups {
  home: TeamLineup;
  away: TeamLineup;
}

export interface TeamLineup {
  teamId: string;
  formation: string;
  coach: Coach;
  startingXI: LineupPlayer[];
  substitutes: LineupPlayer[];
  unavailable?: UnavailablePlayer[];
}

export interface LineupPlayer {
  player: Player;
  position: FieldPosition;
  captain?: boolean;
  substitute?: boolean;
  substitutedIn?: number;
  substitutedOut?: number;
  rating?: number;
}

export interface UnavailablePlayer {
  player: Player;
  reason: 'injured' | 'suspended' | 'personal' | 'technical';
}

export interface Coach {
  id: string;
  name: string;
  avatar: string;
  nationality: string;
  age: number;
}

export interface FieldPosition {
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
    blocked: number;
    offTarget: number;
  };
  passes: {
    total: number;
    accurate: number;
    accuracy: number;
  };
  fouls: number;
  corners: number;
  offside: number;
  yellowCards: number;
  redCards: number;
  saves: number;
}

// Live Data
export interface LiveMatchData {
  currentMinute: number;
  addedTime?: number;
  period: 'first_half' | 'halftime' | 'second_half' | 'extra_time_first' | 'extra_time_second' | 'penalties';
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
  lastUpdate: string;
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

export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  time: string;
  venue: string;
  score?: string | null;
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
  icon?: string;
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