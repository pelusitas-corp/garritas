/**
 * Tema Soft UI de Garritas (arquitectura §8).
 *
 * Único lugar donde viven los colores, la tipografía y los bordes.
 * Las pantallas importan de aquí; nunca escriben un color o un tamaño
 * de borde directamente.
 *
 * La arquitectura define los 5 colores, pero no dice cuál es el fondo,
 * cuál el texto, etc. Por eso aquí se nombran por cómo se ven; el uso de
 * cada uno se toma del prototipo de Figma en cada spec.
 */

/** Paleta Soft UI (arquitectura §8). */
export const COLORES = {
  crema: '#F5EACC',
  cafe: '#4A2E21',
  menta: '#D3F8E2',
  azulGrisaceo: '#A1B2D0',
  azulMarino: '#25314C',
} as const;

/**
 * Tipografía Nunito (@expo-google-fonts/nunito).
 * Cada valor es el nombre con el que se carga la fuente en app/_layout.tsx.
 */
export const FUENTES = {
  regular: 'Nunito_400Regular',
  negrita: 'Nunito_700Bold',
} as const;

/** Radio mínimo de los bordes en Soft UI: 24 px (arquitectura §8). */
export const RADIO_MINIMO = 24;

/** Radios de borde. Todos cumplen el mínimo de 24 px. */
export const RADIOS = {
  /** Tarjetas, campos y contenedores. */
  tarjeta: RADIO_MINIMO,
  /** Botones píldora: un radio tan grande que los extremos quedan redondos. */
  pildora: 999,
} as const;

export type NombreColor = keyof typeof COLORES;
