
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  createdAt: string;
}

const AdminBrands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands');
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      } else {
        toast.error('Failed to fetch brands');
      }
    } catch (error) {
      toast.error('Error fetching brands');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Brands Management</h1>
        <Button className="bg-aln-orange hover:bg-aln-orange-dark">
          <Plus className="h-4 w-4 mr-2" />
          Add New Brand
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Brands</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aln-orange"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Brand</th>
                    <th className="text-left py-3 px-4">Slug</th>
                    <th className="text-left py-3 px-4">Website</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Created</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBrands.map((brand) => (
                    <tr key={brand._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          {brand.logo && (
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          )}
                          <div>
                            <span className="font-medium">{brand.name}</span>
                            {brand.description && (
                              <p className="text-sm text-gray-600 max-w-xs truncate">
                                {brand.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{brand.slug}</td>
                      <td className="py-3 px-4">
                        {brand.website ? (
                          <a 
                            href={brand.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-aln-orange hover:underline flex items-center space-x-1"
                          >
                            <span>Visit</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-gray-400">No website</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={brand.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {brand.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(brand.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBrands;
