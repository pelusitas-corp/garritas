/**
 * Configuración del SDK modular de Firebase (arquitectura §2).
 *
 * src/firebase/ es el ÚNICO lugar de la app que habla con Firebase.
 * Este archivo crea la conexión una sola vez y exporta:
 * - `app`:  la app de Firebase.
 * - `auth`: Firebase Authentication (correo y contraseña). La sesión se
 *           guarda en el teléfono con AsyncStorage, así que no se pierde al
 *           cerrar la app.
 * - `db`:   Cloud Firestore.
 *
 * Los datos de conexión se leen del archivo .env (ver .env.example).
 * Expo solo pasa a la app las variables que empiezan con EXPO_PUBLIC_, y
 * solo si se escriben completas (process.env.EXPO_PUBLIC_...), por eso se
 * leen una por una.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

/**
 * Recibe el nombre de una variable de entorno y su valor.
 * Devuelve el valor, o lanza un error si falta (así se nota de inmediato
 * que el .env está incompleto).
 */
function exigirVariable(nombre: string, valor: string | undefined): string {
  if (!valor) {
    throw new Error(`Falta la variable ${nombre} en el archivo .env (ver .env.example).`);
  }
  return valor;
}

const configuracionFirebase = {
  apiKey: exigirVariable('EXPO_PUBLIC_FIREBASE_API_KEY', process.env.EXPO_PUBLIC_FIREBASE_API_KEY),
  authDomain: exigirVariable(
    'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  ),
  projectId: exigirVariable(
    'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  ),
  appId: exigirVariable('EXPO_PUBLIC_FIREBASE_APP_ID', process.env.EXPO_PUBLIC_FIREBASE_APP_ID),
};

/**
 * Crea la app y Auth la primera vez. Si ya existían (por ejemplo, cuando
 * Expo recarga el código mientras programamos), reutiliza las existentes,
 * porque Firebase no permite inicializar Auth dos veces.
 */
function iniciarFirebase(): { app: FirebaseApp; auth: Auth } {
  if (getApps().length > 0) {
    const appExistente = getApp();
    return { app: appExistente, auth: getAuth(appExistente) };
  }
  const appNueva = initializeApp(configuracionFirebase);
  const authNueva = initializeAuth(appNueva, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  return { app: appNueva, auth: authNueva };
}

export const { app, auth } = iniciarFirebase();

export const db: Firestore = getFirestore(app);
