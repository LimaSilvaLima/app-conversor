import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Apontando para o seu domínio em produção na OCI com SSL
const backend = axios.create({
  baseURL: 'https://converti.willian.net.br/api/v1',
  timeout: 10000,
});

// inspeciona todas as requisições antes de saírem do celular
backend.interceptors.request.use(
  async (config) => {
    try {
      // Vai buscar a chave que guardar no login
      const token = await AsyncStorage.getItem('@converti_jwt');
      
      if (token) {
        // Se tem token, "carimba" o cabeçalho de Autorização
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default backend;