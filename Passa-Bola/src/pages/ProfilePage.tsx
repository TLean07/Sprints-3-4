import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Edit3, 
  Save, 
  X, 
  LogOut, 
  Heart,
  Trophy,
  Calendar,
  MapPin,
  Mail,
  Shield,
  Bell,
  Settings,
  ArrowLeft,
  Star,
  Award,
  Target
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { getUserProfileData, updateUserProfileData, uploadProfileImage } from '../services/userService';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { StatsCard } from '../components/ui/StatsCard';
import toast from 'react-hot-toast';

interface ProfileData {
  birthDate?: string;
  gender?: string;
  favoriteTeam?: string;
  favoritePlayer?: string;
  location?: string;
  bio?: string;
  joinDate?: string;
}

interface FormData extends ProfileData {
  displayName: string;
}

// Mock user stats - em uma app real seria vinda de uma API
const userStats = [
  { label: 'Histórias Curtidas', value: 127, change: 12, trend: 'up' as const },
  { label: 'Comentários Feitos', value: 43, change: 8, trend: 'up' as const },
  { label: 'Jogos Acompanhados', value: 28, change: 5, trend: 'up' as const },
  { label: 'Dias Consecutivos', value: 15, change: 3, trend: 'up' as const }
];

const achievements = [
  {
    id: '1',
    title: 'Primeira Curtida',
    description: 'Curtiu sua primeira história',
    icon: Heart,
    color: 'text-red-500',
    bg: 'bg-red-50',
    unlocked: true,
    date: '2024-03-15'
  },
  {
    id: '2', 
    title: 'Fã Dedicada',
    description: '7 dias consecutivos no app',
    icon: Star,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    unlocked: true,
    date: '2024-03-18'
  },
  {
    id: '3',
    title: 'Comentarista',
    description: '10 comentários publicados',
    icon: Award,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    unlocked: true,
    date: '2024-03-20'
  },
  {
    id: '4',
    title: 'Expert em Futebol',
    description: '50+ histórias curtidas',
    icon: Trophy,
    color: 'text-green-500',
    bg: 'bg-green-50',
    unlocked: false,
    progress: 65
  }
];

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({ 
    displayName: '',
    birthDate: '',
    gender: '',
    favoriteTeam: '',
    favoritePlayer: '',
    location: '',
    bio: ''
  });
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setPhotoURL(user.photoURL);
      const fetchProfileData = async () => {
        setIsLoading(true);
        const data = await getUserProfileData(user.uid);
        setFormData({
          displayName: user.displayName || '',
          birthDate: data?.birthDate || '',
          gender: data?.gender || '',
          favoriteTeam: data?.favoriteTeam || '',
          favoritePlayer: data?.favoritePlayer || '',
          location: data?.location || '',
          bio: data?.bio || '',
        });
        setIsLoading(false);
      };
      fetchProfileData();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && user) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        const newPhotoURL = await uploadProfileImage(user.uid, file);
        setPhotoURL(newPhotoURL);
        toast.success('✨ Foto de perfil atualizada!');
      } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
        toast.error('Erro ao atualizar foto de perfil');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const updateAuthPromise = updateProfile(user, { displayName: formData.displayName });
      const updateDbPromise = updateUserProfileData(user.uid, {
        birthDate: formData.birthDate,
        gender: formData.gender,
        favoriteTeam: formData.favoriteTeam,
        favoritePlayer: formData.favoritePlayer,
        location: formData.location,
        bio: formData.bio,
      });

      await Promise.all([updateAuthPromise, updateDbPromise]);
      toast.success('🎉 Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;

    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success('📧 E-mail de redefinição enviado!');
    } catch (error) {
      console.error("Erro ao enviar email de reset:", error);
      toast.error('Erro ao enviar e-mail de redefinição');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('👋 Logout realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error('Erro ao fazer logout');
    }
  };

  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const memberSince = user.metadata.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
      })
    : 'Recente';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 pb-20 lg:pb-8">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300 active:scale-95"
          >
            <div className="p-2 bg-white rounded-full shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Voltar</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-card mb-8"
        >
          <div className="flex items-start space-x-4">
            {/* Profile Picture */}
            <div className="relative">
              <div className="relative">
                <Avatar
                  src={photoURL || '/attached_assets/stock_images/beautiful_woman_foot_fc1a6e36.jpg'}
                  alt={formData.displayName}
                  size="2xl"
                  className="ring-4 ring-primary-100"
                />
                <button
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  disabled={isUploading}
                  className="absolute -bottom-2 -right-2 bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-105 disabled:opacity-70"
                >
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </button>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {formData.displayName || 'Usuária'}
                  </h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Membro desde {memberSince}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-3 rounded-full transition-all ${
                    isEditing 
                      ? 'bg-gray-100 text-gray-600' 
                      : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                  }`}
                >
                  {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </button>
              </div>

              <div className="space-y-2">
                {formData.location && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{formData.location}</span>
                  </div>
                )}
                
                {formData.favoriteTeam && (
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600">Time do coração: {formData.favoriteTeam}</span>
                  </div>
                )}

                {formData.bio && (
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    {formData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl p-6 shadow-card mb-8 overflow-hidden"
            >
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome
                    </label>
                    <input
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Nascimento
                    </label>
                    <input
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gênero
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Selecione</option>
                      <option value="feminino">Feminino</option>
                      <option value="masculino">Masculino</option>
                      <option value="outro">Outro</option>
                      <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização
                    </label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Sua cidade"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Favorito
                    </label>
                    <input
                      name="favoriteTeam"
                      value={formData.favoriteTeam}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Ex: Corinthians Feminino"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jogadora Favorita
                    </label>
                    <input
                      name="favoritePlayer"
                      value={formData.favoritePlayer}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Ex: Marta Silva"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    placeholder="Conte um pouco sobre você e sua paixão pelo futebol feminino..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isLoading ? 'Salvando...' : 'Salvar'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary-600" />
            <span>Sua Atividade</span>
          </h2>
          
          <StatsCard
            title="Estatísticas Pessoais"
            stats={userStats}
            icon={Trophy}
            variant="compact"
            theme="primary"
          />
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span>Conquistas</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * parseInt(achievement.id) }}
                  className={`bg-white rounded-2xl p-4 shadow-card border-2 ${
                    achievement.unlocked 
                      ? 'border-primary-200' 
                      : 'border-gray-100 opacity-75'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-3 rounded-xl ${achievement.bg}`}>
                      <Icon className={`w-6 h-6 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {achievement.description}
                      </p>
                      
                      {achievement.unlocked ? (
                        <Badge variant="success" size="sm">
                          Desbloqueada em {new Date(achievement.date!).toLocaleDateString('pt-BR')}
                        </Badge>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Progresso: {achievement.progress}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Settings & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Configurações da Conta
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/configuracoes')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Configurações Gerais</span>
              </div>
              <div className="text-gray-400">›</div>
            </button>

            <button
              onClick={handlePasswordReset}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Redefinir Senha</span>
              </div>
              <div className="text-gray-400">›</div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-600">Sair da Conta</span>
              </div>
              <div className="text-red-400">›</div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;