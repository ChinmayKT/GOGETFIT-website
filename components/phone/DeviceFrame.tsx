"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Photoreal CSS-3D iPhone body. A true six-face box: titanium bezel ring,
 * inset screen with Dynamic Island + glass sweep, camera back, machined
 * side rails with buttons, and arc-segmented corner walls so the rim stays
 * continuous through the rounded corners.
 *
 * IMPORTANT: no ancestor between the rotating wrapper and these faces may
 * carry opacity/filter effects — grouping properties flatten preserve-3d.
 */

const RADIUS = 44; // body corner radius (px)
// iPhone 17 Pro Max proportions: 163.4 × 78.0 × 8.75 mm.
// At the 340px body width, true-scale thickness = 340 × (8.75/78) ≈ 38px.
const THICK = 38; // body thickness (px)
const HALF = THICK / 2;
const SEGS = 7; // arc segments per corner

const RAIL_GRADIENT_V =
  "linear-gradient(180deg,#2f3034 0%,#1b1b1e 22%,#101012 50%,#1b1b1e 78%,#2f3034 100%)";
const RAIL_GRADIENT_H =
  "linear-gradient(90deg,#2f3034 0%,#1b1b1e 22%,#101012 50%,#1b1b1e 78%,#2f3034 100%)";

const btnStyle: CSSProperties = {
  position: "absolute",
  left: 3,
  width: 32,
  borderRadius: 10,
  background: "linear-gradient(90deg,#6a6b71,#26262a 45%,#101013)",
  boxShadow: "0 0 2px rgba(0,0,0,.8), inset 0 1px 1px rgba(255,255,255,.25)",
  transform: "translateZ(1.2px)",
};

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
        width: RADIUS,
        height: RADIUS,
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
              width: chord,
              height: THICK,
              background: "linear-gradient(180deg,#2a2b2f,#131316)",
              transform: `translate(${(mx - chord / 2).toFixed(2)}px, ${(my - THICK / 2).toFixed(2)}px) rotateZ(${((mid * 180) / Math.PI + 90).toFixed(2)}deg) rotateX(90deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function DeviceFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative aspect-[780/1634] w-[340px] select-none", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Orange ambient glow — backface hidden so it never washes over the
          rear panel while the phone rotates; the back stays pure black */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[64px] opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,106,0,0.28), transparent 75%)",
          filter: "blur(24px)",
          transform: "translateZ(-60px)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* BACK — camera module, flush at z = -8 */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[44px] border border-white/6"
        style={{
          transform: `rotateY(180deg) translateZ(${HALF}px)`,
          backfaceVisibility: "hidden",
          background:
            "linear-gradient(150deg,#232326 0%,#0e0e10 55%,#1b1b1e 100%)",
        }}
      >
        <div
          className="absolute"
          style={{
            top: 14,
            left: 14,
            width: "44%",
            aspectRatio: "1",
            borderRadius: "26%",
            background: "linear-gradient(145deg,#1d1d20,#121215)",
            border: "1px solid rgba(255,255,255,.07)",
            boxShadow:
              "inset 0 2px 8px rgba(0,0,0,.7), 0 1px 2px rgba(255,255,255,.04)",
          }}
        >
          {(
            [
              { top: "8%", left: "8%" },
              { bottom: "8%", left: "8%" },
              { top: "29%", right: "8%" },
            ] as CSSProperties[]
          ).map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "34%",
                aspectRatio: "1",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 30%,#2a3550 0%,#131a29 40%,#04060a 75%)",
                border: "3px solid #232327",
                boxShadow:
                  "inset 0 0 6px rgba(0,0,0,.9), 0 1px 2px rgba(255,255,255,.06)",
                ...pos,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "22%",
                  left: "26%",
                  width: "22%",
                  height: "22%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(150,190,255,.9),rgba(150,190,255,0) 70%)",
                }}
              />
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              right: "14%",
              bottom: "14%",
              width: "13%",
              aspectRatio: "1",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,#f5ecc9 0%,#8d8055 55%,#3a3524 100%)",
              boxShadow: "inset 0 0 2px rgba(0,0,0,.6)",
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 text-center"
          style={{
            bottom: "6%",
            font: "400 6px/1.6 -apple-system,'Segoe UI',sans-serif",
            color: "rgba(255,255,255,.22)",
            letterSpacing: 0.4,
          }}
        >
          Designed by GOGETFIT in India
          <br />
          Model A3102 &nbsp;·&nbsp; IC 579C-E3102
        </div>
      </div>

      {/* SIDE RAILS */}
      <div
        aria-hidden
        className="absolute"
        style={{
          top: RADIUS,
          height: `calc(100% - ${RADIUS * 2}px)`,
          width: THICK,
          left: -THICK / 2,
          transform: "rotateY(90deg)",
          transformStyle: "preserve-3d",
          borderRadius: "12px 0 0 12px",
          background: RAIL_GRADIENT_V,
        }}
      >
        <div style={{ ...btnStyle, top: "16%", height: "9%" }} />
        <div style={{ ...btnStyle, top: "27%", height: "9%" }} />
      </div>
      <div
        aria-hidden
        className="absolute"
        style={{
          top: RADIUS,
          height: `calc(100% - ${RADIUS * 2}px)`,
          width: THICK,
          right: -THICK / 2,
          transform: "rotateY(90deg)",
          transformStyle: "preserve-3d",
          borderRadius: "0 12px 12px 0",
          background: RAIL_GRADIENT_V,
        }}
      >
        <div style={{ ...btnStyle, top: "21%", height: "14%" }} />
      </div>
      <div
        aria-hidden
        className="absolute"
        style={{
          left: RADIUS,
          width: `calc(100% - ${RADIUS * 2}px)`,
          height: THICK,
          top: -THICK / 2,
          transform: "rotateX(90deg)",
          background: RAIL_GRADIENT_H,
        }}
      />
      <div
        aria-hidden
        className="absolute"
        style={{
          left: RADIUS,
          width: `calc(100% - ${RADIUS * 2}px)`,
          height: THICK,
          bottom: -THICK / 2,
          transform: "rotateX(90deg)",
          background: RAIL_GRADIENT_H,
        }}
      />
      <CornerWall corner="tl" />
      <CornerWall corner="tr" />
      <CornerWall corner="br" />
      <CornerWall corner="bl" />

      {/* FRONT — titanium bezel ring at z = +8 */}
      <div
        className="relative h-full w-full rounded-[44px] p-[2.5px]"
        style={{
          transform: `translateZ(${HALF}px)`,
          backfaceVisibility: "hidden",
          background:
            "linear-gradient(135deg,#d9dade 0%,#63646a 12%,#232327 30%,#0a0a0b 50%,#232327 70%,#6a6b71 88%,#cfd0d4 100%)",
          boxShadow:
            "0 40px 90px rgba(0,0,0,0.55), 0 0 60px rgba(255,106,0,0.12)",
        }}
      >
        <div
          className="h-full w-full rounded-[42px]"
          style={{
            background: "linear-gradient(160deg,#1f1f22 0%,#0b0b0c 100%)",
          }}
        />
      </div>

      {/* SCREEN at z = +8.5 */}
      <div
        className="absolute inset-[10px] overflow-hidden rounded-[35px] bg-black"
        style={{
          transform: `translateZ(${HALF + 0.5}px)`,
          backfaceVisibility: "hidden",
        }}
      >
        {/* Content */}
        <div className="absolute inset-0 z-10">{children}</div>

        {/* Glass reflection sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 rounded-[35px]"
          style={{
            background:
              "linear-gradient(118deg,rgba(255,255,255,.15) 0%,rgba(255,255,255,.05) 16%,rgba(255,255,255,0) 34%,rgba(255,255,255,0) 82%,rgba(255,255,255,.04) 100%)",
          }}
        />
      </div>
    </div>
  );
}
