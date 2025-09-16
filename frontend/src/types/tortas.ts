export interface Torta {
  idTorta: number;
  nombre: string;
  medidas: Medida[];
  precioPromedio: number;
  cantidadMedidas: number;
}

export interface Medida {
  idMedida: number;
  idTorta: number;
  tamano: string;
  ingredientes: TortaIngrediente[];
  costosExtra: MedidaCostoExtra[];
  costoIngredientes: number;
  costoExtras: number;
  costoTotal: number;
  precioVenta: number;
  ganancia: number;
}

export interface TortaIngrediente {
  // Define los campos según el DTO real del backend
  // Ejemplo:
  // idIngrediente: number;
  // nombre: string;
  // costoTotal: number;
}

export interface MedidaCostoExtra {
  // Define los campos según el DTO real del backend
  // Ejemplo:
  // descripcion: string;
  // costoTotal: number;
}
