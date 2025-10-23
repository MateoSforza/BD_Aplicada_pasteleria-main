import React from 'react';

type Category = {
  id: string;
  label: string;
  image?: string;
  alt?: string;
};

type Props = {
  categories: Category[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
};

const ProductSelector: React.FC<Props> = ({ categories, value, onChange, className }) => {
  if (!categories || categories.length === 0) {
    return <div className="text-center py-8 text-primary-600">No hay categorías.</div>;
  }

  return (
    <div className={className} role="tablist" aria-label="Selector de productos">
      <div className="flex gap-3 justify-center flex-wrap">
        {categories.map((c) => {
          const active = c.id === value;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-pressed={active}
              onClick={() => onChange(c.id)}
              onMouseEnter={() => onChange(c.id)}
              onFocus={() => onChange(c.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange(c.id);
                }
              }}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 ${
                  active
                    ? 'bg-[#F4A261] text-white shadow-sm dark:bg-[#F4A261]'
                    : 'bg-white dark:bg-primary-800 text-[#8B4A2A] dark:text-[#F4A261] border border-transparent hover:border-[#F4A261]/30'
                }`}
            >
              <span>{c.label}</span>
              {active && <span className="sr-only"> seleccionado</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSelector;
