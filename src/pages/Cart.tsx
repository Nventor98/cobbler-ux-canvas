import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ChevronLeft } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Card, CardContent } from '@/components/ui/card';

export default function CartPage() {
  const { cartProducts, totalPrice, updateQuantity, removeItem, totalItems } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="bg-muted/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our marketplace for authentic leather goods.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/marketplace">Start Shopping</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-0 hover:bg-transparent">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <span className="text-muted-foreground ml-2">({totalItems} items)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex flex-col sm:flex-row gap-6 p-4 rounded-3xl border border-border group hover:border-primary/20 transition-colors">
                <div className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="font-bold text-lg">${item.price}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                      {item.selectedSize && (
                        <p>Size: <span className="text-foreground font-medium">{item.selectedSize}</span></p>
                      )}
                      {item.selectedColor && (
                        <p>Color: <span className="text-foreground font-medium">{item.selectedColor}</span></p>
                      )}
                      <p>Category: <span className="text-foreground font-medium capitalize">{item.category}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-xl h-10 bg-muted/30">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="w-10 h-full flex items-center justify-center hover:text-primary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="w-10 h-full flex items-center justify-center hover:text-primary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                      className="text-muted-foreground hover:text-destructive flex items-center gap-1.5 text-xs font-bold transition-colors"
                    >
                      <Trash2 className="h-4 w-4" /> REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 flex items-center gap-4">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/marketplace">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-xl bg-muted/30 rounded-3xl sticky top-24">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Shipping</span>
                    <span className="font-medium text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="flex justify-between items-end mb-8">
                  <span className="font-bold text-lg">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-primary">${totalPrice.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">VAT Included</p>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full h-14 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 group">
                  <Link to="/checkout">
                    Checkout Now <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <div className="mt-8 space-y-4">
                  <p className="text-xs text-center text-muted-foreground font-medium">SECURE CHECKOUT GUARANTEED</p>
                  <div className="flex justify-center gap-3 opacity-50">
                    {/* Payment methods placeholder icons */}
                    <div className="h-6 w-10 bg-black rounded"></div>
                    <div className="h-6 w-10 bg-black rounded"></div>
                    <div className="h-6 w-10 bg-black rounded"></div>
                    <div className="h-6 w-10 bg-black rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
