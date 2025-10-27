// Tipos para el manejo de Stock

export interface StockIngrediente {
  idStock: number;
  idIngrediente: number;
  nombreIngrediente?: string;
  cantidadDisponible: number;
  unidadMedida: string;
  stockMinimo: number;
  stockMaximo: number;
  fechaUltimaActualizacion: string;
}

export interface CreateStockDTO {
  IdIngrediente: number;
  CantidadDisponible: number;
  UnidadMedida: string;
  StockMinimo: number;
  StockMaximo: number;
}

export interface UpdateStockDTO {
  CantidadDisponible?: number;
  StockMinimo?: number;
  StockMaximo?: number;
}

export interface AjusteStockDTO {
  Cantidad: number;
  Motivo: string;
  TipoAjuste: 'ENTRADA' | 'SALIDA';
}

export interface StockAlert {
  idIngrediente: number;
  nombreIngrediente: string;
  cantidadActual: number;
  stockMinimo: number;
  porcentajeDisponible: number;
  estado: 'CRITICO' | 'BAJO' | 'NORMAL';
}
