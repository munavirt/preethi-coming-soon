import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ChatWidget } from "@/components/home/ChatWidget";
import { WELCOME_MESSAGE } from "@/lib/chat-assistant";

describe("ChatWidget — Retail Shopping Assistant", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders launcher and opens with brand welcome message and quick-action suggestions", () => {
    render(<ChatWidget />);

    const launcher = screen.getByRole("button", { name: /Chat with Preethi Silks/i });
    expect(launcher).toBeDefined();

    fireEvent.click(launcher);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();

    // Verify header branding
    expect(within(dialog).getByText("Preethi Silks")).toBeDefined();
    expect(within(dialog).getByText(/Retail Shopping Assistant/i)).toBeDefined();

    // Verify welcome message
    expect(within(dialog).getByText(/Welcome to Preethi Silks!/i)).toBeDefined();
    expect(within(dialog).getByText(/Looking for something special\?/i)).toBeDefined();
    expect(within(dialog).getByText(/How may I help you today\?/i)).toBeDefined();

    // Verify 4 quick-action suggestions
    expect(within(dialog).getByRole("button", { name: "Explore Collections" })).toBeDefined();
    expect(within(dialog).getByRole("button", { name: "Current Offers" })).toBeDefined();
    expect(within(dialog).getByRole("button", { name: "Find a Showroom" })).toBeDefined();
    expect(within(dialog).getByRole("button", { name: "Contact Our Team" })).toBeDefined();
  });

  it("answers 'Current Offers' with Bumper December campaign highlights", async () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole("button", { name: /Chat with Preethi Silks/i }));

    const dialog = screen.getByRole("dialog");
    const offersButton = within(dialog).getByRole("button", { name: "Current Offers" });
    fireEvent.click(offersButton);

    await waitFor(() => {
      expect(within(dialog).getByText(/Our Bumper December Sale is now on!/i)).toBeDefined();
    });

    expect(within(dialog).getByText(/up to 80% OFF/i)).toBeDefined();
    expect(within(dialog).getByText(/Kids Fashion starting at ₹199/i)).toBeDefined();
    expect(within(dialog).getByText(/Men's Fashion starting at ₹299/i)).toBeDefined();
    expect(within(dialog).getByText(/Sarees starting at ₹199/i)).toBeDefined();
    expect(within(dialog).getByText(/Women's Western starting at ₹199/i)).toBeDefined();
  });

  it("answers 'Find a Showroom' with Kerala locations and interactive options", async () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole("button", { name: /Chat with Preethi Silks/i }));

    const dialog = screen.getByRole("dialog");
    const showroomButton = within(dialog).getByRole("button", { name: "Find a Showroom" });
    fireEvent.click(showroomButton);

    await waitFor(() => {
      expect(within(dialog).getByText(/We have five showrooms across Kerala/i)).toBeDefined();
    });

    // Check interactive showroom options
    const ferokeChip = within(dialog).getByRole("button", { name: "Feroke" });
    const kondottyChip = within(dialog).getByRole("button", { name: "Kondotty" });
    const malappuramChip = within(dialog).getByRole("button", { name: "Malappuram" });
    const palakkadChip = within(dialog).getByRole("button", { name: "Palakkad" });
    const kuttiadyChip = within(dialog).getByRole("button", { name: "Kuttiady" });

    expect(ferokeChip).toBeDefined();
    expect(kondottyChip).toBeDefined();
    expect(malappuramChip).toBeDefined();
    expect(palakkadChip).toBeDefined();
    expect(kuttiadyChip).toBeDefined();

    // Click Feroke
    fireEvent.click(ferokeChip);

    await waitFor(() => {
      expect(within(dialog).getByText(/Preethi Silks — Feroke/i)).toBeDefined();
    });

    expect(within(dialog).getByText(/Phone: 9061745999/i)).toBeDefined();
    expect(within(dialog).getAllByText(/Monday – Sunday, 9:00 AM – 9:00 PM/i).length).toBeGreaterThan(0);

    // Verify Feroke call link and Google Maps link
    const callLink = within(dialog).getByRole("link", { name: /Call 9061745999/i });
    expect(callLink.getAttribute("href")).toBe("tel:9061745999");
    const mapsLink = within(dialog).getByRole("link", { name: /Google Maps/i });
    expect(mapsLink.getAttribute("href")).toContain("google.com/maps/search");

    // Click Kuttiady
    const otherKuttiadyBtn = within(dialog).getByRole("button", { name: "Kuttiady" });
    fireEvent.click(otherKuttiadyBtn);

    await waitFor(() => {
      expect(within(dialog).getByText(/Preethi Silks — Kuttiady/i)).toBeDefined();
    });

    expect(within(dialog).getByText(/Phone: Number to be confirmed/i)).toBeDefined();
    expect(within(dialog).getAllByText(/Monday – Sunday, 9:00 AM – 9:00 PM/i).length).toBe(2);
  });

  it("answers opening-hour questions accurately", async () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole("button", { name: /Chat with Preethi Silks/i }));

    const dialog = screen.getByRole("dialog");
    const input = within(dialog).getByPlaceholderText(/Ask about collections/i);
    const sendBtn = within(dialog).getByRole("button", { name: "Send message" });

    fireEvent.change(input, { target: { value: "What are your opening hours?" } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(
        within(dialog).getByText(
          "All Preethi Silks showrooms are open every day, Monday to Sunday, from 9:00 AM to 9:00 PM.",
        ),
      ).toBeDefined();
    });
  });

  it("answers 'Can I speak to someone?' with WhatsApp and phone contact options", async () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole("button", { name: /Chat with Preethi Silks/i }));

    const dialog = screen.getByRole("dialog");
    const contactBtn = within(dialog).getByRole("button", { name: "Contact Our Team" });
    fireEvent.click(contactBtn);

    await waitFor(() => {
      expect(within(dialog).getByText(/Certainly! Our team would be happy to assist you/i)).toBeDefined();
    });

    expect(within(dialog).getByText(/You can reach us directly on WhatsApp or call 9072210999/i)).toBeDefined();

    // Verify WhatsApp and phone links
    const waLink = within(dialog).getByRole("link", { name: /Continue on WhatsApp/i });
    expect(waLink.getAttribute("href")).toContain("wa.me");
    const phoneLink = within(dialog).getByRole("link", { name: /Call 9072210999/i });
    expect(phoneLink.getAttribute("href")).toBe("tel:9072210999");
  });

  it("answers 'Explore Collections' with verified collection categories", async () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole("button", { name: /Chat with Preethi Silks/i }));

    const dialog = screen.getByRole("dialog");
    const collectionsBtn = within(dialog).getByRole("button", { name: "Explore Collections" });
    fireEvent.click(collectionsBtn);

    await waitFor(() => {
      expect(within(dialog).getByText(/Explore our signature collections/i)).toBeDefined();
    });

    expect(within(dialog).getByText(/Bridal Silks/i)).toBeDefined();
    expect(within(dialog).getByText(/Festive Kanchipuram/i)).toBeDefined();
    expect(within(dialog).getByText(/Men's Occasion Wear/i)).toBeDefined();
    expect(within(dialog).getByText(/Everyday Handlooms/i)).toBeDefined();
    expect(within(dialog).getByText(/Kids & Family/i)).toBeDefined();
    expect(within(dialog).getByText(/Contemporary Drapes/i)).toBeDefined();
  });

  it("provides polite retail fallback for unknown/unconfirmed questions without technical errors", async () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole("button", { name: /Chat with Preethi Silks/i }));

    const dialog = screen.getByRole("dialog");
    const input = within(dialog).getByPlaceholderText(/Ask about collections/i);
    const sendBtn = within(dialog).getByRole("button", { name: "Send message" });

    fireEvent.change(input, { target: { value: "Can you ship a custom silk hat to London tomorrow?" } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(
        within(dialog).getByText(/I'm sorry, I couldn't find a confirmed answer to that question/i),
      ).toBeDefined();
    });

    expect(
      within(dialog).getByText(/Our showroom team will be happy to help you with the details/i),
    ).toBeDefined();

    // Verify generic error is NEVER shown
    expect(within(dialog).queryByText(/Our assistant isn’t available right now/i)).toBeNull();

    // Verify fallback action buttons
    expect(within(dialog).getByRole("link", { name: /Continue on WhatsApp/i })).toBeDefined();
    expect(within(dialog).getByRole("link", { name: /Contact Our Team/i })).toBeDefined();
  });

  it("resets conversation when clicking 'New Chat'", async () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole("button", { name: /Chat with Preethi Silks/i }));

    const dialog = screen.getByRole("dialog");
    const offersBtn = within(dialog).getByRole("button", { name: "Current Offers" });
    fireEvent.click(offersBtn);

    await waitFor(() => {
      expect(within(dialog).getByText(/Our Bumper December Sale is now on!/i)).toBeDefined();
    });

    const newChatBtn = within(dialog).getByRole("button", { name: /New Chat/i });
    fireEvent.click(newChatBtn);

    // After new chat, messages are cleared and initial welcome experience is shown again
    expect(within(dialog).queryByText(/Our Bumper December Sale is now on!/i)).toBeNull();
    expect(within(dialog).getByText(/Welcome to Preethi Silks!/i)).toBeDefined();
    expect(within(dialog).getByRole("button", { name: "Explore Collections" })).toBeDefined();
  });
});
