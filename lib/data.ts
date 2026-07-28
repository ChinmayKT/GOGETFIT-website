export const STATS = [
  { value: "500+", label: "Success Stories" },
  { value: "2,000+", label: "Active Members" },
  { value: "10K+", label: "App Downloads" },
] as const;

/** Store URLs — placeholders until the real listings go live. */
export const IOS_APP_STORE_URL = "#";
export const ANDROID_PLAY_STORE_URL = "#";

export const DOWNLOAD_BENEFITS = [
  {
    icon: "dumbbell",
    title: "Personalized Fitness Plans",
    desc: "Tailored workouts designed around your goals and lifestyle.",
  },
  {
    icon: "utensils",
    title: "Science-Backed Nutrition",
    desc: "Personalized meal plans built around the food you actually eat.",
  },
  {
    icon: "chart",
    title: "Track Every Milestone",
    desc: "Monitor your progress, celebrate victories, and stay motivated.",
  },
  {
    icon: "chat",
    title: "Expert Coaching",
    desc: "Get guidance, accountability, and support from certified GOGETFIT Coaches.",
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
    title: "Science-Backed",
    body: "Every recommendation is rooted in evidence, not trends.",
  },
  {
    title: "Personalized",
    body: "Every fitness journey is unique, and every plan should be too.",
  },
  {
    title: "Educational",
    body: "We don't just coach—you'll understand the \"why\" behind every recommendation.",
  },
  {
    title: "Community-Driven",
    body: "Real progress is easier when you're supported by coaches and people who share your journey.",
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
    desc: "Your fitness, at a glance.",
    screen: "dashboard",
    alt: "GOGETFIT dashboard screen with daily calories, steps and workouts",
  },
  {
    id: "food",
    title: "Food Tracking",
    desc: "Eat smarter, every day. Log your meals, monitor calories and macros, and build healthier eating habits with ease.",
    screen: "food",
    alt: "GOGETFIT food tracking screen with logged Indian meals",
  },
  {
    id: "workouts",
    title: "Workouts",
    desc: "Train with purpose. Access structured workouts designed to match your goals, fitness level, and progress.",
    screen: "workout",
    alt: "GOGETFIT workout plan screen with coach-designed exercises",
  },
  {
    id: "hydration",
    title: "Hydration",
    desc: "Stay hydrated. Build better hydration habits with simple daily tracking and reminders.",
    screen: "water",
    alt: "GOGETFIT hydration screen with daily water intake progress",
  },
  {
    id: "chat",
    title: "Progress Photos",
    desc: "See the change. Compare photos, measurements, and milestones to celebrate every step of your journey.",
    screen: "chat",
    alt: "GOGETFIT coach chat screen with messages from a dedicated coach",
  },
  {
    id: "progress",
    title: "GOGETFeed",
    desc: "Learn every day. Discover science-backed articles, tips, videos, and expert insights that make fitness easier to understand.",
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
  {
    id: "prajwal",
    name: "Prajwal A T",
    image: "/team/prajwal-at.png",
    alt: "Coach Prajwal A T, GOGETFIT coach",
  },
  {
    id: "jyoti",
    name: "Jyoti Singh",
    image: "/team/jyoti-singh.png",
    alt: "Coach Jyoti Singh, GOGETFIT coach",
  },
  {
    id: "siri",
    name: "Siri Shankar C",
    image: "/team/siri-shankar-c.png",
    alt: "Coach Siri Shankar C, GOGETFIT coach",
  },
];

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  /** Path under public/images/leadership. */
  image: string;
  alt: string;
  /** Optional per-photo framing tweak, e.g. "50% 20%". */
  objectPosition?: string;
}

export const LEADERSHIP: LeadershipMember[] = [
  {
    id: "prajwal",
    name: "Prajwal A T",
    role: "Founder, Director and CEO",
    image: "/images/leadership/prajwal-at.png",
    alt: "GOGETFIT Founder, Director and CEO Prajwal A T",
  },
  {
    id: "chinmay",
    name: "Chinmay K T",
    role: "Co-founder, Director and CTO",
    image: "/images/leadership/chinmay-kt.png",
    alt: "GOGETFIT Co-founder, Director and CTO Chinmay K T",
  },
  {
    id: "priyanka",
    name: "Priyanka Rao",
    role: "Director and Accounts",
    image: "/images/leadership/priyanka-rao.png",
    alt: "GOGETFIT Director and Accounts Priyanka Rao",
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
