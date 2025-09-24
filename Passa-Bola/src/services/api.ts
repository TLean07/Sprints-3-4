import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { ref as dbRef, get, set, child, push } from "firebase/database";
import { auth, storage, db } from "../lib/firebase";
import type { NewsArticle, Game, Transfer } from "../types";

const NEWSAPI_API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY || '4eea2a9cc933469b9d72bbf074452732';

interface SourceFromAPI {
  id: string | null;
  name: string;
}
interface ArticleFromAPI {
  source: SourceFromAPI;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}
interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: ArticleFromAPI[];
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

export const getGames = async (): Promise<Game[]> => {
  try {
    const gamesRef = dbRef(db);
    const snapshot = await get(child(gamesRef, 'games'));
    if (snapshot.exists()) {
      const data: Record<string, Omit<Game, 'id'>> = snapshot.val();
      return Object.keys(data).map(key => ({ ...data[key], id: key }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar jogos do Firebase:", error);
    return [];
  }
};

export const getTransfers = async (): Promise<Transfer[]> => {
  try {
    const transfersRef = dbRef(db);
    const snapshot = await get(child(transfersRef, 'transfers'));
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

export const getUserProfileData = async (uid: string) => {
  const snapshot = await get(child(dbRef(db), `users/${uid}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};

export const updateUserProfileData = async (uid: string, data: object) => {
  return set(dbRef(db, `users/${uid}`), data);
};

export const uploadProfileImage = async (uid: string, file: File): Promise<string> => {
  const fileRef = storageRef(storage, `profileImages/${uid}/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(snapshot.ref);
  
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { photoURL });
  }

  return photoURL;
};

export const saveChampionshipSignup = async (signupData: { fullName: string; email: string; cpf: string; }) => {
  const signupsRef = dbRef(db, 'championshipSignups');
  const newSignupRef = push(signupsRef);
  return set(newSignupRef, {
    ...signupData,
    createdAt: new Date().toISOString(),
  });
};