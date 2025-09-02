import { ref, get, child } from "firebase/database";
import { db } from "../lib/firebase";
import type { NewsArticle, Game, Transfer } from "../types";

const NEWSAPI_API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;
const APIFOOTBALL_KEY = import.meta.env.VITE_APIFOOTBALL_KEY;

// --- Tipos para NewsAPI ---
interface SourceFromAPI {
  id: string | null;
  name: string;
}
interface ArticleFromAPI {
  source: SourceFromAPI;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}
interface NewsAPIResponse {
  status: string;
  articles: ArticleFromAPI[];
}

// --- Tipos para API-Football ---
interface FixtureFromAPI {
  fixture: {
    id: number;
    date: string;
    venue: { name: string | null };
    status: { short: string };
  };
  teams: {
    home: { id: number; name: string; logo: string };
    away: { id: number; name: string; logo: string };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}
interface APIFootballResponse {
  response: FixtureFromAPI[];
}


export const getNewsFromAPI = async (): Promise<NewsArticle[]> => {
  try {
    const query = encodeURIComponent('"futebol feminino" OR "Brasileirão Feminino" OR "seleção feminina"');
    const today = new Date();
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0];
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${oneMonthAgo}&language=pt&sortBy=publishedAt&apiKey=${NEWSAPI_API_KEY}`);
    const data: NewsAPIResponse = await response.json();
    if (data.status !== 'ok' || !data.articles) return [];
    return data.articles
      .filter(article => article.urlToImage && article.description)
      .map((article): NewsArticle => ({
        id: article.url,
        title: article.title,
        excerpt: article.description,
        imageUrl: article.urlToImage || 'https://via.placeholder.com/600x400.png?text=Passa+a+Bola',
        category: article.source.name,
        date: new Date(article.publishedAt).toLocaleDateString('pt-BR'),
        content: article.content || undefined,
    }));
  } catch (error) {
    console.error("Erro ao buscar notícias da API:", error);
    return [];
  }
};

export const getGamesFromAPIFootball = async (): Promise<Game[]> => {
  if (!APIFOOTBALL_KEY) {
    console.error("Chave da API-Football não encontrada.");
    return [];
  }
  try {
    const response = await fetch('https://v3.football.api-sports.io/fixtures?league=326&season=2025', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': APIFOOTBALL_KEY,
      },
    });
    const data: APIFootballResponse = await response.json();
    if (!data.response || data.response.length === 0) {
      return [];
    }
    return data.response.map((fixture): Game => {
      const eventDate = new Date(fixture.fixture.date);
      const statusMap = {
        'TBD': 'scheduled', 'NS': 'scheduled', '1H': 'live', 'HT': 'live',
        '2H': 'live', 'ET': 'live', 'P': 'live', 'FT': 'finished',
        'AET': 'finished', 'PEN': 'finished'
      };
      const status = statusMap[fixture.fixture.status.short as keyof typeof statusMap] || 'scheduled';
      return {
        id: fixture.fixture.id.toString(),
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        homeTeamLogo: fixture.teams.home.logo,
        awayTeamLogo: fixture.teams.away.logo,
        date: eventDate.toLocaleDateString('pt-BR'),
        time: eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        venue: fixture.fixture.venue.name || 'Não informado',
        score: fixture.goals.home !== null ? `${fixture.goals.home}-${fixture.goals.away}` : null,
        status: status as Game['status'],
      };
    }).sort((a: Game, b: Game) => {
      const dateA = new Date(a.date.split('/').reverse().join('-') + 'T' + a.time);
      const dateB = new Date(b.date.split('/').reverse().join('-') + 'T' + b.time);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Erro ao buscar jogos da API-Football:", error);
    return [];
  }
};

export const getTransfers = async (): Promise<Transfer[]> => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, 'transfers'));
    if (snapshot.exists()) {
      const data: Record<string, Omit<Transfer, 'id'>> = snapshot.val();
      return Object.keys(data).map(key => ({ ...data[key], id: key }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar transferências do Firebase:", error);
    return [];
  }
};