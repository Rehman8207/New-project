"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#05050f] to-cyan-900/30" />
  ),
});

// Ease curve as a properly typed cubic-bezier tuple
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: EASE },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D background canvas */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Gradient overlay fading to dark at bottom */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#05050f]/40 to-[#05050f]" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
        {/* Trending pill */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-sm"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          Trending: AI, Freelancing, Web Dev
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
        >
          Apna{" "}
          <span className="gradient-text">Future</span>{" "}
          Roadmap Ke Saath Banao
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          Pakistan&apos;s first complete career roadmap platform — Web Dev se
          AI tak, MDCAT se Freelancing tak. Ek jagah, sab kuch.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <Link href="#careers" className="glow-btn" aria-label="Roadmap shuru karo">
            Roadmap Shuru Karo
          </Link>
          <Link
            href="#trending"
            className="glass rounded-full px-7 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10 hover:text-white"
            aria-label="Trending careers dekhein"
          >
            Trending Dekho →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
