import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  mockCobblers, 
  mockProducts, 
  mockRepairServices, 
  mockReviews 
} from '@/data/mockData';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function CobblerProfile() {
  const { id } = useParams<{ id: string }>();
  
  const cobbler = useMemo(() => mockCobblers.find(c => c.id === id), [id]);
  const products = useMemo(() => mockProducts.filter(p => p.cobblerId === id), [id]);
  const services = useMemo(() => mockRepairServices.filter(s => s.cobblerId === id), [id]);
  const reviews = useMemo(() => mockReviews.filter(r => r.targetId === id && r.targetType === 'cobbler'), [id]);

  if (!cobbler) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Artisan not found</h2>
          <Button asChild><Link to="/marketplace">Back to Marketplace</Link></Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Profile Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={cobbler.portfolio[0]} 
          alt={cobbler.businessName} 
          className="w-full h-full object-cover blur-sm brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Main Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
              <div className="h-40 w-40 rounded-3xl overflow-hidden border-4 border-background shadow-2xl bg-muted flex-shrink-0">
                <img src={cobbler.portfolio[1] || cobbler.portfolio[0]} alt={cobbler.businessName} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold tracking-tight">{cobbler.businessName}</h1>
                  {cobbler.verified && (
                    <ShieldCheck className="h-6 w-6 text-primary" fill="currentColor" fillOpacity={0.2} />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{cobbler.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-bold text-foreground">{cobbler.rating}</span>
                    <span>({cobbler.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="md:ml-auto flex gap-3">
                <Button className="rounded-full px-6 font-bold shadow-lg shadow-primary/20">
                  <MessageSquare className="mr-2 h-4 w-4" /> Message
                </Button>
                <Button variant="outline" className="rounded-full px-6">Follow</Button>
              </div>
            </div>

            <Tabs defaultValue="products" className="w-full">
              <TabsList className="bg-transparent border-b border-border w-full justify-start h-auto p-0 rounded-none mb-8">
                <TabsTrigger value="products" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
                  Products ({products.length})
                </TabsTrigger>
                <TabsTrigger value="services" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
                  Services ({services.length})
                </TabsTrigger>
                <TabsTrigger value="about" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
                  About
                </TabsTrigger>
                <TabsTrigger value="reviews" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(product => (
                    <Card key={product.id} className="group overflow-hidden border-border shadow-none hover:shadow-xl transition-all duration-300">
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square overflow-hidden">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                          <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className="text-xl font-bold text-primary">${product.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="services" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(service => (
                    <Card key={service.id} className="border-border shadow-none p-6 group hover:border-primary/50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                          <Badge variant="secondary" className="capitalize">{service.category.replace('-', ' ')}</Badge>
                        </div>
                        <p className="text-xl font-bold text-primary">From ${service.basePrice}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{service.estimatedDays} days</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Request Service
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="m-0 space-y-12">
                <div className="prose max-w-none text-muted-foreground">
                  <h3 className="text-foreground text-2xl font-bold mb-4">Our Craft Story</h3>
                  <p className="leading-relaxed mb-6">
                    {cobbler.description}
                  </p>
                  <p className="leading-relaxed">
                    We specialize in {cobbler.specialties.join(', ')}. Every piece that leaves our studio is a testament to the rich heritage of African leatherworking, crafted with patience, precision, and the finest materials available.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-6">Workshop Portfolio</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {cobbler.portfolio.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-muted">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="m-0">
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <div key={review.id} className="p-6 rounded-2xl bg-muted/30 border border-border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                              U
                            </div>
                            <div>
                              <p className="font-bold text-sm">Verified Customer</p>
                              <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground opacity-30'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground italic leading-relaxed">"{review.comment}"</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-muted/20 rounded-3xl">
                      <p className="text-muted-foreground">No reviews yet for this artisan.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Stats */}
          <aside className="w-full md:w-80 space-y-6">
            <Card className="border-none shadow-xl bg-card rounded-3xl">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Shop Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{cobbler.yearsExperience}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Years Exp.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{cobbler.completionRate}%</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Success</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm font-medium">Business Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Master Artisan Tier</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">Response: {cobbler.responseTime}</span>
                  </div>
                </div>

                <Button className="w-full rounded-2xl font-bold py-6 group">
                  Request Custom Order <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <h4 className="font-bold text-primary mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2 mt-4">
                {cobbler.specialties.map(s => (
                  <Badge key={s} variant="outline" className="bg-white border-primary/20 text-primary text-[10px] uppercase font-bold">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
