"use client";

import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="container-custom relative py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
              Cambridge 0417 ICT Exam Prep
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Master your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              0417 ICT
            </span>{" "}
            Exams
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Comprehensive practice across all 21 chapters of Theory and
            Practical content. Detailed explanations, verified questions, and a
            structured learning path.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href="/register"
              variant="primary"
              size="lg"
              className="group"
            >
              Get Started
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button href="#features" variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          {/* Social proof placeholder */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Trusted by 500+ students</span>
            </div>
            <div>•</div>
            <div>21 Complete Chapters</div>
            <div>•</div>
            <div>Theory + Practical</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
