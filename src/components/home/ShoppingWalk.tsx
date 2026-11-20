export function ShoppingWalk() {
  return (
    <div className="shopping-walk" aria-hidden="true">
      <div className="shopping-walk__track">
        <div className="shopping-walk__mover">
          <div className="shopping-walk__character">
            <svg
              className="shopping-walk__svg"
              viewBox="0 0 54 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="54"
            >
              {/* Back arm & saffron bag */}
              <g className="shopping-walk__bag-back">
                {/* Arm */}
                <path
                  d="M26 25 Q32 28 35 34"
                  stroke="#E89B7A"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Yellow/Saffron Bag */}
                <rect x="31" y="34" width="13" height="16" rx="2" fill="#ECA926" />
                <path
                  d="M34 34 V30 Q37.5 28 41 30 V34"
                  stroke="#C48310"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <line x1="33" y1="39" x2="42" y2="39" stroke="#F7CB66" strokeWidth="1" />
              </g>

              {/* Legs in walking stance */}
              <g className="shopping-walk__legs">
                {/* Back leg */}
                <path
                  d="M23 38 L19 49 L15 50"
                  stroke="#263238"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Front leg */}
                <path
                  d="M27 38 L31 49 L35 50"
                  stroke="#263238"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Body / Kurta */}
              <path
                d="M19 23 L16 38 H34 L31 23 Z"
                fill="#FFFDF7"
                stroke="#E5DFD3"
                strokeWidth="1"
              />
              {/* Red placket trim */}
              <line
                x1="25"
                y1="23"
                x2="25"
                y2="32"
                stroke="#F7020F"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Head & Joyful Hair */}
              <circle cx="25" cy="15" r="7.5" fill="#E89B7A" />
              {/* Hair bun / hair wave */}
              <path
                d="M17.5 14 C17.5 8.5 22 7 26 7 C31 7 33.5 10 33 13 C31 11 29 11 26 12 C21 13 19 14.5 17.5 14 Z"
                fill="#1A1816"
              />
              <circle cx="28" cy="8.5" r="3" fill="#1A1816" />
              {/* Eye & Smile */}
              <circle cx="28" cy="15" r="0.9" fill="#1A1816" />
              <path
                d="M27 18 Q29 20 31 18"
                stroke="#1A1816"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />

              {/* Front arm & Preethi Red shopping bag */}
              <g className="shopping-walk__bag-front">
                {/* Arm */}
                <path
                  d="M23 25 Q17 29 14 35"
                  stroke="#E89B7A"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Preethi Red Bag */}
                <rect x="7" y="34" width="15" height="18" rx="2.2" fill="#F7020F" />
                {/* Bag handles */}
                <path
                  d="M11 34 V29 Q14.5 27 18 29 V34"
                  stroke="#9E0818"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Elegant gold foil monogram / ribbon on bag */}
                <rect x="12" y="40" width="5" height="6" rx="1" fill="#FFF0D0" opacity="0.85" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
