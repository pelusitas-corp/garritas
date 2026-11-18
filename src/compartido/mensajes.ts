/**
 * Mensajes de la app (errores y estados que ve el usuario).
 *
 * Reglas:
 * - Cada mensaje se copia LITERAL del SRS v3.0, tal como aparece en la spec
 *   de su feature (specs/features/F-XX-*.md): mismas mayúsculas, signos y
 *   acentos.
 * - Se agregan aquí solo cuando se implementa la spec que los usa, con un
 *   comentario del RF de donde salen.
 * - Las pantallas y las pruebas importan el mensaje de este archivo; nunca
 *   escriben el texto directamente.
 *
 * Por ahora está vacío: el setup no implementa ninguna feature.
 */

const MENSAJES = {} as const;

export default MENSAJES;
