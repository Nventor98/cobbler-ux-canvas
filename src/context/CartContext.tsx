import React, { createContext, useContext, useMemo } from 'react';
import { Product, CartItem } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';
import { mockProducts } from '@/data/mockData';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  cartProducts: (Product & { quantity: number; selectedSize?: string; selectedColor?: string })[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('cc_cart', []);

  const addItem = (product: Product, quantity = 1, size?: string, color?: string) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { productId: product.id, quantity, size, color }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeItem = (productId: string, size?: string, color?: string) => {
    setItems((prevItems) => 
      prevItems.filter(
        (item) => !(item.productId === productId && item.size === size && item.color === color)
      )
    );
    toast.info('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeItem(productId, size, color);
      return;
    }

    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartProducts = useMemo(() => {
    return items.map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      return {
        ...product!,
        quantity: item.quantity,
        selectedSize: item.size,
        selectedColor: item.color,
      };
    });
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartProducts]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    cartProducts,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
