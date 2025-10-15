import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../hooks/useAuth"

const Login: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login({ username, password })
    if (success) {
      setIsExiting(true)
      setTimeout(() => {
        navigate("/dashboard")
      }, 600)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-white to-primary-100">
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            key="login-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="bg-primary-50 rounded-2xl shadow-xl p-8 w-full max-w-md"
          >
            {/* Logo + título */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 mb-4 rounded-full overflow-hidden shadow-lg border-2 border-primary-500 flex items-center justify-center bg-white">
                <img
                  src="/assets/tortas/logo.png"
                  alt="Logo CamilasBakery"
                  className="object-contain w-full h-full"
                />
              </div>
              <h1 className="text-3xl font-bold text-primary-400 text-center">
                Camilas'<span className="text-primary-600">Bakery</span>
              </h1>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="usuario"
                  className="block text-sm font-medium text-primary-700 mb-1"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-primary-200 text-primary-0 w-full px-4 py-2 rounded-lg border border-primary-300 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                  placeholder="Ingresa tu usuario"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-primary-700 mb-1"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-primary-200 text-primary-0 w-full px-4 py-2 rounded-lg border border-primary-300 focus:ring-2 focus:ring-primary-400 focus:outline-none"
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg border border-red-200 text-sm">
                  {error}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-500 text-q-100 font-semibold py-2 px-4 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Login
