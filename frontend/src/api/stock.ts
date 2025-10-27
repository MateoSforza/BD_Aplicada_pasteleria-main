import api from './http';
import { 
  StockIngrediente, 
  CreateStockDTO, 
  UpdateStockDTO, 
  AjusteStockDTO,
  StockAlert 
} from '../types/stock';

// Obtener todo el stock
export const getAllStock = async (): Promise<StockIngrediente[]> => {
  const response = await api.get('/api/Stock');
  const stockArray = Array.isArray(response.data) ? response.data : [];
  return stockArray.map((stock: any) => ({
    idStock: stock.IdStock || stock.idStock,
    idIngrediente: stock.IdIngrediente || stock.idIngrediente,
    nombreIngrediente: stock.NombreIngrediente || stock.nombreIngrediente,
    cantidadDisponible: stock.CantidadDisponible || stock.cantidadDisponible,
    unidadMedida: stock.UnidadMedida || stock.unidadMedida,
    stockMinimo: stock.StockMinimo || stock.stockMinimo,
    stockMaximo: stock.StockMaximo || stock.stockMaximo,
    fechaUltimaActualizacion: stock.FechaUltimaActualizacion || stock.fechaUltimaActualizacion
  }));
};

// Obtener stock por ID de ingrediente
export const getStockByIngrediente = async (idIngrediente: number): Promise<StockIngrediente> => {
  const response = await api.get(`/api/Stock/ingrediente/${idIngrediente}`);
  const stock = response.data;
  return {
    idStock: stock.IdStock || stock.idStock,
    idIngrediente: stock.IdIngrediente || stock.idIngrediente,
    nombreIngrediente: stock.NombreIngrediente || stock.nombreIngrediente,
    cantidadDisponible: stock.CantidadDisponible || stock.cantidadDisponible,
    unidadMedida: stock.UnidadMedida || stock.unidadMedida,
    stockMinimo: stock.StockMinimo || stock.stockMinimo,
    stockMaximo: stock.StockMaximo || stock.stockMaximo,
    fechaUltimaActualizacion: stock.FechaUltimaActualizacion || stock.fechaUltimaActualizacion
  };
};

// Crear nuevo stock
export const createStock = async (stock: CreateStockDTO): Promise<StockIngrediente> => {
  const response = await api.post('/api/Stock', stock);
  return response.data as StockIngrediente;
};

// Actualizar stock existente
export const updateStock = async (idIngrediente: number, stock: UpdateStockDTO): Promise<void> => {
  await api.put(`/api/Stock/${idIngrediente}`, stock);
};

// Ajustar stock (entrada/salida)
export const ajustarStock = async (idIngrediente: number, ajuste: AjusteStockDTO): Promise<void> => {
  await api.post(`/api/Stock/${idIngrediente}/ajustar`, ajuste);
};

// Obtener alertas de stock bajo
export const getStockAlertas = async (): Promise<StockAlert[]> => {
  const response = await api.get('/api/Stock/alertas');
  const alertas = Array.isArray(response.data) ? response.data : [];
  return alertas.map((alerta: any) => ({
    idIngrediente: alerta.IdIngrediente || alerta.idIngrediente,
    nombreIngrediente: alerta.NombreIngrediente || alerta.nombreIngrediente,
    cantidadActual: alerta.CantidadActual || alerta.cantidadActual,
    stockMinimo: alerta.StockMinimo || alerta.stockMinimo,
    porcentajeDisponible: alerta.PorcentajeDisponible || alerta.porcentajeDisponible,
    estado: alerta.Estado || alerta.estado
  }));
};

// Eliminar stock
export const deleteStock = async (idIngrediente: number): Promise<void> => {
  await api.delete(`/api/Stock/${idIngrediente}`);
};
