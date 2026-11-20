import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  PROMO_STORAGE_KEY,
  PromotionalAnnouncement,
} from "@/components/home/PromotionalAnnouncement";

describe("PromotionalAnnouncement", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("renders the promotional poster immediately on first visit", () => {
    render(<PromotionalAnnouncement />);

    const dialog = screen.getByRole("dialog", {
      name: /Bumper December Sale Promotional Announcement/i,
    });
    expect(dialog).toBeDefined();

    const image = screen.getByRole("img", {
      name: /Preethi Silks Bumper December Sale/i,
    }) as HTMLImageElement;
    expect(image).toBeDefined();
    expect(image.getAttribute("src")).toContain("offer.jpeg");

    const closeBtn = screen.getByRole("button", {
      name: /Close promotional announcement/i,
    });
    expect(closeBtn).toBeDefined();
  });

  it("does not render when the visitor has already seen the announcement", () => {
    localStorage.setItem(PROMO_STORAGE_KEY, "true");

    render(<PromotionalAnnouncement />);

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes when the close button is clicked and stores flag in localStorage", () => {
    render(<PromotionalAnnouncement />);

    const closeBtn = screen.getByRole("button", {
      name: /Close promotional announcement/i,
    });
    fireEvent.click(closeBtn);

    expect(localStorage.getItem(PROMO_STORAGE_KEY)).toBe("true");

    // Advance fade-out animation timer
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes when Escape key is pressed", () => {
    render(<PromotionalAnnouncement />);

    expect(screen.getByRole("dialog")).toBeDefined();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(localStorage.getItem(PROMO_STORAGE_KEY)).toBe("true");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("automatically closes after 3 seconds", () => {
    render(<PromotionalAnnouncement />);

    expect(screen.getByRole("dialog")).toBeDefined();

    // Advance 3 seconds (auto-dismiss delay) + 300ms fade-out
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(localStorage.getItem(PROMO_STORAGE_KEY)).toBe("true");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
