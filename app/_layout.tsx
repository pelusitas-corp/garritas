/**
 * Layout raíz de Expo Router: envuelve TODAS las pantallas de app/.
 *
 * 1. Mantiene visible la pantalla de bienvenida (splash) mientras carga la
 *    fuente Nunito.
 * 2. Cuando la fuente está lista (o si falló), oculta el splash y muestra
 *    la navegación tipo "pila" (Stack): cada pantalla nueva se pone encima
 *    de la anterior y "atrás" regresa.
 */
import { Nunito_400Regular, Nunito_700Bold, useFonts } from '@expo-google-fonts/nunito';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Si el splash ya se ocultó, no hay nada que hacer.
});

export default function LayoutRaiz() {
  const [fuentesListas, errorFuentes] = useFonts({ Nunito_400Regular, Nunito_700Bold });

  useEffect(() => {
    if (fuentesListas || errorFuentes) {
      SplashScreen.hideAsync().catch(() => {
        // Si el splash ya se ocultó, no hay nada que hacer.
      });
    }
  }, [fuentesListas, errorFuentes]);

  if (!fuentesListas && !errorFuentes) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
