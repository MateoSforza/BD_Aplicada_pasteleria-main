export interface Ingrediente {
  idIngrediente: number;
  nombre: string;
  unidadCompra: string;
  precioUnitario: number;
  stock?: number;
}

export interface CreateIngredienteDTO{
  Nombre: string;
  UnidadCompra: string;
  PrecioUnitario: number;
}

export interface UpdateIngredienteDTO{
  PrecioUnitario?: number;
  Stock?: number;
  MaxStock?: number;
}



