import { ref, set, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

export interface UserProfileData {
  birthDate?: string;
  gender?: string;
  favoriteTeam?: string;
  favoritePlayer?: string;
  location?: string;
  bio?: string;
  joinDate?: string;
}

export const getUserProfileData = async (uid: string): Promise<UserProfileData | null> => {
  try {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      return snapshot.val() as UserProfileData;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    return null;
  }
};

export const updateUserProfileData = async (uid: string, data: UserProfileData): Promise<void> => {
  try {
    const userRef = ref(db, `users/${uid}`);
    
    // Add join date if it's the first time updating
    const currentData = await getUserProfileData(uid);
    if (!currentData?.joinDate) {
      data.joinDate = new Date().toISOString();
    }
    
    await set(userRef, {
      ...currentData,
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user profile data:', error);
    throw error;
  }
};

export const uploadProfileImage = async (uid: string, file: File): Promise<string> => {
  try {
    const imageRef = storageRef(storage, `profile-images/${uid}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};