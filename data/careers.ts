export type Category =
  | "Tech"
  | "Design"
  | "Business"
  | "Freelancing"
  | "Medical"
  | "Engineering"
  | "Exams"
  | "Languages";

export interface Career {
  slug: string;
  title: string;
  category: Category;
  tagline: string; // Roman Urdu tagline
  months: number;
  trending: boolean;
  gradient: string; // Tailwind gradient classes
}

export const careers: readonly Career[] = [
  {
    slug: "web-developer",
    title: "Web Developer",
    category: "Tech",
    tagline: "Websites bana, duniya badal – coding ka magic seekho",
    months: 6,
    trending: true,
    gradient: "from-violet-500 to-cyan-400",
  },
  {
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    category: "Tech",
    tagline: "Machines ko sochna sikhao – future ka career yahi hai",
    months: 10,
    trending: true,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    category: "Tech",
    tagline: "Numbers mein chupi kahani ko samjho aur dekho",
    months: 5,
    trending: true,
    gradient: "from-emerald-400 to-cyan-500",
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    category: "Tech",
    tagline: "Digital duniya ka rakshak ban – hackers se bachao karo",
    months: 8,
    trending: false,
    gradient: "from-red-500 to-orange-400",
  },
  {
    slug: "ui-ux-graphic-design",
    title: "UI/UX & Graphic Design",
    category: "Design",
    tagline: "Design se dil jeet lo – pixels mein passion dikhao",
    months: 5,
    trending: true,
    gradient: "from-pink-500 to-rose-400",
  },
  {
    slug: "digital-marketer",
    title: "Digital Marketer",
    category: "Business",
    tagline: "Online duniya mein brand ki awaz bano – grow karo tezi se",
    months: 4,
    trending: false,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    slug: "freelancing-starter",
    title: "Freelancing Starter",
    category: "Freelancing",
    tagline: "Ghar baithe dollar kamao – apna boss khud bano",
    months: 3,
    trending: true,
    gradient: "from-lime-400 to-green-500",
  },
  {
    slug: "mdcat-prep",
    title: "MDCAT Prep",
    category: "Medical",
    tagline: "Doctor banne ka sapna pura karo – mehnat se manzil milegi",
    months: 12,
    trending: false,
    gradient: "from-teal-400 to-blue-500",
  },
  {
    slug: "ecat-prep",
    title: "ECAT Prep",
    category: "Engineering",
    tagline: "Engineer bano Pakistan ka – ECAT crack karo confidence se",
    months: 8,
    trending: false,
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    slug: "ielts-sat",
    title: "IELTS/SAT",
    category: "Exams",
    tagline: "Bahar ki duniya mein qadam rakho – IELTS/SAT master karo",
    months: 4,
    trending: true,
    gradient: "from-fuchsia-500 to-violet-400",
  },
] as const;
