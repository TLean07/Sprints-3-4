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
      homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png',
      awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Escudo_Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes.png/1024px-Escudo_Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes.png',
      date: '2025-09-06',
      time: '18:00',
      venue: 'Parque São Jorge',
      score: null,
      status: 'scheduled'
    },
    'game-2': {
      homeTeam: 'Flamengo',
      awayTeam: 'Internacional',
      homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/800px-Flamengo_braz_logo.svg.png',
      awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/SC_Internacional_Brazil_Logo.svg/800px-SC_Internacional_Brazil_Logo.svg.png',
      date: '2025-08-30',
      time: '16:00',
      venue: 'Estádio da Gávea',
      score: '2-1',
      status: 'finished'
    },
    'game-3': {
      homeTeam: 'Palmeiras',
      awayTeam: 'Santos',
      homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/800px-Palmeiras_logo.svg.png',
      awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/pt/0/03/Escudo_do_Santos_Futebol_Clube.png',
      date: '2025-09-13',
      time: '19:30',
      venue: 'Allianz Parque',
      score: null,
      status: 'scheduled'
    },
    'game-4': {
      homeTeam: 'São Paulo',
      awayTeam: 'Cruzeiro',
      homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/800px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png',
      awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/800px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png',
      date: '2025-08-27',
      time: '20:00',
      venue: 'Estádio Marcelo Portugal',
      score: '1-1',
      status: 'finished'
    },
    'game-5': {
        homeTeam: 'Grêmio',
        awayTeam: 'Avaí/Kindermann',
        homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gremio_logo.svg/800px-Gremio_logo.svg.png',
        awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/pt/8/8e/Kindermann.png',
        date: '2025-08-25',
        time: '15:00',
        venue: 'Arena do Grêmio',
        score: '3-0',
        status: 'finished'
      },
      'game-6': {
        homeTeam: 'Fluminense',
        awayTeam: 'Botafogo',
        homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/FFC_crest.svg/800px-FFC_crest.svg.png',
        awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/1200px-Botafogo_de_Futebol_e_Regatas_logo.svg.png',
        date: '2025-09-20',
        time: '11:00',
        venue: 'Estádio Luso-Brasileiro',
        score: null,
        status: 'scheduled'
      },
      'game-7': {
        homeTeam: 'Atlético-MG',
        awayTeam: 'Real Brasília',
        homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/800px-Atletico_mineiro_galo.png',
        awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/pt/4/40/RealBras%C3%ADliaFC.png',
        date: '2025-08-29',
        time: '17:00',
        venue: 'Arena MRV',
        score: '4-2',
        status: 'finished'
      },
      'game-8': {
        homeTeam: 'América-MG',
        awayTeam: 'Red Bull Bragantino',
        homeTeamLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Escudo_Am%C3%A9rica_de_Minas.png',
        awayTeamLogo: 'https://upload.wikimedia.org/wikipedia/pt/9/9e/RedBullBragantino.png',
        date: '2025-09-21',
        time: '16:00',
        venue: 'Arena Independência',
        score: null,
        status: 'scheduled'
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
    'transfer-3': {
        playerName: 'Tamires',
        playerImageUrl: 'https://s.glbimg.com/es/ge/f/original/2023/11/07/agif23101111453245.jpg',
        oldClub: 'Corinthians',
        newClub: 'Orlando Pride',
        fee: 'Fim de Contrato',
        date: '2025-08-01',
        status: 'rumor'
    },
    'transfer-4': {
        playerName: 'Bia Zaneratto',
        playerImageUrl: 'https://conteudo.cbf.com.br/cdn/202307/20230712213715_85.jpeg',
        oldClub: 'Palmeiras',
        newClub: 'Kansas City Current',
        fee: 'Não Divulgado',
        date: '2025-07-25',
        status: 'confirmed'
    },
    'transfer-5': {
        playerName: 'Angelina',
        playerImageUrl: 'https://conteudo.cbf.com.br/cdn/202402/20240222134553_290.jpeg',
        oldClub: 'OL Reign',
        newClub: 'Orlando Pride',
        fee: 'Grátis',
        date: '2025-07-28',
        status: 'confirmed'
    },
    'transfer-6': {
        playerName: 'Ary Borges',
        playerImageUrl: 'https://conteudo.cbf.com.br/cdn/202307/20230713171350_973.jpeg',
        oldClub: 'Racing Louisville',
        newClub: 'UANL Tigres',
        fee: '€1.2M',
        date: '2025-08-12',
        status: 'rumor'
    },
    'transfer-7': {
        playerName: 'Tarciane',
        playerImageUrl: 'https://s.glbimg.com/es/ge/f/original/2024/04/24/tarciane-houston-dash.jpeg',
        oldClub: 'Corinthians',
        newClub: 'Houston Dash',
        fee: '€450K',
        date: '2025-08-05',
        status: 'confirmed'
    },
    'transfer-8': {
        playerName: 'Yaya',
        playerImageUrl: 'https://santosfc.vtexassets.com/arquivos/ids/173981-800-auto?v=638478442888200000&width=800&height=auto&aspect=true',
        oldClub: 'Santos',
        newClub: 'Lyon',
        fee: '€700K',
        date: '2025-08-22',
        status: 'rumor'
    }
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