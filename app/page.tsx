import HeroSection from "@/components/HeroSection";
import CareerCard from "@/components/CareerCard";
import { careers } from "@/data/careers";

const trendingCareers = careers.filter((c) => c.trending);
const allCareers = careers;

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <HeroSection />

      {/* ── Trending Abhi ────────────────────────────── */}
      <section
        id="trending"
        className="mx-auto max-w-7xl px-6 py-20"
        aria-labelledby="trending-heading"
      >
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-400">
            Hot Right Now
          </p>
          <h2 id="trending-heading" className="section-heading">
            🔥 Trending{" "}
            <span className="gradient-text">Abhi</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Yeh careers abhi sabse zyada demand mein hain — shuru karo aaj hi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingCareers.map((career) => (
            <CareerCard key={career.slug} career={career} />
          ))}
        </div>
      </section>

      {/* ── All Courses & Careers ─────────────────────── */}
      <section
        id="careers"
        className="mx-auto max-w-7xl px-6 pb-32 pt-4"
        aria-labelledby="careers-heading"
      >
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Complete Library
          </p>
          <h2 id="careers-heading" className="section-heading">
            All Courses &{" "}
            <span className="gradient-text">Careers</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Har field ka roadmap — tech se medical tak, exams se freelancing tak.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allCareers.map((career) => (
            <CareerCard key={career.slug} career={career} />
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} PathWay — Built with ❤️ for Pakistani
        students.
      </footer>
    </main>
  );
}
