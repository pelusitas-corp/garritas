// TEMPORAL (setup): pantalla de ejemplo del grupo (adoptante). Se reemplaza en F-04.
import PantallaDeEjemplo from '../../src/compartido/PantallaDeEjemplo';

export default function EjemploAdoptante() {
  return (
    <PantallaDeEjemplo
      ruta="app/(adoptante)/ejemplo-adoptante.tsx"
      enlaces={['/', '/ejemplo-albergue']}
    />
  );
}
