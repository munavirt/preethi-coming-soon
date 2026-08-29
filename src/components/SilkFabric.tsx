import { useId } from 'react';

interface SilkFabricProps {
  /** Controls which fold configuration / entry direction is used. */
  variant?: 'unfold-left' | 'unfold-diagonal' | 'resting';
  className?: string;
}

/**
 * SilkFabric
 *
 * An SVG-based crimson silk material. The silk look comes from:
 *  - A layered gradient fill (deep crimson → bright highlight → deep shadow)
 *  - An feTurbulence displacement filter giving the edge organic curvature
 *  - A moving highlight band (animated via GSAP from the parent timeline)
 *  - A subtle grain overlay for material texture
 *
 * The parent container's clip-path is animated by GSAP to reveal the fabric
 * like cloth being unfolded — not stretched.
 *
 * Data attributes for GSAP targeting:
 *   [data-silk="root"]    – the SVG element
 *   [data-silk="body"]    – the main fill group
 *   [data-silk="sheen"]   – the moving highlight band rect
 */
export default function SilkFabric({
  variant = 'unfold-left',
  className = '',
}: SilkFabricProps) {
  const uid = useId().replace(/:/g, '');
  const id = `silk-${uid}`;
  const isDiagonal = variant === 'unfold-diagonal';

  return (
    <svg
      className={className}
      data-silk="root"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        {/* Core silk gradient — deep crimson with lighter highlight band */}
        <linearGradient id={`${id}-fill`} x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor="#5A0B10" />
          <stop offset="18%" stopColor="#6B0E14" />
          <stop offset="42%" stopColor="#8B1118" />
          <stop offset="55%" stopColor="#A71922" />
          <stop offset="72%" stopColor="#8B1118" />
          <stop offset="90%" stopColor="#6B0E14" />
          <stop offset="100%" stopColor="#5A0B10" />
        </linearGradient>

        {/* Sheen — the bright directional light that sweeps across */}
        <linearGradient id={`${id}-sheen`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#E8C8B0" stopOpacity="0.18" />
          <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Fold shadow — vertical banding suggesting folds in the cloth */}
        <linearGradient id={`${id}-folds`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="20%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="25%" stopColor="#000000" stopOpacity="0" />
          <stop offset="48%" stopColor="#000000" stopOpacity="0.08" />
          <stop offset="53%" stopColor="#000000" stopOpacity="0" />
          <stop offset="76%" stopColor="#000000" stopOpacity="0.10" />
          <stop offset="82%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Diagonal fold shadow for the second, more dramatic unfold */}
        {isDiagonal && (
          <linearGradient id={`${id}-folds2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="15%" stopColor="#000000" stopOpacity="0.10" />
            <stop offset="20%" stopColor="#000000" stopOpacity="0" />
            <stop offset="40%" stopColor="#000000" stopOpacity="0.14" />
            <stop offset="46%" stopColor="#000000" stopOpacity="0" />
            <stop offset="68%" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="74%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        )}

        {/* Displacement filter — gives the leading edge organic curvature */}
        <filter id={`${id}-displace`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={isDiagonal ? '0.010 0.014' : '0.012 0.018'}
            numOctaves="2"
            seed={isDiagonal ? 7 : 3}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={variant === 'resting' ? 14 : 24}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Soft blur for fold edges */}
        <filter id={`${id}-soft`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* Main body — the silk fill, fold shadows, and sheen */}
      <g data-silk="body">
        <path
          data-silk="edge"
          d="M0,0 L1440,0 L1440,900 L0,900 Z"
          fill={`url(#${id}-fill)`}
          filter={`url(#${id}-displace)`}
        />
        {/* Fold shadow overlay */}
        <rect
          data-silk="shadow"
          x="0"
          y="0"
          width="1440"
          height="900"
          fill={isDiagonal ? `url(#${id}-folds2)` : `url(#${id}-folds)`}
          filter={`url(#${id}-soft)`}
        />
        {/* Moving sheen band — GSAP animates its x position */}
        <rect
          data-silk="sheen"
          x="-500"
          y="0"
          width="500"
          height="900"
          fill={`url(#${id}-sheen)`}
        />
      </g>
    </svg>
  );
}
