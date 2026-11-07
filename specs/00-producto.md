# 00 · Producto: Garritas

| Campo | Valor |
|---|---|
| Estado | Borrador |
| Versión | 0.1 |
| Fecha | 2026-11-05 |
| Autora | Paulina Mendoza Quiroz (Product Owner) |
| Fuentes | SRS v2 (ISO 29148), Lean Canvas, ENS P6, Plan de Negocios, Registro de sesiones de elicitación, transcripciones E-1 a E-4 |

> Las entrevistadas se identifican solo por código y rol (E-1 a E-4).
> Este repositorio es público: no se incluyen nombres de personas ni de organizaciones.

## 1. Visión y propuesta única de valor
**Garritas** es una app móvil (Android e iOS) para albergues, asociaciones
y rescatistas independientes de Ensenada.

**Propuesta única de valor:** conectar el perfil del animal rescatado con
adoptantes compatibles mediante un motor de matchmaking automático,
agilizar la aprobación de solicitudes y movilizar casas temporales en
tiempo real.

**Concepto de alto nivel:** "Tinder de adopción responsable" + coordinación
logística de casas temporales para rescates en campo.

## 2. Problema
Hoy el filtrado de adoptantes se hace a mano: formatos en papel o PDF,
mensajes de WhatsApp y redes sociales, y Google Forms. Esto provoca:

1. **Respuestas lentas:** revisar un candidato tarda hasta 5 días (E-1),
   y se pierden buenos candidatos mientras se atiende el albergue.
2. **Devoluciones por incompatibilidad:** sobre todo porque la familia
   no calculó la energía del perro o el espacio no era suficiente.
3. **Saturación sin red de apoyo:** no hay un canal para saber quién tiene
   espacio de casa temporal ante un rescate urgente.
4. **Información dispersa:** las solicitudes y los seguimientos se pierden
   entre chats y formatos sueltos.

**Alternativas actuales:** Petfinder, Google Forms, grupos de Facebook y
WhatsApp, fichas en papel y hojas de Excel.

## 3. Stakeholders y segmentos
| ID | Perfil | Experiencia | Qué espera del sistema |
|---|---|---|---|
| E-1 | Directora general de una asociación protectora (zona Maneadero / Punta Banda) | 8 años | Filtrar solicitudes rápido y reducir devoluciones con compatibilidad automática |
| E-2 | Rescatista independiente | 25 años | Cuestionarios obligatorios, filtros estrictos y una red de casas temporales |
| E-3 | Fundadora y vocera de un colectivo animalista de Ensenada | 25 años | Trazabilidad formal de las entregas y protección de datos (LFPDPPP) |
| E-4 | Coordinadora de adopciones de una asociación civil (México y EE. UU.) | 4 años | Digitalizar formatos de ingreso, filtros estructurados y notificaciones |

**Segmentos:**
- **Principal (cliente):** albergues, refugios y asociaciones civiles.
- **Secundario:** rescatistas independientes y red de voluntarios / casas temporales.
- **Usuario final:** personas y familias que quieren adoptar de forma responsable.

**Encuesta masiva:** planeada con un mínimo de 30 respuestas.
Resultados `[PENDIENTE]`; no se citan hasta tenerlos.

## 4. Hallazgos e implicaciones de diseño
| # | Hallazgo | Evidencia | Implicación para el diseño | Req. |
|---|---|---|---|---|
| H1 | Revisar cada candidato a mano tarda hasta 5 días y se pierden buenos candidatos | E-1 | Cuestionario digital estructurado y cálculo automático | RF-02, RF-03 |
| H2 | Gran parte de las solicitudes no cumple requisitos mínimos | ENS P6 (E-1, E-4); cifra exacta `[PENDIENTE: verificar en transcripción]` | Filtrado automático; "No Apto" si la compatibilidad es < 30 % | RF-03 |
| H3 | Devoluciones por energía o espacio incompatibles: 15–20 % (E-1); ~1 de cada 10 (E-4) | E-1, E-4 | El matchmaking evalúa energía, espacio, tiempo y experiencia | RF-01, RF-03 |
| H4 | Lo que importa es responder rápido a los mejores candidatos | E-1, E-4 | Panel ordenado por % y aprobar en ≤ 3 toques | RF-04, RF-05, RC-05 |
| H5 | No se sabe quién tiene espacio de casa temporal; los mensajes se pierden en grupos de WhatsApp | E-1, E-2, E-4 | Disponibilidad en tiempo real y directorio filtrado | RF-06, RF-07 |
| H6 | WhatsApp es el canal que aceptan los hogares temporales; otros medios no han funcionado | E-4 | Interfaz muy simple y rápida para el voluntario; adopción del canal como riesgo | RF-06, RI-01 |
| H7 | Duda sobre cómo lograr que rescatistas con poco dominio tecnológico usen la app | Registro de sesión con E-2 (punto abierto) | Tipografía grande y una acción por pantalla | RI-01, RNF-03 |
| H8 | Se piden identificación oficial y comprobante de domicilio; la gente debe confiar para subirlos | E-1, E-3 | Cifrado, aviso de privacidad y contacto oculto hasta la pre-aprobación | RNF-02, RC-06, RF-12 |
| H9 | Los formatos de ingreso y de solicitud existen, pero en papel o Google Forms | E-4 | Ficha digital del animal y cuestionario estructurado | RF-01, RF-02 |
## 5. Roles de usuario
| Rol | Qué hace en el MVP | Características | Req. |
|---|---|---|---|
| **Adoptante** | Explora el catálogo, responde el cuestionario, ve su % de compatibilidad, postula y consulta el estado de sus solicitudes | Usa el celular y busca rapidez | RF-02, RF-03, RF-08, RF-10, RF-11 |
| **Albergue / Rescatista** | Inicia sesión, registra animales, revisa solicitudes priorizadas, pre-aprueba o rechaza y consulta casas temporales | Tiempo operativo muy limitado; trabaja en campo | RF-01, RF-04, RF-05, RF-07, RF-09, RF-12 |
| **Voluntario (casa temporal)** | Actualiza su disponibilidad de espacio | Necesita una interfaz rápida y muy simple | RF-06 |

- Cada rol solo ve sus pantallas. Si intenta abrir otra, se muestra:
  "No tiene los permisos necesarios para visualizar esta sección" (RI-01).
- `[PENDIENTE-PO-01]` El SRS define 3 roles, pero el prototipo tiene 2 botones
  ("Quiero Adoptar" y "Soy Albergue / Voluntario"), y "Ofrecer Casa Temporal"
  está en la vista del Adoptante. Decidir si el Voluntario es un rol propio,
  va junto con Albergue o es una opción del Adoptante.

## 6. Flujo del MVP
1. **Registro:** el albergue o rescatista inicia sesión (RF-09) y registra la
   ficha del animal (RF-01).
2. **Sobrecupo:** si no hay espacio, consulta las casas temporales disponibles
   (RF-07). Los voluntarios mantienen su disponibilidad actualizada (RF-06).
3. **Postulación:** el adoptante explora el catálogo (RF-10) y responde el
   cuestionario (RF-02). El sistema calcula el % de compatibilidad en ≤ 3 s
   (RF-03, RNF-01) y el adoptante postula a un animal específico (RF-11).
4. **Priorización:** el albergue ve las solicitudes ordenadas de mayor a menor
   % (RF-04).
5. **Decisión:** pre-aprueba o rechaza en ≤ 3 toques (RF-05, RC-05). Al
   pre-aprobar, se revela el contacto del adoptante (RF-12) y se le notifica
   (RF-08).

### Estados
| Entidad | Estados | Fuente |
|---|---|---|
| Animal | Disponible · Pre-aprobado · Adoptado | RF-10, RF-11 |
| Solicitud | Pendiente · Pre-Aprobada · Rechazada; etiqueta "No Apto" si el % < 30 | RF-03, RF-05 |
| Voluntario | Disponible · Ocupado | RF-06 |

- `[PENDIENTE-PO-02]` Ningún RF dice quién ni cuándo marca un animal como "Adoptado".
- `[PENDIENTE-PO-03]` El Plan de Negocios y RI-03 mencionan una alerta push a
  los voluntarios cuando se necesita casa temporal, pero no existe un RF que la pida.

## 7. Mapa de features
| Feature | Requerimientos | Prioridad | Pantallas del prototipo |
|---|---|---|---|
| F-01 Selección de rol y acceso | RF-09, RI-01 | Must | Selección de Rol, Acceso de Adoptante, Registro por Teléfono y Código, Registro de Albergue |
| F-02 Alta del perfil del animal | RF-01, RI-02 | Must | Alta de Mascota |
| F-03 Catálogo y detalle | RF-10 | Must | Descubrir, Detalle |
| F-04 Cuestionario del adoptante | RF-02, RNF-03 | Must | Tu hogar, Tiempo libre, Experiencia previa |
| F-05 Motor de matchmaking | RF-03, RNF-01 | Must | Match |
| F-06 Postulación a un animal | RF-11 | Must | Match, Mis Solicitudes |
| F-07 Panel priorizado de solicitudes | RF-04, RC-05 | Must | Solicitudes |
| F-08 Pre-adopción y revelado de contacto | RF-05 (Must), RF-12 (Should) | Must | Detalle de Solicitud Recibida |
| F-09 Ofrecer casa temporal | RF-06 | Should | Casa Temporal con Cupos |
| F-10 Casas temporales disponibles | RF-07 | Should | Resguardos de Emergencia |
| F-11 Notificación de pre-aprobación | RF-08, RI-03, RI-04 | Should | `[PENDIENTE]` |
| Transversal · Privacidad y seguridad | RNF-02, RC-06, RI-05 | Must | Aviso de privacidad `[PENDIENTE]` |

- El orden de desarrollo y los story points los decide la PO en el Product Backlog.
- La numeración de HU en documentos de APS anteriores a la v2 del SRS
  no coincide con estos RF y debe actualizarse.

## 8. Restricciones clave
| ID | Restricción | Cómo se verifica |
|---|---|---|
| RNF-01 | Compatibilidad calculada en ≤ 3 s; si tarda más: indicador de carga y "Calculando compatibilidad, verifique su conexión a internet" | Prueba de tiempo de respuesta |
| RNF-02 · RC-06 | Datos sensibles cifrados (AES-256), LFPDPPP, aviso de privacidad y consentimiento explícito | Auditoría de almacenamiento cifrado |
| RNF-03 | Cuestionario completable en ≤ 3 min; si se interrumpe, se recupera el borrador con "Se ha recuperado su cuestionario en progreso" | Prueba cronometrada con ≥ 5 usuarios |
| RNF-04 | Disponibilidad del 99 % de 07:00 a 22:00 (Should) | Monitoreo de uptime durante un mes |
| RNF-05 · RC-01 · RC-03 | Una sola base de código en React Native + Expo con TypeScript, para Android e iOS | Compilar y ejecutar en ambos sistemas |
| RC-02 | Autenticación y base de datos en Firebase (Auth + Cloud Firestore) | Revisión de arquitectura |
| RC-04 | Terminar dentro del calendario del semestre 2026-2; fecha final `[PENDIENTE]` | Plan de sprints |
| RC-05 | Aprobar o rechazar una solicitud en ≤ 3 toques | Conteo de interacciones en prueba |
| RI-02 | Cámara para fotos; si se niega el permiso: "Debe habilitar el acceso a la cámara desde los ajustes de su teléfono para poder subir fotografías" | Prueba con permiso denegado |
| RI-03 · RI-04 | Push con Firebase Cloud Messaging (reintento a los 5 min) y correo transaccional al adoptante | Prueba de envío y de fallo |
| RI-05 | Toda comunicación por HTTPS (TLS 1.2+) | Revisión de configuración |
| Proyecto | Solo herramientas gratuitas o capa gratuita de servicios en la nube | Revisión de costos (presupuesto $0) |
## 9. Fuera de alcance del MVP
- Seguimiento post-adopción: la pantalla "Seguimiento de Mi Garrita" pasa a la V2.0.
- Pagos, donaciones y cualquier módulo monetario (SRS 1.2, Retrospectiva 1).
- Mensajería masiva y difusión automatizada en redes sociales (SRS 1.2, Retrospectiva 1).
- Versión web de escritorio y reportes analíticos avanzados (SRS 1.2).
- Expediente médico (vacunación, esterilización): estaba en el SRS v1
  y no quedó en el SRS v2.
- Todo lo que no esté en el SRS v2 o en una spec Aprobada.

## 10. Decisiones tomadas
| ID | Decisión | Fuente |
|---|---|---|
| D-01 | Cuestionario en dos niveles: campos mínimos obligatorios para el cálculo y validaciones secundarias presenciales o posteriores (resuelve RF-02 vs. RNF-03) | Lista Consolidada, sección 7 (E-1, E-2, E-3) |
| D-02 | Una solicitud con compatibilidad menor al 30 % se etiqueta "No Apto" | RF-03 |
| D-03 | Solo una pre-adopción en curso por animal | RF-05 |
| D-04 | El contacto del adoptante se oculta hasta la pre-aprobación | RF-12 (E-3) |
| D-05 | El cálculo tarda ≤ 3 s; si otro documento indica otro tiempo, manda RNF-01 | RNF-01 |
| D-06 | Backend, autenticación y base de datos en Firebase | RC-02 (SRS v2) |
| D-07 | Repositorio público: las entrevistadas se identifican solo por código y rol | Acuerdo del equipo, 2026-11-05 |

## 11. Pendientes `[PENDIENTE]`
| ID | Qué falta decidir | Quién decide | Bloquea |
|---|---|---|---|
| PO-01 | ¿El Voluntario es un rol propio, va con Albergue o es una opción del Adoptante? (SRS: 3 roles; prototipo: 2 botones) | PO | F-01, F-09 |
| PO-02 | Quién marca un animal como "Adoptado" y en qué momento | PO | F-03, F-08 |
| PO-03 | ¿Hay alerta push a voluntarios cuando se necesita casa temporal? (RI-03 y Plan de Negocios la mencionan; no hay RF) | PO | F-10, F-11 |
| PO-04 | Variables y pesos del algoritmo de compatibilidad. El SRS dice energía vs. espacio; el prototipo pregunta hogar, tiempo libre y experiencia | PO | F-04, F-05 |
| PO-05 | Cómo se registra y accede el adoptante (el prototipo usa teléfono y código; RF-09 solo cubre albergues) | PO | F-01, F-06 |
| PO-06 | ¿Los albergues se registran en la app o sus cuentas se crean previamente? (RF-09 dice "previamente registrados") | PO | F-01 |
| PO-07 | ¿El chat directo (botón en "Resguardos de Emergencia") entra al MVP? No hay RF | PO | F-10 |
| PO-08 | ¿Directorio, mapa o ambos? (RF-07). Incluye la API de mapas y su cuota gratuita | Equipo | F-10 |
| PO-09 | "Ofrecer Casa Temporal" pide cupos, especie, teléfono y colonia; RF-06 solo pide Disponible / Ocupado | PO | F-09 |
| PO-10 | ¿El MVP pide subir identificación y comprobante de domicilio? RNF-02 los cifra, pero ningún RF los solicita | PO | F-04, Transversal |
| PO-11 | Pantallas "Mi Perfil" y "Mis Solicitudes" sin un RF explícito | PO | F-06 |
| PO-12 | Texto del aviso de privacidad y del consentimiento (LFPDPPP) | Equipo | Transversal |
| PO-13 | Dónde ve el adoptante la notificación de pre-aprobación | PO | F-11 |
| PO-14 | Verificar el origen de la cita "30 mensajes al día, 25 no cumplen" (ENS P6 vs. transcripciones) | Equipo | — |
| PO-15 | Resultados de la encuesta masiva | Equipo | — |
| PO-16 | Fecha de entrega final del proyecto | Equipo | Plan de sprints |

## Historial de cambios
| Versión | Fecha | Autora | Cambio |
|---|---|---|---|
| 0.1 | 2026-11-06 | Paulina Mendoza Quiroz | Creación (bloques 1 a 3) |