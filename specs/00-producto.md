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