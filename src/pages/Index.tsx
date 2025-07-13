
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Truck, Shield, Headphones, ArrowRight } from 'lucide-react';

const Index = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Classic Black Hat',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400',
      rating: 4.8,
      badge: 'Best Seller',
    },
    {
      id: '2',
      name: 'Vintage Sunglasses',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      rating: 4.9,
      badge: 'New',
    },
    {
      id: '3',
      name: 'Premium Cotton T-Shirt',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      rating: 4.7,
      badge: 'Sale',
    },
    {
      id: '4',
      name: 'Designer Baseball Cap',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
      rating: 4.6,
      badge: 'Limited',
    },
  ];

  const categories = [
    {
      name: 'Hats & Caps',
      image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300',
      href: '/products?category=hats',
    },
    {
      name: 'T-Shirts',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
      href: '/products?category=tshirts',
    },
    {
      name: 'Sunglasses',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
      href: '/products?category=sunglasses',
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
      href: '/products?category=accessories',
    },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Cash on delivery available',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer service',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
              Welcome to <span className="text-aln-orange">ALN SHOP</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600">
              Your Premium Fashion Destination
            </p>
            <p className="text-lg mb-10 text-gray-500 max-w-2xl mx-auto">
              Discover our curated collection of hats, t-shirts, sunglasses, and accessories. 
              Quality meets style in every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-aln-orange hover:bg-aln-orange-dark text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products?filter=new">
                <Button variant="outline" size="lg" className="border-2 border-aln-orange text-aln-orange hover:bg-aln-orange hover:text-white px-8 py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-aln-orange to-aln-orange-dark rounded-full mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={category.href}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-center group-hover:text-aln-orange transition-colors duration-300">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Featured Products</h2>
            <p className="text-lg text-gray-600">Handpicked favorites from our collection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-aln-orange text-white shadow-md">
                      {product.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-4 bg-white">
                    <h3 className="font-semibold mb-2 group-hover:text-aln-orange transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                    </div>
                    <p className="text-lg font-bold text-aln-orange">${product.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="bg-aln-orange hover:bg-aln-orange-dark shadow-lg hover:shadow-xl transition-all duration-300">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-orange-400 via-aln-orange to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in Style</h2>
          <p className="text-lg mb-8 text-orange-100">
            Subscribe to get updates on new arrivals, exclusive offers, and style tips
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-aln-orange hover:bg-gray-100 px-6 shadow-md hover:shadow-lg transition-all duration-300">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
