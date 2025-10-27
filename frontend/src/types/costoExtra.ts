export interface CostoExtra {
    idCostoExtra: number;
    nombre: string;
    precioUnitario: number;
    nota?: string;
    stock?: number | null;
}

export interface CreateCostoExtraDTO{
    Nombre: string;
    PrecioUnitario: number;
    Nota?: string; 
}

export interface UpdateCostoExtraDTO{
    PrecioUnitario?: number;
    Stock?: number | null;
    MaxStock?: number | null;
}
