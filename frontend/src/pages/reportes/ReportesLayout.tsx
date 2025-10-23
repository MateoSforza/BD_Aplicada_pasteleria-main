import React from 'react'
import { Outlet, NavLink, useLocation, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CakeSlice, Package, DollarSign, ShoppingCart } from 'lucide-react'

const tab = 'px-3 py-2 rounded-xl text-sm font-medium border'
const active = 'bg-primary-600 text-white border-primary-600'
const inactive = 'bg-primary-50 text-primary-900 border-primary-200 hover:bg-primary-100'

const ReportesLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // Mostrar pestañas sólo en la raíz /reportes. En subrutas (ej. /reportes/tortas) mostramos sólo el contenido y un botón "volver".
  const isRoot = location.pathname === '/reportes' || location.pathname === '/reportes/'

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="display-font text-4xl md:text-5xl font-bold text-primary-900 leading-tight">Reportes</h1>
          <p className="mt-2 text-sm text-primary-600">Analiza márgenes, costos y ventas para tomar mejores decisiones.</p>
        </div>

        {!isRoot && (
          <button
            onClick={() => navigate('/reportes')}
            className="flex items-center gap-2 text-primary-700 hover:text-primary-900 px-2 py-1 rounded"
            aria-label="Volver a Reportes"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Volver</span>
          </button>
        )}
      </div>

      {isRoot && (
  <div className="w-full max-w-[640px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 mb-8 justify-items-center">
          <Link
            to="/reportes/tortas"
            className="card w-56 h-60 p-6 flex flex-col justify-center items-center gap-3 hover:shadow-lg transform hover:-translate-y-1 transition animate-fade-up focus-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            aria-label="Reportes de Tortas - márgenes, top tortas y alertas"
          >
            <div className="bg-primary-50 p-3 rounded-full text-primary-600" aria-hidden="true"><CakeSlice className="w-6 h-6" /></div>
            <h3 className="display-font text-xl font-semibold">Tortas</h3>
            <p className="text-sm text-primary-600 text-center">Margen por medida, top tortas y alertas.</p>
          </Link>

          <Link
            to="/reportes/ingredientes"
            className="card w-56 h-60 p-6 flex flex-col justify-center items-center gap-3 hover:shadow-lg transform hover:-translate-y-1 transition animate-fade-up focus-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            aria-label="Reportes de Ingredientes - gasto, dependencias y alertas de precios"
          >
            <div className="bg-primary-50 p-3 rounded-full text-primary-600" aria-hidden="true"><Package className="w-6 h-6" /></div>
            <h3 className="display-font text-xl font-semibold">Ingredientes</h3>
            <p className="text-sm text-primary-600 text-center">Gasto, dependencia y alertas de precios.</p>
          </Link>

          <Link
            to="/reportes/costosExtras"
            className="card w-56 h-60 p-6 flex flex-col justify-center items-center gap-3 hover:shadow-lg transform hover:-translate-y-1 transition animate-fade-up focus-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            aria-label="Reportes de Costos Extras - impacto de extras sobre ingresos"
          >
            <div className="bg-primary-50 p-3 rounded-full text-primary-600" aria-hidden="true"><DollarSign className="w-6 h-6" /></div>
            <h3 className="display-font text-xl font-semibold">Costos Extras</h3>
            <p className="text-sm text-primary-600 text-center">Impacto de extras sobre ingresos.</p>
          </Link>

          <Link
            to="/reportes/pedidos"
            className="card w-56 h-60 p-6 flex flex-col justify-center items-center gap-3 hover:shadow-lg transform hover:-translate-y-1 transition animate-fade-up focus-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
            aria-label="Reportes de Pedidos - tendencias, estados y métodos de pago"
          >
            <div className="bg-primary-50 p-3 rounded-full text-primary-600" aria-hidden="true"><ShoppingCart className="w-6 h-6" /></div>
            <h3 className="display-font text-xl font-semibold">Pedidos</h3>
            <p className="text-sm text-primary-600 text-center">Serie diaria, estados y métodos de pago.</p>
          </Link>
        </div>
      )}

      <Outlet />
    </div>
  )
}
export default ReportesLayout
