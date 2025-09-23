import React from "react"
import { motion } from "framer-motion"
import { Cake, ChefHat, DollarSign, BarChart3 } from "lucide-react"

const metrics = [
  {
    label: "Tortas vendidas",
    value: "120",
    icon: Cake,
    color: "text-primary-500",
  },
  {
    label: "Ingredientes en stock",
    value: "35",
    icon: ChefHat,
    color: "text-secondary-900",
  },
  {
    label: "Costos extra",
    value: "$2,500",
    icon: DollarSign,
    color: "text-amber-600",
  },
  {
    label: "Ganancia mensual",
    value: "$8,200",
    icon: BarChart3,
    color: "text-primary-500",
  },
]

const Dashboard: React.FC = () => (
  <div className="max-w-7xl mx-auto py-10 px-4">
    {/* Header */}
    <div className="mb-10 flex items-center gap-4">
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="w-14 h-14 rounded-full border-2 border-primary-500"
      />
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Bienvenido a la{" "}
        <span className="text-primary-600">Pastelería Camila</span>
      </h1>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {metrics.map((m, i) => {
        const Icon = m.icon
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="rounded-2xl bg-white border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center space-y-2">
              <Icon className={`w-10 h-10 ${m.color}`} />
              <div className="text-2xl font-bold text-primary-600">
                {m.value}
              </div>
              <div className="text-center text-gray-700 font-medium">
                {m.label}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>

    {/* Footer */}
    <div className="mt-12 text-center">
      <p className="text-lg text-secondary-900">
        Selecciona una sección en la barra lateral para comenzar.
      </p>
    </div>
  </div>
)

export default Dashboard
