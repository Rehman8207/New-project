"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { careers } from "@/data/careers";

const steps = [
  { id: "career", title: "Aapka Goal Kya Hai?" },
  { id: "level", title: "Current Level" },
  { id: "time", title: "Time Commitment" },
];

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    careerSlug: "",
    level: "",
    hoursPerWeek: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitForm();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const submitForm = async () => {
    setLoading(true);
    // TODO: In Phase 4, we will send this data to Supabase and trigger the Claude API route.
    console.log("Onboarding Data:", formData);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    
    // Redirect to dashboard where the roadmap will be shown
    router.push("/dashboard?onboarding=complete");
  };

  const isNextDisabled = () => {
    if (currentStep === 0 && !formData.careerSlug) return true;
    if (currentStep === 1 && !formData.level) return true;
    if (currentStep === 2 && !formData.hoursPerWeek) return true;
    return false;
  };

  return (
    <div className="glass p-8 md:p-12 rounded-3xl min-h-[450px] flex flex-col relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-2">
          Step {currentStep + 1} of {steps.length}
        </p>
        <h2 className="text-3xl font-bold text-white">
          {steps[currentStep].title}
        </h2>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {currentStep === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {careers.map((career) => (
                  <button
                    key={career.slug}
                    onClick={() => setFormData({ ...formData, careerSlug: career.slug })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.careerSlug === career.slug
                        ? "bg-violet-500/20 border-violet-500/50 text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-semibold">{career.title}</div>
                    <div className="text-xs mt-1 text-slate-400 opacity-80">{career.category}</div>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex flex-col gap-4">
                {[
                  { value: "beginner", label: "Beginner", desc: "Main bilkul naya/nayi hoon is field mein." },
                  { value: "intermediate", label: "Intermediate", desc: "Mujhe basics aati hain, advanced level pe jana hai." },
                  { value: "advanced", label: "Advanced", desc: "Main already kaam kar raha/rahi hoon, expert banna hai." },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({ ...formData, level: level.value })}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      formData.level === level.value
                        ? "bg-cyan-500/20 border-cyan-500/50 text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-semibold text-lg">{level.label}</div>
                    <div className="text-sm mt-1 text-slate-400">{level.desc}</div>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col gap-4">
                {[
                  { value: "part-time", label: "Thora Time (5-10 hours/week)" },
                  { value: "half-time", label: "Aadha Din (15-20 hours/week)" },
                  { value: "full-time", label: "Full Time (30+ hours/week)" },
                ].map((time) => (
                  <button
                    key={time.value}
                    onClick={() => setFormData({ ...formData, hoursPerWeek: time.value })}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      formData.hoursPerWeek === time.value
                        ? "bg-pink-500/20 border-pink-500/50 text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-semibold text-lg">{time.label}</div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center z-10 bg-transparent">
        <button
          onClick={handleBack}
          disabled={currentStep === 0 || loading}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            currentStep === 0
              ? "opacity-0 pointer-events-none"
              : "text-slate-300 hover:bg-white/10"
          }`}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={isNextDisabled() || loading}
          className={`glow-btn px-8 ${isNextDisabled() ? "opacity-50 grayscale cursor-not-allowed hover:transform-none hover:shadow-none" : ""}`}
        >
          {loading ? "Generating Roadmap..." : currentStep === steps.length - 1 ? "Complete Setup" : "Next Step →"}
        </button>
      </div>
    </div>
  );
}
