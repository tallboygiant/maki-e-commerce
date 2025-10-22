'use client';

import { useMemo, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { collection } from 'firebase/firestore';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const adminCheckQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'admins');
  }, [firestore, user]);

  const { data: admins, isLoading: isAdminLoading } = useCollection(adminCheckQuery);

  const isAdmin = useMemo(() => {
    if (!admins || !user) return false;
    return admins.some(admin => admin.id === user.uid);
  }, [admins, user]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || isAdminLoading || !user) {
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
        <p className="mt-4 text-muted-foreground">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      </div>
    );
  }

  return <AdminDashboard />;
}
