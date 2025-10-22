"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BitcoinIcon, MasterCardIcon, MobileMoneyIcon, PayPalIcon, VisaIcon } from "@/components/icons/payment-icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";

const checkoutSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  firstName: z.string().min(1, { message: "Le prénom est requis." }),
  lastName: z.string().min(1, { message: "Le nom de famille est requis." }),
  address: z.string().min(1, { message: "L'adresse est requise." }),
  city: z.string().min(1, { message: "La ville est requise." }),
  phone: z.string().min(1, { message: "Le téléphone est requis." }),
  deliveryLocation: z.string().min(1, { message: "Veuillez choisir un point de livraison." }),
  paymentMethod: z.string().min(1, { message: "Veuillez choisir un moyen de paiement." }),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      phone: "",
      deliveryLocation: "",
      paymentMethod: "visa",
    }
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return null;
  }

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    console.log("Order submitted", data);
    clearCart();
    router.push("/order-confirmation");
  };

  const deliveryLocations = ["Bukavu", "Uvira", "Kinshasa", "Goma"];
  const paymentMethods = [
    { id: "visa", icon: <VisaIcon />, name: "Carte Visa" },
    { id: "mastercard", icon: <MasterCardIcon />, name: "MasterCard" },
    { id: "paypal", icon: <PayPalIcon />, name: "PayPal" },
    { id: "airtel", icon: <MobileMoneyIcon color="#E50000" text="Airtel" />, name: "Airtel Money" },
    { id: "orange", icon: <MobileMoneyIcon color="#FF7900" text="Orange" />, name: "Orange Money" },
    { id: "mpesa", icon: <MobileMoneyIcon color="#3C8C4A" text="M-Pesa" />, name: "M-Pesa" },
    { id: "bitcoin", icon: <BitcoinIcon />, name: "Bitcoin" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-headline font-bold text-center mb-8">Finaliser la Commande</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Informations de livraison</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Jean" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Dupont" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@exemple.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Adresse</FormLabel><FormControl><Input placeholder="123 Rue Principale" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>Ville</FormLabel><FormControl><Input placeholder="Goma" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input placeholder="+243 ..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="deliveryLocation" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>Boutique de livraison</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Choisissez une boutique" /></SelectTrigger></FormControl>
                            <SelectContent>{deliveryLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}</SelectContent>
                        </Select>
                    <FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-headline">Moyen de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {paymentMethods.map(method => (
                                <FormItem key={method.id}>
                                    <FormControl>
                                        <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                                    </FormControl>
                                    <Label htmlFor={method.id} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        {method.icon}
                                        <span className="mt-2 text-center text-sm">{method.name}</span>
                                    </Label>
                                </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage className="pt-4"/>
                    </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Votre commande</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg">Confirmer et Payer</Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
