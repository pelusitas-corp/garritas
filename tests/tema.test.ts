// Prueba mínima del setup: comprueba que Jest funciona y que el tema
// Soft UI respeta la arquitectura §8.
import { COLORES, FUENTES, RADIOS, RADIO_MINIMO } from '../src/compartido/tema';

describe('Tema Soft UI (arquitectura §8)', () => {
  test('usa exactamente los 5 colores de la arquitectura', () => {
    expect(Object.values(COLORES).sort()).toEqual(
      ['#F5EACC', '#4A2E21', '#D3F8E2', '#A1B2D0', '#25314C'].sort(),
    );
  });

  test('todos los bordes miden al menos 24 px', () => {
    expect(RADIO_MINIMO).toBe(24);
    Object.values(RADIOS).forEach((radio) => {
      expect(radio).toBeGreaterThanOrEqual(RADIO_MINIMO);
    });
  });

  test('la tipografía es Nunito', () => {
    Object.values(FUENTES).forEach((fuente) => {
      expect(fuente.startsWith('Nunito_')).toBe(true);
    });
  });
});
