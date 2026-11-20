import { useEffect, type RefObject } from "react";

type GSAP = typeof import("gsap").gsap;

/** Matches the delay on `hero-fallback` in home.css. */
const HERO_FALLBACK_MS = 2200;

/**
 * Quiet effects, each played once: the hero composes itself on load, photographs
 * open as they arrive and short text settles into place.
 * With reduced motion on, none of this loads into the page's behaviour.
 */
function playHeroEntrance(gsap: GSAP, page: HTMLElement) {
  const hero = page.querySelector<HTMLElement>(".hero");
  if (!hero) return;
  // The stylesheet holds these hidden until this class arrives, or until its fallback timer.
  hero.classList.add("hero--live");
  if (performance.now() > HERO_FALLBACK_MS) return;

  const parts = (name: string) => hero.querySelectorAll(`[data-hero="${name}"]`);
  const fades = parts("fade");
  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    // The photograph opens from its left edge, where it meets the headline.
    .from(
      parts("photo"),
      {
        clipPath: "inset(0% 0% 0% 100%)",
        duration: 1.4,
        ease: "power3.inOut",
        clearProps: "clipPath",
      },
      0,
    )
    .from(hero.querySelector(".hero__photo img"), { scale: 1.1, duration: 2, clearProps: "all" }, 0)
    .from(fades[0] ?? [], { autoAlpha: 0, y: 12, duration: 0.6, clearProps: "all" }, 0.2)
    .from(parts("line"), { yPercent: 105, duration: 1, stagger: 0.12, clearProps: "all" }, 0.3)
    .from(fades[1] ?? [], { autoAlpha: 0, y: 14, duration: 0.8, clearProps: "all" }, 0.8);
}

/**
 * The sale band: the marquee rises in, the arch opens from below while the silk settles,
 * then the heading, offers and button follow in order. It plays once, the first time the
 * band comes into view; only the silk's slow drift follows scrolling after that.
 */
function playOffers(gsap: GSAP, page: HTMLElement) {
  const band = page.querySelector<HTMLElement>(".offers");
  if (!band) return;
  const parts = (name: string) => band.querySelectorAll(`[data-offers="${name}"]`);

  gsap.from(parts("marquee"), {
    yPercent: 30,
    autoAlpha: 0,
    duration: 1.2,
    ease: "power3.out",
    clearProps: "all",
    scrollTrigger: { trigger: band, start: "top 85%", once: true },
  });

  gsap
    .timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: band.querySelector(".offers__grid"), start: "top 75%", once: true },
    })
    .from(parts("arch"), {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.3,
      ease: "power3.inOut",
      clearProps: "clipPath",
    })
    .from(parts("photo"), { scale: 1.25, duration: 1.8 }, 0)
    .from(parts("fade")[0] ?? [], { autoAlpha: 0, y: 14, duration: 0.6, clearProps: "all" }, 0.35)
    .from(parts("line"), { yPercent: 110, duration: 1, stagger: 0.12, clearProps: "all" }, 0.4)
    .from(parts("fade")[1] ?? [], { autoAlpha: 0, y: 14, duration: 0.6, clearProps: "all" }, 0.7)
    .from(
      parts("rule"),
      { scaleX: 0, duration: 0.8, stagger: 0.1, ease: "power2.inOut", clearProps: "all" },
      0.75,
    )
    .from(
      parts("row"),
      { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.1, clearProps: "all" },
      0.85,
    )
    .from(parts("fade")[2] ?? [], { autoAlpha: 0, y: 14, duration: 0.6, clearProps: "all" }, 1.25);

  gsap.fromTo(
    parts("drift"),
    { yPercent: -5 },
    {
      yPercent: 5,
      ease: "none",
      scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}

function playVideoShowcase(gsap: GSAP, page: HTMLElement) {
  const showcase = page.querySelector<HTMLElement>(".vs");
  if (!showcase) return;
  const cards = showcase.querySelectorAll<HTMLElement>(".vs__card");
  if (!cards.length) return;

  gsap.from(cards, {
    y: 26,
    autoAlpha: 0,
    duration: 0.85,
    stagger: 0.1,
    ease: "power2.out",
    clearProps: "all",
    scrollTrigger: {
      trigger: showcase.querySelector(".vs__track") ?? showcase,
      start: "top 85%",
      once: true,
    },
  });
}

/** The closing text settles, then the illustration fades in with each figure following gently. */
function playClosing(gsap: GSAP, page: HTMLElement) {
  const section = page.querySelector<HTMLElement>(".close");
  if (!section) return;
  gsap
    .timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: { trigger: section, start: "top 75%", once: true },
    })
    .from(section.querySelectorAll('[data-close="text"]'), {
      autoAlpha: 0,
      y: 16,
      duration: 0.8,
      stagger: 0.12,
      clearProps: "all",
    })
    .from(
      section.querySelector('[data-close="art"]'),
      { autoAlpha: 0, y: 14, duration: 1, clearProps: "all" },
      0.15,
    )
    .from(
      section.querySelectorAll('[data-ill="person"]'),
      { autoAlpha: 0, y: 8, duration: 0.7, stagger: 0.12, clearProps: "all" },
      0.45,
    );
}

export function useHomeMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;

    let disposed = false;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);

        const media = gsap.matchMedia(page);
        media.add("(prefers-reduced-motion: no-preference)", () => {
          playHeroEntrance(gsap, page);
          playVideoShowcase(gsap, page);
          playOffers(gsap, page);
          playClosing(gsap, page);

          gsap.utils.toArray<HTMLElement>("[data-clip]", page).forEach((frame) => {
            const scrollTrigger = { trigger: frame, start: "top 86%", once: true };
            gsap.from(frame, {
              clipPath: "inset(0 0 100% 0)",
              duration: 1,
              ease: "power2.inOut",
              clearProps: "clipPath",
              scrollTrigger,
            });
            const image = frame.querySelector("img");
            if (image) {
              gsap.from(image, {
                scale: 1.05,
                duration: 1.3,
                ease: "power2.out",
                clearProps: "transform",
                scrollTrigger,
              });
            }
          });

          gsap.utils.toArray<HTMLElement>("[data-reveal]", page).forEach((element) => {
            gsap.from(element, {
              y: 16,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
            });
          });
        });

        void document.fonts?.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        cleanup = () => media.revert();
      },
    );

    return () => {
      disposed = true;
      cleanup();
    };
  }, [root]);
}
