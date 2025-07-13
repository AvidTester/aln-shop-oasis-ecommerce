
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-aln-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img
              src="/lovable-uploads/4f81c6e4-fd99-4c90-a884-1971609e7f62.png"
              alt="ALN SHOP"
              className="h-12 w-auto bg-white p-2 rounded"
            />
            <p className="text-gray-300 text-sm">
              Your premium destination for fashion accessories. Quality products, exceptional service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-aln-orange cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-aln-orange cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-aln-orange cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-aln-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-aln-orange transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=hats" className="text-gray-300 hover:text-aln-orange transition-colors">
                  Hats
                </Link>
              </li>
              <li>
                <Link to="/products?category=tshirts" className="text-gray-300 hover:text-aln-orange transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/products?category=sunglasses" className="text-gray-300 hover:text-aln-orange transition-colors">
                  Sunglasses
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-aln-orange transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-aln-orange transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-aln-orange transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-aln-orange transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-aln-orange transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>📍 123 Fashion Street, Style City, SC 12345</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ info@alnshop.com</p>
              <p>🕒 Mon-Fri: 9AM-8PM</p>
              <p>🕒 Sat-Sun: 10AM-6PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ALN SHOP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
