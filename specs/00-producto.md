# 00 · Producto: Garritas

| Campo | Valor |
|---|---|
| Estado | Borrador |
| Versión | 0.2 |
| Fecha | 2026-11-18 |
| Autoras | Paulina Mendoza Quiroz (Product Owner) y Jennifer Salgado Pacheco (Scrum Master) |
| Fuentes | SRS v3.0 (ISO/IEC/IEEE 29148), Lista Consolidada v3.0, Lean Canvas, ENS P6, Registro de sesiones de elicitación, transcripciones E-1 a E-4, retroalimentación de la presentación de avances (2026-11-06), prototipo de Figma "Garritas" |

> Las entrevistadas se identifican solo por código y rol (E-1 a E-4).
> Este repositorio es público: no se incluyen nombres de personas ni de organizaciones.
> Los textos y mensajes exactos de la app están en el SRS v3.0; las specs F-XX los copian literalmente.

## 1. Visión y propuesta única de valor
**Garritas** es una app móvil (Android e iOS) para albergues, asociaciones
y rescatistas independientes de Ensenada, y para las personas que quieren
adoptar.

**Propuesta única de valor:** **matches explicables y adopciones más
rápidas.** El adoptante responde una sola vez un cuestionario de un toque
y ve a los animales ordenados por su porcentaje de compatibilidad, con el
porqué de cada match. El albergue recibe las solicitudes ya ordenadas por
compatibilidad y pre-aprueba o rechaza en ≤ 3 toques.

**Cómo funciona el matchmaking:** (1) filtros no negociables que descartan
combinaciones imposibles y (2) un porcentaje calculado con similitud de
coseno ponderada sobre varias dimensiones de compatibilidad (por ejemplo,
energía, espacio, tiempo disponible y experiencia). Está basado en un
sistema de recomendación documentado (Santos et al., UFBA) e inspirado en
el concepto de Meet Your Match de la ASPCA, sin copiar su material.

**Concepto de alto nivel:** "Tinder de adopción responsable".

## 2. Problema
Hoy el filtrado de adoptantes se hace a mano: formatos en papel o PDF,
mensajes de WhatsApp y redes sociales, y Google Forms. Esto provoca:

1. **Respuestas lentas:** revisar un candidato tarda hasta 5 días (E-1),
   y se pierden buenos candidatos mientras se atiende el albergue.
2. **Solicitudes que no cumplen requisitos mínimos** y saturan a quien las
   revisa (E-1, E-4).
3. **Adopciones incompatibles:** la familia no calculó la energía del
   animal o el espacio no era suficiente. Las devoluciones se usan como
   **métrica de resultado**, no como promesa principal.
4. **Saturación sin red de apoyo:** no hay un canal para saber quién tiene
   espacio de casa temporal (se atiende como Could have, F-09 y F-10).

**Alternativas actuales:** Petfinder, Google Forms, grupos de Facebook y
WhatsApp, fichas en papel y hojas de Excel.

## 3. Stakeholders y segmentos
| ID | Perfil | Experiencia | Qué espera del sistema |
|---|---|---|---|
| E-1 | Directora general de una asociación protectora (zona Maneadero / Punta Banda) | 8 años | Filtrar solicitudes rápido con un motor de compatibilidad que evalúe espacio, tiempo y temperamento |
| E-2 | Rescatista independiente | 25 años | Cuestionarios obligatorios, filtros estrictos y una red de casas temporales; poco dominio tecnológico |
| E-3 | Fundadora y vocera de un colectivo animalista de Ensenada | 25 años | Trazabilidad formal de las entregas y protección de datos (LFPDPPP) |
| E-4 | Coordinadora de adopciones de una asociación civil (México y EE. UU.) | 4 años | Digitalizar los formatos de ingreso y usar filtros estructurados |

**Segmentos:**
- **Principal (cliente):** albergues, refugios y asociaciones civiles.
- **Secundario:** rescatistas independientes y red de voluntarios / casas temporales.
- **Usuario final:** personas y familias que quieren adoptar de forma responsable.

**Encuesta masiva:** resultados `[PENDIENTE: PO-15]`; no se citan hasta tenerlos.

## 4. Hallazgos e implicaciones de diseño
| # | Hallazgo | Evidencia | Implicación para el diseño | Req. |
|---|---|---|---|---|
| H1 | Revisar cada candidato a mano tarda hasta 5 días y se pierden buenos candidatos | E-1 | Cuestionario digital de un toque y cálculo automático | RF-02, RF-03 |
| H2 | Gran parte de las solicitudes no cumple requisitos mínimos | ENS P6 (E-1, E-4); cifra exacta `[PENDIENTE: PO-14]` | Filtros no negociables y etiqueta "No Apto" si la compatibilidad es < 30 % | RF-17, RF-18 |
| H3 | Devoluciones por energía o espacio incompatibles: 15–20 % (E-1); ~1 de cada 10 (E-4) | E-1, E-4 | El perfil del animal y el cuestionario comparan las mismas dimensiones | RF-03, RF-14 |
| H4 | Lo que importa es responder rápido a los mejores candidatos | E-1, E-4 | Solicitudes ordenadas por % y decisión en ≤ 3 toques | RF-04, RF-05, RF-21, RC-05 |
| H5 | No se sabe quién tiene espacio de casa temporal; los mensajes se pierden en grupos de WhatsApp | E-1, E-2, E-4 | Disponibilidad y directorio de casas temporales (Could have) | RF-06, RF-07 |
| H6 | WhatsApp es el canal que aceptan los hogares temporales | E-4 | Interfaz muy simple para el voluntario; el canal es un riesgo de adopción | RF-06, RI-01 |
| H7 | Rescatistas con poco dominio tecnológico | Registro de sesión con E-2 | Tipografía grande, una pregunta por pantalla y respuestas de un toque | RF-02, RI-01, RNF-03 |
| H8 | Se piden identificación y comprobante; la gente debe confiar en quien recibe sus datos | E-1, E-3 | En el MVP **no se suben documentos**: la INE se verifica en persona; aviso de privacidad con consentimiento, contacto oculto hasta pre-aprobar y reglas de seguridad por rol | RF-25, RF-12, RNF-02, RC-06 |
| H9 | Los formatos de ingreso y de solicitud existen, pero en papel o Google Forms | E-4 | Ficha digital del animal con su perfil de compatibilidad y cuestionario estructurado | RF-01, RF-14, RF-02 |
| H10 | El matchmaking debía ser documentado, llamativo y explicable | Retroalimentación de la presentación de avances (2026-11-06) | Algoritmo documentado, explicación del match y perfil Garritas | RF-03, RF-19, RF-20 |

## 5. Roles de usuario
| Rol | Qué hace en el MVP | Características | Req. |
|---|---|---|---|
| **Adoptante** | Acepta el aviso de privacidad y crea su cuenta; responde el cuestionario una sola vez; ve su perfil Garritas; descubre animales ordenados por compatibilidad, ve su detalle y el porqué del match; envía solicitudes y consulta su estado | Usa el celular y busca rapidez | RF-25, RF-23, RF-09, RF-02, RF-15, RF-16, RF-19, RF-10, RF-26, RF-28, RF-20, RF-11, RF-27 |
| **Albergue / Rescatista** | Inicia sesión con la cuenta que le crea el equipo; da de alta animales con fotos y perfil de compatibilidad; revisa solicitudes ordenadas por %; pre-aprueba o rechaza; ve el contacto del adoptante tras pre-aprobar | Tiempo operativo muy limitado; trabaja en campo | RF-09, RF-01, RF-13, RF-14, RF-04, RF-05, RF-21, RF-22, RF-12 |
| **Voluntario (casa temporal)** · Could have | Actualiza su disponibilidad de espacio | Interfaz rápida y muy simple; rol por definir `[PENDIENTE: PO-01]` | RF-06 |

- Las cuentas de albergue **no se crean desde la app**: las da de alta el
  equipo YENIWIWI (D-18; procedimiento en `01-arquitectura.md` §3).
- Cada rol solo ve sus pantallas. Si intenta abrir otra, se muestra:
  "No tienes permiso para ver esta sección" (RF-24).

## 6. Flujo del MVP
**Adoptante (Flujo A: primero el cuestionario, luego el catálogo):**
1. "Quiero adoptar" → aviso de privacidad y confirmación de mayoría de
   edad (RF-25) → registro con nombre completo, correo, teléfono y
   contraseña (RF-23).
2. Cuestionario de un toque, una pregunta por pantalla, ≤ 3 min (RF-02,
   RF-15, RF-16, RNF-03) → "Ver mi perfil Garritas" (RF-19).
3. "Descubrir": animales "Disponible" que pasan los filtros no negociables,
   ordenados de mayor a menor % (RF-10, RF-17, RF-03, RF-26, RNF-01).
4. Detalle del animal → "¡Quiero adoptarlo!" (RF-28) → pantalla "Match"
   con el % y por qué hacen match (RF-20).
5. "Enviar solicitud" → "¡Solicitud enviada!" (RF-11) → "Mis solicitudes"
   con su estado (RF-27).

**Albergue / Rescatista:**
1. Inicio de sesión (RF-09, RF-24).
2. Alta del animal: datos básicos, fotos y perfil de compatibilidad →
   "Publicar para adopción" (RF-01, RF-13, RF-14).
3. Solicitudes de cada animal ordenadas por % (RF-04); las de < 30 %
   llegan como "No Apto" (RF-18).
4. "Pre-aprobar" o "Rechazar" en ≤ 3 toques (RF-05, RF-21, RC-05); solo
   una pre-adopción por animal (RF-22).
5. Al pre-aprobar se muestran el teléfono y el correo del adoptante
   (RF-12). La identidad y la mayoría de edad (INE) se verifican **en
   persona** durante la visita o la entrega (D-22).

### Estados
| Entidad | Estados | Fuente |
|---|---|---|
| Animal | Disponible · En pre-adopción · Adoptado `[PENDIENTE: PO-02]` | RF-01, RF-05, RF-10 |
| Solicitud | Pendiente · Pre-aprobada · Rechazada; etiqueta "No Apto" si el % < 30 | RF-05, RF-18, RF-21, RF-27 |
| Cuestionario | En progreso · Completo | RF-02, RF-16 |
| Voluntario (Could have) | Disponible · Ocupado | RF-06 |

## 7. Mapa de features
| Feature | Requerimientos | Prioridad | Pantallas del prototipo |
|---|---|---|---|
| F-01 Acceso y privacidad | RF-25, RF-23, RF-09, RF-24 | Must | Selección de Rol, Aviso de Privacidad, Registro con Correo, Acceso de Adoptante, Acceso de Albergue |
| F-02 Alta del animal | RF-01, RF-13, RF-14, RI-02 | Must | Alta de Mascota |
| F-04 Cuestionario del adoptante | RF-02, RF-15, RF-16, RNF-03 | Must | Tu hogar, Tiempo libre, Experiencia previa (preguntas provisionales, PO-04) |
| F-05 Motor de matchmaking y perfil | RF-17, RF-03, RF-18, RF-19, RF-20, RNF-01 | Must | Perfil Garritas, Match, Mi perfil |
| F-03 Descubrir y detalle | RF-10, RF-26, RF-28 | Must | Descubrir, Detalle |
| F-06 Solicitud de adopción | RF-11, RF-27 | Must | Match, Solicitud enviada, Mis solicitudes |
| F-07 Panel priorizado de solicitudes | RF-04, RC-05 | Must | Solicitudes |
| F-08 Pre-aprobar, rechazar y revelar contacto | RF-05, RF-21, RF-22, RF-12 | Must | Detalle de Solicitud Recibida |
| F-09 Ofrecer casa temporal | RF-06 | Could | Casa Temporal con Cupos |
| F-10 Casas temporales disponibles | RF-07 | Could | Resguardos de Emergencia |
| F-11 Notificaciones | RF-08, RI-03, RI-04 | Won't | — |
| Transversal · Privacidad y seguridad | RNF-02, RC-06, RI-05 | Must | Se resuelve en `01-arquitectura.md` §5 y en F-01 |

- Reparto: Paulina, F-04 → F-05 → F-03 → F-06; Jennifer, setup → F-01 →
  F-02 → F-07 → F-08. El orden y los story points se fijan en el Product Backlog.

## 8. Restricciones clave
| ID | Restricción | Cómo se verifica |
|---|---|---|
| RNF-01 | Porcentaje calculado y mostrado en ≤ 3 s al abrir "Descubrir"; si tarda más: indicador de carga y "Calculando compatibilidad, verifica tu conexión a internet" | Prueba de tiempo de respuesta |
| RNF-02 · RC-06 | Datos personales protegidos (LFPDPPP) con reglas de seguridad por rol y HTTPS; aviso de privacidad con consentimiento (RF-25); en esta versión no se piden documentos (D-13) | Pruebas de reglas con el emulador de Firebase |
| RNF-03 | Cuestionario completable en ≤ 3 min; si se interrumpe, se recupera (RF-16) | Prueba cronometrada con ≥ 5 usuarios |
| RNF-04 | Disponibilidad del 99 % (Should); depende de Firebase | Monitoreo durante el periodo de prueba |
| RNF-05 · RC-01 · RC-03 | Una sola base de código en React Native + Expo con TypeScript, para Android e iOS | Ejecutar en ambos sistemas |
| RC-02 | Firebase Authentication y Cloud Firestore, dentro de los límites sin costo (plan Spark) | Revisión de arquitectura |
| RC-04 | Terminar dentro del semestre 2026-2; fecha final `[PENDIENTE: PO-16]` | Plan de sprints |
| RC-05 | Pre-aprobar o rechazar una solicitud en ≤ 3 toques | Conteo de interacciones en prueba |
| RI-02 | Cámara y galería para las fotos; si se niega la cámara: "Habilita el acceso a la cámara desde los ajustes de tu teléfono o elige una foto de tu galería" | Prueba con permiso denegado |
| RI-05 | Toda comunicación por HTTPS (TLS 1.2+) | Revisión de configuración |
| Proyecto | Solo herramientas gratuitas o capas gratuitas (presupuesto $0) | Revisión de costos |