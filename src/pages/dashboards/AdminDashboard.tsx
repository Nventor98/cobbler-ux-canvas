import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShoppingBag, 
  Wrench, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Platform Administration</h1>
          <p className="text-muted-foreground">Global overview of CobblerConnect operations and verification.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: '1,245', icon: Users, color: 'blue' },
            { label: 'Active Cobblers', value: '86', icon: Wrench, color: 'orange' },
            { label: 'Monthly GMV', value: '$24.5k', icon: TrendingUp, color: 'emerald' },
            { label: 'Unverified Artisans', value: '12', icon: ShieldCheck, color: 'purple' }
          ].map((stat, idx) => (
            <Card key={idx} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Pending Verifications</CardTitle>
                    <CardDescription>Artisans awaiting identity and workshop verification.</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">Action Required</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-4">
                  {[
                    { name: 'Nadia Hassan', business: "Nadia's Leather Lounge", location: 'Nairobi, Kenya', applied: '2 days ago' },
                    { name: 'Moussa Traore', business: "Traore Artisan Leather", location: 'Bamako, Mali', applied: '5 days ago' }
                  ].map((artisan, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-border group hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {artisan.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{artisan.business}</p>
                          <p className="text-xs text-muted-foreground">{artisan.name} • {artisan.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-xs">View Docs</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive"><XCircle className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-emerald-600"><CheckCircle2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Marketplace Performance</CardTitle>
                <CardDescription>Transaction volume across all categories.</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-muted/20 rounded-lg m-6 mt-0">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Global platform analytics visualization.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">System Status</CardTitle>
                <CardDescription>All systems operational.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Authentication', status: 'Healthy' },
                  { label: 'Payment Gateway', status: 'Healthy' },
                  { label: 'Image Storage', status: 'Healthy' },
                  { label: 'Messaging Queue', status: 'Healthy' }
                ].map((sys, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{sys.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="font-medium">{sys.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-destructive/5 border-destructive/20">
              <CardHeader>
                <div className="flex items-center gap-2 text-destructive mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <CardTitle className="text-lg">Flagged Content</CardTitle>
                </div>
                <CardDescription>3 items reported by users for policy violations.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full font-bold">Review Reports</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
