import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";

import { VideoShowcase } from "@/components/home/VideoShowcase";

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("VideoShowcase / A Closer Look at Preethi", () => {
  it("renders section heading and supporting description", () => {
    render(<VideoShowcase />);

    expect(screen.getByRole("heading", { name: /A Closer Look at Preethi/i })).toBeDefined();
    expect(
      screen.getByText(
        /Discover our collections, craftsmanship and the experience that makes every visit special./i,
      ),
    ).toBeDefined();
  });

  it("renders four autoplay video cards with required attributes", () => {
    const { container } = render(<VideoShowcase />);

    const videos = container.querySelectorAll<HTMLVideoElement>("video.vs__video");
    expect(videos.length).toBe(4);

    videos.forEach((video) => {
      expect(video.autoplay).toBe(true);
      expect(video.muted).toBe(true);
      expect(video.loop).toBe(true);
      expect(video.getAttribute("playsinline")).not.toBeNull();
      expect(video.getAttribute("preload")).toBe("metadata");
      expect(video.getAttribute("controls")).toBeNull();
    });

    // Check that each video has a distinct source matching video-1 through video-4
    const sources = Array.from(videos).map((v) => v.getAttribute("src") || "");
    expect(sources.some((s) => s.includes("video-1"))).toBe(true);
    expect(sources.some((s) => s.includes("video-2"))).toBe(true);
    expect(sources.some((s) => s.includes("video-3"))).toBe(true);
    expect(sources.some((s) => s.includes("video-4"))).toBe(true);
  });

  it("removes all text overlays and captions from individual cards", () => {
    render(<VideoShowcase />);

    // Individual card titles must be removed
    expect(screen.queryByText("The Preethi Experience")).toBeNull();
    expect(screen.queryByText("Silk Collection")).toBeNull();
    expect(screen.queryByText("Latest Collections")).toBeNull();
    expect(screen.queryByText("Bumper December Sale")).toBeNull();
    expect(screen.queryByText("80% OFF")).toBeNull();
    expect(screen.queryByText("Step inside our showrooms.")).toBeNull();
    expect(screen.queryByText("FIND A STORE")).toBeNull();
    expect(screen.queryByText("EXPLORE COLLECTION")).toBeNull();
  });
});
