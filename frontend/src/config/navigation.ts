import { LayoutDashboard, CakeSlice, Package, DollarSign, BarChart3, ShoppingCart } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: { name: string; href: string }[];
}

export const navigationItems: NavigationItem[] = [
  { name: 'Inicio', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Productos', href: '/productos', icon: Package },
  { name: 'Pedidos', href: '/pedidos', icon: ShoppingCart },
  { 
    name: 'Reportes',
    href: '/reportes',
    icon: BarChart3,
    children: [
      { name: 'Tortas', href: '/reportes/tortas' },
      { name: 'Ingredientes', href: '/reportes/ingredientes' },
      { name: 'Costos Extras', href: '/reportes/costosExtras' },
      { name: 'Pedidos', href: '/reportes/pedidos' }
    ]
  }
];