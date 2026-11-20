/**
 * The closing illustration: a family shopping beside a clothing rack, drawn as flat vector
 * in the Preethi palette (red, white and charcoal, with blush and light grey in support).
 * Small on purpose: it sits beside the closing heading and should never outweigh it.
 */
const RED = "#F7020F";
const WHITE = "#FFFFFF";
const INK = "#171717";
const BLUSH = "#FFF0F0";
const GREY = "#F5F5F5";

const line = {
  stroke: INK,
  strokeWidth: 2.5,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

/** An arm as an outlined, round-ended stroke, ending in a hand. */
function Arm({ d, fill = BLUSH, hand }: { d: string; fill?: string; hand: [number, number] }) {
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={8.5} strokeLinecap="round" fill="none" />
      <path d={d} stroke={fill} strokeWidth={4} strokeLinecap="round" fill="none" />
      <circle cx={hand[0]} cy={hand[1]} r={4} fill={BLUSH} {...line} strokeWidth={2} />
    </g>
  );
}

function Legs({ xs, top, foot = 5 }: { xs: number[]; top: number; foot?: number }) {
  return (
    <g stroke={INK} strokeLinecap="round" fill="none">
      {xs.map((x, i) => (
        <g key={x}>
          <path d={`M${x} ${top}V312`} strokeWidth={foot} />
          <path
            d={i === 0 ? `M${x - 8} 314H${x + 1}` : `M${x - 1} 314H${x + 8}`}
            strokeWidth={foot}
          />
        </g>
      ))}
    </g>
  );
}

function Hanger({ x }: { x: number }) {
  return (
    <path
      d={`M${x} 92v6M${x - 13} 108L${x} 98L${x + 13} 108`}
      {...line}
      strokeWidth={2}
      fill="none"
    />
  );
}

export function FamilyIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="20 60 450 270"
      role="img"
      aria-labelledby="family-illustration-title"
    >
      <title id="family-illustration-title">
        Illustration of a family shopping for clothes together beside a clothing rack, carrying
        shopping bags
      </title>

      {/* Ground and a soft blush backdrop */}
      <circle cx="300" cy="200" r="124" fill={BLUSH} />
      <rect x="24" y="316" width="440" height="6" rx="3" fill={GREY} />

      {/* Clothing rack */}
      <g data-ill="rack">
        <path
          d="M44 92V318M196 92V318M38 92H202M30 318H58M182 318H210"
          {...line}
          strokeWidth={4}
          fill="none"
        />

        {/* A hat resting on the rail */}
        <path d="M161 89Q161 73 172 73Q183 73 183 89Z" fill={WHITE} {...line} strokeWidth={2} />
        <path d="M162 84H182" stroke={RED} strokeWidth={3.5} />
        <ellipse cx="172" cy="89.5" rx="20" ry="3.5" fill={WHITE} {...line} strokeWidth={2} />

        {/* Women's dress */}
        <g className="ill-sway" style={{ transformOrigin: "80px 92px" }}>
          <Hanger x={80} />
          <path d="M68 108H92L95 140L110 206H50L65 140Z" fill={RED} {...line} />
          <path d="M66 140H94" stroke={WHITE} strokeWidth={3} />
        </g>

        {/* Men's shirt */}
        <g className="ill-sway ill-sway--late" style={{ transformOrigin: "122px 92px" }}>
          <Hanger x={122} />
          <path
            d="M106 108H138L152 122L144 130L138 125V196H106V125L100 130L92 122Z"
            fill={WHITE}
            {...line}
          />
          <path d="M114 108L122 120L130 108" {...line} strokeWidth={2} fill="none" />
          {[136, 152, 168].map((y) => (
            <circle key={y} cx="122" cy={y} r="1.9" fill={INK} />
          ))}
        </g>

        {/* Children's tee */}
        <g className="ill-sway" style={{ transformOrigin: "170px 92px" }}>
          <Hanger x={170} />
          <path
            d="M158 108H182L192 118L186 124L182 120V160H158V120L154 124L148 118Z"
            fill={BLUSH}
            {...line}
          />
          <path d="M159.5 134H180.5" stroke={RED} strokeWidth={4} />
        </g>

        {/* Folded stack at the foot of the rack */}
        <rect x="88" y="304" width="64" height="12" rx="3" fill={INK} />
        <rect x="92" y="292" width="58" height="12" rx="3" fill={RED} {...line} strokeWidth={2} />
        <rect x="90" y="280" width="60" height="12" rx="3" fill={WHITE} {...line} strokeWidth={2} />
      </g>

      {/* Mother */}
      <g data-ill="person">
        <Legs xs={[254, 270]} top={258} />
        <Arm d="M252 164L238 212" hand={[238, 213]} />
        <Arm d="M272 164L296 222" hand={[296, 222]} />
        <path d="M250 156H274L290 262H234Z" fill={RED} {...line} />
        <path d="M256 156Q262 166 268 156" stroke={WHITE} strokeWidth={2} fill="none" />
        <circle cx="262" cy="138" r="14" fill={BLUSH} {...line} />
        <circle cx="275" cy="125" r="6.5" fill={INK} />
        <path d="M248 139C247 121 277 119 276 137C268 130 257 130 248 139Z" fill={INK} />
        {/* Her bag */}
        <g className="ill-swing" style={{ transformOrigin: "238px 211px" }}>
          <path d="M229 216Q236 202 243 216" {...line} strokeWidth={2} fill="none" />
          <rect x="222" y="215" width="28" height="32" rx="3" fill={WHITE} {...line} />
          <circle cx="236" cy="231" r="5" fill={RED} />
        </g>
      </g>

      {/* Child */}
      <g data-ill="person">
        <Legs xs={[311, 325]} top={262} foot={4.5} />
        <Arm d="M309 214L296 222" hand={[296, 222]} />
        <Arm d="M327 214L346 224" hand={[346, 224]} />
        <path d="M308 208H328L332 252H304Z" fill={WHITE} {...line} />
        <path d="M307 228H329" stroke={RED} strokeWidth={4} />
        <path
          d="M304 252H332L333 266H320L318 259L316 266H303Z"
          fill={INK}
          {...line}
          strokeWidth={2}
        />
        <circle cx="318" cy="196" r="11" fill={BLUSH} {...line} />
        <path d="M307 197C306 181 330 181 329 195C322 189 313 190 307 197Z" fill={INK} />
      </g>

      {/* Father */}
      <g data-ill="person">
        <path
          d="M367 228H405L403 312H389L386 252L383 312H369Z"
          fill={INK}
          {...line}
          strokeWidth={2}
        />
        <path d="M366 314H384M388 314H406" stroke={INK} strokeWidth={5} strokeLinecap="round" />
        <Arm d="M372 150L346 224" fill={WHITE} hand={[346, 224]} />
        <Arm d="M400 150L420 212" fill={WHITE} hand={[420, 213]} />
        <path d="M370 142H402L406 228H366Z" fill={WHITE} {...line} />
        <path d="M378 142L386 152L394 142" {...line} strokeWidth={2} fill="none" />
        {[166, 186, 206].map((y) => (
          <circle key={y} cx="386" cy={y} r="1.9" fill={INK} />
        ))}
        <circle cx="386" cy="124" r="15" fill={BLUSH} {...line} />
        <path d="M371 125C370 103 402 103 401 121C392 114 380 116 371 125Z" fill={INK} />
        {/* His bags */}
        <g className="ill-swing ill-swing--late" style={{ transformOrigin: "420px 211px" }}>
          <path d="M432 223Q439 211 446 223" {...line} strokeWidth={2} fill="none" />
          <rect x="426" y="222" width="26" height="30" rx="3" fill={WHITE} {...line} />
          <path d="M416 215Q424 201 432 215" {...line} strokeWidth={2} fill="none" />
          <rect x="408" y="214" width="32" height="38" rx="3" fill={RED} {...line} />
          <path d="M416 226H432" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
