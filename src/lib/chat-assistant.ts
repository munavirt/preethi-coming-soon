import { brand, contact, keralaShowrooms } from "@/content/home";
import { whatsappUrl } from "./whatsapp";

export type MessageAction =
  | { type: "quick-reply"; label: string; query: string }
  | { type: "link"; label: string; href: string; external?: boolean }
  | { type: "tel"; label: string; phone: string }
  | { type: "whatsapp"; label: string; text?: string };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  actions?: MessageAction[];
};

export const WELCOME_MESSAGE = `Welcome to Preethi Silks!
Looking for something special? I can help you explore our collections, discover current offers, find a nearby showroom or get assistance with your shopping.
How may I help you today?`;

export const WELCOME_SUGGESTIONS: MessageAction[] = [
  { type: "quick-reply", label: "Explore Collections", query: "Explore Collections" },
  { type: "quick-reply", label: "Current Offers", query: "Current Offers" },
  { type: "quick-reply", label: "Find a Showroom", query: "Find a Showroom" },
  { type: "quick-reply", label: "Contact Our Team", query: "Contact Our Team" },
];

export const FALLBACK_REPLY = `I'm sorry, I couldn't find a confirmed answer to that question.
Our showroom team will be happy to help you with the details.`;

export function formatTime(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").trim();
}

/** Pre-filled text for WhatsApp handoff */
export function buildHandoffText(messages: Array<{ role: string; content: string }>): string {
  const userQueries = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.trim())
    .filter(Boolean);

  const latest = userQueries.at(-1) ?? "";
  const earlier = userQueries.slice(-3, -1);

  const lines = [
    `Hello ${brand.name}, I am contacting you from your website shopping assistant.`,
    "",
    `My question: ${latest}`,
  ];

  if (earlier.length) {
    lines.push("", "Earlier topics:", ...earlier.map((q) => `• ${q}`));
  }

  return lines.join("\n");
}

export function resolveRetailAssistantReply(
  query: string,
  history: Array<{ role: string; content: string }> = [],
): { content: string; actions?: MessageAction[] } {
  const norm = normalize(query);

  // 1. Current Offers / Bumper December Sale
  if (
    norm.includes("offer") ||
    norm.includes("sale") ||
    norm.includes("discount") ||
    norm.includes("bumper") ||
    norm.includes("december") ||
    norm.includes("deal") ||
    norm.includes("promo")
  ) {
    return {
      content: `Our Bumper December Sale is now on! Enjoy exciting offers of up to 80% OFF across selected collections.

Here are some highlights:
• Kids Fashion starting at ₹199
• Men's Fashion starting at ₹299
• Sarees starting at ₹199
• Women's Western starting at ₹199

Visit your nearest Preethi Silks showroom to explore the offers.`,
      actions: [
        { type: "quick-reply", label: "Find a Showroom", query: "Find a Showroom" },
        { type: "quick-reply", label: "Explore Collections", query: "Explore Collections" },
        { type: "quick-reply", label: "Opening Hours", query: "What are your opening hours?" },
      ],
    };
  }

  // 2. Specific Showrooms
  if (norm.includes("feroke")) {
    const loc = keralaShowrooms.find((s) => s.id === "feroke");
    const phone = loc?.phone ?? "9061745999";
    const mapsQuery = encodeURIComponent("Preethi Silks Feroke, Kerala");
    return {
      content: `Preethi Silks — Feroke
Phone: ${phone}
Opening Hours: Monday – Sunday, 9:00 AM – 9:00 PM

We would be delighted to welcome you to our Feroke showroom.`,
      actions: [
        { type: "tel", label: `Call ${phone}`, phone },
        {
          type: "link",
          label: "Google Maps",
          href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
          external: true,
        },
        { type: "quick-reply", label: "Other Showrooms", query: "Where is your showroom?" },
      ],
    };
  }

  if (norm.includes("kondotty")) {
    const loc = keralaShowrooms.find((s) => s.id === "kondotty");
    const phone = loc?.phone ?? "8891367888";
    const mapsQuery = encodeURIComponent("Preethi Silks Kondotty, Kerala");
    return {
      content: `Preethi Silks — Kondotty
Phone: ${phone}
Opening Hours: Monday – Sunday, 9:00 AM – 9:00 PM

We would be delighted to welcome you to our Kondotty showroom.`,
      actions: [
        { type: "tel", label: `Call ${phone}`, phone },
        {
          type: "link",
          label: "Google Maps",
          href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
          external: true,
        },
        { type: "quick-reply", label: "Other Showrooms", query: "Where is your showroom?" },
      ],
    };
  }

  if (norm.includes("malappuram")) {
    const loc = keralaShowrooms.find((s) => s.id === "malappuram");
    const phone = loc?.phone ?? "9645707999";
    const mapsQuery = encodeURIComponent("Preethi Silks Malappuram, Kerala");
    return {
      content: `Preethi Silks — Malappuram
Phone: ${phone}
Opening Hours: Monday – Sunday, 9:00 AM – 9:00 PM

We would be delighted to welcome you to our Malappuram showroom.`,
      actions: [
        { type: "tel", label: `Call ${phone}`, phone },
        {
          type: "link",
          label: "Google Maps",
          href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
          external: true,
        },
        { type: "quick-reply", label: "Other Showrooms", query: "Where is your showroom?" },
      ],
    };
  }

  if (norm.includes("palakkad")) {
    const loc = keralaShowrooms.find((s) => s.id === "palakkad");
    const phone = loc?.phone ?? "9995848299";
    const mapsQuery = encodeURIComponent("Preethi Silks Palakkad, Kerala");
    return {
      content: `Preethi Silks — Palakkad
Phone: ${phone}
Opening Hours: Monday – Sunday, 9:00 AM – 9:00 PM

We would be delighted to welcome you to our Palakkad showroom.`,
      actions: [
        { type: "tel", label: `Call ${phone}`, phone },
        {
          type: "link",
          label: "Google Maps",
          href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
          external: true,
        },
        { type: "quick-reply", label: "Other Showrooms", query: "Where is your showroom?" },
      ],
    };
  }

  if (norm.includes("kuttiady")) {
    const mapsQuery = encodeURIComponent("Preethi Silks Kuttiady, Kerala");
    return {
      content: `Preethi Silks — Kuttiady
Phone: Number to be confirmed
Opening Hours: Monday – Sunday, 9:00 AM – 9:00 PM

We would be delighted to welcome you to our Kuttiady showroom.`,
      actions: [
        {
          type: "link",
          label: "Google Maps",
          href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
          external: true,
        },
        { type: "quick-reply", label: "Other Showrooms", query: "Where is your showroom?" },
      ],
    };
  }

  // 3. General Showrooms / Locations
  if (
    norm.includes("showroom") ||
    norm.includes("store") ||
    norm.includes("where") ||
    norm.includes("location") ||
    norm.includes("branch") ||
    norm.includes("find a showroom") ||
    norm.includes("address") ||
    norm.includes("places")
  ) {
    return {
      content: `We would be happy to welcome you!
We have five showrooms across Kerala. Which location would you like to visit?`,
      actions: [
        { type: "quick-reply", label: "Feroke", query: "Feroke showroom" },
        { type: "quick-reply", label: "Kondotty", query: "Kondotty showroom" },
        { type: "quick-reply", label: "Malappuram", query: "Malappuram showroom" },
        { type: "quick-reply", label: "Palakkad", query: "Palakkad showroom" },
        { type: "quick-reply", label: "Kuttiady", query: "Kuttiady showroom" },
      ],
    };
  }

  // 4. Opening Hours / Timings
  if (
    norm.includes("hour") ||
    norm.includes("timing") ||
    norm.includes("open") ||
    norm.includes("close") ||
    norm.includes("sunday") ||
    norm.includes("time")
  ) {
    return {
      content: `All Preethi Silks showrooms are open every day, Monday to Sunday, from 9:00 AM to 9:00 PM.`,
      actions: [
        { type: "quick-reply", label: "Find a Showroom", query: "Find a Showroom" },
        { type: "quick-reply", label: "Contact Our Team", query: "Contact Our Team" },
      ],
    };
  }

  // 5. Contact / Speak to someone / WhatsApp / Call
  if (
    norm.includes("speak") ||
    norm.includes("talk") ||
    norm.includes("human") ||
    norm.includes("call") ||
    norm.includes("phone") ||
    norm.includes("whatsapp") ||
    norm.includes("contact") ||
    norm.includes("team") ||
    norm.includes("person") ||
    norm.includes("email") ||
    norm.includes("reach") ||
    norm.includes("help")
  ) {
    const waText = buildHandoffText([...history, { role: "user", content: query }]);
    return {
      content: `Certainly! Our team would be happy to assist you.
You can reach us directly on WhatsApp or call ${contact.phone}.`,
      actions: [
        {
          type: "whatsapp",
          label: "Continue on WhatsApp",
          text: waText,
        },
        {
          type: "tel",
          label: `Call ${contact.phone}`,
          phone: contact.phone,
        },
        {
          type: "link",
          label: "Email Us",
          href: `mailto:${contact.email}`,
        },
      ],
    };
  }

  // 6. Collections
  const words = norm.split(/\s+/);
  const isCollectionsQuery =
    norm.includes("collection") ||
    norm.includes("bridal silk") ||
    norm.includes("festive kanchipuram") ||
    norm.includes("handloom") ||
    norm.includes("occasion wear") ||
    norm.includes("contemporary drapes") ||
    norm.includes("what do you sell") ||
    norm.includes("explore") ||
    words.includes("sarees") ||
    words.includes("saree") ||
    words.includes("fabrics");

  if (isCollectionsQuery && !norm.includes("ship") && !norm.includes("deliver") && !norm.includes("online")) {
    return {
      content: `Explore our signature collections crafted for your celebrations:
• Bridal Silks — Exquisite bridal sarees and wedding attire
• Festive Kanchipuram — Pure silk traditions with intricate zari
• Men's Occasion Wear — Kurta sets, dhotis and celebratory wear
• Everyday Handlooms — Pure cottons and handcrafted weaves
• Kids & Family — Festive and everyday styles for all ages
• Contemporary Drapes — Modern silhouettes and lightweight silks

Visit our showrooms to view and experience the full range.`,
      actions: [
        { type: "quick-reply", label: "Current Offers", query: "Current Offers" },
        { type: "quick-reply", label: "Find a Showroom", query: "Find a Showroom" },
        { type: "quick-reply", label: "Contact Our Team", query: "Contact Our Team" },
      ],
    };
  }

  // 7. General Greetings
  if (
    norm === "hi" ||
    norm === "hello" ||
    norm === "hey" ||
    norm === "namaste" ||
    norm === "good morning" ||
    norm === "good afternoon" ||
    norm === "good evening" ||
    norm === "start"
  ) {
    return {
      content: `Hello! Welcome to Preethi Silks. How may I assist your shopping today?`,
      actions: WELCOME_SUGGESTIONS,
    };
  }

  // 8. Polite Fallback for unconfirmed / unknown topics
  const waText = buildHandoffText([...history, { role: "user", content: query }]);
  return {
    content: FALLBACK_REPLY,
    actions: [
      {
        type: "whatsapp",
        label: "Continue on WhatsApp",
        text: waText,
      },
      {
        type: "tel",
        label: `Call ${contact.phone}`,
        phone: contact.phone,
      },
      {
        type: "link",
        label: "Contact Our Team",
        href: "#footer",
      },
    ],
  };
}
