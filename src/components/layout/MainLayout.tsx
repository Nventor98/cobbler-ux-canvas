import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
              CobblerConnect
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">
                Marketplace
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                Repair Services
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                How it Works
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products, cobblers..."
                className="w-full bg-muted/50 border border-border rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-2 border-card">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/repairs">Repair Requests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="sm" className="hidden md:flex">
                <Link to="/login">Sign In</Link>
              </Button>
            )}

            <button 
              className="md:hidden p-2 text-muted-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <Link 
              to="/marketplace" 
              className="text-lg font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/services" 
              className="text-lg font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Repair Services
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <DropdownMenuSeparator />
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-lg font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  className="text-lg font-medium py-2 text-destructive text-left"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-lg font-medium py-2 text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">CobblerConnect</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting you with the finest leather artisans for handcrafted goods and premium repairs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/marketplace?cat=shoes" className="hover:text-primary">Shoes</Link></li>
              <li><Link to="/marketplace?cat=bags" className="hover:text-primary">Bags</Link></li>
              <li><Link to="/marketplace?cat=belts" className="hover:text-primary">Belts</Link></li>
              <li><Link to="/marketplace?cat=sandals" className="hover:text-primary">Sandals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services?type=sole" className="hover:text-primary">Sole Replacement</Link></li>
              <li><Link to="/services?type=stitching" className="hover:text-primary">Stitching Repair</Link></li>
              <li><Link to="/services?type=polish" className="hover:text-primary">Polishing & Care</Link></li>
              <li><Link to="/services?type=custom" className="hover:text-primary">Custom Requests</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CobblerConnect. All rights reserved.
          </p>
          <div className="flex gap-4 grayscale opacity-50">
            {/* Payment Icons */}
            <div className="h-6 w-10 bg-muted-foreground/20 rounded"></div>
            <div className="h-6 w-10 bg-muted-foreground/20 rounded"></div>
            <div className="h-6 w-10 bg-muted-foreground/20 rounded"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
