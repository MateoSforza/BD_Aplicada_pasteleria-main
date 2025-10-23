import React, { useMemo, useState } from 'react'
import { useTortas } from '../../hooks/useTortas'

type Row = {
  id: string
  torta: string
  medida: string
  precioVenta: number
  costoTotal: number
  margenPct: number
}

// Umbrales por defecto (puedes ajustarlos en UI)
const DEFAULT_GREEN = 30 // >= 30% => verde
const DEFAULT_YELLOW = 10 // 10-30 => amarillo; <10 => rojo

const ReportesTortas: React.FC = () => {
  const { data: tortas, isLoading, isError } = useTortas()
  const [q, setQ] = useState('')
  const [greenThreshold, setGreenThreshold] = useState<number>(DEFAULT_GREEN)
  const [yellowThreshold, setYellowThreshold] = useState<number>(DEFAULT_YELLOW)

  const rows: Row[] = useMemo(() => {
    if (!Array.isArray(tortas)) return []
    const out: Row[] = []
    tortas.forEach((t) => {
      (t.Medidas || []).forEach((m) => {
        const precio = Number(m.PrecioVenta ?? 0)
        const costo = Number(m.CostoTotal ?? 0)
        const margen = precio > 0 ? ((precio - costo) / precio) * 100 : -100
        out.push({
          id: `${t.IdTorta}-${m.IdMedida}`,
          torta: t.Nombre,
          medida: m.Tamano,
          precioVenta: precio,
          costoTotal: costo,
          margenPct: Number(margen.toFixed(2)),
        })
      })
    })
    return out
  }, [tortas])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return rows
    return rows.filter(r => r.torta.toLowerCase().includes(term) || r.medida.toLowerCase().includes(term))
  }, [rows, q])

  const getColor = (m: number) => {
    if (m >= greenThreshold) return 'bg-emerald-500 text-white'
    if (m >= yellowThreshold) return 'bg-amber-400 text-black'
    return 'bg-red-500 text-white'
  }

  const exportCsv = () => {
    const cols = ['Torta','Medida','PrecioVenta','CostoTotal','MargenPct']
    const lines = [cols.join(',')]
    filtered.forEach(r => {
      const line = [r.torta, r.medida, r.precioVenta, r.costoTotal, r.margenPct].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')
      lines.push(line)
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reportes_tortas_${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  if (isLoading) return <div className="text-primary-900">Cargando tortas...</div>
  if (isError) return <div className="text-red-600">Error al cargar los datos de tortas.</div>

  return (
    <div className="text-primary-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar torta o medida..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <button onClick={() => { setQ('') }} className="px-3 py-2 bg-primary-200 rounded">Limpiar</button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={exportCsv} className="px-3 py-2 bg-primary-600 text-white rounded">Exportar CSV</button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" /> <span>Verde ≥</span>
          <input type="number" className="w-16 px-2 py-1 border rounded" value={greenThreshold} onChange={(e) => setGreenThreshold(Number(e.target.value) || 0)} />%
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400" /> <span>Amarillo ≥</span>
          <input type="number" className="w-16 px-2 py-1 border rounded" value={yellowThreshold} onChange={(e) => setYellowThreshold(Number(e.target.value) || 0)} />%
        </div>
        <div className="text-sm text-primary-600">(Rojo &lt; Amarillo)</div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left text-sm text-primary-700">
              <th className="px-4 py-3">Torta</th>
              <th className="px-4 py-3">Medida</th>
              <th className="px-4 py-3">Precio Venta</th>
              <th className="px-4 py-3">Costo Total</th>
              <th className="px-4 py-3">Margen %</th>
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
                <td className="px-4 py-3 align-top">{r.torta}</td>
                <td className="px-4 py-3 align-top">{r.medida}</td>
                <td className="px-4 py-3 align-top">${r.precioVenta.toFixed(2)}</td>
                <td className="px-4 py-3 align-top">${r.costoTotal.toFixed(2)}</td>
                <td className="px-4 py-3 align-top">{isFinite(r.margenPct) ? `${r.margenPct}%` : 'N/A'}</td>
                <td className="px-4 py-3 align-top">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded ${getColor(r.margenPct)}`}>
                    <span className="w-2 h-2 rounded-full" /> {r.margenPct >= 0 ? `${r.margenPct}%` : 'N/A'}
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

export default ReportesTortas
