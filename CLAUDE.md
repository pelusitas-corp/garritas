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