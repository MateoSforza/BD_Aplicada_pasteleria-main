import React, { useMemo, useState } from 'react'
import { useCostoExtra } from '../../hooks/useCostoExtra'

type Row = {
  id: string
  nombre: string
  precioUnitario: number
  nota?: string
  scorePct: number
}

const DEFAULT_HIGH = 80
const DEFAULT_MED = 50

const ReportesCostosExtras: React.FC = () => {
  const { data: extras, isLoading, isError } = useCostoExtra()
  const [q, setQ] = useState('')
  const [highThreshold, setHighThreshold] = useState<number>(DEFAULT_HIGH)
  const [medThreshold, setMedThreshold] = useState<number>(DEFAULT_MED)

  const rows: Row[] = useMemo(() => {
    if (!Array.isArray(extras)) return []
    const arr = extras.map(e => ({
      id: String(e.idCostoExtra),
      nombre: e.nombre,
      precioUnitario: Number(e.precioUnitario ?? 0),
      nota: e.nota ?? '',
      scorePct: 0,
    }))

    const prices = arr.map(a => a.precioUnitario)
    const min = Math.min(...prices, 0)
    const max = Math.max(...prices, 0)
    const span = max - min || 1

    return arr.map(a => ({ ...a, scorePct: Number((((a.precioUnitario - min) / span) * 100).toFixed(2)) }))
  }, [extras])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return rows
  return rows.filter(r => r.nombre.toLowerCase().includes(term) || (r.nota || '').toLowerCase().includes(term))
  }, [rows, q])

  const getColor = (pct: number) => {
    if (pct >= highThreshold) return 'bg-red-500 text-white'
    if (pct >= medThreshold) return 'bg-amber-400 text-black'
    return 'bg-emerald-500 text-white'
  }

  const exportCsv = () => {
    const cols = ['CostoExtra','PrecioUnitario','Nota','ScorePct']
    const lines = [cols.join(',')]
    filtered.forEach(r => {
      const line = [r.nombre, r.precioUnitario, r.nota, r.scorePct].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')
      lines.push(line)
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reportes_costosExtras_${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  if (isLoading) return <div className="text-primary-900">Cargando costos extra...</div>
  if (isError) return <div className="text-red-600">Error al cargar costos extra.</div>

  return (
    <div className="text-primary-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar costo extra o nota..."
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
          <div className="w-3 h-3 rounded-full bg-red-500" /> <span>Rojo ≥</span>
          <input type="number" className="w-16 px-2 py-1 border rounded" value={highThreshold} onChange={(e) => setHighThreshold(Number(e.target.value) || 0)} />%
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400" /> <span>Amarillo ≥</span>
          <input type="number" className="w-16 px-2 py-1 border rounded" value={medThreshold} onChange={(e) => setMedThreshold(Number(e.target.value) || 0)} />%
        </div>
        <div className="text-sm text-primary-600">(Verde &lt; Amarillo)</div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left text-sm text-primary-700">
              <th className="px-4 py-3">Costo Extra</th>
              <th className="px-4 py-3">Precio Unitario</th>
              <th className="px-4 py-3">Nota</th>
              <th className="px-4 py-3">Score %</th>
              <th className="px-4 py-3">Semáforo</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center" colSpan={5}>No hay resultados</td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3 align-top">{r.nombre}</td>
                <td className="px-4 py-3 align-top">${r.precioUnitario.toFixed(2)}</td>
                <td className="px-4 py-3 align-top">{r.nota}</td>
                <td className="px-4 py-3 align-top">{r.scorePct}%</td>
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

export default ReportesCostosExtras
