import React, {useState, useEffect, useContext} from 'react';
import {createContext} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';

import api from '../services/api';

interface UserData {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: UserData | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoraredData() {
      const storagedUser = await AsyncStorage.getItem('@AuthRN:user');
      const storagedToken = await AsyncStorage.getItem('@AuthRN:token');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storagedUser && storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }

    loadStoraredData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    await AsyncStorage.setItem('@AuthRN:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@AuthRN:token', response.token);

    setUser(response.user);
  }

  async function signOut() {
    await AsyncStorage.removeItem('@AuthRN:user');
    await AsyncStorage.removeItem('@AuthRN:token');

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, signIn, signOut, user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
