import { useState, useEffect } from "react"
import { getCantidadTortas } from "../api/tortas"
import { getPedidosPendientesHoy, getGananciaMensual } from "../api/pedidos"

export const useDashboardMetrics = () => {
  const [tortasCount, setTortasCount] = useState<string>("0")
  const [pedidosPendientes, setPedidosPendientes] = useState<string>("0")
  const [gananciaMensual, setGananciaMensual] = useState<string>("0")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)

      // Ejecutar todas las peticiones en paralelo
      const [tortasResult, pedidosResult, gananciaResult] = await Promise.all([
        getCantidadTortas(),
        getPedidosPendientesHoy(),
        getGananciaMensual()
      ])

      setTortasCount(tortasResult.toString())
      setPedidosPendientes(pedidosResult.toString())
      setGananciaMensual(gananciaResult.toString())
    } catch (err) {
      console.error("Error fetching dashboard metrics:", err)
      setError("Error al cargar datos")
      setTortasCount("0")
      setPedidosPendientes("0")
      setGananciaMensual("0")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  return {
    tortasCount,
    pedidosPendientes,
    gananciaMensual,
    loading,
    error,
    refetch: fetchMetrics
  }
}
