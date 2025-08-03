
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const { state } = useAuth();

  console.log('AdminLayout: Auth state:', state);
  console.log('AdminLayout: Is authenticated:', state.isAuthenticated);
  console.log('AdminLayout: User role:', state.user?.role);
  console.log('AdminLayout: Is loading:', state.isLoading);

  if (state.isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!state.isAuthenticated) {
    console.log('AdminLayout: Not authenticated, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  if (state.user?.role !== 'admin') {
    console.log('AdminLayout: Not admin user, redirecting to home');
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
