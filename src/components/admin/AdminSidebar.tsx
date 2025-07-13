
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Tags, 
  Building2, 
  Truck, 
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Tags, label: 'Categories', path: '/admin/categories' },
    { icon: Building2, label: 'Brands', path: '/admin/brands' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Truck, label: 'Shipping', path: '/admin/shipping' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <img
          src="/lovable-uploads/4f81c6e4-fd99-4c90-a884-1971609e7f62.png"
          alt="ALN SHOP"
          className="h-12 w-auto mb-8"
        />
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-aln-orange text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8">
          <Button
            onClick={logout}
            variant="outline"
            className="w-full flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
