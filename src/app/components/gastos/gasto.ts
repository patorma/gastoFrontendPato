

enum Tipos {'GASTO_COMUN','OTROS'}
export class Gasto {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  valor: number;
  nombreLocal: string;
  ciudad: string;
  fecha: string;
  tipo: Tipos;
}
