// src/api/pedidos.ts
import api from './http'
import { ActualizarPedidoDTO, CrearPedidoDTO, Pedido, PedidoResumen, TotalVentasFecha } from '../types/pedidos'

// Mapeo tolerante a PascalCase / camelCase
const mapPedidoFromBackend = (d: any): Pedido => ({
  idPedido:           d.IdPedido           ?? d.idPedido,
  idCliente:          d.IdCliente          ?? d.idCliente,
  nombreCliente:      d.NombreCliente      ?? d.nombreCliente ?? '',
  telefonoCliente:    d.TelefonoCliente    ?? d.telefonoCliente ?? '',
  fecha:              d.Fecha              ?? d.fecha,
  total:              Number(d.Total ?? d.total ?? 0),
  ganancia:           Number(d.Ganancia ?? d.ganancia ?? 0),
  ingredientes:       d.Ingredientes       ?? d.ingredientes ?? '',
  costoExtras:        Number(d.CostoExtras ?? d.costoExtras ?? 0),
  nota:               d.Nota               ?? d.nota ?? '',
  precioExtra:        Number(d.PrecioExtra ?? d.precioExtra ?? 0),
  metodoDePago:       d.MetodoDePago       ?? d.metodoDePago ?? '',
  estado:             d.Estado             ?? d.estado ?? '',
  detallePedidos: (d.DetallePedidos ?? d.detallePedidos ?? []).map((det: any) => ({
    idDetallePedido:       det.IdDetallePedido       ?? det.idDetallePedido,
    idPedido:              det.IdPedido              ?? det.idPedido,
    idMedida:              det.IdMedida              ?? det.idMedida,
    cantidad:              Number(det.Cantidad ?? det.cantidad ?? 0),
    nombreTorta:           det.NombreTorta           ?? det.nombreTorta ?? '',
    tamanoMedida:          det.TamanoMedida          ?? det.tamanoMedida ?? '',
    totalProducto:         Number(det.TotalProducto ?? det.totalProducto ?? 0),
    precioMomentoMedida:   Number(det.PrecioMomentoMedida ?? det.precioMomentoMedida ?? 0),
    extras: (det.Extras ?? det.extras ?? []).map((ex: any) => ({
      idExtras:         ex.IdExtras         ?? ex.idExtras,
      idDetallePedido:  ex.IdDetallePedido  ?? ex.idDetallePedido,
      idCostoExtra:     ex.IdCostoExtra     ?? ex.idCostoExtra,
      nombreCostoExtra: ex.NombreCostoExtra ?? ex.nombreCostoExtra ?? '',
      nota:             ex.Nota             ?? ex.nota ?? '',
      precioMomento:    Number(ex.PrecioMomento ?? ex.precioMomento ?? 0),
      cantidad:         Number(ex.Cantidad ?? ex.cantidad ?? 0),
      precioUnitario:   Number(ex.PrecioUnitario ?? ex.precioUnitario ?? 0),
    })),
    ingredientesExtras: (det.IngredientesExtras ?? det.ingredientesExtras ?? []).map((ing: any) => ({
      idIngredienteExtra: ing.IdIngredienteExtra ?? ing.idIngredienteExtra,
      idDetallePedido:    ing.IdDetallePedido    ?? ing.idDetallePedido,
      idIngrediente:      ing.IdIngrediente      ?? ing.idIngrediente,
      nombreIngrediente:  ing.NombreIngrediente  ?? ing.nombreIngrediente ?? '',
      nota:               ing.Nota               ?? ing.nota ?? '',
      precioMomento:      Number(ing.PrecioMomento ?? ing.precioMomento ?? 0),
      cantidad:           Number(ing.Cantidad ?? ing.cantidad ?? 0),
      unidadCompra:       ing.UnidadCompra ?? ing.unidadCompra ?? '',
    })),
  })),
})

// Listado (resumen)
export const getPedidos = async (): Promise<PedidoResumen[]> => {
  const { data } = await api.get('/Pedidos')
  const arr = Array.isArray(data) ? data : []
  return arr.map((p: any) => ({
    idPedido:      p.IdPedido ?? p.idPedido,
    nombreCliente: p.NombreCliente ?? p.nombreCliente ?? '',
    fecha:         p.Fecha ?? p.fecha,
    total:         Number(p.Total ?? p.total ?? 0),
    metodoDePago:  p.MetodoDePago ?? p.metodoDePago ?? '',
    estado:        p.Estado ?? p.estado ?? '',
  }))
}

// Por id
export const getPedidoById = async (id: number): Promise<Pedido> => {
  const { data } = await api.get(`/Pedidos/${id}`)
  return mapPedidoFromBackend(data)
}

// Por nombre
export const getPedidosByNombre = async (nombre: string): Promise<Pedido[]> => {
  const { data } = await api.get(`/Pedidos/nombre/${encodeURIComponent(nombre)}`)
  const arr = Array.isArray(data) ? data : []
  return arr.map(mapPedidoFromBackend)
}

// Fecha hasta (n días)
export const getPedidosByFecha = async (fecha: number): Promise<Pedido[]> => {
  const { data } = await api.get(`/Pedidos/FechaHasta/${fecha}`)
  const arr = Array.isArray(data) ? data : []
  return arr.map(mapPedidoFromBackend)
}

// Pendientes hasta el domingo (contando hoy)
export const getPedidosPendientesHoy = async (): Promise<number> => {
  try {
    const hoy = new Date()
    const diaSemana = hoy.getDay() // 0=Dom, 1=Lun, ..., 6=Sáb
    const diasHastaDomingo = diaSemana === 0 ? 1 : 8 - diaSemana

    const { data } = await api.get(`/Pedidos/FechaHasta/${diasHastaDomingo}`)
    if (!Array.isArray(data)) return 0

    const pedidos = data.map(mapPedidoFromBackend)
    const count = pedidos.filter(p => {
      const e = (p.estado ?? '').toLowerCase()
      return e !== 'entregado' && e !== 'cancelado'
    }).length

    return count
  } catch {
    return 0
  }
}

// Rango de fechas
export const getPedidosByFechaRango = async (fechaInicio: string, fechaFin: string): Promise<Pedido[]> => {
  const { data } = await api.get(`/Pedidos/FechaRango/${fechaInicio}/${fechaFin}`)
  const arr = Array.isArray(data) ? data : []
  return arr.map(mapPedidoFromBackend)
}

// Por estado
export const getPedidosByEstado = async (estado: string): Promise<Pedido[]> => {
  const { data } = await api.get(`/Pedidos/estado/${encodeURIComponent(estado)}`)
  const arr = Array.isArray(data) ? data : []
  return arr.map(mapPedidoFromBackend)
}

export const getPedidoByMetodoDePago = async (metodoDePago: string): Promise<Pedido[]> => {
  const { data } = await api.get(`/Pedidos/MetodoDePago/${encodeURIComponent(metodoDePago)}`)
  const arr = Array.isArray(data) ? data : []
  return arr.map(mapPedidoFromBackend)
}

export const calcularTotalPedido = async (id: number): Promise<number> => {
  const { data } = await api.get(`/Pedidos/${id}/calcularTotal`)
  return Number(data ?? 0)
}

export const getTotalVentasFecha = async (fi: string, ff: string): Promise<TotalVentasFecha> => {
  const { data } = await api.get(`/Pedidos/TotalVentasFecha/${fi}/${ff}`)
  return data as TotalVentasFecha
}

// Crear / actualizar / estado / eliminar
export const crearPedido = async (pedido: CrearPedidoDTO): Promise<Pedido> => {
  const { data } = await api.post('/Pedidos', pedido)
  return mapPedidoFromBackend(data)
}

export const actualizarPedido = async (id: number, pedido: ActualizarPedidoDTO): Promise<void> => {
  await api.patch(`/Pedidos/${id}`, pedido)
}

export const actualizarEstadoPedido = async (id: number, estado: string): Promise<void> => {
  await api.patch(`/Pedidos/${id}/estado`, JSON.stringify(estado), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const actualizarPedidoEncabezado = async (id: number, data: any): Promise<void> => {
  await api.patch(`/Pedidos/${id}`, data, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const eliminarPedido = async (id: number): Promise<void> => {
  await api.delete(`/Pedidos/${id}`)
}

// Ganancia mensual (según backend devuelto)
export const getGananciaMensual = async (): Promise<number> => {
  try {
    const hoy = new Date()
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1).toISOString().split('T')[0]
    const finMes    = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).toISOString().split('T')[0]

    const { data } = await api.get(`/Pedidos/FechaRango/${inicioMes}/${finMes}`)
    const arr = Array.isArray(data) ? data : []

    const totalGanancia = arr
      .filter((p: any) => (p.Estado ?? p.estado ?? '').toLowerCase() === 'completado')
      .reduce((acc: number, p: any) => acc + Number(p.Ganancia ?? p.ganancia ?? 0), 0)

    return totalGanancia
  } catch (e) {
    console.error('Error al calcular la ganancia mensual:', e)
    return 0
  }
}
