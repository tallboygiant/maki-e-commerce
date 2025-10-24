
'use client';
import { useState, useEffect } from 'react';
import type { Product } from '@/lib/products';
import { staticProducts } from '@/lib/products-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, MoreHorizontal, Loader2 } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductDialog } from './product-dialog';
import { DeleteProductDialog } from './delete-product-dialog';
import { useToast } from '@/hooks/use-toast';


export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
        setProducts(staticProducts);
        setIsLoading(false);
    }, 500);
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };
  
  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  // Functions to optimistically update UI
  const addProductOptimistic = (product: Product) => {
    const newProduct = { ...product, id: new Date().getTime().toString() }; // temp ID
    setProducts(prev => [newProduct, ...prev]);
    toast({ title: 'Produit ajouté', description: `Le produit "${product.name}" a été ajouté.` });
    setDialogOpen(false);
  }

  const updateProductOptimistic = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    toast({ title: 'Produit mis à jour', description: `Le produit "${product.name}" a été mis à jour.` });
    setDialogOpen(false);
  }

  const deleteProductOptimistic = (productId: string) => {
    const productName = products.find(p => p.id === productId)?.name || '';
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({ title: 'Produit supprimé', description: `Le produit "${productName}" a été supprimé.`, variant: 'destructive'});
    setDeleteDialogOpen(false);
  }


  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline text-3xl">Gestion des Produits</CardTitle>
            <CardDescription>Ajoutez, modifiez ou supprimez des produits.</CardDescription>
          </div>
          <Button onClick={handleAddProduct}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <Loader2 className="mx-auto my-8 h-8 w-8 animate-spin text-primary" />
                  </TableCell>
                </TableRow>
              ) : products && products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.imageUrl}
                        width="64"
                        data-ai-hint={product.imageHint || product.name}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>Modifier</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProduct(product)}>Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Aucun produit trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ProductDialog
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        product={selectedProduct}
        onSave={selectedProduct ? updateProductOptimistic : addProductOptimistic}
      />
      {selectedProduct && (
        <DeleteProductDialog
            isOpen={deleteDialogOpen}
            setIsOpen={setDeleteDialogOpen}
            product={selectedProduct}
            onDelete={() => deleteProductOptimistic(selectedProduct.id)}
        />
      )}
    </div>
  );
}
