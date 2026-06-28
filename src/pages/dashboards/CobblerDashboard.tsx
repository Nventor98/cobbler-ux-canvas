import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Package, 
  Wrench, 
  Users, 
  MessageSquare, 
  Settings, 
  TrendingUp,
  DollarSign,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CobblerDashboard() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Artisan Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}. Manage your workshop and orders.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" /> Shop Settings
            </Button>
            <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-sm bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Sales</p>
                <p className="text-3xl font-bold">$1,280.00</p>
                <div className="flex items-center gap-1 mt-1 text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+12% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Orders</p>
                <p className="text-3xl font-bold">5</p>
                <p className="text-xs text-muted-foreground mt-1">2 ready to ship</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Repair Requests</p>
                <p className="text-3xl font-bold">3</p>
                <p className="text-xs text-orange-600 mt-1 font-medium">Needs response</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Wrench className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Customers</p>
                <p className="text-3xl font-bold">142</p>
                <p className="text-xs text-muted-foreground mt-1">8 new this week</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Recent Orders</CardTitle>
                  <CardDescription>You have 2 orders requiring immediate attention.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-bold">View all</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                          <Package className="h-5 w-5 opacity-20" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Order #CC-1024{i}</p>
                          <p className="text-xs text-muted-foreground">Amina Okafor • 2 items • $245.00</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Processing</Badge>
                        <Button variant="outline" size="sm" className="h-8">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sales Analytics</CardTitle>
                <CardDescription>Revenue performance over the last 7 days.</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-muted/20 rounded-lg m-6 mt-0">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Revenue chart visualization goes here.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Workshop Feed</CardTitle>
                <CardDescription>Real-time updates and messages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { title: 'New Message', text: 'Thabo molefe sent you a message about a custom repair.', time: '10m ago', icon: MessageSquare, color: 'text-primary' },
                  { title: 'Payment Confirmed', text: 'Payment for #CC-10242 has been verified.', time: '2h ago', icon: DollarSign, color: 'text-emerald-600' },
                  { title: 'Stock Alert', text: 'Heritage Oxford (Brown, 42) is running low on stock.', time: '5h ago', icon: Package, color: 'text-orange-600' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className={`mt-1 h-8 w-8 rounded-full bg-muted flex items-center justify-center ${item.color}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="font-bold text-sm">{item.title}</p>
                        <span className="text-[10px] text-muted-foreground uppercase">{item.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">View All Activity</Button>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Artisan Verification</CardTitle>
                <CardDescription>Your account is fully verified. Keep providing excellent service!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-primary/10">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Master Craftsman</p>
                    <p className="text-xs text-muted-foreground">Trust score: 98/100</p>
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

// Internal icons helper (using existing lucide icons)
import { Award } from 'lucide-react';
