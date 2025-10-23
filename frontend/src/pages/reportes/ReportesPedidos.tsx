import React, { useMemo, useState } from 'react'
import { usePedidos } from '../../hooks/usePedidos'

type Row = {
  id: string
  cliente: string
  fecha: string
  total: number
  estado: string
  scorePct: number
}

const DEFAULT_HIGH = 70
const DEFAULT_MED = 30

const ReportesPedidos: React.FC = () => {
  const { data: pedidos, isLoading, isError } = usePedidos()
  const [q, setQ] = useState('')
  const [highThreshold, setHighThreshold] = useState<number>(DEFAULT_HIGH)
  const [medThreshold, setMedThreshold] = useState<number>(DEFAULT_MED)

  const rows: Row[] = useMemo(() => {
    if (!Array.isArray(pedidos)) return []
    const arr = pedidos.map(p => ({
      id: String(p.idPedido),
      cliente: p.nombreCliente,
      fecha: p.fecha,
      total: Number(p.total ?? 0),
      estado: p.estado ?? p.estado ?? '',
      scorePct: 0,
    }))

    const totals = arr.map(a => a.total)
    const min = Math.min(...totals, 0)
    const max = Math.max(...totals, 0)
    const span = max - min || 1
    return arr.map(a => ({ ...a, scorePct: Number((((a.total - min) / span) * 100).toFixed(2)) }))
  }, [pedidos])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return rows
    return rows.filter(r => r.cliente.toLowerCase().includes(term) || r.estado.toLowerCase().includes(term))
  }, [rows, q])

  const getColor = (pct: number) => {
    if (pct >= highThreshold) return 'bg-emerald-500 text-white'
    if (pct >= medThreshold) return 'bg-amber-400 text-black'
    return 'bg-red-500 text-white'
  }

  const exportCsv = () => {
    const cols = ['Pedido','Cliente','Fecha','Total','Estado','ScorePct']
    const lines = [cols.join(',')]
    filtered.forEach(r => {
      const line = [r.id, r.cliente, r.fecha, r.total, r.estado, r.scorePct].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')
      lines.push(line)
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reportes_pedidos_${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  if (isLoading) return <div className="text-primary-900">Cargando pedidos...</div>
  if (isError) return <div className="text-red-600">Error al cargar pedidos.</div>

  return (
    <div className="text-primary-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar cliente o estado..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <button onClick={() => setQ('')} className="px-3 py-2 bg-primary-200 rounded">Limpiar</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCsv} className="px-3 py-2 bg-primary-600 text-white rounded">Exportar CSV</button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" /> <span>Verde ≥</span>
          <input type="number" className="w-16 px-2 py-1 border rounded" value={highThreshold} onChange={(e) => setHighThreshold(Number(e.target.value) || 0)} />%
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400" /> <span>Amarillo ≥</span>
          <input type="number" className="w-16 px-2 py-1 border rounded" value={medThreshold} onChange={(e) => setMedThreshold(Number(e.target.value) || 0)} />%
        </div>
        <div className="text-sm text-primary-600">(Rojo &lt; Amarillo)</div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left text-sm text-primary-700">
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Semáforo</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center" colSpan={6}>No hay resultados</td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3 align-top">{r.id}</td>
                <td className="px-4 py-3 align-top">{r.cliente}</td>
                <td className="px-4 py-3 align-top">{r.fecha}</td>
                <td className="px-4 py-3 align-top">${r.total.toFixed(2)}</td>
                <td className="px-4 py-3 align-top">{r.estado}</td>
                <td className="px-4 py-3 align-top">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded ${getColor(r.scorePct)}`}>
                    <span className="w-2 h-2 rounded-full" /> {r.scorePct}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportesPedidos
