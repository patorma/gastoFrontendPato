enum Estados {'PENDIENTE','REALIZADO','DESCARTADO'}

export interface Nota{
    id: number,
    titulo: string,
    descripcion: string,
    estado: Estados
}