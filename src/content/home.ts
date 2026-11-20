/**
 * Everything editable on the homepage lives here: campaign wording, offers,
 * collections, stores and contact details.
 *
 * A value of `null` (or an empty list) means Preethi Silks has not confirmed it yet.
 * The page then shows a visible "to be confirmed" marker instead of invented facts.
 */
import bridalFull from "@/assets/home/bridal-full.webp";
import bridalTop from "@/assets/home/bridal-top.webp";
import heroImage from "@/assets/hero-image-1.jpeg";
import bridalZari from "@/assets/home/bridal-zari.webp";
import festiveSilk from "@/assets/home/festive-silk.webp";
import heroDrape from "@/assets/home/hero-drape.webp";
import highlightBoutique from "@/assets/home/highlight-boutique.webp";
import highlightMotif from "@/assets/home/highlight-motif.webp";
import highlightRed from "@/assets/home/highlight-red.webp";
import offersArch from "@/assets/home/offers-arch.webp";
import storyShelves from "@/assets/home/story-shelves.webp";
import storyWoman from "@/assets/home/story-woman.webp";
import textileFold from "@/assets/home/textile-fold.webp";
import textileFull from "@/assets/home/textile-full.webp";
import textileGreen from "@/assets/home/textile-green.webp";
import mensWear from "@/assets/collections/mens-wear.webp";
import womensWear from "@/assets/collections/womens-wear.webp";
import kidsWear from "@/assets/collections/kids-wear.webp"


export type Picture = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, for keeping the subject in frame when cropped. */
  position?: string;
};
export type LinkItem = { label: string; href: string };

export const brand = {
  name: "Preethi Silks",
  /** Add the official logo here, e.g. { src, alt, width, height }. Until then the name is typeset. */
  logo: null as Picture | null,
  description: "Silk sarees, bridal wear and fashion for the whole family.",
};

export const navigation: LinkItem[] = [
  { label: "Discover", href: "#discover" },
  { label: "Collections", href: "#collections" },
  { label: "Offers", href: "#offers" },
  { label: "Stories", href: "#stories" },
  { label: "Stores", href: "#stores" },
];

export const findStore: LinkItem = { label: "Find a Store", href: "#stores" };

export const announcement = {
  title: "BUMPER DECEMBER — UP TO 80% OFF!",
  message: "November 15 – December 31 | Explore Exclusive Offers",
  href: "#offers",
};

export const campaign = {
  label: "Preethi Silks — The New Season",
  /** Set as a magazine headline: one oversized word, an italic middle, a red italic close. */
  headline: { big: "Celebrate", middle: "Every Moment", lead: "in", accent: "Style." },
  /** A quiet index line at the foot of the hero, taken from the description. */
  index: ["Weddings", "Celebrations", "Every special moment"],
  body: "Discover beautiful collections for weddings, celebrations and every special moment in between.",
  cta: { label: "Explore Collections", href: "#collections" },
  image: {
    src: heroImage,
    alt: "Two models in floral, polka-dot ethnic outfits: one seated in mustard on a wooden chair, one standing behind in teal, on a verandah with an arched wooden door",
    width: 907,
    height: 1280,
  },
};

export const videoShowcase = {
  kicker: "Discover Preethi",
  title: "A Closer Look at Preethi",
  body: "Discover our collections, craftsmanship and the experience that makes every visit special.",
};

export type Collection = {
  title: string;
  /** Small label shown on the cards either side of the active one. */
  short: string;
  note: string;
  href: string;
  /** Without an image the card shows a plain "photograph to be supplied" panel. */
  image?: Picture;
};

export const collectionsIntro = {
  title: "Explore our collections",
  body: "Beautiful collections for every occasion",
};

export const collections: Collection[] = [
  {
    title: "Bridal Collection",
    short: "Bridal",
    note: "For your wedding day",
    href: "#stores",
    image: {
      src: bridalFull,
      alt: "A bride in a deep red silk saree with red flowers in her hair",
      width: 1008,
      height: 1200,
      position: "50% 0%",
    },
  },
  {
    title: "Silk Sarees",
    short: "Sarees",
    note: "Sarees for every occasion",
    href: "#stores",
    image: {
      src: textileFull,
      alt: "A red and green silk saree draped over a white stand",
      width: 1008,
      height: 1200,
    },
  },
  {
    title: "Women’s Wear",
    short: "Women’s",
    note: "Everyday and festive fashion",
    href: "#stores",
    image: {
      src: womensWear,
      alt: "Women’s wear and festive fashion at Preethi Silks",
      width: 900,
      height: 1600,
    },
  },
  {
    title: "Men’s Wear",
    short: "Men’s",
    note: "Traditional and contemporary",
    href: "#stores",
    image: {
      src: mensWear,
      alt: "Men’s wear, traditional and contemporary fashion at Preethi Silks",
      width: 1024,
      height: 1536,
    },
  },
  {
    title: "Kids Collection",
    short: "Kids",
    note: "Festive and everyday wear",
    href: "#stores",
    image: {
      src: kidsWear,
      alt: "Kids Wear, traditional and contemporary fashion at Preethi Silks",
      width: 1024,
      height: 1536,
    },
  },
];

export const offers = {
  marquee: "BUMPER DECEMBER  •  UP TO 80% OFF  •  NOVEMBER 15 – DECEMBER 31  •",
  kicker: "Exclusive store offers",
  title: "Bumper December",
  highlightLead: "Up to",
  highlight: "80% OFF",
  body: "Celebrate the season with exciting offers across our collections.",
  image: {
    src: offersArch,
    alt: "Red silk falling in soft folds beside a fold of green silk",
    width: 720,
    height: 900,
  },
  /** Add each confirmed offer to `detail`. Never add a figure the client has not approved. */
  items: [
    { title: "Kids Fashion", detail: "Starting at ₹199" },
    { title: "Men's Fashion", detail: "Starting at ₹299" },
    { title: "Sarees", detail: "Starting at ₹199" },
    { title: "Women's Western", detail: "Starting at ₹199" },
  ],
  /** e.g. "Valid until 31 December". */
  validity: "November 15 – December 31",
  cta: { label: "Visit a Showroom", href: "#stores" },
};

export const highlights = {
  kicker: "Featured",
  title: "Featured highlights",
  cta: { label: "View all", href: "#collections" },
  itemHref: "#stores",
  /** Keep this to eight, so the grid stays two full rows on desktop. */
  items: [
    {
      label: "Bridal Silks",
      image: {
        src: bridalZari,
        alt: "The woven border of a deep red bridal saree",
        width: 764,
        height: 663,
      },
    },
    {
      label: "Red Silk Sarees",
      image: {
        src: highlightRed,
        alt: "A woman smiling in a red silk saree",
        width: 720,
        height: 720,
      },
    },
    {
      label: "Silks in Every Colour",
      image: {
        src: storyShelves,
        alt: "Silk sarees in many colours, folded on white shelves",
        width: 628,
        height: 975,
        position: "50% 12%",
      },
    },
    {
      label: "Two-Tone Silks",
      image: {
        src: textileGreen,
        alt: "Green silk meeting red silk in soft folds",
        width: 832,
        height: 728,
      },
    },
    {
      label: "Woven Borders",
      image: {
        src: heroDrape,
        alt: "The pleats and tasselled end of a red saree",
        width: 812,
        height: 749,
      },
    },
    {
      label: "Classic Reds",
      image: {
        src: textileFold,
        alt: "Red silk folded over a white edge",
        width: 652,
        height: 800,
      },
    },
    {
      label: "Woven Motifs",
      image: {
        src: highlightMotif,
        alt: "Gold flowers woven into pink silk",
        width: 420,
        height: 420,
      },
    },
    {
      label: "Showroom Styles",
      image: {
        src: highlightBoutique,
        alt: "A blue outfit on display beside white flowers in the showroom",
        width: 395,
        height: 395,
      },
    },
  ],
};

export const seasonal = {
  title: "This season at Preethi Silks",
  quote: "Make your wedding shopping special.",
  body: "Bridal sarees and wedding wear for the whole family, chosen with help from our team.",
  wedding: {
    title: "Wedding Collections",
    href: "#stores",
    image: {
      src: bridalTop,
      alt: "A smiling woman in a red silk saree, looking to one side",
      width: 1310,
      height: 858,
    },
  },
  festive: {
    title: "Festive Shopping",
    href: "#collections",
    image: {
      src: festiveSilk,
      alt: "A hand resting on folded pink silk with a gold pattern",
      width: 604,
      height: 360,
    },
  },
};

export type StoreLocation = {
  id: string;
  /** Town shown in the directory and on the map. */
  name: string;
  business: string;
  type: string;
  region: string;
  /** Full postal address, once verified. */
  address?: string | null;
  phone?: string | null;
  hours?: { days: string; time: string } | null;
  /** A verified Google Maps link for the showroom itself. */
  mapUrl?: string | null;
  /** Places the town's marker. It marks the town, never the showroom's exact entrance. */
  coordinates?: { lat: number; lng: number } | null;
  /** Which side of its marker the town's name sits on, so close towns don't overlap. */
  labelSide?: "left" | "right" | "above" | "below";
};

const defaultShowroomHours = {
  days: "Monday – Sunday",
  time: "9:00 AM – 9:00 PM",
};

/**
 * Where the business is present. Other businesses' entries can live here too: the homepage
 * only shows records that pass the filter below.
 *
 * The coordinates are approximate town centres, used only to place the map markers. Replace
 * them with the values from the presenceLocations dataset when it is added.
 */
export const presenceLocations: StoreLocation[] = [
  {
    id: "feroke",
    name: "Feroke",
    business: "Preethi Silks",
    type: "preethi",
    region: "malabar",
    coordinates: { lat: 11.1803, lng: 75.8389 },
    labelSide: "left",
    phone: "9061745999",
    hours: defaultShowroomHours,
  },
  {
    id: "kondotty",
    name: "Kondotty",
    business: "Preethi Silks",
    type: "preethi",
    region: "malabar",
    coordinates: { lat: 11.1475, lng: 75.9622 },
    labelSide: "above",
    phone: "8891367888",
    hours: defaultShowroomHours,
  },
  {
    id: "malappuram",
    name: "Malappuram",
    business: "Preethi Silks",
    type: "preethi",
    region: "malabar",
    coordinates: { lat: 11.051, lng: 76.0711 },
    labelSide: "below",
    phone: "9645707999",
    hours: defaultShowroomHours,
  },
  {
    id: "palakkad",
    name: "Palakkad",
    business: "Preethi Silks",
    type: "preethi",
    region: "malabar",
    coordinates: { lat: 10.7867, lng: 76.6548 },
    phone: "9995848299",
    hours: defaultShowroomHours,
  },
  {
    id: "kuttiady",
    name: "Kuttiady",
    business: "Preethi Silks",
    type: "preethi",
    region: "malabar",
    coordinates: { lat: 11.6533, lng: 75.7558 },
    hours: defaultShowroomHours,
  },
];

/** The Kerala showrooms shown on the homepage. */
export const keralaShowrooms = presenceLocations.filter(
  (location) =>
    location.business === "Preethi Silks" &&
    location.type === "preethi" &&
    location.region === "malabar",
);

export const stores = {
  kicker: "Our stores",
  title: "A Preethi Silks Experience, Closer to You.",
  body: "Find your nearest showroom and discover collections for every occasion.",
  region: "Kerala",
};

export const contactIntro = {
  kicker: "Contact us",
  title: "We’re happy to",
  accent: "help.",
  body: "Choosing a bridal saree, planning your wedding shopping, or looking for something for the family? Call us, message us on WhatsApp, or send an enquiry.",
};

/** Adding a value here turns on its link in the contact section and the footer. */
export const contact = {
  /** With country code, e.g. "+91 00000 00000". */
  phone: "9072210999",
  whatsapp: "+91 98470 12345",
  email: "info@preethisilks.in",
  address: "Main Road, Feroke, Kozhikode, Kerala 673631",
};

export const enquiry = {
  title: "Send us an enquiry",
  body: "Tell us what you are looking for and we will get back to you.",
  subjects: [
    "General enquiry",
    "Bridal and wedding shopping",
    "Festive collections",
    "Visit a showroom",
  ],
};

export const closing = {
  title: "Something Special for Everyone.",
  body: "From everyday favourites to celebrations, find something for every member of your family at Preethi Silks.",
};

export const footer = {
  company: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Offers", href: "#offers" },
    { label: "Our Stores", href: "#stores" },
  ] as LinkItem[],
  storesLabel: "Find Our Stores",
  tagline: "Made for your moment.",
  /** Add each profile's URL to turn it into a link. */
  social: [
    { label: "Instagram", url: "https://instagram.com/preethisilks" },
    { label: "Facebook", url: "https://facebook.com/preethisilks" },
    { label: "YouTube", url: "https://youtube.com/@preethisilks" },
  ],
  /** Registered company name, GST number and similar. */
  business: "Preethi Silks Private Limited • GSTIN: 32AAAAA0000A1Z5",
};
