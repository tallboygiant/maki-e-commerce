'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useFirestore, deleteDocumentNonBlocking } from '@/firebase';
import { Product } from '@/lib/products';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface DeleteProductDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  product: Product;
}

export function DeleteProductDialog({ isOpen, setIsOpen, product }: DeleteProductDialogProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleDelete = () => {
    const productRef = doc(firestore, 'products', product.id);
    deleteDocumentNonBlocking(productRef);
    setIsOpen(false);
    toast({
        title: 'Produit supprimé',
        description: `Le produit "${product.name}" a été supprimé.`,
        variant: 'destructive'
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce produit ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le produit "{product.name}" sera définitivement supprimé de la base de données.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
