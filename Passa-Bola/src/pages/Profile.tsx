import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Heading } from '../components/common/Heading';
import { Card } from '../components/ui/Card';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Você saiu com sucesso!');
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error('Erro ao sair.');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <Card className="text-center">
        <Heading variant="subsection" className="mb-6">
          Meu Perfil
        </Heading>
        {user.photoURL ? (
            <img 
                src={user.photoURL} 
                alt="Foto do perfil"
                className="w-28 h-28 rounded-full mx-auto mb-6 border-4 border-primary shadow-md"
            />
        ) : (
            <div className="w-28 h-28 rounded-full mx-auto mb-6 bg-gray-200 flex items-center justify-center text-dark-text text-6xl font-bold border-4 border-primary shadow-md">
                {user.email ? user.email[0].toUpperCase() : '?'}
            </div>
        )}
        <p className="text-lg text-dark-text mb-2">
          <strong>Email:</strong> <span className="text-medium-gray">{user.email}</span>
        </p>
        <p className="text-lg text-dark-text mb-6">
          <strong>Nome:</strong> <span className="text-medium-gray">{user.displayName || 'Não informado'}</span>
        </p>
        <Button
          onClick={handleLogout}
          variant="secondary"
          size="md"
        >
          Sair
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;