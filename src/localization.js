import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const translations = {
  pt: {
    tab: { home: 'Início', profile: 'Perfil', settings: 'Ajustes' },
    settings: { title: 'Configurações', preferences: 'Preferências', language: 'Idioma', theme: 'Tema', about: 'Sobre o App', version: 'Versão', terms: 'Termos de Uso', privacy: 'Política de Privacidade', selectLanguage: 'Selecione o Idioma', cancel: 'Cancelar', dark: 'Escuro' },
    home: { send: 'Você envia', receive: 'Você recebe', realtime: 'Tempo real', updated: 'Atualizado', last30days: 'Últimos 30 Dias', placeholder: '0.00' },
    profile: { title: 'Meu Perfil', syncTitle: 'Sincronize seus dados', syncSubtitle: 'Crie uma conta para salvar suas moedas favoritas na nuvem e acessá-las de qualquer dispositivo.', signIn: 'Entrar na Conta', signUp: 'Criar nova conta', syncedData: 'Dados Sincronizados', resetPassword: 'Redefinir Senha', logout: 'Sair da Conta', loading: 'A carregar...' },
    languages: { pt: 'Português', en: 'English', es: 'Español' },
    legal: {
      termsTitle: 'Termos de Uso',
      termsText: [
        'Este aplicativo foi desenvolvido exclusivamente com fins educacionais, servindo como trabalho acadêmico para a disciplina de Programação para Dispositivos Móveis.',
        'O projeto é de código aberto (open-source), não possui fins lucrativos e não será distribuído oficialmente em lojas de aplicativos como App Store ou Google Play.',
        'O software é fornecido "como está" (as is), sem garantias de qualquer tipo. O uso das funcionalidades, incluindo conversão de moedas e sincronização em nuvem, é puramente demonstrativo.'
      ],
      privacyTitle: 'Política de Privacidade',
      privacyText: [
        'Levamos sua privacidade a sério, mesmo em um ambiente estritamente acadêmico. Esta política explica de forma transparente como lidamos com seus dados.',
        'Os dados coletados (nome, e-mail e senhas criptografadas) são armazenados de forma segura em um servidor na nuvem com o único propósito de demonstrar o funcionamento de um fluxo de autenticação real e integração de APIs.',
        'Nenhum dado financeiro ou de uso será vendido, compartilhado com terceiros ou utilizado para fins comerciais. Por se tratar de um projeto de faculdade, o banco de dados poderá ser limpo ou excluído a qualquer momento sem aviso prévio.'
      ]
    },
    auth: {
      welcome: 'Bem-vindo de volta!',
      email: 'E-mail',
      password: 'Senha',
      name: 'Nome',
      signInBtn: 'Entrar',
      signUpBtn: 'Cadastrar',
      forgotBtn: 'Esqueci minha senha',
      backBtn: 'Voltar',
      forgotTitle: 'Recuperar Senha',
      forgotSubtitle: 'Enviaremos um código para o seu e-mail.',
      sendCodeBtn: 'Enviar Código',
      newPasswordTitle: 'Nova Senha',
      newPasswordSubtitle: 'Digite o código recebido no e-mail',
      savePasswordBtn: 'Salvar nova senha',
      otpLabel: 'Código de 6 dígitos',
      activateTitle: 'Ative sua conta',
      activateSubtitle: 'Enviamos um código de 6 dígitos para',
      verifyBtn: 'Verificar',
      namePlaceholder: 'Como quer ser chamado?',
      emailPlaceholder: 'seu@email.com',
      passwordPlaceholder: '******',
      otpPlaceholder: '000000',
      alerts: {
        warning: 'Aviso',
        success: 'Sucesso!',
        error: 'Erro',
        fillAll: 'Preencha todos os campos.',
        loginError: 'Erro ao fazer login.',
        registerSuccess: 'Conta criada. Verifique seu e-mail para pegar o código de ativação.',
        registerError: 'Erro ao criar conta.',
        forgotWarning: 'Digite seu e-mail.',
        forgotSuccess: 'Se o e-mail existir, você receberá um código de 6 dígitos.',
        forgotError: 'Muitas tentativas. Tente novamente mais tarde.',
        resetWarning: 'Preencha o código e a nova senha.',
        resetSuccess: 'Sua senha foi alterada com sucesso!',
        resetError: 'Erro ao redefinir senha.',
        verifyWarning: 'Digite o código de 6 dígitos.',
        verifySuccess: 'Sua conta foi verificada com sucesso. Já pode fazer login!',
        verifyError: 'Erro ao verificar conta.'
      }
    }
  },
  en: {
    tab: { home: 'Home', profile: 'Profile', settings: 'Settings' },
    settings: { title: 'Settings', preferences: 'Preferences', language: 'Language', theme: 'Theme', about: 'About App', version: 'Version', terms: 'Terms of Use', privacy: 'Privacy Policy', selectLanguage: 'Select Language', cancel: 'Cancel', dark: 'Dark' },
    home: { send: 'You send', receive: 'You receive', realtime: 'Real-time', updated: 'Updated', last30days: 'Last 30 Days', placeholder: '0.00' },
    profile: { title: 'My Profile', syncTitle: 'Sync your data', syncSubtitle: 'Create an account to save your favorite currencies to the cloud and access them from any device.', signIn: 'Sign In', signUp: 'Create account', syncedData: 'Synced Data', resetPassword: 'Reset Password', logout: 'Log Out', loading: 'Loading...' },
    languages: { pt: 'Português', en: 'English', es: 'Español' },
    legal: {
      termsTitle: 'Terms of Use',
      termsText: [
        'This application was developed exclusively for educational purposes as an academic project for the Mobile Device Programming course.',
        'The project is open-source, non-profit, and will not be officially distributed in app stores such as the App Store or Google Play.',
        'The software is provided "as is", without warranty of any kind. The use of features, including currency conversion and cloud synchronization, is purely demonstrative.'
      ],
      privacyTitle: 'Privacy Policy',
      privacyText: [
        'We take your privacy seriously, even in a strictly academic environment. This policy transparently explains how we handle your data.',
        'The collected data (name, email, and encrypted passwords) is stored securely on a cloud server with the sole purpose of demonstrating a real authentication flow and API integration.',
        'No actual financial or usage data will be sold, shared with third parties, or used for commercial purposes. Because this is a college project, the database may be cleared or deleted at any time without prior notice.'
      ]
    },
    auth: {
      welcome: 'Welcome back!',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      signInBtn: 'Sign In',
      signUpBtn: 'Sign Up',
      forgotBtn: 'Forgot password?',
      backBtn: 'Back',
      forgotTitle: 'Recover Password',
      forgotSubtitle: 'We will send a code to your email.',
      sendCodeBtn: 'Send Code',
      newPasswordTitle: 'New Password',
      newPasswordSubtitle: 'Enter the code received in the email',
      savePasswordBtn: 'Save new password',
      otpLabel: '6-digit Code',
      activateTitle: 'Activate your account',
      activateSubtitle: 'We sent a 6-digit code to',
      verifyBtn: 'Verify',
      namePlaceholder: 'How would you like to be called?',
      emailPlaceholder: 'your@email.com',
      passwordPlaceholder: '******',
      otpPlaceholder: '000000',
      alerts: {
        warning: 'Warning',
        success: 'Success!',
        error: 'Error',
        fillAll: 'Please fill in all fields.',
        loginError: 'Error logging in.',
        registerSuccess: 'Account created. Check your email for the activation code.',
        registerError: 'Error creating account.',
        forgotWarning: 'Enter your email.',
        forgotSuccess: 'If the email exists, you will receive a 6-digit code.',
        forgotError: 'Too many attempts. Try again later.',
        resetWarning: 'Enter the code and new password.',
        resetSuccess: 'Your password has been successfully changed!',
        resetError: 'Error resetting password.',
        verifyWarning: 'Enter the 6-digit code.',
        verifySuccess: 'Account verified successfully. You can now log in!',
        verifyError: 'Error verifying account.'
      }
    }
  },
  es: {
    tab: { home: 'Inicio', profile: 'Perfil', settings: 'Ajustes' },
    settings: { title: 'Ajustes', preferences: 'Preferencias', language: 'Idioma', theme: 'Tema', about: 'Acerca de la App', version: 'Versión', terms: 'Términos de Uso', privacy: 'Política de Privacidad', selectLanguage: 'Seleccionar Idioma', cancel: 'Cancelar', dark: 'Oscuro' },
    home: { send: 'Envías', receive: 'Recibes', realtime: 'En tiempo real', updated: 'Actualizado', last30days: 'Últimos 30 Días', placeholder: '0.00' },
    profile: { title: 'Mi Perfil', syncTitle: 'Sincroniza tus datos', syncSubtitle: 'Crea una cuenta para guardar tus monedas favoritas en la nube y acceder desde cualquier dispositivo.', signIn: 'Iniciar sesión', signUp: 'Crear cuenta', syncedData: 'Datos Sincronizados', resetPassword: 'Restablecer Contraseña', logout: 'Cerrar Sesión', loading: 'Cargando...' },
    languages: { pt: 'Português', en: 'English', es: 'Español' },
    legal: {
      termsTitle: 'Términos de Uso',
      termsText: [
        'Esta aplicación fue desarrollada exclusivamente con fines educativos como proyecto académico para la asignatura de Programación para Dispositivos Móviles.',
        'El proyecto es de código abierto (open-source), sin fines de lucro y no será distribuido oficialmente en tiendas de aplicaciones como App Store o Google Play.',
        'El software se proporciona "tal cual" (as is), sin garantías de ningún tipo. El uso de las funciones, incluida la conversión de divisas y la sincronización, es puramente demostrativo.'
      ],
      privacyTitle: 'Política de Privacidad',
      privacyText: [
        'Nos tomamos en serio su privacidad, incluso en un entorno estrictamente académico. Esta política explica de forma transparente cómo manejamos sus datos.',
        'Los datos recopilados (nombre, correo electrónico y contraseñas cifradas) se almacenan de forma segura en un servidor en la nube con el único fin de demostrar un flujo de autenticación real y la integración de API.',
        'Ningún dato financiero o de uso será vendido, compartido con terceros o utilizado con fines comerciales. Debido a que se trata de un proyecto universitario, la base de datos puede ser limpiada o eliminada en cualquier momento sin previo aviso.'
      ]
    },
    auth: {
      welcome: '¡Bienvenido de nuevo!',
      email: 'Correo',
      password: 'Contraseña',
      name: 'Nombre',
      signInBtn: 'Entrar',
      signUpBtn: 'Registrarse',
      forgotBtn: '¿Olvidaste tu contraseña?',
      backBtn: 'Volver',
      forgotTitle: 'Recuperar Contraseña',
      forgotSubtitle: 'Enviaremos un código a tu correo.',
      sendCodeBtn: 'Enviar Código',
      newPasswordTitle: 'Nueva Contraseña',
      newPasswordSubtitle: 'Ingresa el código recibido en el correo',
      savePasswordBtn: 'Guardar nueva contraseña',
      otpLabel: 'Código de 6 dígitos',
      activateTitle: 'Activa tu cuenta',
      activateSubtitle: 'Enviamos un código de 6 dígitos a',
      verifyBtn: 'Verificar',
      namePlaceholder: '¿Cómo quieres que te llamemos?',
      emailPlaceholder: 'tu@correo.com',
      passwordPlaceholder: '******',
      otpPlaceholder: '000000',
      alerts: {
        warning: 'Aviso',
        success: '¡Éxito!',
        error: 'Error',
        fillAll: 'Completa todos los campos.',
        loginError: 'Error al iniciar sesión.',
        registerSuccess: 'Cuenta creada. Revisa tu correo para el código de activación.',
        registerError: 'Error al crear la cuenta.',
        forgotWarning: 'Ingresa tu correo.',
        forgotSuccess: 'Si el correo existe, recibirás un código de 6 dígitos.',
        forgotError: 'Demasiados intentos. Inténtalo más tarde.',
        resetWarning: 'Ingresa el código y la nueva contraseña.',
        resetSuccess: '¡Tu contraseña ha sido cambiada con éxito!',
        resetError: 'Error al restablecer la contraseña.',
        verifyWarning: 'Ingresa el código de 6 dígitos.',
        verifySuccess: 'Cuenta verificada con éxito. ¡Ya puedes iniciar sesión!',
        verifyError: 'Error al verificar la cuenta.'
      }
    }
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
  return node !== undefined ? node : key;
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