// TEMPORAL (setup): pantalla de ejemplo del grupo (acceso). Se reemplaza en F-01.
import PantallaDeEjemplo from '../../src/compartido/PantallaDeEjemplo';

export default function EjemploAcceso() {
  return (
    <PantallaDeEjemplo
      ruta="app/(acceso)/index.tsx"
      enlaces={['/ejemplo-adoptante', '/ejemplo-albergue']}
    />
  );
}
