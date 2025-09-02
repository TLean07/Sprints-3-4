import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.resolve(__dirname, '../../serviceAccountKey.json');
const serviceAccount: ServiceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://passabola1esa-default-rtdb.firebaseio.com/"
});

const db = getDatabase();

async function seedDatabase() {
  console.log('Iniciando o seeding...');

  const players = {
    'marta-silva': {
      name: 'Marta Vieira da Silva',
      position: 'Atacante',
      club: 'Orlando Pride',
      bio: 'Considerada uma das maiores jogadoras de todos os tempos, Marta é um ícone do futebol feminino mundial.',
      imageUrl: 'https://s2.glbimg.com/Qe336m2232e-5032rF7pL_b5_yQ=/0x0:2048x1365/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc822896673f488aa253bbcb03c80ec5/internal_photos/bs/2023/n/y/z0FF3SSgO3C4nRF3vr7A/agif23042921043313.jpg'
    },
    'cristiane': {
      name: 'Cristiane Rozeira',
      position: 'Atacante',
      club: 'Flamengo',
      bio: 'Artilheira e experiente, Cristiane é uma referência no ataque brasileiro.',
      imageUrl: 'https://flamengorj.com.br/wp-content/uploads/2024/01/cristiane-flamengo.jpg'
    },
    'debinha': {
      name: 'Debinha',
      position: 'Meio-campista',
      club: 'Kansas City Current',
      bio: 'Velocidade e técnica apurada, Debinha é uma das principais jogadoras do Brasil.',
      imageUrl: 'https://s2.glbimg.com/pL2yE-tG_nMRqLuWQNt_Cg_1c2c=/0x0:3000x2000/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc822896673f488aa253bbcb03c80ec5/internal_photos/bs/2023/B/K/bS5yA1TdaDkL0b2jJpEg/agif2307241144265.jpg'
    }
  };

  const news = {
    'news-1': {
        title: 'Crescimento Visível: Futebol Feminino Ganha Destaque Global',
        category: 'Visibilidade',
        excerpt: 'O futebol feminino vem conquistando seu espaço merecido no cenário esportivo global, atraindo olhares, patrocínios e torcedores apaixonados.',
        imageUrl: 'https://picsum.photos/seed/news1/600/400',
        date: '2025-08-20',
        content: 'Conteúdo completo da notícia 1...'
    },
    'news-2': {
        title: 'Nova Geração de Talentos Brilha no Brasileirão Feminino',
        category: 'Talentos',
        excerpt: 'Jovens promessas do futebol feminino brasileiro começam a despontar, mostrando um futuro brilhante para a modalidade no país.',
        imageUrl: 'https://picsum.photos/seed/news2/600/400',
        date: '2025-08-18',
        content: 'Conteúdo completo da notícia 2...'
    },
  };

  const games = {
    'game-1': {
      homeTeam: 'Corinthians',
      awayTeam: 'Ferroviária',
      homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bras%C3%A3o_do_Sport_Club_Corinthians_Paulista.svg/1200px-Bras%C3%A3o_do_Sport_Club_Corinthians_Paulista.svg.png',
      awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes_-_logo.svg/1200px-Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes_-_logo.svg.png',
      date: '2025-09-06',
      time: '18:00',
      venue: 'Parque São Jorge',
      score: null,
      status: 'scheduled'
    },
    'game-2': {
      homeTeam: 'Flamengo',
      awayTeam: 'Internacional',
      homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bras%C3%A3o_do_Clube_de_Regatas_do_Flamengo.svg/1200px-Bras%C3%A3o_do_Clube_de_Regatas_do_Flamengo.svg.png',
      awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sport_Club_Internacional_logo.svg/1200px-Sport_Club_Internacional_logo.svg.png',
      date: '2025-08-30',
      time: '16:00',
      venue: 'Estádio da Gávea',
      score: '2-1',
      status: 'finished'
    },
    'game-3': {
      homeTeam: 'Palmeiras',
      awayTeam: 'Santos',
      homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Escudo_da_Sociedade_Esportiva_Palmeiras.svg/1200px-Escudo_da_Sociedade_Esportiva_Palmeiras.svg.png',
      awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/1/15/Santos_FC_logo.svg/1200px-Santos_FC_logo.svg.png',
      date: '2025-09-13',
      time: '19:30',
      venue: 'Allianz Parque',
      score: null,
      status: 'scheduled'
    },
    'game-4': {
      homeTeam: 'São Paulo',
      awayTeam: 'Cruzeiro',
      homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/FC_Sao_Paulo_logo.svg/1200px-FC_Sao_Paulo_logo.svg.png',
      awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Cruzeiro_Esporte_Clube_2021.svg/1200px-Cruzeiro_Esporte_Clube_2021.svg.png',
      date: '2025-08-27',
      time: '20:00',
      venue: 'Estádio Marcelo Portugal',
      score: '1-1',
      status: 'finished'
    }
  };

  const transfers = {
    'transfer-1': {
      playerName: 'Gabi Portilho',
      playerImageUrl: 'https://sccorinthians.com.br/media/filer_public_thumbnails/filer_public/a0/0a/a00a0da3-fa7b-402a-9e11-e685f02ab452/gabi_portilho_corinthians_x_cruzeiro_brasileirao_feminino_2024_foto_rodrigo_coca_ag_corinthians-7.jpg__1000x667_q85_subsampling-2_upscale.jpg',
      oldClub: 'Corinthians',
      newClub: 'Chelsea FC',
      fee: '€600K',
      date: '2025-08-15',
      status: 'rumor'
    },
    'transfer-2': {
      playerName: 'Duda Sampaio',
      playerImageUrl: 'https://sccorinthians.com.br/media/filer_public_thumbnails/filer_public/30/14/3014c405-b04f-4d2d-8ac3-380d3b66479b/duda_sampaio_corinthians_x_sao_paulo_brasileirao_feminino_2024_foto_rodrigo_coca_ag_corinthians-16.jpg__1000x667_q85_subsampling-2_upscale.jpg',
      oldClub: 'Internacional',
      newClub: 'Corinthians',
      fee: '€350K',
      date: '2025-08-10',
      status: 'confirmed'
    },
  };

  await db.ref('news').set(news);
  await db.ref('games').set(games);
  await db.ref('transfers').set(transfers);
  await db.ref('players').set(players);

  console.log('Seed concluído com sucesso!');
  process.exit(0);
}

seedDatabase().catch(error => {
  console.error('Erro no seeding:', error);
  process.exit(1);
});