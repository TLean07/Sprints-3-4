import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Heading } from '../components/common/Heading';
import { Card } from '../components/ui/Card';
import { Spinner } from '../components/common/Spinner';
import { Camera, Edit, X } from 'lucide-react';
import { getUserProfileData, updateUserProfileData, uploadProfileImage } from '../services/api';

interface ProfileData {
  birthDate?: string;
  gender?: string;
}

interface FormData extends ProfileData {
  displayName: string;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({ displayName: '', birthDate: '', gender: '' });
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
        });
        setIsLoading(false);
      };
      fetchProfileData();
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        toast.success('Foto de perfil atualizada!');
      } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
        toast.error('Erro ao enviar a imagem.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    const updateAuthPromise = updateProfile(user, { displayName: formData.displayName });
    const updateDbPromise = updateUserProfileData(user.uid, {
      birthDate: formData.birthDate,
      gender: formData.gender,
    });

    try {
      await Promise.all([updateAuthPromise, updateDbPromise]);
      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error);
      toast.error('Não foi possível atualizar o perfil.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = () => {
    if (user?.email) {
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          toast.success(`Email de redefinição de senha enviado para ${user.email}`);
        })
        .catch((error) => {
          console.error("Erro ao enviar email de redefinição:", error);
          toast.error('Erro ao enviar email de redefinição.');
        });
    }
  };

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

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Heading variant="subsection">
            Meu Perfil
          </Heading>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <X className="mr-2" /> : <Edit className="mr-2" />}
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </Button>
        </div>

        <div className="relative w-28 h-28 mx-auto mb-6">
          {isUploading ? (
            <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
              <Spinner />
            </div>
          ) : (
            <img 
              src={photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=E52A8A&color=fff`} 
              alt="Foto do perfil"
              className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md"
            />
          )}
          <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full cursor-pointer hover:bg-opacity-80 transition-all">
            <Camera size={16} />
            <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        {!isEditing ? (
          <div className="text-center space-y-4">
            <p className="text-2xl text-dark-text font-bold font-heading">{formData.displayName || 'Nome não informado'}</p>
            <p className="text-md text-medium-gray">{user.email}</p>
            <p className="text-md text-dark-text">
              <strong>Data de Nascimento:</strong>
              <span className="text-medium-gray ml-2">{formData.birthDate || 'Não informado'}</span>
            </p>
            <p className="text-md text-dark-text">
              <strong>Gênero:</strong>
              <span className="text-medium-gray ml-2">{formData.gender || 'Não informado'}</span>
            </p>
            <div className="pt-4 space-y-2">
              <Button onClick={handlePasswordReset} variant="outline" className="w-full max-w-xs mx-auto">Redefinir Senha</Button>
              <Button onClick={handleLogout} variant="secondary" className="w-full max-w-xs mx-auto">Sair</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 text-left">Nome de Exibição</label>
              <input
                type="text"
                name="displayName"
                id="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 text-left">Data de Nascimento</label>
              <input
                type="date"
                name="birthDate"
                id="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 text-left">Gênero</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">Prefiro não informar</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? <Spinner /> : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;