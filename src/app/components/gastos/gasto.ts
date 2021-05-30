import { Tipo } from '../tipos/Tipo';
import { Local } from '../locales/Local';


// enum Tipos {'GASTO_COMUN','OTROS'}
export class Gasto {
  id: number;
  nombre: string;
  descripcion: string;
  valor: number;
  fecha: string;
  tipo: Tipo;
  local: Local;
}
