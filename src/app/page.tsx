import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import placeholderData from '@/lib/placeholder-images.json';

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const heroImage = placeholderData.placeholderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col gap-16">
      <section className="relative w-full h-[60vh] text-white">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            La Qualité, Notre Priorité.
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200 drop-shadow-md">
            Découvrez nos collections d'appareils électroménagers et d'instruments de musique.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/products">Voir les produits</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Nos Produits Vedettes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/products">Voir tous les produits</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
