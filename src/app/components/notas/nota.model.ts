enum Estados {'PENDIENTE','REALIZADO','DESCARTADO'}

export class Nota {
    id: number;
    titulo: string;
    descripcion: string;
    estado: Estados;
    fechaCreacion: string;
}