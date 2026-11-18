// Configuración de ESLint 9 ("flat config").
// Reglas de estilo Airbnb con soporte para TypeScript y React, a través de
// eslint-config-airbnb-extended. Al final, eslint-config-prettier apaga las
// reglas de formato que chocan con Prettier (Prettier se encarga del formato).
import { configs, plugins } from 'eslint-config-airbnb-extended';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    name: 'garritas/ignorados',
    ignores: ['node_modules/', '.expo/', 'dist/', 'android/', 'ios/', 'coverage/', 'expo-env.d.ts'],
  },

  // JavaScript / TypeScript base (Airbnb)
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,

  // React y React Native (Airbnb)
  plugins.react,
  plugins.reactA11y,
  plugins.reactHooks,
  ...configs.react.recommended,

  // TypeScript (Airbnb)
  plugins.typescriptEslint,
  ...configs.base.typescript,
  ...configs.react.typescript,

  // React 17+ usa el "nuevo JSX": ya no hace falta importar React en cada
  // archivo. Es lo mismo que hace la configuración "jsx-runtime" de
  // eslint-plugin-react.
  {
    name: 'garritas/jsx-runtime',
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },

  // Siempre al final: deja el formato en manos de Prettier
  prettierConfig,
];
