
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, ArrowRight, TrendingUp, Users, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge?: string;
  rating: number;
  numReviews: number;
  category: {
    name: string;
    slug: string;
  };
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch('/api/products/featured/list'),
        fetch('/api/categories')
      ]);

      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setFeaturedProducts(productsData);
      }

      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.slice(0, 6)); // Show only first 6 categories
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-aln-orange text-white px-4 py-2 text-sm font-medium">
                  Welcome to ALN SHOP
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your
                  <span className="text-aln-orange block">Perfect Style</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  From trendy hats to stylish sunglasses, find everything you need to express your unique personality and elevate your everyday look.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-aln-orange hover:bg-aln-orange-dark text-white px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-aln-orange px-8 py-4 text-lg font-medium rounded-full transition-all duration-300">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-aln-orange/10 rounded-full mb-3 mx-auto">
                    <TrendingUp className="h-6 w-6 text-aln-orange" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-aln-orange/10 rounded-full mb-3 mx-auto">
                    <Package className="h-6 w-6 text-aln-orange" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-aln-orange/10 rounded-full mb-3 mx-auto">
                    <Users className="h-6 w-6 text-aln-orange" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Brands</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
                  alt="Fashion Collection"
                  className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-lg">
                <ShoppingCart className="h-8 w-8 text-aln-orange" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-aln-orange rounded-full p-4 shadow-lg">
                <Star className="h-8 w-8 text-white fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collection of fashion essentials and accessories
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-2xl"></div>
                  <div className="mt-4 h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link key={category._id} to={`/products?category=${category.slug}`}>
                  <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden rounded-2xl">
                    <div className="relative overflow-hidden">
                      <img
                        src={category.image || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop`}
                        alt={category.name}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-aln-orange transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-300">
                        Discover our {category.name.toLowerCase()} collection
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites that our customers love most
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Card key={product._id} className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Link to={`/products/${product._id}`}>
                      <img
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-aln-orange text-white px-3 py-1 text-xs font-medium">
                        {product.badge}
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-xs font-medium">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Link to={`/products/${product._id}`}>
                        <h3 className="font-bold text-gray-900 group-hover:text-aln-orange transition-colors duration-300 text-lg">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating)}
                        <span className="text-sm text-gray-600 ml-2">
                          ({product.numReviews} reviews)
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-aln-orange">
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
                        className="w-full bg-aln-orange hover:bg-aln-orange-dark text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-2 border-aln-orange text-aln-orange hover:bg-aln-orange hover:text-white px-8 py-4 text-lg font-medium rounded-full transition-all duration-300">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-aln-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Stay Updated with ALN SHOP
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive offers, and style tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 border-0 focus:ring-4 focus:ring-white/30 transition-all duration-300"
            />
            <Button className="bg-white text-aln-orange hover:bg-gray-100 px-8 py-4 font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
