import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
};

const getImage = (id: string) => {
    const placeholder = PlaceHolderImages.find(p => p.id === id);
    if (!placeholder) {
        // Fallback image
        return { url: 'https://picsum.photos/seed/fallback/600/400', hint: 'placeholder' };
    }
    return { url: placeholder.imageUrl, hint: placeholder.imageHint };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Amplificateur',
    description: 'Amplificateur de son puissant pour une expérience audio immersive. Idéal pour les systèmes home cinéma et les installations musicales professionnelles.',
    price: 350,
    image: getImage('amplifier').url,
    imageHint: getImage('amplifier').hint,
  },
  {
    id: '2',
    name: 'Guitare',
    description: 'Guitare acoustique de haute qualité pour musiciens de tous niveaux. Fabriquée avec des bois de premier choix pour un son riche et chaleureux.',
    price: 150,
    image: getImage('guitar').url,
    imageHint: getImage('guitar').hint,
  },
  {
    id: '3',
    name: 'Microphones',
    description: 'Microphone de studio professionnel pour des enregistrements clairs et précis. Parfait pour le podcasting, le streaming et l\'enregistrement de musique.',
    price: 15,
    image: getImage('microphone').url,
    imageHint: getImage('microphone').hint,
  },
  {
    id: '4',
    name: 'Groupe électrogène',
    description: 'Générateur portable fiable pour une alimentation de secours en cas de panne de courant ou pour une utilisation en extérieur.',
    price: 1200,
    image: getImage('generator').url,
    imageHint: getImage('generator').hint,
  },
  {
    id: '5',
    name: 'Ventilateur',
    description: 'Ventilateur sur pied moderne et silencieux pour rester au frais pendant les journées chaudes. Plusieurs vitesses et oscillation.',
    price: 35,
    image: getImage('fan').url,
    imageHint: getImage('fan').hint,
  },
  {
    id: '6',
    name: 'Coffre-fort',
    description: 'Coffre-fort numérique robuste pour protéger vos objets de valeur, documents importants et appareils électroniques.',
    price: 1350,
    image: getImage('safe').url,
    imageHint: getImage('safe').hint,
  },
  {
    id: '7',
    name: 'Ecran plat Samsung',
    description: 'Téléviseur intelligent à écran plat Samsung avec une qualité d\'image 4K époustouflante, des couleurs vives et un design élégant.',
    price: 900,
    image: getImage('samsung-tv').url,
    imageHint: getImage('samsung-tv').hint,
  },
  {
    id: '8',
    name: 'Ecran plat LG',
    description: 'Téléviseur intelligent à écran plat LG offrant des couleurs vives, des noirs profonds grâce à la technologie OLED, et une interface intuitive.',
    price: 650,
    image: getImage('lg-tv').url,
    imageHint: getImage('lg-tv').hint,
  },
  {
    id: '9',
    name: 'Aspirateur',
    description: 'Aspirateur puissant pour un nettoyage en profondeur de votre maison. Efficace sur les tapis, les sols durs et les poils d\'animaux.',
    price: 134,
    image: getImage('vacuum-cleaner').url,
    imageHint: getImage('vacuum-cleaner').hint,
  },
];
