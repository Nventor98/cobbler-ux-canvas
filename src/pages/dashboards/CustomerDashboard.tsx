import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Wrench, MessageSquare, Heart, Clock, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="p-4 bg-muted/50 rounded-xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">{user?.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Customer</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full h-8 text-xs">Edit Profile</Button>
            </div>

            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start bg-primary/5 text-primary font-bold">
                <ShoppingBag className="mr-3 h-4 w-4" /> Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <ShoppingBag className="mr-3 h-4 w-4" /> My Orders
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <Wrench className="mr-3 h-4 w-4" /> Repair Requests
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <MessageSquare className="mr-3 h-4 w-4" /> Messages
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <Heart className="mr-3 h-4 w-4" /> Wishlist
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <Settings className="mr-3 h-4 w-4" /> Settings
              </Button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-none shadow-sm bg-primary/5">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Active Orders</p>
                  <p className="text-3xl font-bold">0</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-accent/5">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Repairs in Progress</p>
                  <p className="text-3xl font-bold">0</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-muted/50">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Unread Messages</p>
                  <p className="text-3xl font-bold">2</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Button variant="link" className="text-primary p-0 h-auto font-bold">View all</Button>
              </div>
              
              <Card className="border-border shadow-none">
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <div className="p-10 text-center text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>You haven't placed any orders yet.</p>
                      <Button asChild variant="outline" className="mt-4">
                        <a href="/marketplace">Start Shopping</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Special Offers for You</CardTitle>
                  <CardDescription>Handpicked deals based on your style.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-3 rounded-lg border border-primary/10 bg-primary/5">
                      <div className="h-16 w-16 rounded bg-muted"></div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">20% Off Shoe Polishing</p>
                        <p className="text-xs text-muted-foreground">Valid until March 30, 2024</p>
                        <Button variant="link" className="p-0 h-auto text-xs mt-1 text-primary">Claim Offer</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Need Support?</CardTitle>
                  <CardDescription>We're here to help with your orders or repairs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-between group">
                      Contact Platform Support <MessageSquare className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between group">
                      View Helpful Guides <Settings className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
