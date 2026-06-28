import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Zap, ArrowRight, Award } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { mockCobblers, mockProducts } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const featuredCobblers = mockCobblers.slice(0, 3);
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1 text-primary border-primary/20 bg-primary/5 rounded-full">
              Authentic African Leather Craftsmanship
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
              Heritage Leather, <span className="text-primary italic">Modern Luxury</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with Africa's finest master cobblers. Bespoke handcrafted footwear, premium bags, and expert restoration services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="px-8 h-14 rounded-full text-lg shadow-lg shadow-primary/20">
                <Link to="/marketplace">Shop Marketplace</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 h-14 rounded-full text-lg">
                <Link to="/services">Book a Repair</Link>
              </Button>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-8 grayscale opacity-60">
              <div className="flex items-center gap-2 font-semibold text-lg text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" /> Verified Artisans
              </div>
              <div className="flex items-center gap-2 font-semibold text-lg text-muted-foreground">
                <Award className="h-5 w-5 text-primary" /> Premium Quality
              </div>
              <div className="flex items-center gap-2 font-semibold text-lg text-muted-foreground">
                <Zap className="h-5 w-5 text-primary" /> Fast Delivery
              </div>
            </div>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -z-10 opacity-30"></div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Craftsmanship</h2>
              <p className="text-muted-foreground">The most sought-after pieces from our master artisans.</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex group">
              <Link to="/marketplace">
                View All Products <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-black hover:bg-white/100 backdrop-blur-sm border-none font-bold">
                      ${product.price}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="text-xs font-semibold">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Artisans */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our Master Cobblers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform hosts the most talented leather craftsmen across the continent, each bringing generations of tradition to every stitch.
          </p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCobblers.map((cobbler) => (
            <Link key={cobbler.id} to={`/cobbler/${cobbler.id}`} className="group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4">
                <img 
                  src={cobbler.portfolio[0]} 
                  alt={cobbler.businessName}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{cobbler.businessName}</h3>
                  <p className="text-sm opacity-80">{cobbler.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {cobbler.specialties.slice(0, 2).map((s) => (
                    <Badge key={s} variant="secondary" className="text-[10px] py-0">{s}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-bold">{cobbler.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
            {/* Texture background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Ready to Experience True Craftsmanship?</h2>
              <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
                Whether you're looking for a bespoke pair of oxfords or need to restore a family heirloom, our artisans are ready.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 px-10 h-14 rounded-full text-lg font-bold">
                  <Link to="/marketplace">Browse Shop</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 px-10 h-14 rounded-full text-lg font-bold">
                  <Link to="/login?role=cobbler">Join as a Cobbler</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
