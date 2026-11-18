/**
 * TEMPORAL (setup). Pantalla vacía que solo sirve para comprobar que la
 * navegación de Expo Router funciona. Muestra el nombre de su ruta y
 * enlaces a las otras pantallas de ejemplo.
 *
 * Se borra cuando F-01, F-02 y F-04 creen las pantallas reales.
 * Los textos son rutas técnicas, no mensajes del SRS.
 */
import { Link } from 'expo-router';
import type { Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORES, FUENTES, RADIOS } from './tema';

interface Props {
  /** Ruta del archivo de esta pantalla, p. ej. "app/(acceso)/index.tsx". */
  ruta: string;
  /** Rutas a las que se puede saltar desde aquí. */
  enlaces: Href[];
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: 24,
    backgroundColor: COLORES.crema,
  },
  ruta: {
    fontFamily: FUENTES.negrita,
    fontSize: 20,
    color: COLORES.cafe,
  },
  enlaces: {
    gap: 12,
  },
  boton: {
    fontFamily: FUENTES.regular,
    fontSize: 16,
    color: COLORES.azulMarino,
    backgroundColor: COLORES.menta,
    borderRadius: RADIOS.pildora,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 12,
    textAlign: 'center',
  },
});

export default function PantallaDeEjemplo({ ruta, enlaces }: Props) {
  return (
    <SafeAreaView style={estilos.contenedor}>
      <Text style={estilos.ruta}>{ruta}</Text>
      <View style={estilos.enlaces}>
        {enlaces.map((enlace) => (
          <Link key={String(enlace)} href={enlace} style={estilos.boton}>
            {String(enlace)}
          </Link>
        ))}
      </View>
    </SafeAreaView>
  );
}
