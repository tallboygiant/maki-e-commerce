'use client';

import { useMemo, useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading, error } = useDoc<{isAdmin?: boolean}>(userProfileRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [isUserLoading, user, router]);

  const isLoading = isUserLoading || (user && isProfileLoading);
  const isAdmin = userProfile?.isAdmin === true && !error;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-destructive">Accès non autorisé</h1>
        <p className="mt-4 text-muted-foreground">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page. 
          Vérifiez que vous êtes connecté avec un compte administrateur et que les règles de sécurité Firestore sont correctement configurées.
        </p>
         {error && (
          <pre className="mt-4 p-4 bg-muted rounded-md text-left text-xs overflow-auto">
            {error.message}
          </pre>
        )}
      </div>
    );
  }

  return <AdminDashboard />;
}
