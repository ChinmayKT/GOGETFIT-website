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
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  people: number;
  description: string;
}

/** Shared across every plan — identical fine print, kept once instead of repeated per plan. */
export const PLAN_INCLUDES = [
  "A personalised diet plan (based on lifestyle, preferences, and goals)",
  "A personalised workout plan (based on your goals and current level of training)",
  "Daily/Weekly check-ins (to track your progress and adjust your diet/workout as needed)",
  "WhatsApp group support",
  "24/7 access to your coach via call, WhatsApp, or email",
  "An active customer support team to answer all your queries",
] as const;

export const PLAN_NEXT_STEPS = [
  "Once enrolled, go to 'My Bookings' and click 'Start My Journey'.",
  "You'll be directed to an elaborate questionnaire — take your time answering carefully.",
  "Your coach analyses your lifestyle, preferences, and goals to prepare the best plan for you.",
  "A designated coach contacts you within 24 hours at your preferred time and shares your personalized plan, explains it, answers your queries, and sets expectations and weekly tasks.",
  "Your coach checks in daily/weekly (as you prefer) and adjusts the plan as needed — repeating throughout your plan. Then, you GOGETFIT.",
] as const;

export const PLAN_TERMS = [
  "Money refund is only valid for genuine cases (within 15 days of enrolment).",
  "You can opt for a change of coach within 15 days of enrolment. Coach change is only provided within the same tier as the enrolled coach.",
  "Plans selected under challenging a coach are non-refundable. You can opt for a change of coach within the same tier within 15 days of challenging.",
  "Cancelling a package enrolled under a coach: 10% of the price will be deducted.",
  "Cancelling a package (challenge) selected under challenging a coach: non-refundable.",
] as const;

export const PLAN_ELIGIBILITY =
  "You must be at least 18 years old to enrol under a coach on GOGETFIT.";

export const PLAN_PEOPLE_LABEL: Record<number, string> = {
  1: "1 Person",
  2: "2 People",
  4: "4 People",
};

export function formatPlanPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

const SOLO_DESC =
  "Healthy isn't a goal, it's a way of living. We at GOGETFIT do not only focus on losing weight, we establish and encourage healthier lifestyle changes. We take into consideration several aspects of your life, such as your schedule, lifestyle, preferences, current health state, dieting history, current eating habits and goals to create a more personalized and tailor-made diet and workout plan.";

const COUPLES_DESC =
  "Couple who trains together stays together. Motivate each other and become the best version of yourselves. With this plan you can transform your lives together and build a stronger emotional connect. Kickstart your fitness journey with your partner with GOGETFIT today!";

const FAMILY_DESC =
  "Grow fit with your family, because a healthier family is a happy family. Here's a plan that can help ensure your and your family's wellbeing and fitness. Take a step towards a more wholesome and active life with GOGETFIT today!";

export const PLANS: Plan[] = [
  {
    id: "12-week",
    name: "12 Weeks GOGETFIT Plan",
    duration: "12 Weeks",
    price: 4999,
    people: 1,
    description: SOLO_DESC,
  },
  {
    id: "24-week",
    name: "24 Weeks GOGETFIT Plan",
    duration: "24 Weeks",
    price: 8999,
    people: 1,
    description: SOLO_DESC,
  },
  {
    id: "52-week",
    name: "52 Weeks GOGETFIT Plan",
    duration: "52 Weeks",
    price: 16999,
    people: 1,
    description: SOLO_DESC,
  },
  {
    id: "12-week-couples",
    name: "12 Weeks Couples GOGETFIT Plan",
    duration: "12 Weeks",
    price: 8999,
    people: 2,
    description: COUPLES_DESC,
  },
  {
    id: "24-week-couples",
    name: "24 Weeks Couples GOGETFIT Plan",
    duration: "24 Weeks",
    price: 16999,
    people: 2,
    description: COUPLES_DESC,
  },
  {
    id: "52-week-couples",
    name: "52 Weeks Couples GOGETFIT Plan",
    duration: "52 Weeks",
    price: 32999,
    people: 2,
    description: COUPLES_DESC,
  },
  {
    id: "24-week-family",
    name: "24 Weeks Family GOGETFIT Plan",
    duration: "24 Weeks",
    price: 29999,
    people: 4,
    description: FAMILY_DESC,
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: "what-is-gogetfit",
    question: "What is GOGETFIT?",
    answer:
      "GOGETFIT is a science-backed social fitness platform built to simplify fitness for everyone. We combine personalized nutrition, workouts, expert coaching, technology, and community support to help you build a healthier lifestyle. Our goal is not just transformation, but long-term education and sustainable habits.",
  },
  {
    id: "free-to-use",
    question: "Is GOGETFIT free to use?",
    answer:
      "Yes! GOGETFIT is free to download and offers several free features. If you're looking for personalized coaching, customized plans, and one-on-one guidance, you can choose one of our coaching programs.",
  },
  {
    id: "who-can-use",
    question: "Who can use GOGETFIT?",
    answer:
      "Anyone who wants to improve their health and fitness can use GOGETFIT. Whether your goal is weight loss, muscle gain, improving fitness, or simply living a healthier lifestyle, our platform is designed to support your journey.",
  },
  {
    id: "different-from-others",
    question: "How is GOGETFIT different from other fitness apps?",
    answer:
      "GOGETFIT goes beyond workouts and calorie tracking. We focus on science-backed coaching, personalized guidance, education, and sustainable habit building. We don't believe in shortcuts—we believe in doing fitness the right way.",
  },
  {
    id: "personalized-plan",
    question: "Will I get a personalized diet and workout plan?",
    answer:
      "Yes. Every coaching program includes customized diet and workout plans based on your goals, lifestyle, food preferences, fitness level, and progress. We believe every individual's journey is unique, so every plan should be too.",
  },
  {
    id: "personal-coach",
    question: "Do I get a personal coach?",
    answer:
      "Yes. Every coaching member is assigned a dedicated GOGETFIT Coach who provides guidance, accountability, regular check-ins, and plan adjustments to help you stay on track throughout your journey.",
  },
  {
    id: "strict-diet",
    question: "Do I have to follow a strict diet?",
    answer:
      "No. We don't believe in crash diets or unrealistic meal plans. Our nutrition plans are designed around your lifestyle and food preferences, making healthy eating practical, enjoyable, and sustainable.",
  },
  {
    id: "results-time",
    question: "How long does it take to see results?",
    answer:
      "Every fitness journey is different. Your progress depends on factors such as consistency, effort, lifestyle, and commitment to your plan. Our focus is on helping you build habits that create lasting results rather than quick fixes.",
  },
  {
    id: "track-progress",
    question: "Can I track my progress in the app?",
    answer:
      "Yes. GOGETFIT allows you to track your workouts, nutrition, body measurements, progress photos, and other health metrics, helping you stay motivated and monitor your improvement over time.",
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer:
      "Simply download the GOGETFIT app, explore the platform, and book a free consultation if you'd like personalized guidance. Our team will understand your goals, answer your questions, and help you choose the right coaching program.",
  },
];

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
