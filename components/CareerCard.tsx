"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import type { Career } from "@/data/careers";

interface CareerCardProps {
  career: Career;
}

export default function CareerCard({ career }: CareerCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const cardStyle: MotionStyle = {
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
    perspective: 1000,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className="glass relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]">
        {/* Gradient orb that intensifies on hover */}
        <div
          className={`pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br ${career.gradient} opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-50 group-hover:scale-125`}
        />

        {/* Category & trending badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-400">
            {career.category}
          </span>
          {career.trending && (
            <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-semibold text-violet-300">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-white">{career.title}</h3>

        {/* Roman Urdu tagline */}
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          {career.tagline}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            ⏱ {career.months} months
          </span>
          <Link
            href={`/roadmap/${career.slug}`}
            className={`rounded-full bg-gradient-to-r ${career.gradient} px-4 py-1.5 text-xs font-semibold text-white shadow transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-transparent`}
            aria-label={`${career.title} ka roadmap dekho`}
          >
            Roadmap Dekho →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
