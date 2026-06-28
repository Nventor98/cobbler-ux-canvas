import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Search, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Camera,
  ArrowRight
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  mockRepairServices, 
  mockCobblers, 
  repairCategoryLabels 
} from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';

export default function RepairServices() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = mockRepairServices.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>
        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6 backdrop-blur-sm">Premium Care</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert Restoration Services</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Give your leather items a second life. Our master cobblers specialize in sole replacement, color restoration, and bespoke repairs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 font-bold text-lg">
              <Sparkles className="mr-2 h-5 w-5" /> AI Cost Estimator
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 h-14 font-bold text-lg">
              <Camera className="mr-2 h-5 w-5" /> Upload for Quote
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Search Services</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="e.g. resole, stitching..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-2 rounded-xl transition-all ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20' : 'hover:bg-muted'}`}
                >
                  All Services
                </button>
                {Object.entries(repairCategoryLabels).map(([id, label]) => (
                  <button 
                    key={id}
                    onClick={() => setSelectedCategory(id)}
                    className={`w-full text-left px-4 py-2 rounded-xl transition-all ${selectedCategory === id ? 'bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20' : 'hover:bg-muted'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Card className="bg-accent/5 border-accent/20 rounded-3xl p-6">
              <h4 className="font-bold mb-2">How it Works</h4>
              <ul className="space-y-4 mt-6">
                {[
                  { title: 'Select Service', text: 'Pick a repair type or upload photos.' },
                  { title: 'Get Quotes', text: 'Artisans review and send prices.' },
                  { title: 'Ship Item', text: 'Send your item to the artisan.' },
                  { title: 'Restored!', text: 'Receive your item back like new.' }
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{step.title}</p>
                      <p className="text-[10px] text-muted-foreground">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Service Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map(service => {
                const cobbler = mockCobblers.find(c => c.id === service.cobblerId);
                return (
                  <Card key={service.id} className="group border-border shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Wrench className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                            From ${service.basePrice}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 h-10 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-6">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{service.estimatedDays} days avg.</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-600" />
                            <span>Verified Care</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-muted/30 p-4 flex items-center justify-between border-t border-border">
                        <Link to={`/cobbler/${cobbler?.id}`} className="flex items-center gap-2 group/link">
                          <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
                            <img src={cobbler?.portfolio[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-xs">
                            <p className="text-muted-foreground">Provided by</p>
                            <p className="font-bold group-hover/link:text-primary transition-colors">{cobbler?.businessName}</p>
                          </div>
                        </Link>
                        <Button size="sm" className="rounded-full font-bold h-9">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-24 bg-muted/20 rounded-3xl border border-dashed border-border">
                <Wrench className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground text-lg">No services found for your search.</p>
                <Button variant="link" onClick={() => {setSearchQuery(''); setSelectedCategory('all');}} className="font-bold text-primary">
                  View All Services
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
