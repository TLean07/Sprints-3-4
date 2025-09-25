import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthProvider';
import { CartProvider } from './contexts/CartContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import MobileLayout from './components/layouts/MobileLayout';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFound';
import NewsPage from './pages/News';
import ArticlePage from './pages/ArticlePage';
import StoryPage from './pages/StoryPage';
import MatchesPage from './pages/MatchesPage';
import MatchDetailPage from './pages/MatchDetailPage';
import TransfersPage from './pages/Transfers';
import ChampionshipSignupPage from './pages/ChampionshipSignup';
import SettingsPage from './pages/SettingsPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              className: 'font-medium',
              style: {
                borderRadius: '12px',
                padding: '12px 16px',
              },
            }}
          />
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<MobileLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/noticias" element={<NewsPage />} />
              <Route path="/noticias/:articleId" element={<ArticlePage />} />
              <Route path="/historias/:storyId" element={<StoryPage />} />
              <Route path="/jogos" element={<MatchesPage />} />
              <Route path="/jogos/:matchId" element={<MatchDetailPage />} />
              <Route path="/transferencias" element={<TransfersPage />} />
              <Route path="/inscrever-campeonato" element={<ChampionshipSignupPage />} />
              <Route path="/loja" element={<ShopPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/configuracoes" element={<SettingsPage />} />
              </Route>
              
              <Route path="/redefinir-senha" element={<PasswordResetPage />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;