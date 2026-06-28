import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck, User as UserIcon, Hammer } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('role') === 'cobbler' ? 'cobbler' : 'customer';
  
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await login(email);
      navigate('/dashboard');
    } catch (error) {
      // Error handled in AuthContext with toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLogin = async (testEmail: string) => {
    setEmail(testEmail);
    setIsSubmitting(true);
    try {
      await login(testEmail);
      navigate('/dashboard');
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 flex justify-center items-center">
        <Card className="w-full max-w-md border-border shadow-2xl">
          <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your CobblerConnect account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue={initialTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="customer" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" /> Customer
                </TabsTrigger>
                <TabsTrigger value="cobbler" className="flex items-center gap-2">
                  <Hammer className="h-4 w-4" /> Cobbler
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="customer">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="customer@example.com" 
                        className="pl-10" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10" />
                    </div>
                  </div>
                  <Button className="w-full font-bold" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign In as Customer'}
                  </Button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-4 italic">Simulated Accounts for Testing:</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="sm" onClick={() => quickLogin('amina@example.com')} className="text-xs h-9 justify-start px-4">
                      <span className="font-bold mr-2">Amina Okafor</span> (Customer)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cobbler">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="artisan@cobblerconnect.com" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10" />
                    </div>
                  </div>
                  <Button className="w-full font-bold" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign In as Artisan'}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-4 italic">Simulated Artisan Accounts:</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="sm" onClick={() => quickLogin('kwame@cobblerconnect.com')} className="text-xs h-9 justify-start px-4">
                      <span className="font-bold mr-2">Kwame Asante</span> (Artisan)
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => quickLogin('fatima@cobblerconnect.com')} className="text-xs h-9 justify-start px-4">
                      <span className="font-bold mr-2">Fatima Diallo</span> (Artisan)
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-center text-muted-foreground w-full">
              Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register now</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
