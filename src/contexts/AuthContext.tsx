
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Patient } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  userDetails: Patient | null;
  loading: boolean;
  register: (email: string, password: string, userData: Partial<Patient>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setUserProfile: (data: Partial<Patient>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userDetails: null,
  loading: true,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  setUserProfile: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userRef = doc(db, 'patients', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserDetails(userSnap.data() as Patient);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserDetails(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, userData: Partial<Patient>) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(user, {
        displayName: userData.fullName
      });
      
      await sendEmailVerification(user);
      
      const newUser: Patient = {
        uid: user.uid,
        fullName: userData.fullName || '',
        email: user.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        age: userData.age || 0,
        gender: userData.gender || '',
        bloodGroup: userData.bloodGroup || '',
        medicalHistory: userData.medicalHistory || [],
        appointments: [],
        createdAt: new Date()
      };
      
      await setDoc(doc(db, 'patients', user.uid), {
        ...newUser,
        createdAt: serverTimestamp()
      });
      
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });
      
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login successful!",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password reset email sent",
        description: "Please check your email for instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const setUserProfile = async (data: Partial<Patient>) => {
    if (!currentUser) return;
    
    try {
      const userRef = doc(db, 'patients', currentUser.uid);
      await setDoc(userRef, data, { merge: true });
      
      // Update local state
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserDetails(userSnap.data() as Patient);
      }
      
      toast({
        title: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    userDetails,
    loading,
    register,
    login,
    logout,
    resetPassword,
    setUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
