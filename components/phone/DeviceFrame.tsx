"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-3D iPhone 18 Pro Max body, Black. A true six-face box: anodized aluminum
 * rails, black glass front with Dynamic Island and status bar, and a back with
 * the side-to-side camera plateau. No Apple logo or markings, on purpose.
 *
 * Every length is written at the 340px design width and goes through u(), so
 * the proportions hold at any size (the Features phones render near 200px).
 *
 * IMPORTANT: no ancestor between the rotating wrapper and these faces may
 * carry opacity/filter effects — grouping properties flatten preserve-3d.
 */

/** Length at the 340px design width, scaled to this frame's actual width. */
const u = (px: number) => `calc(${px} * 100cqw / 340)`;

// 163.4 × 78.0 × 8.75 mm → 712 × 340 × 38 at this scale.
// 2868 × 1320 at 460 ppi → ~318 × 691 active area, so a 10px inset all round.
const BODY_H = 712;
const THICK = 38;
const HALF = THICK / 2;
const INSET = 10;
// Corner, island and back proportions are measured from Apple's product image; no published figures.
const SCREEN_RADIUS = 34;
const RADIUS = SCREEN_RADIUS + INSET; // concentric with the screen
const SEGS = 12; // arc segments per corner
const STATUS_INSET = 40; // top safe area: 59pt scaled to this width

const METAL = "#17181a 0%,#3a3b3f 20%,#5a5b60 48%,#34353a 78%,#141517 100%";

/** Rail background across its depth, darkened by how far it faces from the top-left light. */
function railShade(normal: number, direction: "90deg" | "180deg") {
  const shade = (0.34 * (1 - Math.cos(normal - 1.25 * Math.PI))) / 2;
  const dim = `rgba(0,0,0,${shade.toFixed(3)})`;
  return `linear-gradient(${dim},${dim}),linear-gradient(${direction},${METAL})`;
}

const LEFT = Math.PI;
const TOP = 1.5 * Math.PI;
const RIGHT = 0;
const BOTTOM = 0.5 * Math.PI;

/** Curved corner wall — SEGS thin planes standing along the 90° arc. */
function CornerWall({ corner }: { corner: "tl" | "tr" | "br" | "bl" }) {
  const span = Math.PI / 2 / SEGS;
  const chord = 2 * RADIUS * Math.sin(span / 2) * 1.08; // slight overlap, no seams
  const config = {
    tl: { cx: RADIUS, cy: RADIUS, a0: Math.PI, pos: { top: 0, left: 0 } },
    tr: { cx: 0, cy: RADIUS, a0: 1.5 * Math.PI, pos: { top: 0, right: 0 } },
    br: { cx: 0, cy: 0, a0: 0, pos: { bottom: 0, right: 0 } },
    bl: { cx: RADIUS, cy: 0, a0: 0.5 * Math.PI, pos: { bottom: 0, left: 0 } },
  }[corner];

  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        width: u(RADIUS),
        height: u(RADIUS),
        transformStyle: "preserve-3d",
        ...config.pos,
      }}
    >
      {Array.from({ length: SEGS }, (_, i) => {
        const mid = config.a0 + span * (i + 0.5);
        const mx = config.cx + RADIUS * Math.cos(mid);
        const my = config.cy + RADIUS * Math.sin(mid);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: u(chord),
              height: u(THICK),
              background: railShade(mid, "180deg"),
              transform: `translate(${u(mx - chord / 2)}, ${u(my - THICK / 2)}) rotateZ(${((mid * 180) / Math.PI + 90).toFixed(2)}deg) rotateX(90deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Hardware button, positioned by its distance from the top of the body. */
function RailButton({ top, height, dark }: { top: number; height: number; dark?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: u(top - RADIUS),
        left: u(10),
        width: u(18),
        height: u(height),
        borderRadius: u(9),
        background: dark
          ? "linear-gradient(90deg,#0f1012,#2b2c30 50%,#0b0c0d)"
          : "linear-gradient(90deg,#2a2b2e,#626368 50%,#222326)",
        boxShadow: "0 0 1px rgba(0,0,0,.6)",
        transform: `translateZ(${u(1.5)})`,
      }}
    />
  );
}

// Fine matte grain of the back glass. An image, not a filter: filters flatten preserve-3d.
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`;

const PLATEAU_H = 198;
const PLATEAU_RISE = 7; // how far the plateau stands off the back
const PLATEAU_R = 12; // its lower corner radius
const LENS_RISE = 10; // how far each barrel stands off the plateau
const OUTLINE = 340;

/** Moving highlight: --ry (set by FloatingPhone) slides it across the metal as the phone turns. */
function Sheen({ strength = 0.16 }: { strength?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0"
      style={{
        left: "-100%",
        width: "300%",
        transform: "translateX(calc(var(--ry, 0) * -0.42%))",
        background: `linear-gradient(105deg,transparent 36%,rgba(255,255,255,${strength}) 49%,rgba(255,255,255,${strength * 0.25}) 56%,transparent 66%)`,
      }}
    />
  );
}

/** Real side walls for the plateau: straight runs plus segmented corners. */
function PlateauWalls() {
  const R = RADIUS;
  const r = PLATEAU_R;
  const H = PLATEAU_H;
  const segments: { x: number; y: number; len: number; a: number }[] = [
    { x: OUTLINE / 2, y: 0, len: OUTLINE - 2 * R, a: TOP },
    { x: OUTLINE, y: (R + H - r) / 2, len: H - R - r, a: RIGHT },
    { x: OUTLINE / 2, y: H, len: OUTLINE - 2 * r, a: BOTTOM },
    { x: 0, y: (R + H - r) / 2, len: H - R - r, a: LEFT },
  ];
  const arc = (cx: number, cy: number, radius: number, a0: number, n: number) => {
    const span = Math.PI / 2 / n;
    for (let i = 0; i < n; i++) {
      const a = a0 + span * (i + 0.5);
      segments.push({
        x: cx + radius * Math.cos(a),
        y: cy + radius * Math.sin(a),
        len: 2 * radius * Math.sin(span / 2) * 1.08,
        a,
      });
    }
  };
  arc(R, R, R, LEFT, 8);
  arc(OUTLINE - R, R, R, TOP, 8);
  arc(OUTLINE - r, H - r, r, RIGHT, 3);
  arc(r, H - r, r, BOTTOM, 3);

  return (
    <>
      {segments.map(({ x, y, len, a }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: u(len),
            height: u(PLATEAU_RISE),
            // the back is mirrored, so its light comes from the opposite local side
            background: railShade(Math.PI - a, "180deg"),
            transform: `translate(${u(x - len / 2)}, ${u(y - PLATEAU_RISE / 2)}) translateZ(${u(PLATEAU_RISE / 2)}) rotateZ(${((a * 180) / Math.PI + 90).toFixed(2)}deg) rotateX(90deg)`,
          }}
        />
      ))}
    </>
  );
}

const LENS_D = 76;
const WELL_RADIUS = 29; // inner radius of the barrel, where the glass sits
const LENS_LIGHT = -Math.PI / 4; // the viewer's top left, in the back's mirrored coordinates

/** Ring of planes forming a cylinder wall around the lens center, shaded by which way each faces. */
function CylinderWall({
  radius,
  from,
  to,
  segments,
  inward,
  base,
  range,
}: {
  radius: number;
  from: number;
  to: number;
  segments: number;
  inward?: boolean;
  base: number;
  range: number;
}) {
  const span = (2 * Math.PI) / segments;
  const chord = 2 * radius * Math.sin(span / 2) * 1.1;
  const depth = to - from;
  return (
    <>
      {Array.from({ length: segments }, (_, i) => {
        const a = span * i;
        const lit = Math.max(0, Math.cos((inward ? a + Math.PI : a) - LENS_LIGHT));
        const v = Math.round(base + range * lit);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: u(chord),
              height: u(depth),
              background: `rgb(${v},${v},${v + 2})`,
              transform: `translate(${u(LENS_D / 2 + radius * Math.cos(a) - chord / 2)}, ${u(LENS_D / 2 + radius * Math.sin(a) - depth / 2)}) translateZ(${u((from + to) / 2)}) rotateZ(${((a * 180) / Math.PI + 90).toFixed(2)}deg) rotateX(90deg)`,
            }}
          />
        );
      })}
    </>
  );
}

/**
 * A physical camera barrel: a solid cylinder with a brushed metal lip, and a
 * well inside it holding the optics at different depths, so they slide against
 * each other as the phone turns.
 */
function Lens({ top, left }: { top: number; left: number }) {
  const inset = `${(((LENS_D / 2 - WELL_RADIUS) / LENS_D) * 100).toFixed(2)}%`;
  const layer = (z: number, wellOnly = true): CSSProperties => ({
    position: "absolute",
    inset: wellOnly ? inset : 0,
    borderRadius: "50%",
    transform: `translateZ(${u(z)})`,
    backfaceVisibility: "hidden",
  });
  const hole = `radial-gradient(closest-side,transparent ${((WELL_RADIUS / (LENS_D / 2)) * 100 - 0.5).toFixed(1)}%,#000 ${((WELL_RADIUS / (LENS_D / 2)) * 100).toFixed(1)}%)`;
  return (
    <div
      className="absolute"
      style={{ top: u(top), left: u(left), width: u(LENS_D), height: u(LENS_D), transformStyle: "preserve-3d" }}
    >
      {/* contact shadow on the plateau */}
      <div
        style={{
          ...layer(0.2, false),
          boxShadow: `0 ${u(6)} ${u(14)} rgba(0,0,0,.9)`,
        }}
      />
      <CylinderWall radius={LENS_D / 2} from={0} to={LENS_RISE} segments={28} base={20} range={78} />
      <CylinderWall radius={WELL_RADIUS} from={1} to={LENS_RISE} segments={14} inward base={6} range={26} />

      {/* optics, deepest first */}
      <div
        style={{
          ...layer(1),
          background:
            "radial-gradient(closest-side,#000 0%,#000 30%,#0b0c13 34%,#12141e 60%,#06070a 100%)",
        }}
      />
      <div
        style={{
          ...layer(3.5),
          background:
            "radial-gradient(closest-side,transparent 40%,rgba(44,46,56,.85) 43%,rgba(8,9,12,.85) 52%,transparent 56%)",
        }}
      />
      <div
        style={{
          ...layer(6),
          background:
            "radial-gradient(closest-side,transparent 68%,rgba(46,48,58,.7) 71%,rgba(9,10,13,.85) 80%,transparent 84%)",
        }}
      />
      {/* sapphire cover: curved highlight and edge falloff, with a glint that follows the turn */}
      <div
        className="overflow-hidden"
        style={{
          ...layer(8),
          background:
            "radial-gradient(circle at 34% 28%,rgba(200,208,235,.1),rgba(200,208,235,0) 42%),radial-gradient(closest-side,rgba(0,0,0,0) 78%,rgba(0,0,0,.65) 100%)",
        }}
      >
        <div
          className="absolute"
          style={{
            top: "14%",
            left: "16%",
            width: "26%",
            height: "26%",
            borderRadius: "50%",
            transform: "translateX(calc(var(--ry, 0) * -0.9%))",
            background: "radial-gradient(circle,rgba(205,215,245,.5),rgba(150,165,230,0) 70%)",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "20%",
            bottom: "20%",
            width: "12%",
            height: "12%",
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(205,150,235,.3),rgba(205,150,235,0) 70%)",
          }}
        />
      </div>

      {/* brushed metal lip with lit bevels */}
      <div
        style={{
          ...layer(LENS_RISE, false),
          background:
            "radial-gradient(closest-side,transparent 75%,rgba(255,255,255,.2) 76.5%,rgba(255,255,255,0) 81%,rgba(255,255,255,0) 96%,rgba(255,255,255,.22) 99%),conic-gradient(from 20deg,#808186,#303134 12%,#17181a 28%,#54555a 42%,#222326 58%,#121315 72%,#6c6d72 88%,#808186)",
          WebkitMaskImage: hole,
          maskImage: hole,
        }}
      />
    </div>
  );
}

function Back({ detailed }: { detailed: boolean }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        transform: `rotateY(180deg) translateZ(${u(HALF)})`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Body and matte glass panel; no logo, on purpose */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: u(RADIUS),
          backfaceVisibility: "hidden",
          background: "linear-gradient(150deg,#333437,#1f2022 55%,#292a2c)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,.14)",
        }}
      >
        <div
          className="absolute"
          style={{
            top: u(220),
            left: u(14),
            right: u(14),
            bottom: u(14),
            borderRadius: `${u(26)} ${u(26)} ${u(RADIUS - 14)} ${u(RADIUS - 14)}`,
            backgroundImage: `${GRAIN}, linear-gradient(165deg,#2c2d30,#1b1c1e 55%,#252628)`,
            backgroundSize: `${u(80)} ${u(80)}, auto`,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)",
          }}
        />
        {detailed && <Sheen strength={0.1} />}
      </div>

      {detailed && (
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", visibility: "var(--back-vis, hidden)" as CSSProperties["visibility"] }}
        >
          <PlateauWalls />
          {/* Raised side-to-side plateau */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: u(PLATEAU_H),
              transform: `translateZ(${u(PLATEAU_RISE)})`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: `${u(RADIUS)} ${u(RADIUS)} ${u(PLATEAU_R)} ${u(PLATEAU_R)}`,
                backfaceVisibility: "hidden",
                background:
                  "radial-gradient(120% 90% at 92% 0%,rgba(255,255,255,.2),rgba(255,255,255,0) 60%),linear-gradient(190deg,#3c3d40,#212224 55%,#2c2d30)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 0 rgba(255,255,255,.1)",
              }}
            >
              <Sheen />
              {/* Flash */}
              <div
                className="absolute rounded-full"
                style={{
                  top: u(38),
                  right: u(30),
                  width: u(26),
                  height: u(26),
                  background: "radial-gradient(circle,#d9d0ae 0%,#9d9270 55%,#4e4835 100%)",
                  boxShadow: `0 0 0 ${u(1.5)} rgba(0,0,0,.75), inset 0 0 ${u(4)} rgba(0,0,0,.5)`,
                }}
              />
              {/* LiDAR */}
              <div
                className="absolute rounded-full"
                style={{
                  top: u(128),
                  right: u(30),
                  width: u(26),
                  height: u(26),
                  background: "radial-gradient(circle at 42% 40%,#22232a 0%,#050507 70%)",
                  boxShadow: `0 0 0 ${u(1.5)} rgba(0,0,0,.75)`,
                }}
              />
              {/* Mic */}
              <div
                className="absolute rounded-full bg-black"
                style={{ top: u(94), right: u(41), width: u(4), height: u(4) }}
              />
            </div>
            <Lens top={26} left={28} />
            <Lens top={113} left={28} />
            <Lens top={69} left={110} />
          </div>
        </div>
      )}
    </div>
  );
}

/** Clock, signal, Wi-Fi and battery, vertically centered on the island. */
function StatusBar() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 z-20 flex items-center justify-between text-white"
      style={{
        top: u(8),
        height: u(25),
        paddingInline: u(24),
        font: `600 ${u(12)}/1 -apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",sans-serif`,
      }}
    >
      <span>9:41</span>
      <span className="flex items-center" style={{ gap: u(4) }}>
        <svg viewBox="0 0 18 12" fill="currentColor" style={{ height: u(8.5) }}>
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg viewBox="0 0 17 12" fill="currentColor" style={{ height: u(8.5) }}>
          <path d="M8.5 2.3c2.4 0 4.6.9 6.2 2.5l1.2-1.3A10.5 10.5 0 0 0 8.5.5C5.6.5 3 1.6 1.1 3.5l1.2 1.3a8.8 8.8 0 0 1 6.2-2.5Z" />
          <path d="M8.5 6c1.4 0 2.7.5 3.7 1.5l1.2-1.3a7 7 0 0 0-9.8 0l1.2 1.3c1-1 2.3-1.5 3.7-1.5Z" />
          <path d="M8.5 9.6c-.7 0-1.3.3-1.8.7l1.8 1.7 1.8-1.7c-.5-.4-1.1-.7-1.8-.7Z" />
        </svg>
        <svg viewBox="0 0 27 13" fill="none" style={{ height: u(9.5) }}>
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="20" height="9" rx="2.2" fill="currentColor" />
          <path d="M25 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2Z" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black"
      style={{ top: u(10), width: u(70), height: u(21) }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 rounded-full"
        style={{
          right: u(6),
          width: u(8),
          height: u(8),
          background: "radial-gradient(circle at 40% 40%,#27304a,#0a0c14 65%)",
        }}
      />
    </div>
  );
}

const railBase: CSSProperties = { position: "absolute", transformStyle: "preserve-3d" };

export default function DeviceFrame({
  children,
  className,
  variant = "iphone",
  detailedBack = false,
}: {
  children: ReactNode;
  className?: string;
  /** "android" swaps the island for a punch-hole camera (Download's second phone). */
  variant?: "iphone" | "android";
  /** Full 3D plateau and lenses, about 170 extra layers, drawn only while --back-vis says the back faces the viewer. */
  detailedBack?: boolean;
}) {
  return (
    <div
      className={cn("relative aspect-[340/712] w-[340px] select-none", className)}
      style={{ transformStyle: "preserve-3d", containerType: "inline-size" }}
    >
      <Back detailed={detailedBack} />

      {/* SIDE RAILS */}
      <div
        aria-hidden
        style={{
          ...railBase,
          top: u(RADIUS),
          height: u(BODY_H - RADIUS * 2),
          width: u(THICK),
          left: u(-HALF),
          transform: "rotateY(-90deg)",
          background: railShade(LEFT, "90deg"),
        }}
      >
        <div className="absolute inset-x-0 h-[0.4%] bg-black/70" style={{ top: "4%" }} />
        <div className="absolute inset-x-0 h-[0.4%] bg-black/70" style={{ bottom: "6%" }} />
        <RailButton top={125} height={30} />
        <RailButton top={178} height={48} />
        <RailButton top={238} height={48} />
      </div>
      <div
        aria-hidden
        style={{
          ...railBase,
          top: u(RADIUS),
          height: u(BODY_H - RADIUS * 2),
          width: u(THICK),
          right: u(-HALF),
          transform: "rotateY(90deg)",
          background: railShade(RIGHT, "90deg"),
        }}
      >
        <div className="absolute inset-x-0 h-[0.4%] bg-black/70" style={{ top: "4%" }} />
        <div className="absolute inset-x-0 h-[0.4%] bg-black/70" style={{ bottom: "6%" }} />
        <RailButton top={190} height={72} />
        <RailButton top={436} height={52} dark />
      </div>
      <div
        aria-hidden
        style={{
          ...railBase,
          left: u(RADIUS),
          width: u(340 - RADIUS * 2),
          height: u(THICK),
          top: u(-HALF),
          transform: "rotateX(90deg)",
          background: railShade(TOP, "180deg"),
        }}
      />
      <div
        aria-hidden
        className="flex items-center justify-center"
        style={{
          ...railBase,
          left: u(RADIUS),
          width: u(340 - RADIUS * 2),
          height: u(THICK),
          bottom: u(-HALF),
          transform: "rotateX(90deg)",
          background: railShade(BOTTOM, "180deg"),
          gap: u(14),
        }}
      >
        {[0, 1].map((side) => (
          <span
            key={side}
            className="flex"
            style={{ gap: u(4), order: side * 2 }}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <i
                key={i}
                className="block rounded-full bg-black/70"
                style={{ width: u(4), height: u(4) }}
              />
            ))}
          </span>
        ))}
        {/* USB-C */}
        <span
          className="block rounded-full bg-[#141517]"
          style={{ order: 1, width: u(36), height: u(11) }}
        />
      </div>
      <CornerWall corner="tl" />
      <CornerWall corner="tr" />
      <CornerWall corner="br" />
      <CornerWall corner="bl" />

      {/* FRONT — brushed aluminum edge around black glass */}
      <div
        className="relative h-full w-full"
        style={{
          borderRadius: u(RADIUS),
          padding: u(2.5),
          transform: `translateZ(${u(HALF)})`,
          backfaceVisibility: "hidden",
          background:
            "linear-gradient(135deg,#77787d 0%,#303134 22%,#505156 48%,#2a2b2e 74%,#6a6b70 100%)",
        }}
      >
        <div
          className="h-full w-full bg-black"
          style={{
            borderRadius: u(RADIUS - 2.5),
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08)",
          }}
        />
      </div>

      {/* SCREEN just above the glass */}
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          inset: u(INSET),
          borderRadius: u(SCREEN_RADIUS),
          transform: `translateZ(${u(HALF + 0.5)})`,
          backfaceVisibility: "hidden",
        }}
      >
        {/* Content starts under the status bar, like a real safe area */}
        <div className="absolute inset-x-0 bottom-0 z-10" style={{ top: u(STATUS_INSET) }}>
          {children}
        </div>

        <StatusBar />
        {variant === "iphone" ? (
          <DynamicIsland />
        ) : (
          <div
            aria-hidden
            className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black"
            style={{ top: u(14), width: u(14), height: u(14) }}
          />
        )}

        {/* Home indicator */}
        <div
          aria-hidden
          className="absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/90"
          style={{ bottom: u(6), width: u(100), height: u(3.5) }}
        />

        {/* Glass reflection */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              "linear-gradient(118deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,.02) 18%,rgba(255,255,255,0) 34%)",
          }}
        />
      </div>
    </div>
  );
}
