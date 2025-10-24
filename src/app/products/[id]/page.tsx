
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { AddToCartForm } from '@/components/add-to-cart-form';
import { Product } from '@/lib/products';
import { staticProducts } from '@/lib/products-data';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a data fetch
    setTimeout(() => {
      const foundProduct = staticProducts.find(p => p.id === params.id);
      setProduct(foundProduct);
      setIsLoading(false);
    }, 500);
  }, [params.id]);


  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="flex flex-col gap-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <div className="pt-4">
                <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-video relative w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={product.imageHint || product.name}
              priority
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-headline font-bold">{product.name}</h1>
          <p className="text-3xl font-bold text-primary">${product.price.toLocaleString('en-US')}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          <div className="pt-4">
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
