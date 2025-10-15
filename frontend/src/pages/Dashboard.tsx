import React from "react"
import { Cake, ChefHat, Handshake, ShoppingCart } from "lucide-react"
import { useDashboardMetrics } from "../hooks/useDashboardMetrics"
import StatsCard from "@/components/general/StatsCard"

const Dashboard: React.FC = () => {
  const { tortasCount, pedidosPendientes, loading, error } = useDashboardMetrics()

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <img
          src="/assets/tortas/logo.png"
          alt="Logo"
          className="w-40 h-40 rounded-full border-2 border-primary-500"
        />
        <h1 className="text-3xl font-bold text-primary-400 tracking-tight">
          Bienvenido a{" "}
          <span className="text-primary-600">CamilasBakery</span>
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard
          label="Productos en el catalogo"
          value={loading ? "..." : tortasCount}
          icon={Cake}
          iconColor="primary"
          delay={0}
          href="/tortas"
        />

        <StatsCard
          label="Ingredientes en stock"
          value={loading ? "..." : "31"}
          icon={ChefHat}
          iconColor="primary"
          delay={0.1}
          href="/ingredientes"
        />

        <StatsCard
          label="Pedidos esta semana"
          value={loading ? "..." : pedidosPendientes}
          icon={ShoppingCart}
          iconColor="primary"
          delay={0.2}
          href="/pedidos"
        />

        <StatsCard
          label="Ganancia mensual"
          value={loading ? "..." : "$450,000"}
          icon={Handshake}
          iconColor="primary"
          delay={0.3}
        />
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-lg text-primary-900">
          Selecciona una sección en la barra lateral para comenzar.
        </p>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
