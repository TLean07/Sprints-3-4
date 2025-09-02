import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthProvider';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFound';
import NewsPage from './pages/News';
import GamesPage from './pages/Games';
import TransfersPage from './pages/Transfers';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/jogos" element={<GamesPage />} />
            <Route path="/transferencias" element={<TransfersPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<ProfilePage />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;