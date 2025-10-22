"use client";

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/products', label: 'Produits' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { cartCount } = useCart();
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/');
  }

  const UserMenu = () => {
    if (isUserLoading) {
      return <Button variant="ghost" size="icon" className="w-9 h-9 animate-pulse bg-muted rounded-full" />;
    }

    if (!user) {
      return (
        <Button variant="ghost" size="icon" asChild>
          <Link href="/login">
            <User className="h-5 w-5" />
            <span className="sr-only">Connexion</span>
          </Link>
        </Button>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'User'} />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName || 'Utilisateur'}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/admin">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Se déconnecter</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const DesktopNav = () => (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-6 pt-12">
            <Link href="/" className="font-headline text-2xl font-bold text-primary">
                MAKI e-commerce
            </Link>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-lg font-medium transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          {isClient && isMobile && <MobileNav />}
          <Link href="/" className="hidden md:block font-headline text-2xl font-bold text-primary">
            MAKI e-commerce
          </Link>
        </div>

        <Link href="/" className="md:hidden font-headline text-xl font-bold text-primary">
            MAKI e-commerce
        </Link>

        {isClient && !isMobile && <DesktopNav />}

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="pl-8 w-40 md:w-64" />
          </div>
          <UserMenu />
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {isClient && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Panier</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
