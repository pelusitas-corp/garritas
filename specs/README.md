# Specs de Garritas

Esta carpeta es la **fuente de verdad** del producto. Aplicamos
Spec-Driven Development (SDD): primero se escribe y aprueba la spec,
después se diseña y programa.

## Reglas
1. **Las specs mandan.** Si contradicen el SRS u otro documento académico,
   vale la spec y se anota en "Registro de contradicciones".
2. **Solo evidencia.** Una spec usa únicamente los documentos del proyecto
   (SRS v2, entrevistas E-1 a E-4, prototipo). Lo que falte se marca
   como `[PENDIENTE]`; no se supone.
3. **Sin spec Aprobada no hay código.**
4. **Se respeta el "Fuera de alcance"** general y el de cada spec.
5. **SDD + Scrum:** cada feature es un elemento del Product Backlog y sus
   criterios de aceptación forman parte de la Definición de Terminado.

## Estructura
    specs/
    ├── README.md           ← este archivo
    ├── 00-producto.md      ← visión, stakeholders y alcance [PENDIENTE]
    ├── 01-arquitectura.md  ← stack, roles y modelo de datos [PENDIENTE]
    └── features/
        ├── _plantilla.md   ← plantilla para nuevas features
        └── F-XX-nombre.md  ← una spec por feature

## Estados de una spec
`Borrador` → `Aprobada` → `En desarrollo` → `Terminada`
- Solo la Product Owner pasa una spec de Borrador a Aprobada.
- Una spec queda Terminada cuando cumple la Definición de Terminado.

## Definición de Terminado (DoD)
- [ ] Spec Aprobada y sin `[PENDIENTE]` que bloqueen.
- [ ] Todos los criterios de aceptación (válidos y no válidos) pasan.
- [ ] Cumple los RNF aplicables (p. ej. ≤ 3 s, ≤ 3 toques).
- [ ] TypeScript y ESLint sin errores; PR revisado por la otra integrante.
- [ ] La interfaz respeta Soft UI y la pantalla del prototipo.
- [ ] Spec en estado Terminada y tarjeta de Trello actualizada.

## Fuera de alcance del MVP
- Seguimiento post-adopción (pasa a la V2.0).
- Pagos, donaciones y cualquier módulo monetario.
- Mensajería masiva y difusión automatizada en redes sociales.
- Todo lo que no esté en el SRS o en una spec Aprobada.

## Cómo cambiar una spec
1. Rama `docs/spec-fXX-nombre` desde `main` actualizado.
2. Commit `docs(specs): <qué cambió> (F-XX)`.
3. PR hacia `main`, revisado y aprobado por la otra integrante.

## Registro de contradicciones
| Fecha | Spec | Documento | Qué dice cada uno | Acción |
|---|---|---|---|---|
| | | | | |