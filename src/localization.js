import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const translations = {
  pt: {
    tab: { home: 'Início', profile: 'Perfil', settings: 'Ajustes' },
    settings: { title: 'Configurações', preferences: 'Preferências', language: 'Idioma', theme: 'Tema', about: 'Sobre o App', version: 'Versão', terms: 'Termos de Uso', privacy: 'Política de Privacidade' },
    home: { send: 'Você envia', receive: 'Você recebe', realtime: 'Tempo real', updated: 'Atualizado', last30days: 'Últimos 30 Dias', placeholder: '0.00' },
    profile: { title: 'Meu Perfil', syncTitle: 'Sincronize seus dados', syncSubtitle: 'Crie uma conta para salvar suas moedas favoritas na nuvem e acessá-las de qualquer dispositivo.', signIn: 'Entrar na Conta', signUp: 'Criar nova conta' },
    languages: { pt: 'Português', en: 'English', es: 'Español' }
  },
  en: {
    tab: { home: 'Home', profile: 'Profile', settings: 'Settings' },
    settings: { title: 'Settings', preferences: 'Preferences', language: 'Language', theme: 'Theme', about: 'About App', version: 'Version', terms: 'Terms of Use', privacy: 'Privacy Policy' },
    home: { send: 'You send', receive: 'You receive', realtime: 'Real-time', updated: 'Updated', last30days: 'Last 30 Days', placeholder: '0.00' },
    profile: { title: 'My Profile', syncTitle: 'Sync your data', syncSubtitle: 'Create an account to save your favorite currencies to the cloud and access them from any device.', signIn: 'Sign In', signUp: 'Create account' },
    languages: { pt: 'Português', en: 'English', es: 'Español' }
  },
  es: {
    tab: { home: 'Inicio', profile: 'Perfil', settings: 'Ajustes' },
    settings: { title: 'Ajustes', preferences: 'Preferencias', language: 'Idioma', theme: 'Tema', about: 'Acerca de la App', version: 'Versión', terms: 'Términos de Uso', privacy: 'Política de Privacidad' },
    home: { send: 'Envías', receive: 'Recibes', realtime: 'En tiempo real', updated: 'Actualizado', last30days: 'Últimos 30 Días', placeholder: '0.00' },
    profile: { title: 'Mi Perfil', syncTitle: 'Sincroniza tus datos', syncSubtitle: 'Crea una cuenta para guardar tus monedas favoritas en la nube y acceder desde cualquier dispositivo.', signIn: 'Iniciar sesión', signUp: 'Crear cuenta' },
    languages: { pt: 'Português', en: 'English', es: 'Español' }
  }
};

const STORAGE_KEY = '@converti_locale';

let currentLocale = 'pt';

function lookupTranslation(locale, key) {
  const parts = key.split('.');
  let node = translations[locale] || translations['pt'];
  for (const p of parts) {
    if (node && Object.prototype.hasOwnProperty.call(node, p)) node = node[p];
    else return key;
  }
  return typeof node === 'string' ? node : key;
}

export const t = (key) => lookupTranslation(currentLocale, key);

const LanguageContext = createContext({ locale: currentLocale, setLocale: () => {} });

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(currentLocale);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(stored => {
      if (stored) {
        currentLocale = stored;
        setLocaleState(stored);
      }
    }).catch(()=>{});
  }, []);

  useEffect(() => {
    currentLocale = locale;
    AsyncStorage.setItem(STORAGE_KEY, locale).catch(()=>{});
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale: (l) => { currentLocale = l; setLocaleState(l); } }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default { translations };
