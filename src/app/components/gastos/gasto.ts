import { Tipo } from '../tipos/tipo';
export class Gasto {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  valor: number;
  fecha: string;
  tipo: Tipo;
}
