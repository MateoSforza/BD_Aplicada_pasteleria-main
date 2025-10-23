// src/components/NavItem.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavItemProps {
  name: string;
  href: string;
  icon?: React.ElementType;
  showIcon?: boolean;
  large?: boolean;
  noUnderline?: boolean;
  children?: { name: string; href: string }[];
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ name, href, icon: Icon, showIcon = true, large = false, children, onClick, noUnderline = false }) => {
  const location = useLocation();
  const isActive = location.pathname === href || children?.some(child => location.pathname === child.href);
  const [isExpanded, setIsExpanded] = useState(false);

  // Elemento con submenú
  if (children && children.length > 0) {
    return (
      <div className="relative w-full">
        <div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="w-full"
        >
          <Link
            to={href}
            onClick={onClick}
            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg transition-colors duration-200 ${
              large ? 'text-[36px] tracking-wide' : 'text-sm uppercase tracking-wider'
            } ${isActive ? 'font-extrabold text-primary-900' : 'text-primary-700 hover:text-primary-900'}`}
            style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
          >
            <div className="flex items-center gap-2">
              {showIcon && Icon && <Icon className="w-4 h-4" />}
              {noUnderline ? (
                <span className={`${isActive ? 'text-primary-900 font-extrabold' : ''}`}>{name}</span>
              ) : (
                <span className={`nav-underline`}>{name}</span>
              )}
            </div>

            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </Link>

          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mt-2 flex flex-col items-center gap-1">
              {children.map((child) => {
                const isChildActive = location.pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={onClick}
                    className={`px-4 py-2 text-sm rounded-lg font-black transition-colors duration-200 uppercase tracking-wide ${
                      isChildActive ? 'font-extrabold text-primary-900' : 'text-primary-600 hover:text-primary-900'
                    }`}
                    style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
                  >
                    {child.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Elemento sin submenú
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        large ? 'text-[36px] tracking-wide' : 'text-sm uppercase tracking-wider'
      } ${isActive ? 'font-extrabold text-primary-900' : 'text-primary-700 hover:text-primary-900'}`}
      style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
    >
      {showIcon && Icon && <Icon className="w-5 h-5" />}
      {noUnderline ? (
        <span className={`mx-auto ${isActive ? 'text-primary-900 font-extrabold' : ''}`}>{name}</span>
      ) : (
        <span className={`mx-auto nav-underline`}>{name}</span>
      )}
    </Link>
  );
};

export default NavItem;