import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { totalPrice, clearCart, cartProducts } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    city: '',
    country: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (!isAuthenticated) {
    navigate('/login?redirect=checkout');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Order placed successfully! Order #CC-55281');
    clearCart();
    setStep(3); // Success step
    setIsProcessing(false);
  };

  if (step === 3) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Your order #CC-55281 has been placed. We've sent a confirmation email to {formData.email}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/dashboard">View My Orders</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/marketplace">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="sm" onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')} className="p-0 hover:bg-transparent">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full font-bold text-xs ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>1</div>
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`flex items-center justify-center h-8 w-8 rounded-full font-bold text-xs ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <Card className="border-border shadow-none rounded-3xl overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Truck className="h-5 w-5 text-primary" /> Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold">Full Name</label>
                        <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">Email Address</label>
                        <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold">Delivery Address</label>
                        <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Street Name, Area" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">City</label>
                        <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="Lagos" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">Country</label>
                        <Input name="country" value={formData.country} onChange={handleInputChange} placeholder="Nigeria" />
                      </div>
                    </div>
                    <Button onClick={handleNextStep} size="lg" className="w-full h-14 rounded-2xl font-bold">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <Card className="border-border shadow-none rounded-3xl overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CreditCard className="h-5 w-5 text-primary" /> Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex gap-4 mb-6">
                      <Button variant="outline" className="flex-1 h-16 rounded-xl border-primary bg-primary/5 font-bold flex flex-col gap-1">
                        <CreditCard className="h-5 w-5" />
                        <span className="text-[10px]">CARD</span>
                      </Button>
                      <Button variant="outline" className="flex-1 h-16 rounded-xl opacity-50 cursor-not-allowed flex flex-col gap-1">
                        <div className="font-black italic text-lg text-blue-800">Paystack</div>
                        <span className="text-[10px]">DISABLED</span>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold">Name on Card</label>
                        <Input name="cardName" value={formData.cardName} onChange={handleInputChange} placeholder="JOHN DOE" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className="pl-10" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold">Expiry Date</label>
                          <Input name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM / YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold">CVV</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input name="cvv" type="password" value={formData.cvv} onChange={handleInputChange} placeholder="•••" className="pl-10" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-2xl flex gap-3 items-center text-xs text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      Your payment information is encrypted and secure.
                    </div>

                    <Button onClick={handlePlaceOrder} size="lg" className="w-full h-14 rounded-2xl font-bold" disabled={isProcessing}>
                      {isProcessing ? 'Processing Payment...' : `Pay $${totalPrice.toFixed(2)}`}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border shadow-none rounded-3xl sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg font-bold">In Your Cart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {cartProducts.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                      <div className="h-16 w-16 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                        <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity} • Size: {item.selectedSize}</p>
                        <p className="font-bold text-xs mt-1 text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-dashed border-border mt-4">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
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
