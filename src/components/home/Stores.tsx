import { useState, type CSSProperties } from "react";

import { keralaShowrooms, stores, type StoreLocation } from "@/content/home";
import { keralaMap, project } from "@/content/kerala-map";

import { Eyebrow } from "./primitives";

/**
 * A verified map link or address gives true directions. Otherwise the visitor gets a map
 * search for the showroom by name, never a pin presented as its exact entrance.
 */
function mapAction(location: StoreLocation) {
  if (location.mapUrl) return { href: location.mapUrl, label: "Get directions" };
  if (location.address) {
    const destination = encodeURIComponent(`${location.name}, ${location.address}`);
    return {
      href: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
      label: "Get directions",
    };
  }
  const query = encodeURIComponent(`${location.business} ${location.name}, Kerala`);
  return {
    href: `https://www.google.com/maps/search/?api=1&query=${query}`,
    label: "Search on Google Maps",
  };
}

function LocationDetails({ location, id }: { location: StoreLocation; id: string }) {
  const map = mapAction(location);
  const exact = Boolean(location.mapUrl || location.address);
  return (
    <div className="stores__details" id={id}>
      <p className="stores__detail-name">
        {location.business}, {location.name}
      </p>
      {location.address ? <p>{location.address}</p> : null}
      {location.phone ? (
        <p>
          <a href={`tel:${location.phone.replace(/[^\d+]/g, "")}`}>{location.phone}</a>
        </p>
      ) : null}
      <a className="stores__link" href={map.href} target="_blank" rel="noopener noreferrer">
        {map.label} <span aria-hidden="true">↗</span>
      </a>
      {exact ? null : (
        <p className="stores__note">
          For the exact address,{" "}
          <a href={stores.help.href} className="stores__help">
            {stores.help.label}
          </a>
          .
        </p>
      )}
    </div>
  );
}

export function Stores() {
  const list = keralaShowrooms;
  const [activeId, setActiveId] = useState(list[0]?.id ?? "");
  const active = list.find((location) => location.id === activeId);

  return (
    <section id="stores" className="stores section" aria-labelledby="stores-title">
      <header className="stores__head" data-reveal>
        <div>
          <Eyebrow>{stores.kicker}</Eyebrow>
          <h2 id="stores-title">{stores.title}</h2>
        </div>
        <p className="lede">{stores.body}</p>
      </header>

      <div className="stores__grid">
        <figure className="stores__map" data-reveal>
          <div className="stores__canvas">
            <svg
              viewBox={`0 0 ${keralaMap.width} ${keralaMap.height}`}
              aria-hidden="true"
              className="stores__land"
            >
              <path d={keralaMap.path} />
            </svg>
            {list.map((location) => {
              if (!location.coordinates) return null;
              const point = project(location.coordinates.lat, location.coordinates.lng);
              const isActive = location.id === activeId;
              return (
                <button
                  key={location.id}
                  type="button"
                  className={`stores__pin ${isActive ? "is-active" : ""}`}
                  data-label={location.labelSide ?? "right"}
                  style={
                    {
                      left: `${(point.x / keralaMap.width) * 100}%`,
                      top: `${(point.y / keralaMap.height) * 100}%`,
                    } as CSSProperties
                  }
                  aria-pressed={isActive}
                  aria-label={`Show ${location.name} showroom`}
                  onClick={() => setActiveId(location.id)}
                >
                  <span className="stores__dot" aria-hidden="true" />
                  <span className="stores__pin-label" aria-hidden="true">
                    {location.name}
                  </span>
                </button>
              );
            })}
          </div>
          <figcaption>Markers show each showroom’s town.</figcaption>
        </figure>

        <div className="stores__directory" data-reveal>
          <p className="stores__count">
            {list.length} showrooms in {stores.region}
          </p>
          <ol className="stores__list">
            {list.map((location, index) => {
              const isActive = location.id === activeId;
              const detailsId = `store-${location.id}`;
              return (
                <li key={location.id} className={`stores__item ${isActive ? "is-active" : ""}`}>
                  <button
                    type="button"
                    className="stores__row"
                    aria-expanded={isActive}
                    aria-controls={detailsId}
                    onClick={() => setActiveId(location.id)}
                  >
                    <span className="stores__num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="stores__name">{location.name}</span>
                  </button>
                  {isActive ? <LocationDetails location={location} id={detailsId} /> : null}
                </li>
              );
            })}
          </ol>
          <p className="sr-only" aria-live="polite">
            {active ? `${active.name} selected` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
