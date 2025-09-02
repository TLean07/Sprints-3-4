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