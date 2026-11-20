import {
  brand,
  campaign,
  closing,
  collections,
  collectionsIntro,
  contact,
  findStore,
  footer,
  highlights,
  offers,
  seasonal,
} from "@/content/home";

import { CollectionCarousel } from "./CollectionCarousel";
import { FamilyIllustration } from "./FamilyIllustration";
import { Cta, Eyebrow, Logo, Photo, Tbc } from "./primitives";
import { ShoppingWalk } from "./ShoppingWalk";

export function Hero() {
  const { headline } = campaign;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__photo" data-hero="photo">
        <img
          src={campaign.image.src}
          alt={campaign.image.alt}
          width={campaign.image.width}
          height={campaign.image.height}
          fetchPriority="high"
        />
      </div>

      <div className="hero__copy">
        <p className="eyebrow hero__label" data-hero="fade">
          {campaign.label}
        </p>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__mask hero__big">
            <span data-hero="line">{headline.big} </span>
          </span>
          <span className="hero__mask hero__mid">
            <span data-hero="line">
              <em>{headline.middle}</em>{" "}
            </span>
          </span>
          <span className="hero__mask hero__end">
            <span data-hero="line">
              {headline.lead} <em>{headline.accent}</em>
            </span>
          </span>
        </h1>
        <div className="hero__body" data-hero="fade">
          <p className="lede">{campaign.body}</p>
          <div className="hero__actions">
            <Cta link={campaign.cta} />
          </div>
        </div>
      </div>

      <p className="hero__index" aria-hidden="true">
        {campaign.index.join("  ·  ")}
      </p>
    </section>
  );
}

export function Collections() {
  return (
    <section id="collections" className="cc" aria-labelledby="cc-title">
      <header className="cc__head" data-reveal>
        <h2 id="cc-title">{collectionsIntro.title}</h2>
        <p>{collectionsIntro.body}</p>
      </header>
      <CollectionCarousel items={collections} />
    </section>
  );
}

export function FestivalOffers() {
  // Two identical halves: the track slides by exactly one half, so the loop has no seam.
  const half = (copy: number) => (
    <div className="offers__group" key={copy}>
      {[0, 1, 2, 3].map((index) => (
        <span key={index} className="offers__word">
          {offers.marquee}
        </span>
      ))}
    </div>
  );

  return (
    <section id="offers" className="offers" aria-labelledby="offers-title">
      <div className="offers__marquee" aria-hidden="true" data-offers="marquee">
        <div className="offers__track">{[0, 1].map(half)}</div>
      </div>

      <div className="offers__grid">
        <div className="offers__arch" data-offers="arch">
          <div className="offers__drift" data-offers="drift">
            <img
              src={offers.image.src}
              alt={offers.image.alt}
              width={offers.image.width}
              height={offers.image.height}
              loading="lazy"
              decoding="async"
              data-offers="photo"
            />
          </div>
        </div>

        <div className="offers__content">
          <p className="offers__kicker" data-offers="fade">
            {offers.kicker}
          </p>
          <h2 id="offers-title">
            <span className="offers__mask">
              <span data-offers="line">{offers.title}</span>
            </span>
            <span className="offers__mask">
              <span data-offers="line">
                <em>{offers.highlightLead}</em> {offers.highlight}
              </span>
            </span>
          </h2>
          <p className="offers__body" data-offers="fade">
            {offers.body}
          </p>

          <ol className="offers__list">
            {offers.items.map((offer, index) => (
              <li key={offer.title}>
                <span className="offers__rule" data-offers="rule" aria-hidden="true" />
                <span className="offers__row" data-offers="row">
                  <span className="offers__num">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{offer.title}</strong>
                    <small>{offer.detail ?? <Tbc>Offer details to be confirmed</Tbc>}</small>
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="offers__foot" data-offers="fade">
            <Cta link={offers.cta} variant="light" />
            <p>{offers.validity ?? <Tbc>Sale dates to be confirmed</Tbc>}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Highlights() {
  return (
    <section id="about" className="fh section" aria-labelledby="fh-title">
      <header className="fh__head" data-reveal>
        <div>
          <Eyebrow>{highlights.kicker}</Eyebrow>
          <h2 id="fh-title">{highlights.title}</h2>
        </div>
        <a className="text-link" href={highlights.cta.href}>
          {highlights.cta.label}
        </a>
      </header>
      <ul className="fh__grid">
        {highlights.items.map((item) => (
          <li key={item.label}>
            <a href={highlights.itemHref} className="zoom">
              <Photo image={item.image} className="fh__photo" />
              <span className="fh__name">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SeasonalStories() {
  const { wedding, festive } = seasonal;
  return (
    <section id="stories" className="season section" aria-labelledby="season-title">
      <h2 id="season-title" data-reveal>
        {seasonal.title}
      </h2>
      <div className="season__grid">
        <a href={wedding.href} className="season__lead zoom">
          <Photo image={wedding.image} className="season__main" />
          <span className="season__name">{wedding.title}</span>
        </a>
        <div className="season__side">
          <div data-reveal>
            <p className="season__quote">{seasonal.quote}</p>
            <p className="season__body">{seasonal.body}</p>
          </div>
          <a href={festive.href} className="zoom">
            <Photo image={festive.image} className="season__small" />
            <span className="season__name season__name--small">{festive.title}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** A quiet closing moment before the footer: the message, with a small family illustration. */
export function ClosingCta() {
  return (
    <section className="close" aria-labelledby="close-title">
      <div className="close__text">
        <h2 id="close-title" data-close="text">
          {closing.title}
        </h2>
        <p className="close__body" data-close="text">
          {closing.body}
        </p>
      </div>
      <div className="close__art" data-close="art">
        <FamilyIllustration />
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer id="footer" className="footer" aria-label="Site Footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>{brand.description}</p>
        </div>

        <nav aria-label="Collections">
          <h2>Collections</h2>
          <ul>
            {collections.map((item) => (
              <li key={item.title}>
                <a href="#collections">{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Preethi Silks">
          <h2>Preethi Silks</h2>
          <ul>
            {footer.company.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Contact</h2>
          <ul>
            <li>
              {contact.phone ? (
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>{contact.phone}</a>
              ) : (
                <Tbc>Phone to be confirmed</Tbc>
              )}
            </li>
            <li>
              {contact.email ? (
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              ) : (
                <Tbc>Email to be confirmed</Tbc>
              )}
            </li>
            <li>{contact.address ?? <Tbc>Address to be confirmed</Tbc>}</li>
            <li>
              <a href={findStore.href}>{footer.storesLabel}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2>Follow Us</h2>
          <ul>
            {footer.social.map((item) => (
              <li key={item.label}>
                {item.url ? (
                  <a href={item.url} rel="noreferrer" target="_blank">
                    {item.label}
                  </a>
                ) : (
                  <Tbc>{item.label} link to be confirmed</Tbc>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ShoppingWalk />

      <div className="footer__base">
        <p>
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
        <p>
          Designed & Developed by{" "}
          <a
            href="https://www.promocraft.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__credit"
          >
            Promocraft
          </a>
        </p>
        <p>{footer.business ?? <Tbc>Business details to be confirmed</Tbc>}</p>
      </div>
    </footer>
  );
}
