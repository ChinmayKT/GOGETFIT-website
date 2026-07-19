export const STATS = [
  { value: "400+", label: "Transformations" },
  { value: "500+", label: "Happy Clients" },
  { value: "10k+", label: "App Downloads" },
] as const;

/** Store URLs — placeholders until the real listings go live. */
export const IOS_APP_STORE_URL = "#";
export const ANDROID_PLAY_STORE_URL = "#";

export const DOWNLOAD_BENEFITS = [
  {
    icon: "dumbbell",
    title: "Personalized Workouts",
    desc: "Plans tailored for your goals.",
  },
  {
    icon: "utensils",
    title: "Smart Nutrition",
    desc: "Track meals. Eat right. Feel amazing.",
  },
  {
    icon: "chart",
    title: "Track Progress",
    desc: "See results. Stay motivated.",
  },
  {
    icon: "chat",
    title: "Coach Support",
    desc: "Real coaches. Real guidance.",
  },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Coaches", href: "#coaches" },
  { label: "Results", href: "#transformations" },
  { label: "Contact", href: "#contact" },
] as const;

export const VALUES = [
  {
    title: "Sustainable, Not Extreme",
    body: "No crash diets. No punishing routines. We build habits your body can keep for life.",
  },
  {
    title: "Human Accountability",
    body: "A dedicated coach who checks in daily, adjusts your plan weekly, and never lets you drift.",
  },
  {
    title: "Rooted in Indian Living",
    body: "Nutrition built around the food on your table — dal, roti, rice — not imported meal plans.",
  },
  {
    title: "Progress You Can See",
    body: "Every metric tracked, every milestone celebrated. Data-backed transformation, week after week.",
  },
] as const;

/**
 * "Inside the App" six-phone showcase. `screen` is a PhoneScreen key —
 * dashboard/food/water render real screenshots from public/screens, the
 * rest use the coded app screens until real exports are added.
 */
export const APP_SHOWCASE = [
  {
    id: "dashboard",
    title: "Dashboard",
    desc: "Your daily overview. Track calories, steps, workouts & more.",
    screen: "dashboard",
    alt: "GOGETFIT dashboard screen with daily calories, steps and workouts",
  },
  {
    id: "food",
    title: "Food Tracking",
    desc: "Log meals in seconds. Track calories, macros and daily nutrition.",
    screen: "food",
    alt: "GOGETFIT food tracking screen with logged Indian meals",
  },
  {
    id: "workouts",
    title: "Workouts",
    desc: "Follow coach-guided workouts designed for your transformation.",
    screen: "workout",
    alt: "GOGETFIT workout plan screen with coach-designed exercises",
  },
  {
    id: "hydration",
    title: "Hydration",
    desc: "Track your daily water intake and stay consistently hydrated.",
    screen: "water",
    alt: "GOGETFIT hydration screen with daily water intake progress",
  },
  {
    id: "chat",
    title: "Coach Chat",
    desc: "Stay connected with your dedicated coach throughout your journey.",
    screen: "chat",
    alt: "GOGETFIT coach chat screen with messages from a dedicated coach",
  },
  {
    id: "progress",
    title: "Progress",
    desc: "Track your measurements, photos and transformation journey.",
    screen: "progress",
    alt: "GOGETFIT progress screen with weight trend and measurements",
  },
] as const;

export const FEATURES = [
  {
    key: "food",
    title: "Track every bite, effortlessly.",
    body: "Log Indian meals in seconds. Your coach sees what you eat and fine-tunes your macros in real time.",
    screen: "food",
  },
  {
    key: "workout",
    title: "Workouts built for your body.",
    body: "Personalized plans that evolve with your progress — home or gym, 20 minutes or 90.",
    screen: "workout",
  },
  {
    key: "water",
    title: "Hydration, handled.",
    body: "Smart reminders that learn your rhythm and keep you at your daily target without nagging.",
    screen: "water",
  },
  {
    key: "chat",
    title: "Your coach, one tap away.",
    body: "Real humans. Real answers. Doubts cleared in minutes, motivation delivered daily.",
    screen: "chat",
  },
  {
    key: "recipes",
    title: "500+ healthy Indian recipes.",
    body: "Macro-counted, chef-tested, family-approved. Eating right never tasted this familiar.",
    screen: "recipes",
  },
  {
    key: "progress",
    title: "Watch yourself transform.",
    body: "Weight, measurements, photos, streaks — your entire journey visualized beautifully.",
    screen: "progress",
  },
] as const;

export interface Coach {
  id: string;
  name: string;
  /** Real portrait in public/team — falls back to a styled silhouette. */
  image?: string;
  alt: string;
}

/** Data-driven roster — add/remove coaches freely, the carousel adapts. */
export const COACHES: Coach[] = [
  { id: "arjun", name: "Arjun Mehta", alt: "Coach Arjun Mehta, GOGETFIT coach" },
  { id: "priya", name: "Priya Sharma", alt: "Coach Priya Sharma, GOGETFIT coach" },
  { id: "rahul", name: "Rahul Verma", alt: "Coach Rahul Verma, GOGETFIT coach" },
  { id: "sneha", name: "Sneha Iyer", alt: "Coach Sneha Iyer, GOGETFIT coach" },
  { id: "vivek", name: "Vivek Kulkarni", alt: "Coach Vivek Kulkarni, GOGETFIT coach" },
  { id: "ritika", name: "Ritika Bansal", alt: "Coach Ritika Bansal, GOGETFIT coach" },
];

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  /**
   * TEMPORARY placeholders cropped from the design reference. Replace the
   * files in public/images/leadership (same names → zero code changes), or
   * point these paths at new files.
   */
  image: string;
  alt: string;
  /** Optional per-photo framing tweak, e.g. "50% 20%". */
  objectPosition?: string;
}

export const LEADERSHIP: LeadershipMember[] = [
  {
    id: "founder",
    name: "Vikram Singh",
    role: "Founder",
    image: "/images/leadership/founder-placeholder.png",
    alt: "GOGETFIT Founder Vikram Singh",
  },
  {
    id: "ceo",
    name: "Ananya Rao",
    role: "CEO",
    image: "/images/leadership/ceo-placeholder.png",
    alt: "GOGETFIT CEO Ananya Rao",
  },
  {
    id: "cto",
    name: "Karthik Nair",
    role: "CTO",
    image: "/images/leadership/cto-placeholder.png",
    alt: "GOGETFIT CTO Karthik Nair",
  },
  {
    id: "director",
    name: "Chinmay KT",
    role: "Director",
    image: "/images/leadership/director-placeholder.png",
    alt: "GOGETFIT Director Chinmay KT",
  },
];

export type TransformationType = "image" | "video";

export interface TransformationStory {
  id: string;
  type: TransformationType;
  /** image cards */
  image?: string;
  /** video cards: poster always, videoSrc added later (empty = placeholder) */
  poster?: string;
  videoSrc?: string;
  name: string;
  result: string;
  duration: string;
  alt: string;
}

/**
 * Transformation stream stories. Images are TEMPORARY crops from the design
 * reference — replace files in public/images/transformations (same names →
 * zero code changes) or update paths here. Provide videoSrc when real
 * testimonial videos exist.
 */
export const TRANSFORMATION_STREAM: TransformationStory[] = [
  {
    id: "neha",
    type: "image",
    image: "/images/transformations/transformation-01-placeholder.png",
    name: "Neha",
    result: "-12 kg",
    duration: "5 months",
    alt: "Neha after losing 12 kg with GOGETFIT",
  },
  {
    id: "arjun-video",
    type: "video",
    poster: "/images/transformations/video-testimonial-01-placeholder.png",
    videoSrc: "",
    name: "Arjun",
    result: "+8 kg",
    duration: "6 months",
    alt: "Arjun's video testimonial after gaining 8 kg of lean mass",
  },
  {
    id: "rohan",
    type: "image",
    image: "/images/transformations/transformation-02-placeholder.png",
    name: "Rohan",
    result: "-18 kg",
    duration: "6 months",
    alt: "Rohan after losing 18 kg with GOGETFIT",
  },
  {
    id: "kavya",
    type: "image",
    image: "/images/transformations/transformation-03-placeholder.png",
    name: "Kavya",
    result: "-9 kg",
    duration: "4 months",
    alt: "Kavya after losing 9 kg with GOGETFIT",
  },
  {
    id: "ishita-video",
    type: "video",
    poster: "/images/transformations/video-testimonial-02-placeholder.png",
    videoSrc: "",
    name: "Ishita",
    result: "-15 kg",
    duration: "8 months",
    alt: "Ishita's video testimonial after losing 15 kg",
  },
  {
    id: "aditya",
    type: "image",
    image: "/images/transformations/transformation-04-placeholder.png",
    name: "Aditya",
    result: "+10 kg",
    duration: "9 months",
    alt: "Aditya after gaining 10 kg of lean mass",
  },
];

export interface TransformationRow {
  id: string;
  title: string;
  items: TransformationStory[];
}

/**
 * Three carousel rows for the Results section. ALL card data below is
 * PLACEHOLDER demo content (images are temporary crops from the design
 * reference, reused across rows) — replace items/images with real client
 * assets; layout adapts to any item count.
 */
export const TRANSFORMATION_ROWS: TransformationRow[] = [
  {
    id: "weight-loss",
    title: "Weight Loss Transformations",
    items: [
      { id: "wl-rohan", type: "image", image: "/images/transformations/transformation-02-placeholder.png", name: "Rohan", result: "-18 kg", duration: "6 months", alt: "Rohan after losing 18 kg with GOGETFIT" },
      { id: "wl-neha", type: "image", image: "/images/transformations/transformation-01-placeholder.png", name: "Neha", result: "-12 kg", duration: "5 months", alt: "Neha after losing 12 kg with GOGETFIT" },
      { id: "wl-ishita", type: "video", poster: "/images/transformations/video-testimonial-02-placeholder.png", videoSrc: "", name: "Ishita", result: "-15 kg", duration: "8 months", alt: "Ishita's video story after losing 15 kg" },
      { id: "wl-kavya", type: "image", image: "/images/transformations/transformation-03-placeholder.png", name: "Kavya", result: "-9 kg", duration: "4 months", alt: "Kavya after losing 9 kg with GOGETFIT" },
      { id: "wl-tarun", type: "image", image: "/images/transformations/transformation-04-placeholder.png", name: "Tarun", result: "-13 kg", duration: "6 months", alt: "Tarun after losing 13 kg with GOGETFIT" },
      { id: "wl-megha", type: "video", poster: "/images/transformations/transformation-01-placeholder.png", videoSrc: "", name: "Megha", result: "-11 kg", duration: "5 months", alt: "Megha's transformation story video" },
    ],
  },
  {
    id: "healthy-gain",
    title: "Healthy Weight Gain & Fitness",
    items: [
      { id: "hg-aditya", type: "image", image: "/images/transformations/transformation-04-placeholder.png", name: "Aditya", result: "+10 kg", duration: "9 months", alt: "Aditya after gaining 10 kg of healthy weight" },
      { id: "hg-arjun", type: "video", poster: "/images/transformations/video-testimonial-01-placeholder.png", videoSrc: "", name: "Arjun", result: "+8 kg", duration: "6 months", alt: "Arjun's video story after gaining 8 kg" },
      { id: "hg-pooja", type: "image", image: "/images/transformations/transformation-03-placeholder.png", name: "Pooja", result: "+7 kg", duration: "6 months", alt: "Pooja after gaining 7 kg of healthy weight" },
      { id: "hg-sneha", type: "image", image: "/images/transformations/video-testimonial-02-placeholder.png", name: "Sneha", result: "+6 kg", duration: "6 months", alt: "Sneha after her fitness transformation" },
      { id: "hg-vihaan", type: "image", image: "/images/transformations/transformation-02-placeholder.png", name: "Vihaan", result: "+11 kg", duration: "10 months", alt: "Vihaan after gaining 11 kg of healthy weight" },
      { id: "hg-karan", type: "video", poster: "/images/transformations/video-testimonial-02-placeholder.png", videoSrc: "", name: "Karan", result: "+9 kg", duration: "8 months", alt: "Karan's transformation story video" },
    ],
  },
];

export const TRANSFORMATIONS = [
  {
    name: "Rohan K.",
    result: "-18 kg",
    duration: "6 months",
    coach: "Arjun Mehta",
    story:
      "From breathless on stairs to finishing his first 10K. Rohan rebuilt his relationship with food — without giving up his mother's cooking.",
  },
  {
    name: "Divya S.",
    result: "-12 kg",
    duration: "5 months",
    coach: "Sneha Iyer",
    story:
      "Managed PCOS through nutrition and strength training. Energy back, confidence higher than ever.",
  },
  {
    name: "Amit P.",
    result: "+8 kg lean",
    duration: "7 months",
    coach: "Priya Sharma",
    story:
      "Healthy weight gain done right — muscle, not just mass. Amit went from skinny to strong on home-cooked food.",
  },
] as const;

export const REEL_ITEMS = [
  { name: "Kavya", result: "-9 kg", duration: "4 mo" },
  { name: "Siddharth", result: "-15 kg", duration: "6 mo" },
  { name: "Neha", result: "-11 kg", duration: "5 mo" },
  { name: "Farhan", result: "+6 kg lean", duration: "5 mo" },
  { name: "Ishita", result: "-20 kg", duration: "8 mo" },
  { name: "Manish", result: "-7 kg", duration: "3 mo" },
  { name: "Tanvi", result: "-13 kg", duration: "6 mo" },
  { name: "Aditya", result: "+10 kg lean", duration: "9 mo" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#leadership" },
    { label: "Coaches", href: "#coaches" },
    { label: "Transformations", href: "#transformations" },
    { label: "Contact Us", href: "#contact" },
  ],
  product: [
    { label: "Features", href: "#features" },
    { label: "Download App", href: "#download" },
    { label: "Book Consultation", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Shipping Policy", href: "/shipping" },
  ],
  contact: {
    address: "GOGETFIT Health Pvt. Ltd., 4th Floor, Indiranagar, Bengaluru, KA 560038",
    email: "hello@gogetfit.in",
    phone: "+91 98765 43210",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/gogetfit" },
    { label: "YouTube", href: "https://youtube.com/@gogetfit" },
    { label: "LinkedIn", href: "https://linkedin.com/company/gogetfit" },
    { label: "X", href: "https://x.com/gogetfit" },
  ],
} as const;
