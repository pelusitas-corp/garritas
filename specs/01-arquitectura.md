# 01 · Arquitectura: Garritas

| Campo | Valor |
|---|---|
| Estado | Borrador |
| Versión | 0.1 |
| Fecha | 2026-11-18 |
| Autoras | Jennifer Salgado Pacheco (Scrum Master) y Paulina Mendoza Quiroz (Product Owner) |
| Fuentes | SRS v3.0 (ISO/IEC/IEEE 29148), `00-producto.md`, prototipo de Figma "Garritas" |

> Esta spec describe **cómo** se construye Garritas. **Qué** hace el sistema
> está en el SRS v3.0 y en las specs de features. Si algo aquí contradice
> el SRS, manda el SRS y se corrige esta spec.

## Trazabilidad
| Requerimiento | Qué exige | Sección |
|---|---|---|
| RC-01 | React Native con Expo y TypeScript | §2 |
| RC-02 | Firebase Authentication y Cloud Firestore, dentro de los límites sin costo | §2, §2.1 |
| RC-03 · RNF-05 | Android e iOS con una sola base de código | §2, §7 |
| RNF-01 | Porcentaje de compatibilidad en ≤ 3 s | §6 |
| RNF-02 · RC-06 | Datos personales protegidos por rol (LFPDPPP) | §4, §5 |
| RNF-04 | Disponibilidad del 99 % (depende de Firebase) | §2 |
| RI-01 | Mobile-first, pantallas por rol | §3, §7 |
| RI-02 | Cámara y galería del teléfono | §2.1 |
| RI-05 | HTTPS (TLS 1.2 o superior) | §2 |
| RF-09 · RF-23 · RF-24 · RF-25 | Acceso, registro, roles y consentimiento | §3, §4 |
| RF-13 | Fotografías del animal | §2.1, §4 |
| RF-03 · RF-17 · RF-19 · RF-20 · RF-26 | Cálculo y explicación del match | §6 |
| SRS §2.4, dependencia 2 | El servicio de fotos se define en la arquitectura | §2.1 |

## 1. Contexto y restricciones
- **Una app móvil, sin servidor propio.** La app (Android/iOS) se comunica
  directamente con Firebase. No hay versión web (SRS §1.2).
- **Dos roles en el MVP:** Adoptante y Albergue (encargado de albergue o
  rescatista). El rol Voluntario es Could have (PO-01) y no se construye
  salvo que sobre tiempo.
- **Presupuesto $0:** solo el plan **Spark** de Firebase (sin tarjeta).
  Por eso no se usan Cloud Functions, Cloud Storage, Cloud Messaging ni
  correo transaccional (además, notificaciones y correo son Won't have).
- **Consecuencia:** la lógica, incluido el cálculo del porcentaje, corre en
  el teléfono, y la protección de datos depende de las **reglas de
  seguridad de Firestore** (§5).
- **Uso en campo con conexión variable** (SRS §2.4): la app debe tolerar
  cortes de red sin perder avances (RF-16) ni congelarse (RNF-01).
- **Plazo:** semestre 2026-2 (RC-04), Sprints 9 y 10.

## 2. Stack y servicios
| Capa | Tecnología | Para qué | Req. |
|---|---|---|---|
| App | React Native + Expo (flujo administrado) + TypeScript estricto | Una sola base de código para Android e iOS; se prueba en el celular con Expo Go | RC-01, RC-03, RNF-05 |
| Autenticación | Firebase Authentication, proveedor correo y contraseña | Acceso de ambos roles; la sesión se conserva en el teléfono | RF-09, RF-23, RC-02 |
| Base de datos | Cloud Firestore, edición Standard, una sola base (la que tiene cuota gratuita) | Usuarios, animales, cuestionarios, solicitudes y fotos | RC-02 |
| Fotos | Cloud Firestore (ver §2.1) | Fotografías del animal | RF-13, RI-02 |
| Comunicación | SDK de Firebase para JavaScript (modular) | Toda la comunicación viaja por HTTPS (TLS) | RI-05 |
| Plan | Firebase Spark (sin costo, sin tarjeta) | Si se agota una cuota, el servicio se pausa hasta el día siguiente; nunca cobra | RC-02 |
| Calidad de código | ESLint (Airbnb) + Prettier | Estilo uniforme y sin errores antes de cada PR | DoD |

**Cuotas gratuitas de Firestore que limitan el diseño:** 1 GiB guardado,
50 000 lecturas/día, 20 000 escrituras/día, 10 GiB de descarga al mes y
**1 MiB como máximo por documento**. Alcanzan para la demo y las pruebas
de usabilidad.

**Versiones:** se usa la versión estable vigente de Expo SDK y del SDK de
Firebase el día del setup `[PENDIENTE: se registran aquí en la v0.2]`.
**Ubicación de Firestore:** `[PENDIENTE: se elige en el setup; no se puede
cambiar después]`.

### 2.1 Decisión: fotografías del animal (PO-17)
- **Contexto:** Cloud Storage for Firebase exige el plan Blaze (de pago,
  con tarjeta) desde el 3 de febrero de 2026. El SRS §2.4 deja la elección
  del servicio a esta spec.
- **Decisión:** las fotos se guardan **comprimidas dentro de Firestore**.
  1. El encargado toma o elige la foto (cámara o galería, RI-02).
  2. La app la reduce y comprime antes de subirla (objetivo: ≤ 300 KB).
  3. Cada foto se guarda en **su propio documento**, separado de la ficha
     del animal, para no pasar del límite de 1 MiB por documento.
  4. La ficha guarda además una **miniatura** pequeña (≈ 20–30 KB) para las
     tarjetas de "Descubrir"; las fotos completas solo se descargan al
     abrir el "Detalle" (RF-28).
- **Máximo de fotos por animal:** `[PENDIENTE: se fija en F-02]`
  (mínimo 1, RF-13).
- **Herramientas propuestas:** `expo-image-picker` (cámara y galería, con
  permisos) y `expo-image-manipulator` (reducir y comprimir).
- **Alternativas descartadas:** (A) plan Blaze + Cloud Storage: pide
  tarjeta y una alerta de presupuesto solo avisa, no detiene el gasto;
  (C) servicio externo de imágenes: otra cuenta y otras claves, y se sale
  de RC-02.
- **Consecuencias:** costo $0 y todo dentro de Firebase. A cambio, más
  descargas de datos y un límite pequeño de fotos. **En la V2 se migra a
  Cloud Storage.**

## 3. Roles y acceso
| Rol | Cómo obtiene su cuenta | Pantallas (RF-24) |
|---|---|---|
| Adoptante | Se registra en la app: aviso de privacidad (RF-25) → "Crear cuenta" (RF-23) | Cuestionario, Perfil Garritas, Descubrir, Detalle, Match, Mis solicitudes, Mi perfil |
| Albergue | La crea el equipo YENIWIWI antes de su uso (D-18, SRS §2.4) | Alta de mascota, Solicitudes, Detalle de solicitud |

- El rol se guarda en `usuarios/{uid}.rol` (`"adoptante"` o `"albergue"`).
  **Desde la app solo se puede crear el rol `"adoptante"`**, y nadie puede
  cambiar su propio rol (§5).
- **Alta de una cuenta de albergue (procedimiento del equipo):**
  1. Consola de Firebase → Authentication → Agregar usuario (correo y
     contraseña temporal).
  2. Consola de Firebase → Firestore → crear `usuarios/{uid}` con
     `rol: "albergue"` y el nombre del albergue.
  3. Entregar las credenciales al albergue en persona.
- Al iniciar sesión (RF-09), la app lee `usuarios/{uid}.rol` y abre la
  pantalla de inicio de ese rol. Si alguien abre una pantalla de otro rol,
  la app muestra: "No tienes permiso para ver esta sección" (RF-24).
- Cambio y recuperación de contraseña: no existen en el SRS v3.0 →
  fuera de alcance de esta versión.

## 4. Modelo de datos (Cloud Firestore)
Analogía: Firestore es un archivero. Cada **colección** es un cajón y cada
**documento** es una ficha dentro del cajón (máx. 1 MiB por ficha).

| Colección / documento | Campos principales | Quién lo crea | Req. |
|---|---|---|---|
| `usuarios/{uid}` | `rol`, `nombre`, `correo`, `telefono` (solo adoptante), `consentimiento: { aceptado, fecha }` (solo adoptante), `creadoEn` | Adoptante al registrarse; equipo para albergues | RF-23, RF-24, RF-25 |
| `cuestionarios/{uid}` | `respuestas` (pregunta → respuesta), `completo`, `perfilGarritas`, `actualizadoEn` | Adoptante | RF-02, RF-15, RF-16, RF-19 |
| `animales/{animalId}` | `albergueId`, `nombreAlbergue`, `nombre`, `especie`, `edad`, `tamano`, `vacunado`, `esterilizado`, `perfilCompatibilidad` (una opción por dimensión), `miniatura`, `estado`, `creadoEn` | Albergue | RF-01, RF-10, RF-14, RF-28 |
| `animales/{animalId}/fotos/{fotoId}` | `datos` (foto comprimida), `orden` | Albergue | RF-13 |
| `solicitudes/{solicitudId}` | `animalId`, `albergueId`, `adoptanteId`, `nombreAdoptante`, `nombreAnimal`, `nombreAlbergue`, `miniaturaAnimal`, `porcentaje` (entero 0–100), `noApto`, `estado`, `creadaEn`, `actualizadaEn` | Adoptante al enviar | RF-04, RF-11, RF-18, RF-27 |
| `solicitudes/{solicitudId}/privado/contacto` | `telefono`, `correo` | Adoptante al enviar | RF-12 |

**Valores permitidos**
- `animales.estado`: `"Disponible"` · `"En pre-adopción"`.
  El estado "Adoptado" depende de PO-02 `[PENDIENTE]`.
- `solicitudes.estado`: `"Pendiente"` · `"Pre-aprobada"` · `"Rechazada"`.
- `perfilCompatibilidad`, `respuestas` y `perfilGarritas`: sus claves y
  opciones dependen del algoritmo (PO-04) `[PENDIENTE: se definen en F-04
  y F-05]`.

**Por qué así**
- **El contacto va en una ficha aparte** (`privado/contacto`): el albergue
  ve la solicitud (nombre y %) pero no el teléfono ni el correo hasta
  pre-aprobar (RF-12, D-04).
- **Se copian nombres y miniatura a la solicitud** para que "Mis
  solicitudes" y "Solicitudes" se carguen con una sola consulta, sin
  abrir cada animal o usuario.
- **El consentimiento** (RF-25) se acepta antes de que exista la cuenta:
  la app lo guarda en memoria y lo escribe con su fecha en
  `usuarios/{uid}` al crear la cuenta (RF-23).
- **Borrador del cuestionario** (RF-16): cada respuesta se guarda en el
  teléfono al momento y se sincroniza con `cuestionarios/{uid}` cuando
  hay conexión.
- ¿Se puede enviar dos solicitudes al mismo animal? El SRS no lo define
  `[PENDIENTE: decidir en F-06]`.

## 5. Reglas de seguridad (resumen)
Las reglas de Firestore son el "guardia de la ventanilla": revisan cada
lectura y escritura **en el servidor**, aunque alguien modifique la app.

| Colección | Leer | Crear / modificar |
|---|---|---|
| `usuarios/{uid}` | Solo el dueño | Crear: solo el dueño y con `rol: "adoptante"`. Nadie cambia su `rol` |
| `cuestionarios/{uid}` | Solo el dueño | Solo el dueño (adoptante) |
| `animales` y `fotos` | Cualquier usuario con sesión | Solo un albergue, y solo sus propios animales (`albergueId` = su `uid`) |
| `solicitudes` | El adoptante que la envió o el albergue dueño del animal | Crear: solo un adoptante, para sí mismo, con estado `"Pendiente"` y si el animal está `"Disponible"` (RF-11). Modificar: solo el albergue dueño, de `"Pendiente"` a `"Pre-aprobada"` o `"Rechazada"` (RF-05, RF-21) |
| `privado/contacto` | El adoptante siempre; el albergue **solo si la solicitud está `"Pre-aprobada"`** (RF-12) | Solo el adoptante, al enviar la solicitud |
| Cualquier otra ruta | Nadie | Nadie |

- **Una sola pre-adopción por animal (RF-22):** al pre-aprobar, la app
  cambia en una sola operación la solicitud a `"Pre-aprobada"` y el animal
  a `"En pre-adopción"`. La regla solo lo permite si el animal seguía
  `"Disponible"`.
- **Verificación (RNF-02):** las reglas se prueban con el emulador de
  Firebase. Ejemplos: un adoptante no puede leer los datos de otro, y un
  albergue no puede leer el contacto de una solicitud `"Pendiente"`.
- **Riesgo conocido:** como el % se calcula en el teléfono (§6), una app
  modificada podría enviar un porcentaje falso. Se acepta en el MVP por el
  presupuesto $0; en la V2, el cálculo pasa a Cloud Functions.

  ## 6. Cálculo del porcentaje (dónde y cuándo)
El cálculo se hace **en el teléfono del adoptante al abrir "Descubrir"**
(D-23), con **funciones puras**: reciben datos y devuelven un resultado,
sin usar Firebase ni pantallas. Así se pueden probar solas y siempre dan
el mismo resultado con los mismos datos (RF-03, RF-19).

**Al abrir "Descubrir":**
1. Lee `cuestionarios/{uid}`. Si no está completo, lleva a la primera
   pregunta sin responder (RF-02).
2. Consulta los animales con estado `"Disponible"` (RF-10).
3. Descarta los que no tengan completo su perfil de compatibilidad (RF-03).
4. Descarta los que no pasen un filtro no negociable (RF-17).
5. Calcula el % de cada animal con similitud de coseno ponderada
   (RF-03): un entero de 0 a 100.
6. Ordena de mayor a menor (RF-26). Si no queda ninguno, muestra:
   "Por ahora no hay mascotas compatibles con tu hogar. Vuelve pronto".
7. Si tarda más de 3 s, muestra el indicador de carga y "Calculando
   compatibilidad, verifica tu conexión a internet" (RNF-01).

**Otras funciones del motor:**
- **Explicación (RF-20):** el % es la suma de lo que aporta cada dimensión;
  la pantalla "Match" muestra las 2 o 3 que más aportan (o las de menor
  coincidencia si el % es menor a 30).
- **Perfil Garritas (RF-19):** se asigna a partir de las respuestas al
  presionar "Ver mi perfil Garritas". No cambia ningún porcentaje.
- **Al enviar la solicitud (RF-11):** se guarda el % mostrado en "Match"
  y `noApto = porcentaje < 30` (RF-18). Antes se vuelve a revisar el
  filtro no negociable (RF-17, caso del enlace directo).
- Dimensiones, pesos, filtros y reglas de los perfiles: `[PENDIENTE:
  PO-04, se definen en F-04 y F-05]`.

## 7. Estructura de carpetas
Navegación con **Expo Router**: cada archivo dentro de `app/` es una
pantalla. La lógica de cada lado vive en su propia carpeta para que
cada integrante trabaje sin pisar a la otra.

    garritas/
    ├── app/                  ← pantallas (rutas)
    │   ├── (acceso)/         ← bienvenida, aviso, registro, inicio de sesión
    │   ├── (adoptante)/      ← cuestionario, perfil, descubrir, detalle, match, mis solicitudes, mi perfil
    │   └── (albergue)/       ← alta de mascota, solicitudes, detalle de solicitud
    ├── src/
    │   ├── adoptante/        ← componentes y lógica del adoptante
    │   ├── albergue/         ← componentes y lógica del albergue
    │   ├── matchmaking/      ← funciones puras: filtros, %, explicación y perfil
    │   ├── firebase/         ← configuración y acceso a Auth y Firestore
    │   └── compartido/       ← tema Soft UI, componentes base, tipos y mensajes
    ├── tests/                ← pruebas del motor y de las reglas de seguridad
    ├── firestore.rules       ← reglas de seguridad (§5)
    ├── specs/                ← specs (SDD)
    ├── CLAUDE.md             ← instrucciones para Claude Code
    └── .env                  ← configuración de Firebase (no se sube)

| Carpeta | Responsable (reparto) |
|---|---|
| `src/adoptante/`, `src/matchmaking/`, `app/(adoptante)/` | Paulina |
| `src/albergue/`, `src/firebase/`, `app/(acceso)/`, `app/(albergue)/`, `firestore.rules` | Jennifer |
| `src/compartido/` | Ambas (cambios con PR revisado por la otra) |

## 8. Convenciones técnicas
- **TypeScript estricto**, sin `any`. **ESLint (Airbnb) + Prettier**, con
  2 espacios. Nombres: `camelCase` (variables y funciones), `PascalCase`
  (componentes y tipos) y `UPPER_SNAKE_CASE` (constantes).
- **Mensajes literales del SRS:** todos los textos de error y de estado
  viven en `src/compartido/mensajes.ts`, copiados **exactamente** del
  SRS v3.0, para que pantallas y pruebas usen el mismo texto.
- **Tema Soft UI** en `src/compartido/tema.ts`: colores `#F5EACC`,
  `#4A2E21`, `#D3F8E2`, `#A1B2D0` y `#25314C`, tipografía Nunito, bordes
  ≥ 24 px y botones píldora.
- **Configuración** en `.env` con prefijo `EXPO_PUBLIC_`. Los datos de
  configuración de Firebase no son secretos; la protección real está en
  las reglas de §5. Aun así, `.env` no se sube al repo.
- **Pruebas:** Jest para el motor de matchmaking y el emulador de
  Firebase para las reglas de seguridad. **El nombre de cada prueba es
  su criterio de aceptación** (p. ej. `RF-18 no válido: con 30 % no
  muestra "No Apto"`).
- **Git:** ramas `feature/`, `fix/`, `docs/`, `chore/`, `test/`; Conventional
  Commits en español con los RF en el título; todo entra por PR revisado
  por la otra integrante.

## 9. Fuera de alcance de esta arquitectura
- Plan Blaze, Cloud Functions, Cloud Storage, Cloud Messaging y correo
  transaccional (versión posterior).
- Versión web, panel de administración y registro de albergues desde la app.
- Recuperación y cambio de contraseña (no están en el SRS v3.0).
- Analítica, reportes y respaldos automáticos.

## 10. Pendientes
| ID | Pendiente | Se resuelve en |
|---|---|---|
| — | Versiones de Expo SDK y del SDK de Firebase; ubicación de Firestore | Setup (v0.2 de esta spec) |
| PO-04 | Claves de `respuestas`, `perfilCompatibilidad` y `perfilGarritas`; pesos y filtros | Chat "Algoritmo" → F-04, F-05 |
| PO-02 | Estado "Adoptado": quién lo marca y cuándo | Por decidir |
| — | Máximo de fotos por animal | F-02 |
| — | ¿Se permiten dos solicitudes del mismo adoptante al mismo animal? | F-06 |
| PO-12 | Texto del aviso de privacidad | F-01 |

## Historial de cambios
| Versión | Fecha | Cambio | Autoras |
|---|---|---|---|
| 0.1 | 2026-11-18 | Primera versión: contexto, stack, fotos en Firestore (PO-17), roles, modelo de datos, reglas, cálculo, carpetas y convenciones | Jennifer Salgado Pacheco, Paulina Mendoza Quiroz |