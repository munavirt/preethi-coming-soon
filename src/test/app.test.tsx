import { render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";

import App from "@/App";

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("App", () => {
  it("renders the Preethi Silks homepage with main sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Celebrate Every Moment/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /A Closer Look at Preethi/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /Explore our collections/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /A Preethi Silks Experience/i })).toBeDefined();
    expect(screen.queryByRole("heading", { name: /We’re happy to help/i })).toBeNull();
  });

  it("does not render find a store button in hero section", () => {
    render(<App />);

    const heroTitle = screen.getByRole("heading", { name: /Celebrate Every Moment/i });
    const heroSection = heroTitle.closest("section") as HTMLElement;
    expect(within(heroSection).queryByRole("link", { name: /find a store/i })).toBeNull();
  });

  it("does not render explore buttons on collection cards in explore our collections section", () => {
    render(<App />);

    const collectionsHeading = screen.getByRole("heading", { name: /Explore our collections/i });
    const collectionsSection = collectionsHeading.closest("section") as HTMLElement;
    expect(within(collectionsSection).queryByRole("link", { name: /explore/i })).toBeNull();
    expect(within(collectionsSection).queryByText(/^Explore$/i)).toBeNull();
  });

  it("renders real dummy data in the footer without 'to be confirmed' placeholders", () => {
    render(<App />);

    const footer = document.querySelector("footer");
    expect(footer).not.toBeNull();
    expect(within(footer!).queryByText(/to be confirmed/i)).toBeNull();
    expect(within(footer!).getByText("9072210999")).toBeDefined();
    expect(within(footer!).getByRole("link", { name: "9072210999" }).getAttribute("href")).toBe("tel:9072210999");
    expect(within(footer!).getByText("info@preethisilks.in")).toBeDefined();
    expect(within(footer!).getByRole("link", { name: "info@preethisilks.in" }).getAttribute("href")).toBe("mailto:info@preethisilks.in");
    expect(within(footer!).getByText(/Feroke, Kozhikode/i)).toBeDefined();
    expect(within(footer!).getByRole("link", { name: "Instagram" })).toBeDefined();
    const creditLink = within(footer!).getByRole("link", { name: "Promocraft" });
    expect(creditLink.getAttribute("href")).toBe("https://www.promocraft.in/");
    expect(creditLink.getAttribute("target")).toBe("_blank");

    // Standalone heritage section is removed; shopping walk is directly inside the footer
    expect(document.querySelector(".heritage")).toBeNull();
    const footerWalk = footer!.querySelector(".shopping-walk");
    expect(footerWalk).not.toBeNull();
    expect(footerWalk!.querySelector(".shopping-walk__mover")).not.toBeNull();
    expect(footerWalk!.querySelector(".shopping-walk__character")).not.toBeNull();

    // Verify ordering: footer__grid -> shopping-walk -> footer__base
    const footerChildren = Array.from(footer!.children);
    const gridIndex = footerChildren.findIndex((el) => el.classList.contains("footer__grid"));
    const walkIndex = footerChildren.findIndex((el) => el.classList.contains("shopping-walk"));
    const baseIndex = footerChildren.findIndex((el) => el.classList.contains("footer__base"));
    expect(gridIndex).toBeGreaterThanOrEqual(0);
    expect(walkIndex).toBeGreaterThan(gridIndex);
    expect(baseIndex).toBeGreaterThan(walkIndex);
  });

  it("renders the offers image with a tall editorial rectangular presentation in the exclusive store offers section", () => {
    render(<App />);

    const offersSection = document.getElementById("offers");
    expect(offersSection).not.toBeNull();
    const imageContainer = offersSection!.querySelector(".offers__arch");
    expect(imageContainer).not.toBeNull();
    const img = offersSection!.querySelector(".offers__drift img") as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.getAttribute("data-offers")).toBe("photo");
  });

  it("renders Bumper December promotion details in the exclusive store offers section", () => {
    render(<App />);

    const offersSection = document.getElementById("offers");
    expect(offersSection).not.toBeNull();
    expect(within(offersSection!).getByRole("heading", { name: /Bumper December/i })).toBeDefined();
    expect(within(offersSection!).getAllByText(/Up to/i).length).toBeGreaterThan(0);
    expect(within(offersSection!).getAllByText(/80% OFF/i).length).toBeGreaterThan(0);
    expect(within(offersSection!).getByText("Kids Fashion")).toBeDefined();
    expect(within(offersSection!).getByText("Men's Fashion")).toBeDefined();
    expect(within(offersSection!).getByText("Sarees")).toBeDefined();
    expect(within(offersSection!).getByText("Women's Western")).toBeDefined();
    expect(within(offersSection!).getByText("November 15 – December 31")).toBeDefined();
    expect(within(offersSection!).getByRole("link", { name: /Visit a Showroom/i })).toBeDefined();
    expect(
      within(offersSection!).getAllByText(/BUMPER DECEMBER.*UP TO 80% OFF/i).length,
    ).toBeGreaterThan(0);
    expect(
      within(offersSection!).getAllByText(/BUMPER DECEMBER.*UP TO 80% OFF/i).length,
    ).toBeGreaterThan(0);
  });

  it("renders the updated Bumper December announcement bar linking to #offers", () => {
    render(<App />);

    const announce = document.querySelector(".announce");
    expect(announce).not.toBeNull();
    const link = announce!.querySelector("a");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("#offers");
    expect(
      within(announce as HTMLElement).getByText(/BUMPER DECEMBER — UP TO 80% OFF!/i),
    ).toBeDefined();
    expect(
      within(announce as HTMLElement).getByText(
        /November 15 – December 31 \| Explore Exclusive Offers/i,
      ),
    ).toBeDefined();
  });

  it("renders desktop and mobile navigation links with correct section IDs", () => {
    render(<App />);

    const nav = document.querySelector("nav.nav");
    expect(nav).not.toBeNull();

    const links = within(nav as HTMLElement).getAllByRole("link");
    expect(links.length).toBe(5);

    // Verify exact order and labels: Discover, Collections, Offers, Stories, Stores
    const linkTexts = links.map((l) => l.textContent);
    const linkHrefs = links.map((l) => l.getAttribute("href"));
    expect(linkTexts).toEqual(["Discover", "Collections", "Offers", "Stories", "Stores"]);
    expect(linkHrefs).toEqual(["#discover", "#collections", "#offers", "#stories", "#stores"]);

    // Verify "About" and "Our" are removed from navigation
    expect(within(nav as HTMLElement).queryByRole("link", { name: /About/i })).toBeNull();
    expect(within(nav as HTMLElement).queryByRole("link", { name: /Our/i })).toBeNull();

    // Verify all targeted sections exist with matching IDs
    expect(document.getElementById("discover")).not.toBeNull();
    expect(document.getElementById("collections")).not.toBeNull();
    expect(document.getElementById("offers")).not.toBeNull();
    expect(document.getElementById("stories")).not.toBeNull();
    expect(document.getElementById("stores")).not.toBeNull();

    // Verify header cta "Find a Store" points to #stores
    const findStoreBtn = document.querySelector(".header__cta");
    expect(findStoreBtn).not.toBeNull();
    expect(findStoreBtn!.getAttribute("href")).toBe("#stores");
  });
});
