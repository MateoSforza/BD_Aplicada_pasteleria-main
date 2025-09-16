export interface TortaIngrediente {
  idTortaIngrediente: number;
  medidaId: number;
  ingredienteId: number;
  nombreIngrediente: string;
  cantidadUsada: number;
  unidadUsada: string;
  precioUnitario: number;
  costoTotal: number;
}

export interface MedidaCostoExtra {
  idMedidaCostoExtra: number;
  idMedida: number;
  idCostoExtra: number;
  nombreCostoExtra: string;
  cantidad: number;
  precioUnitario: number;
  costoTotal: number;
}
