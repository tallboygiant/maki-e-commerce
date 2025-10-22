import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center flex flex-col items-center">
      <CheckCircle2 className="h-24 w-24 text-green-500" />
      <h1 className="mt-8 text-4xl font-headline font-bold">Merci pour votre commande !</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Votre commande a été passée avec succès. Vous recevrez bientôt un email de confirmation avec les détails de votre achat et votre facture.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/">Continuer vos achats</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
            <Link href="/admin">Voir mes commandes</Link>
        </Button>
      </div>
    </div>
  );
}
