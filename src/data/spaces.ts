export type SpaceType = "private" | "coworking" | "studio" | "event";
export type Area = "central" | "east" | "south" | "west" | "north";

export interface Space {
  id: string;
  slug: string;
  name: string;
  area: Area;
  neighbourhood: string;
  postcode: string;
  type: SpaceType[];
  headline: string;
  description: string;
  sqft: { min: number; max: number };
  capacity: { min: number; max: number };
  priceFrom: number;
  priceUnit: "desk/month" | "month" | "day";
  image: string;
  gallery: string[];
  amenities: string[];
  transport: { name: string; time: string; type: "tube" | "rail" | "bus" }[];
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
  grade?: string;
}

export const spaces: Space[] = [
  {
    id: "1",
    slug: "the-light-bulb",
    name: "The Light Bulb",
    area: "south",
    neighbourhood: "Wandsworth",
    postcode: "SW18",
    type: ["private", "coworking"],
    headline: "Industrial chic in the heart of Wandsworth",
    description: "Nestled in an area formerly known for manufacturing switches, plugs and sockets, The Light Bulb is a beautifully converted industrial building brimming with character and light. Perfect for creative and tech businesses who want space with a story.",
    sqft: { min: 150, max: 5000 },
    capacity: { min: 2, max: 80 },
    priceFrom: 650,
    priceUnit: "desk/month",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
    amenities: ["High-speed Wi-Fi", "Roof terrace", "Café on-site", "Bike storage", "Showers", "24/7 access", "Meeting rooms", "Reception team", "EV charging"],
    transport: [
      { name: "Wandsworth Town", time: "5 min", type: "rail" },
      { name: "East Putney", time: "8 min", type: "tube" },
    ],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 142,
    lat: 51.455,
    lng: -0.188,
  },
  {
    id: "2",
    slug: "sanderson-wallpaper-factory",
    name: "Sanderson Wallpaper Factory",
    area: "west",
    neighbourhood: "Chiswick",
    postcode: "W4",
    type: ["private", "studio"],
    headline: "History and charm in leafy Chiswick",
    description: "Brimming with history and charm, this former wallpaper factory is home to flourishing businesses in leafy Chiswick. Grade II listed features blend with contemporary fit-out to create a workspace unlike any other.",
    sqft: { min: 200, max: 3500 },
    capacity: { min: 3, max: 60 },
    priceFrom: 720,
    priceUnit: "desk/month",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    ],
    amenities: ["High-speed Wi-Fi", "Courtyard garden", "Café on-site", "Bike storage", "Showers", "24/7 access", "Meeting rooms", "Reception team"],
    transport: [
      { name: "Chiswick", time: "3 min", type: "rail" },
      { name: "Gunnersbury", time: "6 min", type: "tube" },
    ],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 98,
    lat: 51.492,
    lng: -0.247,
    grade: "Grade II Listed",
  },
  {
    id: "3",
    slug: "leather-hide-wool-exchange",
    name: "Leather, Hide & Wool Exchange",
    area: "south",
    neighbourhood: "Bermondsey",
    postcode: "SE1",
    type: ["private", "coworking"],
    headline: "Victorian grandeur in the heart of SE1",
    description: "A Grade II listed Victorian building that was once 'The London Leather, Hide and Wool Exchange' in Bermondsey. Dramatic arched windows, exposed brickwork, and soaring ceilings make this one of London's most distinctive office addresses.",
    sqft: { min: 300, max: 8000 },
    capacity: { min: 5, max: 150 },
    priceFrom: 850,
    priceUnit: "desk/month",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
    amenities: ["High-speed Wi-Fi", "Rooftop terrace", "Café on-site", "Showers", "24/7 access", "Meeting rooms", "Event space", "Reception team", "Pet-friendly"],
    transport: [
      { name: "London Bridge", time: "7 min", type: "tube" },
      { name: "Bermondsey", time: "4 min", type: "tube" },
    ],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 211,
    lat: 51.500,
    lng: -0.079,
    grade: "Grade II Listed",
  },
  {
    id: "4",
    slug: "evergreen-studios",
    name: "Evergreen Studios",
    area: "west",
    neighbourhood: "Richmond",
    postcode: "TW9",
    type: ["studio", "private"],
    headline: "Purpose-built studio space in tree-lined Richmond",
    description: "In the heart of South West London's tree-lined Richmond, Evergreen Studios is a newly renovated and purpose-built office and studio space surrounded by some of London's most spectacular greenery. Ideal for creative agencies, architects, and design studios.",
    sqft: { min: 200, max: 2500 },
    capacity: { min: 2, max: 40 },
    priceFrom: 695,
    priceUnit: "desk/month",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    ],
    amenities: ["High-speed Wi-Fi", "Terrace with park views", "Bike storage", "Showers", "Meeting rooms", "Event space", "Kitchen facilities"],
    transport: [
      { name: "Richmond", time: "6 min", type: "tube" },
      { name: "Richmond", time: "4 min", type: "rail" },
    ],
    isNew: true,
    rating: 5.0,
    reviewCount: 34,
    lat: 51.463,
    lng: -0.301,
  },
  {
    id: "5",
    slug: "swan-court",
    name: "Swan Court",
    area: "south",
    neighbourhood: "Wimbledon",
    postcode: "SW19",
    type: ["private", "coworking"],
    headline: "Chic, modern and full of natural light",
    description: "Super stylish space in the very heart of leafy and well-connected Wimbledon. Swan Court's floor-to-ceiling windows flood every floor with natural light, while its contemporary design creates an aspirational setting for businesses that care about aesthetics.",
    sqft: { min: 150, max: 4000 },
    capacity: { min: 2, max: 70 },
    priceFrom: 680,
    priceUnit: "desk/month",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80",
    ],
    amenities: ["High-speed Wi-Fi", "Rooftop garden", "Café on-site", "Bike storage", "Showers", "24/7 access", "Meeting rooms", "Reception team"],
    transport: [
      { name: "Wimbledon", time: "4 min", type: "tube" },
      { name: "Wimbledon", time: "3 min", type: "rail" },
    ],
    rating: 4.6,
    reviewCount: 87,
    lat: 51.422,
    lng: -0.207,
  },
  {
    id: "6",
    slug: "lock-studios",
    name: "Lock Studios",
    area: "east",
    neighbourhood: "Bow",
    postcode: "E3",
    type: ["studio", "coworking", "private"],
    headline: "Creative hub in East London's beating heart",
    description: "In the heart of Bow, perfect if you are East London based or want to be near Canary Wharf or Stratford. Lock Studios is a converted Victorian warehouse with dramatic raw features, exposed beams and a buzzing creative community.",
    sqft: { min: 100, max: 6000 },
    capacity: { min: 1, max: 100 },
    priceFrom: 550,
    priceUnit: "desk/month",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    ],
    amenities: ["High-speed Wi-Fi", "Courtyard", "Café on-site", "Bike storage", "Showers", "24/7 access", "Meeting rooms", "Event space", "Dog-friendly"],
    transport: [
      { name: "Bow Road", time: "3 min", type: "tube" },
      { name: "Stratford", time: "9 min", type: "tube" },
    ],
    rating: 4.8,
    reviewCount: 156,
    lat: 51.527,
    lng: -0.021,
  },
  {
    id: "7",
    slug: "central-house",
    name: "Central House",
    area: "central",
    neighbourhood: "Shoreditch",
    postcode: "EC1",
    type: ["private", "coworking"],
    headline: "At the crossroads of tech and creativity",
    description: "A striking contemporary building right in the heart of Shoreditch — London's most exciting neighbourhood for technology, media and creative businesses. Central House puts you within steps of the best coffee, restaurants and after-work culture the city has to offer.",
    sqft: { min: 200, max: 10000 },
    capacity: { min: 3, max: 200 },
    priceFrom: 950,
    priceUnit: "desk/month",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    ],
    amenities: ["Gigabit Wi-Fi", "Rooftop bar", "Café on-site", "Bike storage", "Showers", "24/7 access", "Meeting rooms", "Event space", "Reception team", "Podcast studio"],
    transport: [
      { name: "Old Street", time: "4 min", type: "tube" },
      { name: "Liverpool Street", time: "8 min", type: "tube" },
    ],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 324,
    lat: 51.526,
    lng: -0.087,
  },
  {
    id: "8",
    slug: "atlas-house",
    name: "Atlas House",
    area: "north",
    neighbourhood: "Islington",
    postcode: "N1",
    type: ["private", "coworking"],
    headline: "Light-filled offices above vibrant Upper Street",
    description: "Positioned above one of London's liveliest streets, Atlas House offers generous floor plates and excellent natural light throughout. Its proximity to Angel tube and the tech cluster around Old Street makes it a natural base for growing digital businesses.",
    sqft: { min: 250, max: 4500 },
    capacity: { min: 4, max: 75 },
    priceFrom: 820,
    priceUnit: "desk/month",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    ],
    amenities: ["High-speed Wi-Fi", "Roof terrace", "Café on-site", "Bike storage", "Showers", "Meeting rooms", "Reception team"],
    transport: [
      { name: "Angel", time: "5 min", type: "tube" },
      { name: "Highbury & Islington", time: "6 min", type: "tube" },
    ],
    isNew: true,
    rating: 4.7,
    reviewCount: 62,
    lat: 51.538,
    lng: -0.103,
  },
];

export const amenityOptions = [
  "High-speed Wi-Fi",
  "Café on-site",
  "Meeting rooms",
  "24/7 access",
  "Bike storage",
  "Showers",
  "Rooftop terrace",
  "Event space",
  "Reception team",
  "EV charging",
  "Pet-friendly",
  "Podcast studio",
];

export const neighbourhoods: Record<Area, string[]> = {
  central: ["Shoreditch", "Clerkenwell", "Farringdon", "City of London", "Westminster"],
  east: ["Bow", "Hackney", "Stratford", "Bethnal Green", "Whitechapel"],
  south: ["Bermondsey", "Wandsworth", "Wimbledon", "Brixton", "Clapham"],
  west: ["Chiswick", "Richmond", "Hammersmith", "Fulham", "Notting Hill"],
  north: ["Islington", "Camden", "Highbury", "Kentish Town", "Archway"],
};
