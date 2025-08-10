import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';
import { toast } from 'sonner';

import { adminService } from '@/services/adminService'; // adjust path

const ITEMS_PER_PAGE = 10;

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
      case 'completed': return 'bg-green-100 text-green-800';
      case 'Processing':
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped':
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'Pending':
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      // Assuming your backend supports pagination query params ?page & ?limit
      // If not, you can fetch all and paginate client side (less ideal for many orders)
      const allOrders = await adminService.getOrders(); // fetch all orders

      // For demonstration, paginate client-side:
      setTotalOrders(allOrders.length);
      const start = (pageNumber - 1) * ITEMS_PER_PAGE;
      const paginatedOrders = allOrders.slice(start, start + ITEMS_PER_PAGE);

      setOrders(paginatedOrders);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading orders...</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Items</th>
                        <th className="text-left py-3 px-4">Total</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">#{order._id.slice(-8)}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{order.user?.name || 'N/A'}</p>
                              <p className="text-sm text-gray-600">{order.user?.email || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{order.orderItems?.length || 0}</td>
                          <td className="py-3 px-4 font-medium">${order.totalPrice?.toFixed(2) || 0}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination controls */}
                <div className="mt-4 flex justify-center space-x-4">
                  <Button 
                        disabled={page === 1 || totalOrders === 0} 
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center">
                    Page {totalOrders === 0 ? 0 : page} of {totalOrders === 0 ? 0 : totalPages}
                  </span>
                  <Button 
                    disabled={page === 1 || totalOrders === 0} 
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;
