export interface CostoExtra {
    idCostoExtra: number;
    nombre: string;
    precioUnitario: number;
    nota?: string;
}

export interface CreateCostoExtraDTO{
    Nombre: string;
    PrecioUnitario: number;
    Nota?: string; 
}
