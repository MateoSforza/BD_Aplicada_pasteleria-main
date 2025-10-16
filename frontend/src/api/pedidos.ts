// src/api/pedidos.ts
import api from './http';
import { ActualizarPedidoDTO, CrearPedidoDTO, Pedido, PedidoResumen, TotalVentasFecha } from '../types/pedidos';

// Helper function para mapear datos del backend
const mapPedidoFromBackend = (data: any): Pedido => ({
  idPedido: data.IdPedido,
  idCliente: data.IdCliente,
  nombreCliente: data.NombreCliente,
  telefonoCliente: data.TelefonoCliente,
  fecha: data.Fecha,
  total: data.Total,
  ganancia: data.Ganancia,
  ingredientes: data.Ingredientes,
  costoExtras: data.CostoExtras,
  nota: data.Nota || '',
  precioExtra: data.PrecioExtra,
  metodoDePago: data.MetodoDePago,
  estado: data.Estado,
  detallePedidos: (data.DetallePedidos || []).map((detalle: any) => ({
    idDetallePedido: detalle.IdDetallePedido,
    idPedido: detalle.IdPedido,
    idMedida: detalle.IdMedida,
    cantidad: detalle.Cantidad,
    nombreTorta: detalle.NombreTorta,
    tamanoMedida: detalle.TamanoMedida,
    totalProducto: detalle.TotalProducto,
    precioMomentoMedida: detalle.PrecioMomentoMedida,
    extras: (detalle.Extras || []).map((extra: any) => ({
      idExtras: extra.IdExtras,
      idDetallePedido: extra.IdDetallePedido,
      idCostoExtra: extra.IdCostoExtra,
      nombreCostoExtra: extra.NombreCostoExtra,
      nota: extra.Nota || '',
      precioMomento: extra.PrecioMomento,
      cantidad: extra.Cantidad,
      precioUnitario: extra.PrecioUnitario,
    })),
    ingredientesExtras: (detalle.IngredientesExtras || []).map((ing: any) => ({
      idIngredienteExtra: ing.IdIngredienteExtra,
      idDetallePedido: ing.IdDetallePedido,
      idIngrediente: ing.IdIngrediente,
      nombreIngrediente: ing.NombreIngrediente,
      nota: ing.Nota || '',
      precioMomento: ing.PrecioMomento,
      cantidad: ing.Cantidad,
      unidadCompra: ing.UnidadCompra,
    })),
  })),
});

// Obtener todos los pedidos (resumen)
export const getPedidos = async (): Promise<PedidoResumen[]> => {
  const response = await api.get('/api/Pedidos');
  
  const pedidosArray = Array.isArray(response.data) ? response.data : [];
  return pedidosArray.map((pedido: any) => ({
    idPedido: pedido.IdPedido,
    nombreCliente: pedido.NombreCliente,
    fecha: pedido.Fecha,
    total: pedido.Total,
    metodoDePago: pedido.MetodoDePago,
    estado: pedido.Estado,
  }));
};

// Obtener pedido por ID
export const getPedidoById = async (id: number): Promise<Pedido> => {
  const response = await api.get(`/api/Pedidos/${id}`);
  return mapPedidoFromBackend(response.data);
};

// Buscar pedidos por nombre de cliente
export const getPedidosByNombre = async (nombre: string): Promise<Pedido[]> => {
  const response = await api.get(`/api/Pedidos/nombre/${nombre}`);
  
  // El API devuelve un array de pedidos
  const pedidosArray = Array.isArray(response.data) ? response.data : [];
  return pedidosArray.map(mapPedidoFromBackend);
};

// Buscar pedidos por fecha hasta
export const getPedidosByFecha = async (fecha: number): Promise<Pedido[]> => {
  const response = await api.get(`/api/Pedidos/FechaHasta/${fecha}`);
  const pedidosArray = Array.isArray(response.data) ? response.data : [];
  return pedidosArray.map(mapPedidoFromBackend);
};

// Buscar pedidos por fecha hasta pendientes
export const getPedidosPendientesHoy = async (): Promise<number> => {
    try {
      const hoy = new Date();
      const diaSemana = hoy.getDay(); // 0=Domingo, 1=Lunes, 2=Martes, ..., 6=Sábado
      
      // Días que faltan hasta el domingo (incluyendo hoy)
      let diasHastaDomingo;
      
      if (diaSemana === 0) {
        // Si hoy es domingo, solo cuenta hoy (1 día)
        diasHastaDomingo = 1;
      } else {
        
        diasHastaDomingo = 8 - diaSemana;
      }
            
      const response = await api.get(`/api/Pedidos/FechaHasta/${diasHastaDomingo}`);
      
      // Validar si la respuesta es un array
      if (!Array.isArray(response.data)) {
        return 0;
      }
      
      const pedidos = response.data.map(mapPedidoFromBackend);
      
      // Contar solo los que tienen estado "pendiente" o "pagado"
      /*const count = pedidos.filter(pedido => 
        pedido.estado.toLowerCase() === 'pendiente' || 
        pedido.estado.toLowerCase() === 'pagado'
      ).length;*/

      const count = pedidos.length
      
      return count;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return 0;
      }
      return 0;
    }
};

// Buscar pedidos por fecha
export const getPedidosByFechaRango = async (fechaInicio: string, fechaFin: string): Promise<Pedido[]> => {
  const response = await api.get(`/api/Pedidos/FechaRango/${fechaInicio}/${fechaFin}`);
  const pedidosArray = Array.isArray(response.data) ? response.data : [];
  return pedidosArray.map(mapPedidoFromBackend);
};

// Buscar pedidos por estado
export const getPedidosByEstado = async (estado: string): Promise<Pedido[]> => {
  const response = await api.get(`/api/Pedidos/estado/${estado}`);
  const pedidosArray = Array.isArray(response.data) ? response.data : [];
  return pedidosArray.map(mapPedidoFromBackend);
};

export const getPedidoByMetodoDePago = async (metodoDePago: string): Promise<Pedido[]> => {
  const response = await api.get(`/api/Pedidos/MetodoDePago/${metodoDePago}`);
  const pedidosArray = Array.isArray(response.data) ? response.data : [];
  return pedidosArray.map(mapPedidoFromBackend);
};

export const calcularTotalPedido = async (id: number): Promise<number> => {
  const response = await api.get(`/api/Pedidos/${id}/calcularTotal`);
  return response.data as number;
};

export const getTotalVentasFecha = async (fechaInicio: string, fechaFin: string): Promise<TotalVentasFecha> => {
  const response = await api.get(`/api/Pedidos/TotalVentasFecha/${fechaInicio}/${fechaFin}`);
  return response.data as TotalVentasFecha;
};

// Crear pedido
export const crearPedido = async (pedido: CrearPedidoDTO): Promise<Pedido> => {
  const response = await api.post('/api/Pedidos', pedido);
  return mapPedidoFromBackend(response.data);
};

// Actualizar Pedido
export const actualizarPedido = async (id: number, pedido: ActualizarPedidoDTO): Promise<void> => {
  await api.patch(`/api/Pedidos/${id}`, pedido);
};

// Actualizar estado
export const actualizarEstadoPedido = async (id: number, estado: string): Promise<void> => {
  await api.patch(`/api/Pedidos/${id}/estado`, { estado });
};

// Eliminar pedido
export const eliminarPedido = async (id: number): Promise<void> => {
  await api.delete(`/api/Pedidos/${id}`);
};

// Ganancias del mes 
export const getGananciaMensual = async (): Promise<number> => {
  try {
    const hoy = new Date();

    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

    const response = await api.get(`/api/Pedidos/FechaRango/${inicioMes}/${finMes}`);

    const pedidosArray = Array.isArray(response.data) ? response.data : [];

    const totalGanancia = pedidosArray
      // .filter((pedido: any) => pedido.Estado?.toLowerCase() === "completado")
      .reduce((acc: number, pedido: any) => acc + (pedido.Ganancia ?? 0), 0);

    return totalGanancia; 
  } catch (error) {
    console.error("Error al calcular la ganancia mensual:", error);
    return 0;
  }
};
