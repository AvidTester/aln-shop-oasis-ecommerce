
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Order</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Checkout functionality will be implemented once you connect Supabase for backend support.
            </p>
            <Button className="bg-aln-orange hover:bg-aln-orange-dark">
              Place Order (Cash on Delivery)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
