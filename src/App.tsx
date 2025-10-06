import React, { useState, createContext, useContext } from 'react';
import { ShoppingCart, User, Package, Users, LogOut, Home, Search, Filter, Star, ChevronLeft, ChevronRight, Eye, Heart, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Alert, AlertDescription } from './components/ui/alert';
import { Progress } from './components/ui/progress';
import { Separator } from './components/ui/separator';
import { Checkbox } from './components/ui/checkbox';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Context for app state
const AppContext = createContext({});

// Enhanced mock data with ratings and additional fields
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price:299.99,
    originalPrice:349.99,
    category: "Electronics",
    rating: 4.5,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1649030616613-199ed9e32d84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwZ2FsbGVyeXxlbnwxfHx8fDE3NTk3NjI3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1754761986430-5d0d44d09d00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJvbmljcyUyMGxhcHRvcCUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzU5NDc1MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    description: "High-quality wireless headphones with active noise cancellation, premium sound quality, and 30-hour battery life. Perfect for music lovers and professionals.",
    features: ["Active Noise Cancellation", "30-hour Battery", "Premium Audio", "Wireless Charging"],
    stock: 50,
    tags: ["bestseller", "new"]
  },
  {
    id: 2,
    name: "Designer Running Shoes",
    price: 159.99,
    originalPrice: 189.99,
    category: "Fashion",
    rating: 4.2,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1620790458588-c6c4a0d68a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2VycyUyMHByb2R1Y3QlMjBwaG90b3N8ZW58MXx8fHwxNzU5NzYyNzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1705873593876-accd1250b002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzaG9lcyUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc1OTQ5NDU0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    description: "Comfortable and stylish running shoes with advanced cushioning technology, perfect for daily workouts and casual wear.",
    features: ["Advanced Cushioning", "Breathable Material", "Durable Design", "All-Terrain"],
    stock: 30,
    tags: ["popular"]
  },
  {
    id: 3,
    name: "Smart Kitchen Appliance",
    price: 89.99,
    originalPrice: 99.99,
    category: "Home",
    rating: 4.0,
    reviewCount: 45,
    images: [
      "https://images.unsplash.com/photo-1664549124109-9e3f71599096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZnVybml0dXJlJTIwa2l0Y2hlbiUyMGFwcGxpYW5jZXN8ZW58MXx8fHwxNzU5NDk0NTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    description: "Modern kitchen appliance with smart features for efficient cooking and meal preparation.",
    features: ["Smart Controls", "Energy Efficient", "Easy Cleaning", "Compact Design"],
    stock: 25,
    tags: []
  },
  {
    id: 4,
    name: "Fitness Equipment Set",
    price: 199.99,
    originalPrice: 249.99,
    category: "Sports",
    rating: 4.7,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1710814824560-943273e8577e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmaXRuZXNzJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1OTQwNjI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    description: "Complete fitness equipment set for home workouts and training sessions.",
    features: ["Complete Set", "Professional Grade", "Space Saving", "Exercise Guide"],
    stock: 15,
    tags: ["sale"]
  }
];

const mockOrders = [
  {
    id: "ORD001",
    date: "2024-01-15",
    status: "Delivered",
    total: 299.99,
    trackingSteps: [
      { step: "Order Placed", completed: true, date: "2024-01-15" },
      { step: "Confirmed", completed: true, date: "2024-01-15" },
      { step: "Shipped", completed: true, date: "2024-01-16" },
      { step: "Delivered", completed: true, date: "2024-01-18" }
    ],
    items: [{ product: "Premium Wireless Headphones", quantity: 1, price: 299.99, image: mockProducts[0].images[0] }]
  },
  {
    id: "ORD002", 
    date: "2024-01-10",
    status: "Shipped",
    total: 159.99,
    trackingSteps: [
      { step: "Order Placed", completed: true, date: "2024-01-10" },
      { step: "Confirmed", completed: true, date: "2024-01-10" },
      { step: "Shipped", completed: true, date: "2024-01-12" },
      { step: "Delivered", completed: false, date: null }
    ],
    items: [{ product: "Designer Running Shoes", quantity: 1, price: 159.99, image: mockProducts[1].images[0] }]
  }
];

const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", orders: 5, totalSpent: 1299.95, joinDate: "2023-08-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 3, totalSpent: 789.97, joinDate: "2023-09-22" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", orders: 7, totalSpent: 2199.93, joinDate: "2023-07-03" }
];

const mockReviews = [
  { id: 1, user: "Alice Cooper", rating: 5, comment: "Excellent sound quality and comfort. Highly recommended!", date: "2024-01-20" },
  { id: 2, user: "Bob Wilson", rating: 4, comment: "Great headphones, battery life is amazing. Only minor issue with the case.", date: "2024-01-18" },
  { id: 3, user: "Carol Davis", rating: 5, comment: "Perfect for work from home. Noise cancellation is outstanding!", date: "2024-01-15" }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userType, setUserType] = useState(null); // 'user' or 'admin'
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  // Enhanced Navigation Component
  const Navigation = ({ type }) => (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">ShopPro</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {type === 'user' && (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage('home')}
                    className="text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage('orders')}
                    className="text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Orders
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage('cart')} 
                    className="relative text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                    {cart.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-primary text-white text-xs">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </>
              )}
              {type === 'admin' && (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage('admin-dashboard')}
                    className="text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage('add-product')}
                    className="text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage('view-orders')}
                    className="text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Orders
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setCurrentPage('view-customers')}
                    className="text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Customers
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentPage('logout')}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Enhanced Product Card Component
  const ProductCard = ({ product, onViewDetails, onAddToCart, showActions = true }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="aspect-square overflow-hidden bg-gray-50">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.tags.includes('bestseller') && (
            <Badge className="absolute top-2 left-2 bg-orange-500 text-white">Best Seller</Badge>
          )}
          {product.tags.includes('new') && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white">New</Badge>
          )}
          {product.tags.includes('sale') && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">Sale</Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product);
            }}
          >
            <Heart className={`w-4 h-4 ${wishlist.find(item => item.id === product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs font-medium">
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <span className="text-xs text-green-600 font-medium">{product.stock} in stock</span>
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 hover:bg-gray-50 border-gray-300"
            onClick={() => onViewDetails(product)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-sm"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );

  // Enhanced Registration Page
  const RegistrationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 pb-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">ShopPro</h1>
          </div>
          <CardTitle className="text-2xl text-center text-gray-900">Create your account</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Join thousands of satisfied customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullname" className="text-sm font-medium text-gray-700">Full Name</Label>
            <Input 
              id="fullname" 
              placeholder="Enter your full name" 
              className={`transition-colors duration-200 ${formErrors.fullname ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`}
            />
            {formErrors.fullname && <p className="text-xs text-red-600">{formErrors.fullname}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              className={`transition-colors duration-200 ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`}
            />
            {formErrors.email && <p className="text-xs text-red-600">{formErrors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Create a password" 
              className={`transition-colors duration-200 ${formErrors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`}
            />
            {formErrors.password && <p className="text-xs text-red-600">{formErrors.password}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirm Password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              placeholder="Confirm your password" 
              className={`transition-colors duration-200 ${formErrors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`}
            />
            {formErrors.confirmPassword && <p className="text-xs text-red-600">{formErrors.confirmPassword}</p>}
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-medium shadow-lg transition-all duration-200"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setCurrentUser({ name: "John Doe", email: "john@example.com" });
                setUserType('user');
                setCurrentPage('home');
                setIsLoading(false);
              }, 1000);
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <div className="text-center pt-4">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Button variant="link" className="p-0 text-primary font-medium" onClick={() => setCurrentPage('login')}>
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Enhanced Login Page
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 pb-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">ShopPro</h1>
          </div>
          <CardTitle className="text-2xl text-center text-gray-900">Welcome back</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              className="border-gray-300 focus:border-primary transition-colors duration-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              className="border-gray-300 focus:border-primary transition-colors duration-200"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
            </div>
            <Button variant="link" className="p-0 text-sm text-primary hover:underline">
              Forgot password?
            </Button>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-medium shadow-lg transition-all duration-200"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setCurrentUser({ name: "John Doe", email: "john@example.com" });
                setUserType('user');
                setCurrentPage('home');
                setIsLoading(false);
              }, 1000);
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
          
          <div className="text-center pt-4">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Button variant="link" className="p-0 text-primary font-medium" onClick={() => setCurrentPage('register')}>
              Create account
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <Button 
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setCurrentPage('admin-login')}
          >
            Admin Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Enhanced Homepage with Hero Banner
  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="user" />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Discover Amazing Products at Unbeatable Prices
              </h1>
              <p className="text-xl text-blue-100">
                Shop from thousands of products with fast delivery and excellent customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Shop Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1684932516132-493a32d55e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzaG9wcGluZyUyMGVjb21tZXJjZSUyMGhlcm8lMjBiYW5uZXJ8ZW58MXx8fHwxNzU5NzYyNzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Shopping Experience"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200" id="products-section">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 border-gray-300 focus:border-primary transition-colors duration-200"
                />
              </div>
            </div>
            <div className="lg:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="py-3 border-gray-300 focus:border-primary">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={(product) => {
                setSelectedProduct(product);
                setCurrentImageIndex(0);
                setCurrentPage('product-detail');
              }}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced Product Detail Page with Image Gallery and Reviews
  const ProductDetailPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="user" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => setCurrentPage('home')}
          className="mb-6 hover:bg-gray-100 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-white border border-gray-200 relative">
              <ImageWithFallback
                src={selectedProduct.images[currentImageIndex]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedProduct.images.length - 1 : prev - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                    onClick={() => setCurrentImageIndex(prev => prev === selectedProduct.images.length - 1 ? 0 : prev + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
            
            {selectedProduct.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      index === currentImageIndex ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${selectedProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3 text-sm">
                {selectedProduct.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(selectedProduct.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-primary">${selectedProduct.price}</span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                )}
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{selectedProduct.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center space-x-2 mb-8">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-medium">{selectedProduct.stock} items in stock</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-4 font-semibold shadow-lg transition-all duration-200"
                onClick={() => {
                  addToCart(selectedProduct);
                  setCurrentPage('home');
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-4 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => {
                  addToCart(selectedProduct);
                  setCurrentPage('cart');
                }}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-4 py-4 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => addToWishlist(selectedProduct)}
              >
                <Heart className={`w-5 h-5 ${wishlist.find(item => item.id === selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">{selectedProduct.rating}</div>
              <div className="flex justify-center mb-2">
                {renderStars(selectedProduct.rating)}
              </div>
              <div className="text-sm text-gray-600">Based on {selectedProduct.reviewCount} reviews</div>
            </div>
            
            <div className="col-span-2 space-y-3">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 w-8">{rating} ★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${rating === 5 ? 60 : rating === 4 ? 30 : rating === 3 ? 8 : 2}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{rating === 5 ? '60%' : rating === 4 ? '30%' : rating === 3 ? '8%' : '2%'}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            {mockReviews.map(review => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-900">{review.user}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced My Orders Page with Tracking
  const MyOrdersPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="user" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {mockOrders.map(order => (
            <Card key={order.id} className="shadow-sm border border-gray-200 overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-900">Order #{order.id}</CardTitle>
                    <CardDescription className="text-gray-600">
                      Placed on {order.date}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusBadgeColor(order.status)} border font-medium`}>
                    {order.status === 'Delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {order.status === 'Shipped' && <Truck className="w-3 h-3 mr-1" />}
                    {order.status === 'Confirmed' && <Clock className="w-3 h-3 mr-1" />}
                    {order.status === 'Pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.product}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Tracking */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-4">Order Tracking</h4>
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                      <div 
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{ 
                          width: `${(order.trackingSteps.filter(step => step.completed).length / order.trackingSteps.length) * 100}%` 
                        }}
                      />
                    </div>
                    {order.trackingSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                          step.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <div className="w-2 h-2 bg-current rounded-full" />
                          )}
                        </div>
                        <div className="text-center mt-3">
                          <p className={`text-xs font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.step}
                          </p>
                          {step.date && (
                            <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total: ${order.total}</span>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setCurrentOrder(order);
                        setCurrentPage('order-detail');
                      }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
            <Button onClick={() => setCurrentPage('home')} className="bg-primary hover:bg-primary/90">
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced Shopping Cart Page
  const CartPage = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + shipping;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation type="user" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          {cart.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to get started.</p>
                <Button 
                  onClick={() => setCurrentPage('home')}
                  className="bg-primary hover:bg-primary/90 px-8 py-3"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <Card className="shadow-sm border border-gray-200">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <CardTitle className="text-lg text-gray-900">Cart Items ({cart.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {cart.map((item, index) => (
                      <div key={item.id} className={`p-6 ${index !== cart.length - 1 ? 'border-b border-gray-200' : ''}`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <ImageWithFallback
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="font-bold text-primary">${item.price}</span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            
                            <div className="text-right min-w-0">
                              <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                              onClick={() => removeFromCart(item.id)}
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="shadow-sm border border-gray-200 sticky top-24">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <CardTitle className="text-lg text-gray-900">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping === 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        🎉 Free shipping on orders over $100!
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-semibold shadow-lg transition-all duration-200"
                      onClick={() => setCurrentPage('checkout')}
                    >
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Enhanced Checkout Page
  const CheckoutPage = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + shipping;
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation type="user" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Delivery Information */}
              <Card className="shadow-sm border border-gray-200">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-lg text-gray-900">Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name</Label>
                      <Input 
                        id="first-name" 
                        placeholder="John" 
                        className="border-gray-300 focus:border-primary transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name</Label>
                      <Input 
                        id="last-name" 
                        placeholder="Doe" 
                        className="border-gray-300 focus:border-primary transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="border-gray-300 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 123-4567" 
                      className="border-gray-300 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">Street Address</Label>
                    <Input 
                      id="address" 
                      placeholder="123 Main Street" 
                      className="border-gray-300 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                      <Input 
                        id="city" 
                        placeholder="New York" 
                        className="border-gray-300 focus:border-primary transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
                      <Select>
                        <SelectTrigger className="border-gray-300 focus:border-primary">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip" className="text-sm font-medium text-gray-700">ZIP Code</Label>
                      <Input 
                        id="zip" 
                        placeholder="10001" 
                        className="border-gray-300 focus:border-primary transition-colors duration-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card className="shadow-sm border border-gray-200">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-lg text-gray-900">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg">
                      <input type="radio" id="cod" name="payment" defaultChecked className="text-primary" />
                      <div className="flex-1">
                        <Label htmlFor="cod" className="font-medium">Cash on Delivery</Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Pay securely when your order arrives at your doorstep.
                        </p>
                      </div>
                      <div className="text-2xl">💰</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="shadow-sm border border-gray-200 sticky top-24">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-lg text-gray-900">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <ImageWithFallback
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 font-semibold shadow-lg transition-all duration-200"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setShowNotification(true);
                        setCart([]);
                        setCurrentPage('notification');
                        setIsLoading(false);
                      }, 2000);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing Order...' : 'Place Order'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Order Confirmation Page
  const NotificationPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-xl border-0">
        <CardContent className="pt-8 pb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for your order! We've sent a confirmation email to your inbox. 
            You can track your order status in the My Orders section.
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-medium shadow-lg transition-all duration-200"
              onClick={() => setCurrentPage('orders')}
            >
              <Package className="w-4 h-4 mr-2" />
              View My Orders
            </Button>
            <Button 
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setCurrentPage('home')}
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Admin Login Page (Enhanced)
  const AdminLoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 pb-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">ShopPro Admin</h1>
          </div>
          <CardTitle className="text-2xl text-center text-gray-900">Admin Access</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Secure access to admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="text-sm font-medium text-gray-700">Admin Email</Label>
            <Input 
              id="admin-email" 
              type="email" 
              placeholder="admin@shoppro.com" 
              className="border-gray-300 focus:border-primary transition-colors duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password" className="text-sm font-medium text-gray-700">Password</Label>
            <Input 
              id="admin-password" 
              type="password" 
              placeholder="Enter admin password" 
              className="border-gray-300 focus:border-primary transition-colors duration-200"
            />
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-medium shadow-lg transition-all duration-200"
            onClick={() => {
              setCurrentUser({ name: "Admin", email: "admin@shoppro.com" });
              setUserType('admin');
              setCurrentPage('admin-dashboard');
            }}
          >
            Sign In as Admin
          </Button>
          <Button 
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setCurrentPage('login')}
          >
            Back to User Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Enhanced Admin Dashboard
  const AdminDashboardPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="admin" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                  <p className="text-xs text-green-600 mt-1">+2 this week</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
                  <p className="text-xs text-green-600 mt-1">+5 this week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-3xl font-bold text-gray-900">{mockCustomers.length}</p>
                  <p className="text-xs text-green-600 mt-1">+12 this month</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">$2,459.97</p>
                  <p className="text-xs text-green-600 mt-1">+18% from last month</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xl">$</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-lg text-gray-900">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getStatusBadgeColor(order.status)} border font-medium`}>
                        {order.status}
                      </Badge>
                      <p className="text-sm font-medium text-gray-900 mt-1">${order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setCurrentPage('view-orders')}
              >
                View All Orders
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-lg text-gray-900">Top Products</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${product.price}</p>
                      <p className="text-sm text-gray-600">{product.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setCurrentPage('add-product')}
              >
                Add New Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Continue with other enhanced components...
  // (I'll continue with the remaining components in the next parts due to length)

  // Enhanced Add Product Page
  const AddProductPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="admin" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Create a new product listing for your store.</p>
        </div>
        
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg text-gray-900">Product Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="text-sm font-medium text-gray-700">Product Name</Label>
                  <Input 
                    id="product-name" 
                    placeholder="Enter product name" 
                    className="border-gray-300 focus:border-primary transition-colors duration-200"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-price" className="text-sm font-medium text-gray-700">Price</Label>
                    <Input 
                      id="product-price" 
                      type="number" 
                      placeholder="0.00" 
                      className="border-gray-300 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original-price" className="text-sm font-medium text-gray-700">Original Price (Optional)</Label>
                    <Input 
                      id="original-price" 
                      type="number" 
                      placeholder="0.00" 
                      className="border-gray-300 focus:border-primary transition-colors duration-200"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-category" className="text-sm font-medium text-gray-700">Category</Label>
                  <Select>
                    <SelectTrigger className="border-gray-300 focus:border-primary">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="health">Health & Beauty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-stock" className="text-sm font-medium text-gray-700">Stock Quantity</Label>
                  <Input 
                    id="product-stock" 
                    type="number" 
                    placeholder="0" 
                    className="border-gray-300 focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="product-images" className="text-sm font-medium text-gray-700">Product Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors duration-200">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                    <Input 
                      id="product-images" 
                      type="file" 
                      accept="image/*" 
                      multiple
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('product-images')?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-description" className="text-sm font-medium text-gray-700">Description</Label>
                  <Textarea 
                    id="product-description" 
                    placeholder="Enter detailed product description..."
                    className="min-h-[150px] border-gray-300 focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-medium shadow-lg transition-all duration-200"
                onClick={() => {
                  setCurrentPage('admin-dashboard');
                }}
              >
                Add Product
              </Button>
              <Button 
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 px-8 py-3 transition-colors duration-200"
                onClick={() => setCurrentPage('admin-dashboard')}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Enhanced View Orders Page (Admin)
  const ViewOrdersPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="admin" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-2">Monitor and manage all customer orders.</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Order ID</TableHead>
                    <TableHead className="font-semibold text-gray-900">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-900">Date</TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900">Total</TableHead>
                    <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">John Doe</p>
                          <p className="text-sm text-gray-600">john@example.com</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{order.date}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusBadgeColor(order.status)} border font-medium`}>
                          {order.status === 'Delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {order.status === 'Shipped' && <Truck className="w-3 h-3 mr-1" />}
                          {order.status === 'Confirmed' && <Clock className="w-3 h-3 mr-1" />}
                          {order.status === 'Pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">${order.total}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Select defaultValue={order.status.toLowerCase()}>
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Enhanced View Customers Page (Admin)
  const ViewCustomersPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="admin" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600 mt-2">View and manage customer information.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search customers..."
              className="pl-10 w-64 border-gray-300 focus:border-primary transition-colors duration-200"
            />
          </div>
        </div>
        
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-900">Email</TableHead>
                    <TableHead className="font-semibold text-gray-900">Total Orders</TableHead>
                    <TableHead className="font-semibold text-gray-900">Total Spent</TableHead>
                    <TableHead className="font-semibold text-gray-900">Join Date</TableHead>
                    <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCustomers.map(customer => (
                    <TableRow key={customer.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-600">ID: {customer.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{customer.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-medium">
                          {customer.orders} orders
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">${customer.totalSpent}</TableCell>
                      <TableCell className="text-gray-600">{customer.joinDate}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Enhanced Logout Page
  const LogoutPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-xl border-0">
        <CardContent className="pt-8 pb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign Out</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Are you sure you want to sign out of your account?
          </p>
          <div className="space-y-3">
            <Button 
              variant="destructive"
              className="w-full py-3 font-medium"
              onClick={() => {
                setCurrentUser(null);
                setUserType(null);
                setCart([]);
                setWishlist([]);
                setCurrentPage('login');
              }}
            >
              Yes, Sign Out
            </Button>
            <Button 
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setCurrentPage(userType === 'admin' ? 'admin-dashboard' : 'home')}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Enhanced Order Detail Page
  const OrderDetailPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="user" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => setCurrentPage('orders')}
          className="mb-6 hover:bg-gray-50 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600 mt-2">Complete information about your order.</p>
        </div>
        
        {currentOrder && (
          <div className="space-y-6">
            <Card className="shadow-sm border border-gray-200">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Order #{currentOrder.id}</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Placed on {currentOrder.date}
                    </CardDescription>
                  </div>
                  <Badge className={`₹{getStatusBadgeColor(currentOrder.status)} border font-medium text-sm px-3 py-1`}>
                    {currentOrder.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {/* Order Items */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {currentOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.product}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.product}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Tracking */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Progress</h3>
                  <div className="space-y-4">
                    {currentOrder.trackingSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          step.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <div className="w-2 h-2 bg-current rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.step}
                          </p>
                          {step.date && (
                            <p className="text-sm text-gray-500">{step.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total and Delivery Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
                    <div className="text-gray-600 space-y-1">
                      <p className="font-medium text-gray-900">John Doe</p>
                      <p>123 Main Street</p>
                      <p>New York, NY 10001</p>
                      <p>Phone: (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${currentOrder.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>Free</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-gray-900">
                        <span>Total</span>
                        <span>${currentOrder.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  // Main App Render Logic
  const renderPage = () => {
    if (!currentUser) {
      switch (currentPage) {
        case 'register': return <RegistrationPage />;
        case 'admin-login': return <AdminLoginPage />;
        default: return <LoginPage />;
      }
    }

    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'product-detail': return selectedProduct ? <ProductDetailPage /> : <HomePage />;
      case 'orders': return <MyOrdersPage />;
      case 'cart': return <CartPage />;
      case 'checkout': return <CheckoutPage />;
      case 'notification': return <NotificationPage />;
      case 'order-detail': return currentOrder ? <OrderDetailPage /> : <MyOrdersPage />;
      case 'admin-dashboard': return <AdminDashboardPage />;
      case 'add-product': return <AddProductPage />;
      case 'view-orders': return <ViewOrdersPage />;
      case 'view-customers': return <ViewCustomersPage />;
      case 'logout': return <LogoutPage />;
      default: return userType === 'admin' ? <AdminDashboardPage /> : <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      userType, setUserType,
      cart, setCart, addToCart, removeFromCart, updateCartQuantity,
      wishlist, setWishlist, addToWishlist,
      currentUser, setCurrentUser,
      selectedProduct, setSelectedProduct,
      currentOrder, setCurrentOrder,
      showNotification, setShowNotification,
      products, setProducts,
      orders, setOrders,
      currentImageIndex, setCurrentImageIndex,
      rememberMe, setRememberMe,
      isLoading, setIsLoading,
      formErrors, setFormErrors
    }}>
      <div className="min-h-screen bg-gray-50 font-inter">
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
}