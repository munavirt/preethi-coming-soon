import { useEffect, useRef, useState, type MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { announcement, findStore, navigation } from "@/content/home";

import { Arrow, Pin } from "./art";
import { Logo } from "./primitives";

export function AnnouncementBar() {
  return (
    <aside className="announce" aria-label="Current promotion">
      <span className="announce__dot" aria-hidden="true" />
      <a href={announcement.href}>
        <strong>{announcement.title}</strong>
        <span>{announcement.message}</span>
      </a>
    </aside>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);
  const menuTarget = useRef<string | null>(null);

  // Step out of the way while reading down the page, return on any upward scroll.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) < 8) return;
      setHidden(y > lastY.current && y > 480);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navigation.flatMap((item) => {
      const element = document.querySelector(item.href);
      return element ? [element] : [];
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
          else setActive((current) => (current === `#${entry.target.id}` ? "" : current));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (event: MouseEvent, href: string) => {
    event.preventDefault();
    menuTarget.current = href;
    setOpen(false);
  };

  return (
    <header
      className={`header ${hidden && !open ? "header--away" : ""}`}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="header__inner">
        <Logo className="header__logo" />

        <nav className="nav" aria-label="Main">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav__link"
              aria-current={active === item.href ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href={findStore.href} className="header__cta">
          <Pin className="header__pin" />
          {findStore.label}
        </a>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="menu-btn" aria-label="Open menu">
            <span />
            <span />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content
              className="menu"
              aria-describedby={undefined}
              onCloseAutoFocus={(event) => {
                // Scroll only once the menu has released the page, and keep focus from pulling it back.
                const target = menuTarget.current;
                menuTarget.current = null;
                if (!target) return;
                event.preventDefault();
                window.history.pushState(null, "", target);
                requestAnimationFrame(() => document.querySelector(target)?.scrollIntoView());
              }}
            >
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <div className="menu__top">
                <Logo />
                <Dialog.Close className="menu__close">Close</Dialog.Close>
              </div>
              <nav className="menu__links" aria-label="Mobile">
                {navigation.map((item) => (
                  <a key={item.href} href={item.href} onClick={(event) => goTo(event, item.href)}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <a
                href={findStore.href}
                className="cta cta--primary"
                onClick={(event) => goTo(event, findStore.href)}
              >
                <span>{findStore.label}</span>
                <Arrow className="cta__arrow" />
              </a>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
