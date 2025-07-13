
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Orders = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Order tracking and history will be available once you connect Supabase.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
