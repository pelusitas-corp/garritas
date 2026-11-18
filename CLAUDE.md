# CLAUDE.md · Garritas

App móvil (Android/iOS) de **matchmaking para adopción de animales
rescatados** en Ensenada. Equipo YENIWIWI (Pelusitas Corp, UABC FIAD):
Paulina Mendoza Quiroz (Product Owner) y Jennifer Salgado Pacheco
(Scrum Master). Somos estudiantes: **todo el código lo escribes tú**, y
nosotras debemos poder explicarlo en clase.

**Responde siempre en español.** Al terminar cada cambio, explica en
lenguaje sencillo qué hiciste, qué archivos tocaste, qué recibe y qué
devuelve cada función nueva, y cómo se conecta con Expo o Firebase.

## Fuentes de verdad (léelas antes de programar)
1. `specs/README.md`: reglas de Spec-Driven Development (SDD).
2. `specs/00-producto.md`: visión, roles, flujo y decisiones.
3. `specs/01-arquitectura.md`: stack, modelo de datos, reglas de
   seguridad, cálculo del porcentaje y carpetas.
4. `specs/features/F-XX-*.md`: la spec de la feature que vas a implementar.

El SRS vigente (*ACS_SRS_ISO29148_2018_YENIWIWI_v3.0*) no está en el repo.
Las specs copian literalmente de él los criterios y mensajes que necesitas.

## Reglas obligatorias (SDD)
- **Nada se programa sin un RF.** Solo implementas specs con
  `Estado | Aprobada`. Si la spec está en Borrador, detente y avísanos.
- **No supongas.** Si la spec no dice algo (un texto, un campo, un caso),
  o dice `[PENDIENTE]`, **detente y pregunta**. No inventes reglas,
  pantallas, campos ni textos.
- **Specs y SRS siempre coinciden.** No edites archivos de `specs/` a
  menos que te lo pidamos. Si el código necesita algo distinto a la spec,
  explica el problema y propón el cambio; nosotras actualizamos primero el
  SRS y luego la spec.
- **Mensajes literales.** Todo texto de error o de estado que vea el
  usuario sale de `src/compartido/mensajes.ts` y es **idéntico** al de la
  spec (mismas mayúsculas, signos y acentos). No los escribas directo en
  las pantallas.
- **Respeta el "Fuera de alcance"**, el general y el de cada spec. Nunca
  agregues: pagos o donaciones, chat, notificaciones push o por correo,
  subida de identificaciones, seguimiento posadopción, registro de
  albergues desde la app, recuperación de contraseña, versión web,
  Cloud Functions ni Cloud Storage.
- **Solo lo que pide la spec.** Sin funciones extra "por si acaso".

## Cómo trabajar una spec
1. Lee la spec completa y dinos en 3–5 líneas qué entendiste, qué RF
   atiende y qué archivos piensas crear o cambiar. **Espera nuestro "sí".**
2. Trabaja en una rama nueva desde `main` actualizado (ver "Git").
3. Implementa en **pasos pequeños**. Después de cada paso, explícalo y
   pregunta si seguimos.
4. Escribe las pruebas de cada criterio de aceptación (válido y no válido).
5. Corre las verificaciones (ver "Comandos") y muéstranos el resultado.
6. Indícanos cómo probarlo en el celular con Expo Go, paso a paso.

## Stack (detalle en `specs/01-arquitectura.md`)
- React Native + Expo (flujo administrado) + **TypeScript estricto**.
  Navegación con **Expo Router**.
- **Firebase, plan Spark (sin costo):** Authentication con correo y
  contraseña, y Cloud Firestore. Las fotos van comprimidas dentro de
  Firestore (arquitectura §2.1).
- Solo librerías **gratuitas y compatibles con Expo Go**. Instálalas con
  `npx expo install`. **Antes de agregar una dependencia que no esté en
  la arquitectura, pregunta.**

## Comandos
Se crean en el setup. Si alguno todavía no existe, avísanos.

| Comando | Para qué |
|---|---|
| `npx expo start` | Abrir la app en el celular con Expo Go |
| `npx tsc --noEmit` | Revisar tipos de TypeScript |
| `npm run lint` | ESLint (Airbnb) + Prettier |
| `npm test` | Pruebas con Jest |
| `npm run test:rules` | Pruebas de las reglas de seguridad con el emulador de Firebase |

## Estructura (resumen de arquitectura §7)
- `app/(acceso)`, `app/(adoptante)`, `app/(albergue)`: pantallas.
- `src/adoptante/`, `src/albergue/`: lógica y componentes de cada lado.
  **Un lado no importa código del otro**; lo común va en `src/compartido/`.
- `src/matchmaking/`: **funciones puras** (sin Firebase ni React).
- `src/firebase/`: **único lugar** que habla con Auth y Firestore. Las
  pantallas no llaman a Firestore directamente.
- `firestore.rules` y `tests/`.
- `docs/privacidad/`: aviso de privacidad integral y simplificado (PO-12, RF-25).

## Convenciones de código
- Sin `any`, sin `@ts-ignore` y sin `eslint-disable`.
- Airbnb + Prettier, 2 espacios. `camelCase` (variables y funciones),
  `PascalCase` (componentes y tipos), `UPPER_SNAKE_CASE` (constantes).
- Nombres del dominio **en español**, iguales a los del modelo de datos
  (arquitectura §4): `animal`, `solicitud`, `porcentaje`, `albergueId`.
- Componentes funcionales con hooks; funciones cortas con un solo propósito.
- Colores, tipografía y bordes solo desde `src/compartido/tema.ts` (Soft UI).
- Configuración en `.env` con prefijo `EXPO_PUBLIC_`. Nunca escribas
  claves en el código ni subas `.env`.

## Pruebas
- Cada criterio de aceptación (válido y no válido) tiene al menos una
  prueba, y **su nombre es el criterio**, p. ej.
  `RF-18 no válido: con 30 % no muestra "No Apto"`.
- El motor de matchmaking se prueba con Jest. Cada cambio en
  `firestore.rules` lleva su prueba con el emulador.
- Una feature no está terminada si alguna prueba, `tsc` o `lint` falla.

## Git y Pull Requests
- **Nunca trabajes ni hagas push en `main`.** Rama nueva desde `main`
  actualizado: `feature/F-XX-nombre`, `fix/`, `test/` o `chore/`.
- Commits pequeños con Conventional Commits **en español y con los RF en
  el título**, p. ej. `feat(descubrir): ordena animales por compatibilidad (F-03, RF-26)`.
- **Nunca hagas merge.** Al terminar, prepara la descripción del PR: spec,
  RF atendidos, criterios cubiertos y cómo probarlo. La otra integrante
  lo revisa y lo aprueba.
- Al cerrar la sesión, danos un resumen para nuestra bitácora: rama,
  último commit, RF terminados y pendientes.

## Nunca
- Programar sin spec Aprobada, inventar textos o reglas, o editar `specs/`
  sin que te lo pidamos.
- Usar servicios o planes de pago (Blaze, Cloud Functions, Cloud Storage).
- Dejar las reglas abiertas (`allow read, write: if true`), ni siquiera
  para probar.
- Usar datos reales de personas: solo ficticios (p. ej. Wini, Luna,
  Ana Torres).
- Reescribir el historial de Git (`push --force`, `reset --hard` sobre
  ramas compartidas).