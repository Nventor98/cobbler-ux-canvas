import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, List, Star, ArrowRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  mockProducts, 
  mockCobblers, 
  productCategoryLabels 
} from '@/data/mockData';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';
  
  const [activeTab, setActiveTab] = useState('products');
  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [category, searchQuery, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setSearchParams(cat === 'all' ? {} : { cat });
  };

  return (
    <MainLayout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Marketplace</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover unique, handcrafted leather goods directly from Africa's most skilled artisans.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <TabsList className="bg-muted p-1">
              <TabsTrigger value="products" className="px-6">Products</TabsTrigger>
              <TabsTrigger value="services" className="px-6">Services</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, brand or material..." 
                  className="pl-10 h-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block space-y-8">
              <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Categories</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleCategoryChange('all')}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${category === 'all' ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted text-foreground'}`}
                  >
                    All Categories
                  </button>
                  {Object.entries(productCategoryLabels).map(([id, label]) => (
                    <button 
                      key={id}
                      onClick={() => handleCategoryChange(id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${category === id ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted text-foreground'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Price Range</h3>
                <div className="space-y-4 px-3">
                  <div className="flex items-center gap-4">
                    <Input placeholder="Min" type="number" className="h-9" />
                    <span className="text-muted-foreground">—</span>
                    <Input placeholder="Max" type="number" className="h-9" />
                  </div>
                  <Button variant="outline" className="w-full text-xs h-8">Apply Price</Button>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="font-bold text-primary mb-2">Need a Repair?</h4>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Our master cobblers also offer restoration and custom repair services.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold" onClick={() => setActiveTab('services')}>
                  View Services <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <TabsContent value="products" className="m-0">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md"><Grid className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md opacity-50"><List className="h-4 w-4" /></Button>
                  </div>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => {
                      const cobbler = mockCobblers.find(c => c.id === product.cobblerId);
                      return (
                        <Card key={product.id} className="group overflow-hidden border-border shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                          <Link to={`/product/${product.id}`}>
                            <div className="relative aspect-square overflow-hidden">
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-none">
                                  {productCategoryLabels[product.category]}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              <span className="text-xs font-semibold">{product.rating}</span>
                              <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                              <Link to={`/product/${product.id}`}>{product.name}</Link>
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4">by {cobbler?.businessName}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-primary">${product.price}</span>
                              <Button size="sm" variant="secondary" className="rounded-full px-4 h-8 text-xs font-bold">
                                Quick View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
                    <p className="text-muted-foreground text-lg mb-4">No products found matching your search.</p>
                    <Button variant="outline" onClick={() => {setSearchQuery(''); setCategory('all');}}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="services" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service cards would go here - I'll implement them if needed later */}
                  <div className="col-span-full py-20 text-center bg-muted/30 rounded-3xl">
                    <p className="text-muted-foreground">Explore our artisan repair services to restore your beloved leather items.</p>
                    <Button className="mt-4">Browse All Services</Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
        </div>
    </MainLayout>
  );
}
