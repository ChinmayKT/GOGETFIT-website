"use client";

import Image from "next/image";
import {
  Flame,
  Footprints,
  Droplets,
  Dumbbell,
  TrendingDown,
  ChefHat,
  QrCode,
  CalendarCheck,
  Heart,
  Send,
  ChevronRight,
  Sparkles,
  Apple,
  Play,
} from "lucide-react";
import type { ReactNode } from "react";
import GoGetFitLogo from "@/components/brand/GoGetFitLogo";

export type ScreenKey =
  | "dashboard"
  | "onboarding"
  | "food"
  | "workout"
  | "water"
  | "chat"
  | "coachIntro"
  | "coachProfile"
  | "recipes"
  | "progress"
  | "gallery"
  | "booking"
  | "qr"
  | "downloadAndroid"
  | "brand";

/** Silhouette portrait used until real coach photos are added. */
export function CoachPortrait({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,138,61,0.12) 0%, rgba(255,106,0,0.24) 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute top-[20%] left-1/2 h-[24%] w-[40%] -translate-x-1/2 rounded-full"
        style={{ background: "rgba(255,255,255,0.14)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-[8%] left-1/2 h-[42%] w-[80%] -translate-x-1/2 rounded-t-full"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />
      <span className="headline absolute top-[28%] left-1/2 -translate-x-1/2 text-2xl text-white/70">
        {initials}
      </span>
    </div>
  );
}

/* ---------- tiny building blocks ---------- */

function Tile({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-white/6 p-3 ${className}`}
    >
      {children}
    </div>
  );
}

function Ring({ pct, label, value }: { pct: number; label: string; value: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="34" cy="34" r={r} fill="none"
          stroke="#FF6A00" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          transform="rotate(-90 34 34)"
        />
        <text x="34" y="38" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
          {value}
        </text>
      </svg>
      <span className="text-[9px] text-[--silver-dim]">{label}</span>
    </div>
  );
}

function Bars({ values }: { values: number[] }) {
  return (
    <div className="flex h-16 items-end gap-1.5">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${v}%`,
            background:
              i === values.length - 1
                ? "linear-gradient(180deg,#FF8A3D,#FF6A00)"
                : "rgba(255,255,255,0.14)",
          }}
        />
      ))}
    </div>
  );
}

function ScreenShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-2.5 px-4 pt-7 pb-5 text-white">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold tracking-tight">{title}</span>
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FF8A3D] to-[#FF6A00] text-center text-[10px] leading-6 font-bold">
          R
        </div>
      </div>
      {children}
    </div>
  );
}

/* ---------- screens ---------- */

function Dashboard() {
  return (
    <ScreenShell title="Good morning, Rohan">
      <div className="flex justify-between px-1">
        <Ring pct={0.72} label="Calories" value="1,440" />
        <Ring pct={0.55} label="Steps" value="6.2k" />
        <Ring pct={0.8} label="Water" value="2.4L" />
      </div>
      <Tile>
        <div className="mb-1 flex items-center gap-1.5 text-[10px] text-[--silver]">
          <TrendingDown size={11} className="text-[#FF6A00]" /> This week
        </div>
        <Bars values={[40, 55, 45, 70, 60, 82, 90]} />
      </Tile>
      <Tile className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold">Push Day · 45 min</div>
          <div className="text-[9px] text-[--silver-dim]">Next workout · 6:30 PM</div>
        </div>
        <div className="rounded-full bg-[#FF6A00] p-1.5">
          <Dumbbell size={12} />
        </div>
      </Tile>
      <div className="flex items-center gap-2 rounded-2xl border border-[#FF6A00]/30 bg-[#FF6A00]/10 p-2.5">
        <Flame size={14} className="text-[#FF6A00]" />
        <span className="text-[10px] font-medium">21-day streak. Keep going!</span>
      </div>
    </ScreenShell>
  );
}

function Onboarding() {
  return (
    <ScreenShell title="Your goal">
      <div className="mt-2 space-y-2">
        {["Lose weight", "Gain healthy weight", "Build lifestyle", "Get stronger"].map(
          (g, i) => (
            <div
              key={g}
              className={`flex items-center justify-between rounded-2xl border p-3.5 text-[11px] font-semibold ${
                i === 0
                  ? "border-[#FF6A00] bg-[#FF6A00]/15 text-white"
                  : "border-white/8 bg-white/5 text-[--silver]"
              }`}
            >
              {g}
              <ChevronRight size={13} className={i === 0 ? "text-[#FF6A00]" : "text-white/20"} />
            </div>
          )
        )}
      </div>
      <div className="mt-auto rounded-full bg-[#FF6A00] py-3 text-center text-[11px] font-bold">
        Continue
      </div>
    </ScreenShell>
  );
}

function Food() {
  const meals = [
    { name: "Masala Oats + Eggs", kcal: 320, tag: "Breakfast" },
    { name: "Dal, Rice & Sabzi", kcal: 540, tag: "Lunch" },
    { name: "Paneer Bhurji + Roti", kcal: 460, tag: "Dinner" },
  ];
  return (
    <ScreenShell title="Food Log">
      <Tile className="flex items-center justify-between">
        <span className="text-[10px] text-[--silver]">Today</span>
        <span className="text-[12px] font-bold">
          1,320 <span className="text-[9px] font-normal text-[--silver-dim]">/ 1,900 kcal</span>
        </span>
      </Tile>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
        <div className="h-full w-[69%] rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF8A3D]" />
      </div>
      {meals.map((m) => (
        <Tile key={m.name} className="flex items-center justify-between">
          <div>
            <div className="text-[8px] font-semibold tracking-wider text-[#FF8A3D] uppercase">
              {m.tag}
            </div>
            <div className="text-[11px] font-semibold">{m.name}</div>
          </div>
          <span className="text-[10px] text-[--silver]">{m.kcal}</span>
        </Tile>
      ))}
      <div className="mt-auto rounded-full border border-[#FF6A00]/40 bg-[#FF6A00]/10 py-2.5 text-center text-[10px] font-bold text-[#FF8A3D]">
        + Log a meal
      </div>
    </ScreenShell>
  );
}

function Workout() {
  const sets = [
    { name: "Goblet Squat", detail: "3 × 12 · 16 kg", done: true },
    { name: "Push-ups", detail: "3 × 15", done: true },
    { name: "Dumbbell Row", detail: "3 × 10 · 12 kg", done: false },
    { name: "Plank", detail: "3 × 45 sec", done: false },
  ];
  return (
    <ScreenShell title="Full Body · Day 3">
      <Tile className="flex items-center gap-2.5">
        <div className="rounded-xl bg-[#FF6A00] p-2">
          <Dumbbell size={14} />
        </div>
        <div>
          <div className="text-[11px] font-bold">45 min · Moderate</div>
          <div className="text-[9px] text-[--silver-dim]">Coach Arjun&apos;s plan</div>
        </div>
      </Tile>
      {sets.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/5 p-2.5"
        >
          <div
            className={`h-4 w-4 rounded-full border ${
              s.done ? "border-[#FF6A00] bg-[#FF6A00]" : "border-white/25"
            }`}
          />
          <div>
            <div className={`text-[11px] font-semibold ${s.done ? "line-through opacity-50" : ""}`}>
              {s.name}
            </div>
            <div className="text-[9px] text-[--silver-dim]">{s.detail}</div>
          </div>
        </div>
      ))}
    </ScreenShell>
  );
}

function Water() {
  return (
    <ScreenShell title="Hydration">
      <div className="relative mx-auto mt-2 flex h-40 w-28 items-end overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div
          className="w-full"
          style={{
            height: "65%",
            background: "linear-gradient(180deg, rgba(255,138,61,0.7), rgba(255,106,0,0.9))",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Droplets size={18} className="mb-1 text-white" />
          <span className="text-lg font-bold">2.4L</span>
          <span className="text-[9px] text-white/80">of 3.5L</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {["250ml", "500ml", "750ml", "1L"].map((v) => (
          <div
            key={v}
            className="rounded-full border border-white/10 bg-white/5 py-1.5 text-center text-[9px] font-semibold text-[--silver]"
          >
            {v}
          </div>
        ))}
      </div>
      <Tile className="mt-1 flex items-center gap-2">
        <Sparkles size={12} className="text-[#FF8A3D]" />
        <span className="text-[9px] text-[--silver]">
          Next reminder at 4:30 PM — you&apos;re ahead of schedule.
        </span>
      </Tile>
    </ScreenShell>
  );
}

function Chat({ coachName = "Arjun Mehta" }: { coachName?: string }) {
  const first = coachName.split(" ")[0];
  return (
    <ScreenShell title={`Coach ${first}`}>
      <div className="flex flex-1 flex-col justify-end gap-2">
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md border border-white/8 bg-white/8 p-2.5 text-[10px]">
          Saw your food log — great protein today! 💪
        </div>
        <div className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#FF6A00] p-2.5 text-[10px]">
          Thanks coach! Knee felt fine during squats.
        </div>
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md border border-white/8 bg-white/8 p-2.5 text-[10px]">
          Perfect. Adding one extra set next week. Rest well tonight 🙌
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 pr-2 pl-3.5">
        <span className="flex-1 text-[10px] text-white/30">Message…</span>
        <div className="rounded-full bg-[#FF6A00] p-1.5">
          <Send size={10} />
        </div>
      </div>
    </ScreenShell>
  );
}

/**
 * Coach arrival screen. The portrait area carries [data-coach-slot] so the
 * Coaches carousel can measure it and land a traveling coach card exactly
 * on it. The portrait itself stays hidden until the landing frame.
 */
function CoachIntro({
  coachName = "Arjun Mehta",
  showPortrait = true,
}: {
  coachName?: string;
  showPortrait?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center px-4 pt-10 pb-5 text-white">
      <div className="text-[8px] font-bold tracking-[0.3em] text-[#FF8A3D] uppercase">
        Your GOGETFIT Coach
      </div>
      <div
        data-coach-slot
        className="relative mt-3 w-[72%] overflow-hidden rounded-3xl border border-white/10"
        style={{ aspectRatio: "3/4" }}
      >
        {showPortrait && <CoachPortrait name={coachName} />}
        {showPortrait && (
          <div
            className="absolute inset-x-0 bottom-0 p-2.5 pt-8 text-center"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(8,8,8,0.85) 70%)",
            }}
          >
            <span className="headline text-sm">{coachName}</span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[9px] text-[--silver-dim]">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Online · ready to chat
      </div>
      <div className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6A00] py-3 text-[11px] font-bold">
        Start chatting
      </div>
    </div>
  );
}

function Recipes() {
  const items = [
    { name: "Tandoori Paneer Bowl", kcal: 380, protein: "28g" },
    { name: "Moong Dal Chilla", kcal: 240, protein: "18g" },
    { name: "Chicken Curry (light)", kcal: 410, protein: "36g" },
  ];
  return (
    <ScreenShell title="Recipes">
      <div className="flex gap-1.5">
        {["All", "High protein", "Veg"].map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-3 py-1 text-[9px] font-semibold ${
              i === 1 ? "bg-[#FF6A00] text-white" : "border border-white/10 bg-white/5 text-[--silver]"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      {items.map((r) => (
        <Tile key={r.name} className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8A3D]/30 to-[#FF6A00]/30">
            <ChefHat size={14} className="text-[#FF8A3D]" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-semibold">{r.name}</div>
            <div className="text-[9px] text-[--silver-dim]">
              {r.kcal} kcal · {r.protein} protein
            </div>
          </div>
          <Heart size={12} className="text-white/25" />
        </Tile>
      ))}
    </ScreenShell>
  );
}

function Progress() {
  return (
    <ScreenShell title="Progress">
      <Tile>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[9px] text-[--silver-dim]">Current</div>
            <div className="text-xl font-bold">74.2 kg</div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#FF6A00]/15 px-2 py-1 text-[10px] font-bold text-[#FF8A3D]">
            <TrendingDown size={11} /> −11.8 kg
          </div>
        </div>
        <svg viewBox="0 0 200 60" className="mt-2 w-full">
          <path
            d="M0,10 C30,14 50,22 80,28 S140,42 200,50"
            fill="none"
            stroke="#FF6A00"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="200" cy="50" r="4" fill="#FF6A00" />
        </svg>
      </Tile>
      <div className="grid grid-cols-2 gap-2">
        <Tile>
          <div className="text-[9px] text-[--silver-dim]">Waist</div>
          <div className="text-[13px] font-bold">−9 cm</div>
        </Tile>
        <Tile>
          <div className="text-[9px] text-[--silver-dim]">Streak</div>
          <div className="text-[13px] font-bold">21 days</div>
        </Tile>
      </div>
      <Tile className="flex items-center gap-2">
        <Footprints size={13} className="text-[#FF8A3D]" />
        <span className="text-[10px] text-[--silver]">Avg 8,400 steps this week</span>
      </Tile>
    </ScreenShell>
  );
}

function Gallery() {
  const cells = [
    { r: "−18 kg", n: "Rohan" },
    { r: "−12 kg", n: "Divya" },
    { r: "+8 kg", n: "Amit" },
    { r: "−20 kg", n: "Ishita" },
  ];
  return (
    <ScreenShell title="Transformations">
      <div className="grid flex-1 grid-cols-2 gap-2">
        {cells.map((c) => (
          <div
            key={c.n}
            className="flex flex-col justify-end rounded-2xl border border-white/8 p-2.5"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,106,0,0.14))",
            }}
          >
            <div className="text-[13px] font-bold text-[#FF8A3D]">{c.r}</div>
            <div className="text-[9px] text-[--silver]">{c.n}&apos;s journey</div>
          </div>
        ))}
      </div>
      <div className="rounded-full bg-[#FF6A00] py-2.5 text-center text-[10px] font-bold">
        Start yours
      </div>
    </ScreenShell>
  );
}

function Booking() {
  return (
    <ScreenShell title="Book Consultation">
      <Tile className="flex items-center gap-2.5">
        <CalendarCheck size={15} className="text-[#FF8A3D]" />
        <div>
          <div className="text-[11px] font-bold">Free 1-on-1 call</div>
          <div className="text-[9px] text-[--silver-dim]">30 min · with an expert coach</div>
        </div>
      </Tile>
      <div className="grid grid-cols-3 gap-1.5">
        {["Mon 18", "Tue 19", "Wed 20"].map((d, i) => (
          <div
            key={d}
            className={`rounded-xl border py-2.5 text-center text-[10px] font-semibold ${
              i === 1 ? "border-[#FF6A00] bg-[#FF6A00]/15" : "border-white/8 bg-white/5 text-[--silver]"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {["10:00 AM", "12:30 PM", "5:00 PM", "7:30 PM"].map((t, i) => (
          <div
            key={t}
            className={`rounded-xl border py-2 text-center text-[10px] font-semibold ${
              i === 2 ? "border-[#FF6A00] bg-[#FF6A00]/15" : "border-white/8 bg-white/5 text-[--silver]"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-full bg-[#FF6A00] py-3 text-center text-[11px] font-bold">
        Confirm booking
      </div>
    </ScreenShell>
  );
}

/** Mini progress ring for the download-dashboard screens' "Today's Progress" card. */
function MiniRing({ pct }: { pct: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="5" />
      <circle
        cx="28" cy="28" r={r} fill="none"
        stroke="#fff" strokeWidth="5" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        transform="rotate(-90 28 28)"
      />
      <text x="28" y="32" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

/**
 * Shared dashboard body for both download-showcase screens (iOS + Android).
 * Same GOGETFIT UI, same orange branding — the platform is differentiated
 * only by the status bar / QR label below, never by recoloring the app.
 */
function DownloadDashboard({
  name,
  workoutTitle,
  workoutMeta,
  mealTitle,
  mealKcal,
  storeIcon,
  storeLabel,
}: {
  name: string;
  workoutTitle: string;
  workoutMeta: string;
  mealTitle: string;
  mealKcal: string;
  storeIcon: ReactNode;
  storeLabel: string;
}) {
  return (
    <div className="flex h-full w-full flex-col px-4 pt-11 pb-3 text-white">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold tracking-tight">
          GO<span className="text-[#FF6A00]">GET</span>FIT
        </span>
        <div className="rounded-full bg-white/8 p-1.5">
          <Sparkles size={11} className="text-[--silver]" />
        </div>
      </div>
      <div className="mt-3 text-[11px] text-[--silver-dim]">
        Welcome back,
        <div className="text-[14px] font-bold text-white">{name} 👋</div>
      </div>

      <div
        className="mt-3 flex items-center gap-3 rounded-2xl p-3"
        style={{ background: "linear-gradient(135deg,#FF8A3D,#FF6A00)" }}
      >
        <MiniRing pct={0.75} />
        <div>
          <div className="text-[10px] font-semibold text-white/85">Today&apos;s Progress</div>
          <div className="mt-0.5 text-[11px] font-bold">Workouts 5/6</div>
          <div className="text-[9px] text-white/80">Calories 1,650 / 2,200</div>
        </div>
      </div>

      <div className="mt-3 text-[9px] font-semibold text-[--silver-dim]">Your Plan for Today</div>
      <div className="mt-1 flex items-center justify-between rounded-2xl border border-white/8 bg-white/6 p-2.5">
        <div>
          <div className="text-[11px] font-semibold">{workoutTitle}</div>
          <div className="text-[9px] text-[--silver-dim]">{workoutMeta}</div>
        </div>
        <Dumbbell size={14} className="text-[#FF8A3D]" />
      </div>

      <div className="mt-2 text-[9px] font-semibold text-[--silver-dim]">Meal Plan</div>
      <div className="mt-1 flex items-center justify-between rounded-2xl border border-white/8 bg-white/6 p-2.5">
        <div>
          <div className="text-[11px] font-semibold">{mealTitle}</div>
          <div className="text-[9px] text-[--silver-dim]">{mealKcal}</div>
        </div>
        <ChefHat size={14} className="text-[#FF8A3D]" />
      </div>

      <div className="mt-auto rounded-2xl bg-white p-2.5 text-black">
        <div className="flex items-center gap-2.5">
          <QrCode size={44} strokeWidth={1.3} />
          <div className="flex items-center gap-1.5">
            {storeIcon}
            <span className="text-[10px] leading-tight font-semibold">
              Scan to download for
              <br />
              <span className="text-[12px] font-bold">{storeLabel}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Qr() {
  return (
    <DownloadDashboard
      name="Rohan"
      workoutTitle="Upper Body Strength"
      workoutMeta="45 min · Intermediate"
      mealTitle="High Protein Meal"
      mealKcal="520 kcal"
      storeIcon={<Apple size={18} />}
      storeLabel="iOS"
    />
  );
}

function DownloadAndroid() {
  return (
    <DownloadDashboard
      name="Ankit"
      workoutTitle="Lower Body Strength"
      workoutMeta="50 min · Intermediate"
      mealTitle="Power Protein Bowl"
      mealKcal="560 kcal"
      storeIcon={<Play size={16} />}
      storeLabel="Android"
    />
  );
}

/** Brand splash — the official GOGETFIT logo centered on the phone screen. */
function Brand() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <GoGetFitLogo className="w-full" alt="GOGETFIT — The Right Way" priority />
    </div>
  );
}

const SCREENS: Record<
  Exclude<ScreenKey, "chat" | "coachIntro" | "coachProfile">,
  () => ReactNode
> = {
  dashboard: Dashboard,
  onboarding: Onboarding,
  food: Food,
  workout: Workout,
  water: Water,
  recipes: Recipes,
  progress: Progress,
  gallery: Gallery,
  booking: Booking,
  qr: Qr,
  downloadAndroid: DownloadAndroid,
  brand: Brand,
};

/**
 * Real app screenshots (public/screens). Each is a full device mockup with
 * its own bezel + status bar + notch, so the shot renders inside a crop
 * frame: the top 7.2% of the screen stays black (status area under the
 * Dynamic Island), the image is widened 12% to shed the side bezels, and
 * pulled up ~17% of its width to discard the baked-in status bar — the app
 * header lands exactly below the island.
 */
const SHOTS: Partial<Record<ScreenKey, string>> = {
  coachProfile: "/screens/coach-profile.png",
  dashboard: "/screens/home.png",
  onboarding: "/screens/tools.png",
  food: "/screens/intake.png",
  water: "/screens/water.png",
  recipes: "/screens/recipes.png",
  gallery: "/screens/feed.png",
};

export function PhoneScreen({
  screen,
  coachName,
  coachPortraitVisible = true,
}: {
  screen: ScreenKey;
  coachName?: string;
  coachPortraitVisible?: boolean;
}) {
  if (screen === "chat") return <Chat coachName={coachName} />;
  if (screen === "coachIntro")
    return <CoachIntro coachName={coachName} showPortrait={coachPortraitVisible} />;
  const shot = SHOTS[screen];
  if (shot) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-black">
        {/* Image widened 12% to shed the source's side bezels and pulled up
            ~17% of its width to discard its baked-in status bar + notch —
            app content starts at the very top of the screen. */}
        <Image
          src={shot}
          alt=""
          width={860}
          height={1788}
          sizes="400px"
          priority={screen === "dashboard"}
          className="mt-[-17.2%] ml-[-6%] h-auto w-[112%] max-w-none"
        />
      </div>
    );
  }
  const Screen =
    SCREENS[screen as Exclude<ScreenKey, "chat" | "coachIntro" | "coachProfile">];
  return <Screen />;
}
