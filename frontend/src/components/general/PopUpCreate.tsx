import React, { useState } from "react";

interface PopupFormProps {
  isOpen: boolean;
  tipo: "ingrediente" | "costoextra";
  unidadesCompra?: string[]; // lista de unidades (por ejemplo ["kg", "g", "unidad", "litro"])
  onClose: () => void;
  onSubmit: (
    formData: { Nombre: string; PrecioUnitario: number; Nota?: string; UnidadCompra?: string }
  ) => void;
}

const PopupForm: React.FC<PopupFormProps> = ({
  isOpen,
  tipo,
  unidadesCompra = [],
  onClose,
  onSubmit,
}) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [nota, setNota] = useState("");
  const [unidadCompra, setUnidadCompra] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre || nombre.trim() === "") {
      alert("El nombre es obligatorio");
      return;
    }
    
    if (precio === "" || Number(precio) < 0) {
      alert("El precio debe ser un número mayor a 0");
      return;
    }
    
    if (tipo === "ingrediente" && (!unidadCompra || unidadCompra === "")) {
      alert("La unidad de compra es obligatoria");
      return;
    }

    const data =
      tipo === "ingrediente"
        ? { 
            Nombre: nombre.trim(), 
            PrecioUnitario: Number(precio), 
            UnidadCompra: unidadCompra 
          }
        : { 
            Nombre: nombre.trim(), 
            PrecioUnitario: Number(precio), 
            Nota: nota.trim() 
          };

    onSubmit(data);

    setNombre("");
    setPrecio("");
    setNota("");
    setUnidadCompra("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-primary-100 w-full max-w-md rounded-xl shadow-lg border border-primary-300 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primary-800">
            {tipo === "ingrediente" ? "Agregar Ingrediente" : "Agregar Costo Extra"}
          </h2>
          <button
            onClick={onClose}
            className="text-primary-600 hover:text-primary-900 text-xl leading-none px-2"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-primary-700">Nombre *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              maxLength={50}
              className="text-primary-0 bg-primary-50 w-full mt-1 px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Ej. Harina 0000"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-primary-700">Precio *</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value ? Number(e.target.value) : "")}
              required
              className="text-primary-0 bg-primary-50 w-full mt-1 px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Ej. 1500"
            />
          </div>

          {/* Campo dinámico */}
          {tipo === "ingrediente" ? (
            <div>
              <label className="block text-sm font-medium text-primary-700">
                Unidad de compra *
              </label>
              <select
                value={unidadCompra}
                onChange={(e) => setUnidadCompra(e.target.value)}
                required
                className="text-primary-0 bg-primary-50 w-full mt-1 px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">Seleccionar unidad</option>
                {unidadesCompra.map((unidad) => (
                  <option key={unidad} value={unidad}>
                    {unidad}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-primary-700">Nota (Opcional)</label>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                maxLength={200}
                className="text-primary-0 bg-primary-100 w-full mt-1 px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                rows={3}
                placeholder="Detalles opcionales..."
              />
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-primary-200 text-primary-700 rounded-md hover:bg-primary-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-400 text-white rounded-md hover:bg-primary-500 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
