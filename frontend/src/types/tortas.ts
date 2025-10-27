export interface Ingrediente {
  IdMedidaIngrediente: number;
  MedidaId: number;
  IngredienteId: number;
  NombreIngrediente: string;
  CantidadUsada: number;
  UnidadUsada: string;
  PrecioUnitario: number;
  CostoTotal: number;
}

export interface CostoExtra {
  IdMedidaCostoExtra: number;
  IdMedida: number;
  IdCostoExtra: number;
  NombreCostoExtra: string;
  CantidadUsada: number;
  PrecioUnitario: number;
  CostoTotal: number;
}

export interface Medida {
  IdMedida: number;
  IdTorta: number;
  Tamano: string;
  Estado: string;
  CostoIngredientes: number;
  CostoExtras: number;
  CostoTotal: number;
  PrecioVenta: number;
  Ganancia: number;
}

export interface MedidaDetalle extends Medida {
  Ingredientes: Ingrediente[];
  CostosExtra: CostoExtra[];
}

export interface Torta {
  IdTorta: number;
  Nombre: string;
  Estado: string;
  Medidas: Medida[];
  PrecioPromedio: number;
  CantidadMedidas: number;
}