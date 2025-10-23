import React, { useState } from 'react';
import Tortas from './Tortas';
import Ingredientes from './Ingredientes';
import CostoExtra from './CostoExtra';
import ProductSelector from '../components/general/ProductSelector';

const Productos: React.FC = () => {
  const [active, setActive] = useState<'tortas' | 'ingredientes' | 'costos'>('tortas');

  const categories = [
    { id: 'tortas', label: 'Tortas' },
    { id: 'ingredientes', label: 'Ingredientes' },
    { id: 'costos', label: 'Costos Extra' },
  ];

  const headers: Record<string, string> = {
    tortas: 'Catálogo de Tortas',
    ingredientes: 'Control de Ingredientes',
    costos: 'Costos Extra',
  };

  const currentTitle = headers[active];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex flex-col items-center gap-6">
        <div className="w-full mx-auto max-w-7xl px-6">
          <ProductSelector categories={categories} value={active} onChange={(id) => setActive(id as any)} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#D97706]">{currentTitle}</h1>
        </div>

        <div className="w-full mt-6">
          {/* Renderizar las páginas completas según la selección */}
          <div>
            {active === 'tortas' && <Tortas showHeader={false} />}
            {active === 'ingredientes' && <Ingredientes showHeader={false} />}
            {active === 'costos' && <CostoExtra showHeader={false} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
