import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminBrands from "./pages/admin/AdminBrands";
import AdminShipping from "./pages/admin/AdminShipping";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<><Navbar /><Index /><Footer /></>} />
                <Route path="/products" element={<><Navbar /><Products /><Footer /></>} />
                <Route path="/products/:id" element={<><Navbar /><ProductDetail /><Footer /></>} />
                <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
                <Route path="/checkout" element={<><Navbar /><Checkout /><Footer /></>} />
                <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
                <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
                <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
                <Route path="/orders" element={<><Navbar /><Orders /><Footer /></>} />
                
                {/* Admin login route */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Admin routes with layout */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="brands" element={<AdminBrands />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="shipping" element={<AdminShipping />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
              </Routes>
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
