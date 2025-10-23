import React, { useEffect, useState, useRef } from 'react';
import { Torta, Medida } from '@/types/tortas';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  torta: Torta | null;
  onClose: () => void;
}

const imageMap: Record<string, string> = {
  'keylimepie': 'keylimepie.jpg',
  'lemonpie': 'LemonPie.jpg',
  'tresleches': 'TresLeches.jpg',
  'tortaoreo': 'TortaOreo.jpg',
  'tortadenuez': 'TortaDeNuez.jpg',
  'brownie': 'Brownie.jpg',
  'chocotorta': 'Chocotorta.jpg',
  'matilda': 'Matilda.jpg',
};

const chooseImage = (name: string) => {
  const k = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return imageMap[k] ? `/assets/tortas/${imageMap[k]}` : `/assets/tortas/${k}.jpg`;
};

const TortaModal: React.FC<Props> = ({ open, torta, onClose }) => {
  const [hoveredMedida, setHoveredMedida] = useState<Medida | null>(null);
  const measuresRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // synchronize image height to measures column so image top aligns with first card and bottom with last
  useEffect(() => {
    function syncHeight() {
      const measuresEl = measuresRef.current;
      const imgEl = imgRef.current;
      if (measuresEl && imgEl) {
        const h = measuresEl.getBoundingClientRect().height;
        imgEl.style.height = h + 'px';
      }
    }
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, [torta]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !torta) return null;

  const imageSrc = chooseImage(torta.Nombre);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40" onMouseDown={onClose}>
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden relative"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles de ${torta.Nombre}`}
      >
        {/* Close button top-right */}
        <button onClick={onClose} className="absolute right-4 top-4 z-30 p-2 rounded bg-white/90 hover:bg-white">
          <X className="w-5 h-5 text-primary-900" />
        </button>

        {/* Centered title */}
        <div className="px-6 pt-4 flex items-center justify-center">
          <h3 className="text-2xl font-extrabold text-primary-900 display-font text-center">{torta.Nombre}</h3>
        </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 items-stretch">
          {/* Left: image */}
          <div className="flex items-start justify-center h-full overflow-hidden rounded-l-lg">
            <img
              ref={imgRef}
              src={imageSrc}
              alt={torta.Nombre}
              className="w-full object-cover shadow-lg bg-white rounded-l-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/tortas/logo.png';
              }}
            />
          </div>

          {/* Right: stacked measure cards */}
          <div className="flex flex-col gap-4 pt-2">

            <div className="space-y-3" ref={measuresRef}>
              {torta.Medidas.map((m) => (
                <div key={m.IdMedida} className="relative">
                  <button
                    onMouseEnter={() => setHoveredMedida(m)}
                    onFocus={() => setHoveredMedida(m)}
                    onMouseLeave={() => setHoveredMedida(null)}
                    onBlur={() => setHoveredMedida(null)}
                    className="group w-full h-20 md:h-24 text-left px-5 py-3 rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md flex items-center justify-between overflow-hidden"
                  >
                    <div>
                      <div className="font-semibold text-lg text-primary-900">{m.Tamano}</div>
                      <div className="mt-1 text-sm text-orange-500">${m.PrecioVenta.toFixed(2)}</div>
                    </div>

                    {/* Costs appear on the right inside the same label */}
                    <div className="w-40 flex-shrink-0 text-right">
                      <div className="text-xs text-primary-600 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus:opacity-100 group-focus:translate-x-0 transition-all duration-150">
                        <div>Ganancia: <strong className="text-green-600">${m.Ganancia.toFixed(2)}</strong></div>
                        <div className="mt-1">Gastos: <strong className="text-red-600">-${(m.CostoTotal - m.Ganancia).toFixed(2)}</strong></div>
                        <div className="mt-1">Costo Total: <strong>${m.CostoTotal.toFixed(2)}</strong></div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TortaModal;
