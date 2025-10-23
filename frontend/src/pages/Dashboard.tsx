// Dashboard.tsx
import React from "react"
import { ShinyText } from "@/components/reactbits/shiny-text"
import { Cake, ChefHat, Handshake, ShoppingCart } from "lucide-react"
import { useDashboardMetrics } from "../hooks/useDashboardMetrics"
import StatsCard from "@/components/general/StatsCard"

const Dashboard: React.FC = () => {
  // ahora sacamos data, isLoading y error (React Query)
  const { data, isLoading, error } = useDashboardMetrics()

  const tortasCount = data?.tortasCount ?? "0"
  const pedidosPendientes = data?.pedidosPendientes ?? "0"
  const gananciaMensual = data?.gananciaMensual ?? "$0"

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <img
          src="/assets/tortas/logo.png"
          alt="Logo"
          className="w-40 h-40 rounded-full border-2 border-primary-500"
        />
        <div>
          <ShinyText text={"Bienvenido a CamilasBakery"} className="text-3xl font-bold text-primary-400 tracking-tight" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard
          label="Productos en el catalogo"
          value={isLoading ? "..." : tortasCount}
          icon={Cake}
          iconColor="primary"
          delay={0}
          href="/tortas"
        />

        <StatsCard
          label="Ingredientes en stock"
          value={isLoading ? "..." : "31"}
          icon={ChefHat}
          iconColor="primary"
          delay={0.1}
          href="/ingredientes"
        />

        <StatsCard
          label="Pedidos esta semana"
          value={isLoading ? "..." : pedidosPendientes}
          icon={ShoppingCart}
          iconColor="primary"
          delay={0.2}
          href="/pedidos"
        />

        <StatsCard
          label="Ganancia mensual"
          value={isLoading ? "..." : gananciaMensual}
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
            {error.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
