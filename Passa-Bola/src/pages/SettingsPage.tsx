import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Bell,
  Moon,
  Sun,
  Globe,
  Shield,
  Smartphone,
  Mail,
  Eye,
  Volume2,
  Database,
  Info,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    matches: true,
    news: true,
    transfers: false
  });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt-BR');
  const [privacy, setPrivacy] = useState({
    profile: 'public',
    activity: 'friends',
    statistics: 'public'
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success(value ? '✅ Notificação ativada' : '❌ Notificação desativada');
  };

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    toast.success(newMode ? '🌙 Modo escuro ativado' : '☀️ Modo claro ativado');
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    const languageNames = {
      'pt-BR': 'Português (Brasil)',
      'en-US': 'English (US)', 
      'es-ES': 'Español'
    };
    toast.success(`🌍 Idioma alterado para ${languageNames[newLanguage as keyof typeof languageNames]}`);
  };

  const handlePrivacyChange = (key: string, value: string) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    const privacyLabels = {
      'public': 'Público',
      'friends': 'Apenas amigos',
      'private': 'Privado'
    };
    toast.success(`🔒 Configuração de privacidade alterada para ${privacyLabels[value as keyof typeof privacyLabels]}`);
  };

  const settingSections = [
    {
      title: 'Notificações',
      icon: Bell,
      items: [
        {
          label: 'Notificações Push',
          description: 'Receba alertas no seu dispositivo',
          type: 'toggle',
          value: notifications.push,
          onChange: (value: boolean) => handleNotificationChange('push', value)
        },
        {
          label: 'E-mail',
          description: 'Notificações por e-mail',
          type: 'toggle', 
          value: notifications.email,
          onChange: (value: boolean) => handleNotificationChange('email', value)
        },
        {
          label: 'Jogos',
          description: 'Alertas de partidas e resultados',
          type: 'toggle',
          value: notifications.matches,
          onChange: (value: boolean) => handleNotificationChange('matches', value)
        },
        {
          label: 'Notícias',
          description: 'Novas matérias e entrevistas',
          type: 'toggle',
          value: notifications.news,
          onChange: (value: boolean) => handleNotificationChange('news', value)
        }
      ]
    },
    {
      title: 'Aparência',
      icon: darkMode ? Moon : Sun,
      items: [
        {
          label: 'Modo Escuro',
          description: 'Interface com tema escuro',
          type: 'toggle',
          value: darkMode,
          onChange: handleThemeToggle
        },
        {
          label: 'Idioma',
          description: 'Português (Brasil)',
          type: 'select',
          value: language,
          onChange: handleLanguageChange,
          options: [
            { value: 'pt-BR', label: 'Português (Brasil)' },
            { value: 'en-US', label: 'English (US)' },
            { value: 'es-ES', label: 'Español' }
          ]
        }
      ]
    },
    {
      title: 'Privacidade',
      icon: Shield,
      items: [
        {
          label: 'Perfil Público',
          description: 'Quem pode ver seu perfil',
          type: 'select',
          value: privacy.profile,
          onChange: (value: string) => handlePrivacyChange('profile', value),
          options: [
            { value: 'public', label: 'Público' },
            { value: 'friends', label: 'Apenas amigos' },
            { value: 'private', label: 'Privado' }
          ]
        },
        {
          label: 'Atividade',
          description: 'Visibilidade das suas curtidas',
          type: 'select',
          value: privacy.activity,
          onChange: (value: string) => handlePrivacyChange('activity', value),
          options: [
            { value: 'public', label: 'Público' },
            { value: 'friends', label: 'Apenas amigos' },
            { value: 'private', label: 'Privado' }
          ]
        }
      ]
    }
  ];

  const quickActions = [
    {
      label: 'Redefinir Senha',
      description: 'Alterar sua senha de acesso',
      icon: Shield,
      action: () => navigate('/redefinir-senha')
    },
    {
      label: 'Dados e Armazenamento',
      description: 'Gerenciar seus dados salvos',
      icon: Database,
      action: () => toast.success('🔧 Em breve!')
    },
    {
      label: 'Central de Ajuda',
      description: 'Dúvidas e suporte',
      icon: HelpCircle,
      action: () => toast.success('📞 Em breve!')
    },
    {
      label: 'Sobre o App',
      description: 'Versão 1.0.0 - Passa a Bola',
      icon: Info,
      action: () => toast.success('ℹ️ Passa a Bola v1.0.0')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 pb-20 lg:pb-8">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/perfil')}
            className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-all duration-300 active:scale-95"
          >
            <div className="p-2 bg-white rounded-full shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Voltar</span>
          </button>
          
          <h1 className="text-xl font-bold text-gray-900">Configurações</h1>
          <div className="w-16"></div> {/* Spacer */}
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-card"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary-100 rounded-full">
                    <SectionIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      
                      {item.type === 'toggle' && (
                        <button
                          onClick={() => item.onChange?.(!(item.value as boolean))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            item.value ? 'bg-primary-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              item.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                      
                      {item.type === 'select' && (
                        <select
                          value={item.value as string}
                          onChange={(e) => item.onChange?.(e.target.value)}
                          className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        >
                          {item.options?.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-card mt-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h2>
          
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <ActionIcon className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <span className="block font-medium text-gray-900">{action.label}</span>
                      <span className="block text-sm text-gray-500">{action.description}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;