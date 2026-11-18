# Specs de Garritas

Esta carpeta guarda las **specs** del producto. Aplicamos
Spec-Driven Development (SDD): primero se escribe y aprueba la spec,
después se programa. Todo el código lo escribe Claude Code a partir
de specs Aprobadas.

## Reglas
1. **Specs y SRS siempre coinciden.** El SRS vigente es
   *ACS_SRS_ISO29148_2018_YENIWIWI_v3.0*. Si una spec necesita algo
   distinto, primero se actualiza el SRS (con su historial de cambios)
   y después la spec. Se anota en "Registro de cambios al SRS".
2. **Nada se programa sin un RF.** Cada feature indica los RF que atiende.
3. **Requerimientos singulares** (ISO/IEC/IEEE 29148): un RF = una sola
   acción, con su propio caso válido y no válido.
4. **Solo evidencia.** Una spec usa únicamente el SRS v3.0, las
   entrevistas E-1 a E-4, el prototipo de Figma y las decisiones de
   `00-producto.md`. Lo que falte se marca como `[PENDIENTE]`; no se supone.
5. **Sin spec Aprobada no hay código.**
6. **Trazabilidad literal.** Los criterios de aceptación copian
   literalmente los casos válido y no válido de sus RF, con el mismo
   mensaje de error.
7. **Se respeta el "Fuera de alcance"** general y el de cada spec.
8. **SDD + Scrum:** cada feature es un elemento del Product Backlog y sus
   criterios de aceptación forman parte de la Definición de Terminado.

## Estructura
    specs/
    ├── README.md           ← este archivo
    ├── 00-producto.md      ← visión, stakeholders, alcance y decisiones
    ├── 01-arquitectura.md  ← stack, roles, modelo de datos y seguridad
    └── features/
        ├── _plantilla.md   ← plantilla para nuevas features
        └── F-XX-nombre.md  ← una spec por feature

## Estados de una spec
`Borrador` → `Aprobada` → `En desarrollo` → `Terminada`
- Solo la Product Owner pasa una spec de Borrador a Aprobada.
- Una spec queda Terminada cuando cumple la Definición de Terminado.

## Definición de Terminado (DoD)
- [ ] Spec Aprobada, alineada con el SRS vigente y sin `[PENDIENTE]` que bloqueen.
- [ ] Todos los criterios de aceptación (válidos y no válidos) pasan, con los mensajes exactos del SRS.
- [ ] Cumple los RNF aplicables (≤ 3 s, ≤ 3 toques, ≤ 3 min).
- [ ] TypeScript y ESLint sin errores; PR revisado por la otra integrante, que entiende y puede explicar el cambio.
- [ ] La interfaz respeta Soft UI y la pantalla del prototipo.
- [ ] Fila completa en la matriz de trazabilidad (RF → spec → criterio → prueba → pantalla).
- [ ] Spec en estado Terminada; tarjeta de Trello y puntos actualizados.

## Fuera de alcance del MVP
- Seguimiento post-adopción (pasa a la V2.0).
- Pagos, donaciones y cualquier módulo monetario.
- Mensajería masiva y difusión automatizada en redes sociales.
- En esta versión: notificaciones push y por correo, chat directo,
  subida de identificación y comprobante, y registro de albergues desde la app.
- Todo lo que no esté en el SRS vigente o en una spec Aprobada.

## Cómo cambiar una spec
1. Rama `docs/spec-fXX-nombre` desde `main` actualizado.
2. Commit `docs(specs): <qué cambió> (F-XX, RF-XX)`.
3. PR hacia `main`, revisado y aprobado por la otra integrante.
   Nadie hace push directo a `main`.

## Registro de cambios al SRS
Cuando una spec necesita cambiar el SRS, primero se actualiza el SRS y
luego se anota aquí.

| Fecha | Versión del SRS | RF / sección | Cambio | Spec afectada |
|---|---|---|---|---|
| 2026-11-13 | 3.0 | RF-01 a RF-28 | Requerimientos singulares y formato "El sistema debe… cuando…" | Todas |