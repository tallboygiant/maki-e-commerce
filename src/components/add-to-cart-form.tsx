"use client";

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface AddToCartFormProps {
  product: Product;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(product, quantity);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-4">
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-r-none"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          className="w-16 text-center rounded-none focus-visible:ring-primary"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-l-none"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button type="submit" size="lg" className="flex-grow">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Ajouter au Panier
      </Button>
    </form>
  );
}
