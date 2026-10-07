import { notFound } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { careers } from "@/data/careers";

// Build a Zod enum from the known slugs at compile time
const validSlugs = careers.map((c) => c.slug) as [string, ...string[]];
const slugSchema = z.enum(validSlugs);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const result = slugSchema.safeParse(slug);
  if (!result.success) return { title: "Not Found | PathWay" };
  const career = careers.find((c) => c.slug === result.data);
  return {
    title: `${career?.title ?? slug} Roadmap | PathWay`,
    description: career?.tagline,
  };
}

export default async function RoadmapPage({ params }: PageProps) {
  // Next.js 15 async params — must be awaited
  const { slug } = await params;

  // Validate slug against known values
  const result = slugSchema.safeParse(slug);
  if (!result.success) notFound();

  const career = careers.find((c) => c.slug === result.data);
  if (!career) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {/* Gradient orb background */}
      <div
        className={`pointer-events-none fixed inset-0 bg-gradient-to-br ${career.gradient} opacity-10`}
      />

      <div className="relative z-10 max-w-2xl">
        <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-slate-400">
          {career.category}
        </span>

        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          {career.title}
        </h1>

        <p className="mt-4 text-lg text-slate-400">{career.tagline}</p>

        {/* Coming-soon notice */}
        <div className="glass mt-12 rounded-2xl p-8">
          <div className="mb-4 text-5xl">🚀</div>
          <h2 className="mb-3 text-2xl font-bold text-white">
            Roadmap jald aa raha hai
          </h2>
          <p className="text-slate-400">
            Hum is career ka mukammal roadmap tayyar kar rahe hain — resources,
            tools, aur step-by-step guide ke saath. Subscribe karo to get
            notified!
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
            <span>⏱</span>
            <span>Estimated completion: {career.months} months roadmap</span>
          </div>
        </div>

        <Link
          href="/"
          className="glow-btn mt-10 inline-flex"
          aria-label="Wapas home page par jao"
        >
          ← Wapas Jao
        </Link>
      </div>
    </main>
  );
}
