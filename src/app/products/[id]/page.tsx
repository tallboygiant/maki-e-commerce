import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { AddToCartForm } from '@/components/add-to-cart-form';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
    return products.map((product) => ({
      id: product.id,
    }));
  }

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-video relative w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={product.imageHint}
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
