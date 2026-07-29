export const STATS = [
  { value: "500+", label: "Success Stories" },
  { value: "2,000+", label: "Active Members" },
  { value: "10K+", label: "App Downloads" },
] as const;

export const IOS_APP_STORE_URL =
  "https://apps.apple.com/us/app/gogetfit-fat-loss-workouts/id6465083987";
export const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.flutterflow.gogetfit";

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
  { label: "Home", href: "#hero" },
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
  /** Full bio — shown in a modal on click. Cards without one aren't clickable. */
  bio?: string;
}

export const LEADERSHIP: LeadershipMember[] = [
  {
    id: "prajwal",
    name: "Prajwal A T",
    role: "Founder, Director & CEO",
    image: "/images/leadership/prajwal-at.png",
    alt: "GOGETFIT Founder, Director & CEO Prajwal A T",
    bio: "Prajwal founded GOGETFIT with one simple mission—to simplify fitness for the world. Passionate about health, education, and sustainable lifestyle transformation, he believes fitness should be accessible to everyone, regardless of age, profession, or experience. His vision is to build more than just a fitness app; a platform that educates, empowers, and helps people take control of their own health. Every feature, every program, and every decision at GOGETFIT is driven by that purpose.",
  },
  {
    id: "chinmay",
    name: "Chinmay K T",
    role: "Co-Founder, Director & CTO",
    image: "/images/leadership/chinmay-kt.png",
    alt: "GOGETFIT Co-Founder, Director & CTO Chinmay K T",
    bio: "Chinmay leads the technology behind GOGETFIT, transforming ideas into a seamless digital experience. As the driving force behind product development and innovation, he focuses on building technology that makes fitness simpler, smarter, and more accessible. His goal is to ensure every user enjoys an intuitive, reliable, and engaging experience while using the GOGETFIT platform.",
  },
  {
    id: "priyanka",
    name: "Priyanka Rao",
    role: "Director & Head of Accounts",
    image: "/images/leadership/priyanka-rao.png",
    alt: "GOGETFIT Director & Head of Accounts Priyanka Rao",
    bio: "Priyanka oversees the financial operations and administrative foundation of GOGETFIT, ensuring the organization grows with stability and integrity. She manages the company's financial planning, compliance, and day-to-day operations while supporting strategic business decisions. Her commitment to transparency, efficiency, and sustainable growth helps strengthen the foundation on which GOGETFIT continues to evolve.",
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
  /** real before/after cards with the story baked into the image itself —
   * hides the card's own name/result overlay so captions never double up. */
  selfCaptioned?: boolean;
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
 * Three carousel rows for the Results section. Real GOGETFIT client
 * before/after cards — the story is already baked into each image
 * (caption + BEFORE/AFTER labels), so these are all `selfCaptioned: true`
 * and the card/modal skip their own text overlay for these items.
 */
export const TRANSFORMATION_ROWS: TransformationRow[] = [
  {
    id: "weight-loss",
    title: "Weight Loss Transformations",
    items: [
      { id: "client-01", type: "image", image: "/images/transformations/client-01.png", name: "GOGETFIT Client", result: "-19 kg", duration: "24 weeks", alt: "GOGETFIT client lost 19 kg in 24 weeks with Coach Prajwal's guidance", selfCaptioned: true },
      { id: "client-02", type: "image", image: "/images/transformations/client-02.png", name: "GOGETFIT Client", result: "-9 kg", duration: "12 weeks", alt: "GOGETFIT client lost 9 kg in 12 weeks with Coach Karthik's guidance", selfCaptioned: true },
      { id: "client-03", type: "image", image: "/images/transformations/client-03.png", name: "GOGETFIT Client", result: "-17 kg", duration: "", alt: "GOGETFIT client lost 17 kg with home workouts and home cooked food, guided by Coach Prajwal", selfCaptioned: true },
      { id: "client-06", type: "image", image: "/images/transformations/client-06.png", name: "GOGETFIT Client", result: "-12+ kg", duration: "14 weeks", alt: "GOGETFIT client lost 12+ kg in 14 weeks with Coach Prajwal's support", selfCaptioned: true },
      { id: "client-07", type: "image", image: "/images/transformations/client-07.png", name: "GOGETFIT Client", result: "-16 kg", duration: "", alt: "GOGETFIT client went from 98 kg to 82 kg with GOGETFIT's lifestyle-based approach", selfCaptioned: true },
      { id: "client-10", type: "image", image: "/images/transformations/client-10.png", name: "GOGETFIT Client", result: "43% → 30% body fat", duration: "12 weeks", alt: "GOGETFIT client dropped from 43% to 30% body fat in 12 weeks with Coach Karthik's guidance", selfCaptioned: true },
      { id: "client-13", type: "image", image: "/images/transformations/client-13.png", name: "Yashaswini", result: "-9 kg", duration: "", alt: "Yashaswini went from 67 kg to 58 kg, guided step by step by Coach Prajwal", selfCaptioned: true },
    ],
  },
  {
    id: "healthy-gain",
    title: "Healthy Weight Gain & Fitness",
    items: [
      { id: "client-04", type: "image", image: "/images/transformations/client-04.png", name: "GOGETFIT Client", result: "Best-ever physique", duration: "8 weeks", alt: "GOGETFIT client achieved his best-ever physique in 8 weeks with Coach Karthik's guidance", selfCaptioned: true },
      { id: "client-05", type: "image", image: "/images/transformations/client-05.png", name: "GOGETFIT Client", result: "Visible abs", duration: "11 weeks", alt: "GOGETFIT client shed belly fat and built visible abs in 11 weeks with Coach Prajwal's guidance", selfCaptioned: true },
      { id: "client-08", type: "image", image: "/images/transformations/client-08.png", name: "GOGETFIT Client", result: "-18 kg", duration: "", alt: "GOGETFIT client 18 kgs down on his GOGETFIT journey with Coach Karthik", selfCaptioned: true },
      { id: "client-09", type: "image", image: "/images/transformations/client-09.png", name: "GOGETFIT Client", result: "Stronger & healthier", duration: "", alt: "GOGETFIT client stands more confident, healthier, and stronger, coached by Karthik", selfCaptioned: true },
      { id: "client-11", type: "image", image: "/images/transformations/client-11.png", name: "Darshan", result: "-6 kg", duration: "", alt: "Darshan's transformation from 74 kg to 68 kg", selfCaptioned: true },
      { id: "client-12", type: "image", image: "/images/transformations/client-12.png", name: "GOGETFIT Client", result: "Total transformation", duration: "", alt: "GOGETFIT client transformation — trust the process, stay consistent, don't rush results", selfCaptioned: true },
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
    { label: "Privacy Policy", href: "/documents/privacy-policy.pdf" },
    { label: "Terms of Service", href: "/documents/terms-of-service.pdf" },
    { label: "Refund Policy", href: "/documents/refund-policy.pdf" },
  ],
  contact: {
    address:
      "Registered Office: 11th cross road, Malleshwaram, Bengaluru, Karnataka 560003. Landmark: StartuphouZ",
    email: "prajwal@gogetfitonline.com",
    supportEmail: "support@gogetfitonline.com",
    phone: "+91 99025 59808",
    whatsapp: "+91 99025 59808",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/GOGETFITOFFICIAL/" },
    { label: "Instagram", href: "https://www.instagram.com/gogetfitofficial/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UC2jZ3OJY1AUyFxPAbfL4MXw/featured" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/gogetfitofficial/" },
  ],
} as const;
