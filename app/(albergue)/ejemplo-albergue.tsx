// TEMPORAL (setup): pantalla de ejemplo del grupo (albergue). Se reemplaza en F-02.
import PantallaDeEjemplo from '../../src/compartido/PantallaDeEjemplo';

export default function EjemploAlbergue() {
  return (
    <PantallaDeEjemplo
      ruta="app/(albergue)/ejemplo-albergue.tsx"
      enlaces={['/', '/ejemplo-adoptante']}
    />
  );
}
