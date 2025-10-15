import { useState, useEffect } from "react"
import { getCantidadTortas } from "../api/tortas"
import { getPedidosPendientesHoy } from "../api/pedidos"

export const useDashboardMetrics = () => {
  const [tortasCount, setTortasCount] = useState<string>("0")
  const [pedidosPendientes, setPedidosPendientes] = useState<string>("0")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Ejecutar ambas peticiones en paralelo
      const [tortasResult, pedidosResult] = await Promise.all([
        getCantidadTortas(),
        getPedidosPendientesHoy()
      ])
      
      setTortasCount(tortasResult.toString())
      setPedidosPendientes(pedidosResult.toString())
    } catch (err) {
      console.error("Error fetching dashboard metrics:", err)
      setError("Error al cargar datos")
      setTortasCount("0")
      setPedidosPendientes("0")
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
    loading,
    error,
    refetch: fetchMetrics
  }
}
