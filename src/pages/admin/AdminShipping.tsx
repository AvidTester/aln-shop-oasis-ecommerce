
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Truck } from 'lucide-react';

const AdminShipping = () => {
  // Mock data - replace with API calls
  const [shippingMethods] = useState([
    {
      id: '1',
      name: 'Standard Shipping',
      description: '5-7 business days',
      cost: 5.99,
      estimatedDays: '5-7',
      isActive: true,
    },
    {
      id: '2',
      name: 'Express Shipping',
      description: '2-3 business days',
      cost: 12.99,
      estimatedDays: '2-3',
      isActive: true,
    },
    {
      id: '3',
      name: 'Overnight Shipping',
      description: 'Next business day',
      cost: 24.99,
      estimatedDays: '1',
      isActive: true,
    },
    {
      id: '4',
      name: 'Free Shipping',
      description: 'Orders over $50',
      cost: 0,
      estimatedDays: '7-10',
      isActive: true,
    },
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shipping Management</h1>
        <Button className="bg-aln-orange hover:bg-aln-orange-dark">
          <Plus className="h-4 w-4 mr-2" />
          Add Shipping Method
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Shipping Methods</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shippingMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium">{method.name}</h3>
                      <Badge className={method.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {method.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm font-medium">
                        ${method.cost === 0 ? 'Free' : method.cost.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {method.estimatedDays} days
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Free Shipping Threshold
              </label>
              <Input
                type="number"
                placeholder="50.00"
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum order amount for free shipping
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Shipping Zone
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processing Time
              </label>
              <Input
                type="text"
                placeholder="1-2 business days"
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Time to process orders before shipping
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Policy Days
              </label>
              <Input
                type="number"
                placeholder="30"
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Number of days customers can return items
              </p>
            </div>

            <Button className="w-full bg-aln-orange hover:bg-aln-orange-dark">
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminShipping;
