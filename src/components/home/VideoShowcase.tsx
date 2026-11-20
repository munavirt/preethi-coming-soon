import { useEffect, useRef } from "react";

import poster1 from "@/assets/videos/poster-1.jpg";
import poster2 from "@/assets/videos/poster-2.jpg";
import poster3 from "@/assets/videos/poster-3.jpg";
import poster4 from "@/assets/videos/poster-4.jpg";
import video1 from "@/assets/videos/video-1.mp4";
import video2 from "@/assets/videos/video-2.mp4";
import video3 from "@/assets/videos/video-3.mp4";
import video4 from "@/assets/videos/video-4.mp4";
import { videoShowcase } from "@/content/home";

import { Eyebrow } from "./primitives";

export interface ShowcaseVideoCard {
  src: string;
  poster: string;
  alt: string;
  objectPosition?: string;
}

const videos: ShowcaseVideoCard[] = [
  {
    src: video1,
    poster: poster1,
    alt: "Preethi Silks fashion showcase — ethnic wear in wine silk",
    objectPosition: "center",
  },
  {
    src: video2,
    poster: poster2,
    alt: "Preethi Silks showroom showcase — curated collection racks",
    objectPosition: "center",
  },
  {
    src: video3,
    poster: poster3,
    alt: "Preethi Silks designer collection — dusty rose ensemble",
    objectPosition: "center",
  },
  {
    src: video4,
    poster: poster4,
    alt: "Preethi Silks contemporary fashion — turquoise blue occasion wear",
    objectPosition: "center",
  },
];

function VideoCard({ item, index }: { item: ShowcaseVideoCard; index: number }) {
  const cardRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    // Direct attempt to play muted video
    const attemptPlay = () => {
      video.muted = true;
      if (video.paused) {
        void video.play().catch(() => {
          // Handled gracefully if browser restricts autoplay before user interaction
        });
      }
    };

    // IntersectionObserver: play when entering viewport, pause when leaving
    // Avoid resetting currentTime on scroll so videos flow naturally
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            attemptPlay();
          } else {
            video.pause();
          }
        },
        { threshold: 0.15, rootMargin: "180px 0px" },
      );
      observer.observe(card);
    } else {
      attemptPlay();
    }

    // Fallback: If autoplay was initially restricted by browser power mode,
    // retry playback upon the user's first interaction anywhere on the page.
    const onFirstInteraction = () => {
      attemptPlay();
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("scroll", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };
  }, []);

  return (
    <li ref={cardRef} className="vs__card" data-vs-card>
      <video
        ref={videoRef}
        className="vs__video"
        src={item.src}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.alt}
        style={{ objectPosition: item.objectPosition ?? "center" }}
      />
    </li>
  );
}

export function VideoShowcase() {
  return (
    <section id="discover" className="vs section" aria-labelledby="vs-title">
      <header className="vs__head" data-reveal>
        <div>
          <Eyebrow>{videoShowcase.kicker}</Eyebrow>
          <h2 id="vs-title">{videoShowcase.title}</h2>
        </div>
        <p className="lede">{videoShowcase.body}</p>
      </header>

      <ul className="vs__track" data-reveal>
        {videos.map((item, index) => (
          <VideoCard key={item.src} item={item} index={index} />
        ))}
      </ul>
    </section>
  );
}
