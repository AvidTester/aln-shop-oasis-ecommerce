import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Search, Grid, List } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { productService, Product } from '@/services/productService';
import { categoryService, Category } from '@/services/categoryService';
import { brandService, Brand } from '@/services/brandService';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFiltersData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, selectedBrand, sortBy, currentPage]);

  const fetchFiltersData = async () => {
    try {
      const [categoriesData, brandsData] = await Promise.all([
        categoryService.getCategories(),
        brandService.getBrands()
      ]);

      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error('Error fetching filters:', error);
      toast.error('Failed to load filters');
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productService.getProducts({
        page: currentPage,
        limit: 12,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedBrand && { brand: selectedBrand }),
        ...(sortBy && { sort: sortBy }),
      });

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
    toast.success(`${product.name} added to cart!`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateSearchParams('search', e.target.value);
                  }}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={(value) => {
                setSelectedCategory(value);
                updateSearchParams('category', value);
              }}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBrand} onValueChange={(value) => {
                setSelectedBrand(value);
                updateSearchParams('brand', value);
              }}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand._id} value={brand.slug}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={(value) => {
                setSortBy(value);
                updateSearchParams('sort', value);
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="bg-gray-200 h-48 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {products.map((product) => (
                <Card key={product._id} className="group cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Link to={`/products/${product._id}`}>
                          <img
                            src={product.images[0] || '/placeholder.svg'}
                            alt={product.name}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </Link>
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-aln-orange text-white">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <Link to={`/products/${product._id}`}>
                            <h3 className="font-semibold text-gray-900 group-hover:text-aln-orange transition-colors duration-300">
                              {product.name}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center space-x-1">
                            {renderStars(product.rating)}
                            <span className="text-sm text-gray-600">
                              ({product.numReviews})
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-aln-orange">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-aln-orange hover:bg-aln-orange-dark text-white"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <div className="flex p-4 space-x-4">
                      <Link to={`/products/${product._id}`} className="flex-shrink-0">
                        <img
                          src={product.images[0] || '/placeholder.svg'}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </Link>
                      <div className="flex-1 space-y-2">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-aln-orange transition-colors duration-300">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center space-x-1">
                          {renderStars(product.rating)}
                          <span className="text-sm text-gray-600">
                            ({product.numReviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-aln-orange">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-aln-orange hover:bg-aln-orange-dark text-white"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
