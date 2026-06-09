import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backend from '../services/backend';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Assim que o app abre, ele verifica se já existe um token guardado
  useEffect(() => {
    async function loadStorageData() {
      try {
        const token = await AsyncStorage.getItem('@converti_jwt');
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.error("Erro ao carregar token:", error);
      } finally {
        setIsLoading(false); // Terminou de carregar
      }
    }
    loadStorageData();
  }, []);

  // Função para fazer login e guardar o token
  async function signIn(email, password) {
    try {
      // O FastAPI usa OAuth2PasswordRequestForm, por isso enviamos como form-data
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await backend.post('/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { access_token } = response.data;
      await AsyncStorage.setItem('@converti_jwt', access_token);
      setUserToken(access_token);
      return { success: true };
    } catch (error) {
      // Captura a mensagem de erro que configurámos no FastAPI
      const message = error.response?.data?.detail || "Erro ao fazer login.";
      return { success: false, message };
    }
  }

  // Função para limpar o token e fazer logout
  async function signOut() {
    await AsyncStorage.removeItem('@converti_jwt');
    setUserToken(null);
  }

  return (
    <AuthContext.Provider value={{ 
      signed: !!userToken, 
      userToken, 
      isLoading, 
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}