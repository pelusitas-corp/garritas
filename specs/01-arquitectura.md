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