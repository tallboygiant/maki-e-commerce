import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Panneau d'Administration</CardTitle>
          <CardDescription>
            Gérez vos produits, commandes et informations sur le site.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center py-24">
            <Construction className="h-24 w-24 text-primary" />
            <h2 className="mt-8 text-2xl font-bold">Page en construction</h2>
            <p className="mt-2 text-muted-foreground">
                Cette section est en cours de développement et sera bientôt disponible.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
