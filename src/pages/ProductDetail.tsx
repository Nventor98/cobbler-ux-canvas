import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MessageSquare, 
  ShoppingBag,
  ChevronLeft,
  Heart,
  Share2,
  Minus,
  Plus
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  mockProducts, 
  mockCobblers, 
  productCategoryLabels 
} from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = useMemo(() => mockProducts.find(p => p.id === id), [id]);
  const cobbler = useMemo(() => mockCobblers.find(c => c.id === product?.cobblerId), [product]);
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0] || '');

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button asChild><Link to="/marketplace">Back to Marketplace</Link></Button>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/marketplace" className="hover:text-primary">Marketplace</Link>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span className="capitalize">{product.category}</span>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted border border-border">
              <img 
                src={mainImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3">
                  Verified Artisan
                </Badge>
                {product.stock < 5 && (
                  <Badge variant="destructive" className="animate-pulse">
                    Only {product.stock} left in stock
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-muted-foreground text-sm">({product.reviewCount} reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <Link to={`/cobbler/${cobbler?.id}`} className="text-sm font-medium hover:text-primary underline underline-offset-4">
                  Visit {cobbler?.businessName} Store
                </Link>
              </div>
              <p className="text-3xl font-bold text-primary">${product.price}</p>
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6 mb-8">
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider mb-3 block">Select Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-12 rounded-xl border-2 flex items-center justify-center font-medium transition-all ${selectedSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider mb-3 block">Select Color</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${selectedColor === color ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-bold uppercase tracking-wider mb-3 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-xl h-12 bg-muted/30">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-full flex items-center justify-center hover:text-primary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-12 h-full flex items-center justify-center hover:text-primary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">{product.stock} units available</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={handleAddToCart} size="lg" className="flex-1 h-14 rounded-2xl font-bold shadow-lg shadow-primary/20">
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="h-14 w-14 p-0 rounded-2xl border-border">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 w-14 p-0 rounded-2xl border-border">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-muted/30 rounded-2xl">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Free Express Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $150. Delivery in 3-5 days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Easy Exchanges</p>
                  <p className="text-xs text-muted-foreground">30-day hassle-free exchange policy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none">
              <TabsTrigger value="description" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
                Description
              </TabsTrigger>
              <TabsTrigger value="artisan" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
                Meet the Artisan
              </TabsTrigger>
              <TabsTrigger value="reviews" className="px-8 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-8 space-y-6">
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                <p>{product.description}</p>
                <p>Crafted from the finest full-grain African leather, this piece represents the pinnacle of traditional craftsmanship combined with modern durability. Every stitch is hand-placed by master cobblers, ensuring that no two items are exactly alike.</p>
                <h4 className="text-foreground font-bold">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>100% Genuine Full-Grain Leather</li>
                  <li>Hand-stitched construction for superior durability</li>
                  <li>Eco-friendly vegetable tanning process</li>
                  <li>Solid brass hardware for lasting quality</li>
                  <li>Breathable leather lining</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="artisan" className="py-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-lg">
                  <img src={cobbler?.portfolio[0]} alt={cobbler?.businessName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{cobbler?.businessName}</h3>
                  <p className="text-primary font-bold mb-4">{cobbler?.location}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {cobbler?.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-muted/50 rounded-2xl">
                      <p className="text-xs text-muted-foreground mb-1">Experience</p>
                      <p className="font-bold text-lg">{cobbler?.yearsExperience} Years</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-2xl">
                      <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                      <p className="font-bold text-lg">{cobbler?.completionRate}%</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to={`/cobbler/${cobbler?.id}`}>View Artisan Profile</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-8">
              <div className="text-center py-12 bg-muted/20 rounded-3xl">
                <Star className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">Authentic reviews from verified customers will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
