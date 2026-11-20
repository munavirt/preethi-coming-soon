import { useRef } from "react";

import { ChatWidget } from "@/components/home/ChatWidget";
import { PromotionalAnnouncement } from "@/components/home/PromotionalAnnouncement";
import { Stores } from "@/components/home/Stores";
import {
  ClosingCta,
  Collections,
  FestivalOffers,
  Hero,
  Highlights,
  SeasonalStories,
  SiteFooter,
} from "@/components/home/sections";
import { AnnouncementBar, SiteHeader } from "@/components/home/SiteHeader";
import { useHomeMotion } from "@/components/home/useHomeMotion";
import { VideoShowcase } from "@/components/home/VideoShowcase";

export function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  useHomeMotion(pageRef);

  return (
    <>
      <div ref={pageRef} id="top" className="home">
        <a href="#main" className="skip">
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main">
          <Hero />
          <VideoShowcase />
          <Collections />
          <FestivalOffers />
          <Highlights />
          <SeasonalStories />
          <Stores />
          <ClosingCta />
        </main>
        <SiteFooter />
      </div>
      <ChatWidget />
      <PromotionalAnnouncement />
    </>
  );
}

export default App;
