"use client";

import Link from "next/link";
import { Chapter } from "@/actions/chapters";
import { BookOpen, FileText, Code, ChevronRight } from "lucide-react";

// Predefined color palette for cards
const colorPalette = [
  {
    bg: "from-red-500 to-red-600",
    border: "border-red-200",
    text: "text-red-600",
    hover: "hover:shadow-red-100",
  },
  {
    bg: "from-orange-500 to-orange-600",
    border: "border-orange-200",
    text: "text-orange-600",
    hover: "hover:shadow-orange-100",
  },
  {
    bg: "from-amber-500 to-amber-600",
    border: "border-amber-200",
    text: "text-amber-600",
    hover: "hover:shadow-amber-100",
  },
  {
    bg: "from-yellow-500 to-yellow-600",
    border: "border-yellow-200",
    text: "text-yellow-600",
    hover: "hover:shadow-yellow-100",
  },
  {
    bg: "from-lime-500 to-lime-600",
    border: "border-lime-200",
    text: "text-lime-600",
    hover: "hover:shadow-lime-100",
  },
  {
    bg: "from-green-500 to-green-600",
    border: "border-green-200",
    text: "text-green-600",
    hover: "hover:shadow-green-100",
  },
  {
    bg: "from-emerald-500 to-emerald-600",
    border: "border-emerald-200",
    text: "text-emerald-600",
    hover: "hover:shadow-emerald-100",
  },
  {
    bg: "from-teal-500 to-teal-600",
    border: "border-teal-200",
    text: "text-teal-600",
    hover: "hover:shadow-teal-100",
  },
  {
    bg: "from-cyan-500 to-cyan-600",
    border: "border-cyan-200",
    text: "text-cyan-600",
    hover: "hover:shadow-cyan-100",
  },
  {
    bg: "from-sky-500 to-sky-600",
    border: "border-sky-200",
    text: "text-sky-600",
    hover: "hover:shadow-sky-100",
  },
  {
    bg: "from-blue-500 to-blue-600",
    border: "border-blue-200",
    text: "text-blue-600",
    hover: "hover:shadow-blue-100",
  },
  {
    bg: "from-indigo-500 to-indigo-600",
    border: "border-indigo-200",
    text: "text-indigo-600",
    hover: "hover:shadow-indigo-100",
  },
  {
    bg: "from-violet-500 to-violet-600",
    border: "border-violet-200",
    text: "text-violet-600",
    hover: "hover:shadow-violet-100",
  },
  {
    bg: "from-purple-500 to-purple-600",
    border: "border-purple-200",
    text: "text-purple-600",
    hover: "hover:shadow-purple-100",
  },
  {
    bg: "from-fuchsia-500 to-fuchsia-600",
    border: "border-fuchsia-200",
    text: "text-fuchsia-600",
    hover: "hover:shadow-fuchsia-100",
  },
  {
    bg: "from-pink-500 to-pink-600",
    border: "border-pink-200",
    text: "text-pink-600",
    hover: "hover:shadow-pink-100",
  },
  {
    bg: "from-rose-500 to-rose-600",
    border: "border-rose-200",
    text: "text-rose-600",
    hover: "hover:shadow-rose-100",
  },
];

interface ChapterGridProps {
  chapters: Chapter[];
}

export function ChapterGrid({ chapters }: ChapterGridProps) {
  // Ensure we have exactly 21 chapters (or less if some missing)
  // Sort by chapter number
  const sortedChapters = [...chapters].sort((a, b) => a.chapter - b.chapter);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedChapters.map((chapter, index) => {
        const colorIndex = index % colorPalette.length;
        const colors = colorPalette[colorIndex];
        const hasQuestions = chapter.totalQuestions
          ? chapter.totalQuestions > 0
          : false;

        return (
          <Link
            key={chapter.chapter}
            href={hasQuestions ? `/chapters/${chapter.chapter}` : "#"}
            className={`group relative block rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${
              hasQuestions
                ? `hover:shadow-xl ${colors.hover} cursor-pointer`
                : "opacity-60 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!hasQuestions) e.preventDefault();
            }}
          >
            <div
              className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 text-white shadow-md`}
            >
              {/* Chapter Number Badge */}
              <div className="flex justify-between items-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold">
                  Chapter {chapter.chapter}
                </div>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Chapter Name */}
              <h3 className="text-xl font-bold mt-4 mb-2 line-clamp-2">
                {chapter.chapter_name}
              </h3>

              {/* Stats */}
              <div className="mt-4 flex gap-3 text-sm">
                {chapter.theoryCount !== undefined &&
                chapter.theoryCount > 0 ? (
                  <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                    <FileText className="w-3 h-3" />
                    <span>{chapter.theoryCount} Theory</span>
                  </div>
                ) : null}
                {chapter.practicalCount !== undefined &&
                chapter.practicalCount > 0 ? (
                  <>
                    <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                      <Code className="w-3 h-3" />
                      <span>{chapter.practicalCount} Practical</span>
                    </div>
                  </>
                ) : null}
              </div>

              {/* Total Questions */}
              <div className="mt-3 text-xs opacity-80">
                {chapter.totalQuestions} questions available
              </div>
            </div>
          </Link>
        );
      })}

      {/* If chapters missing (less than 21), show placeholder cards */}
      {sortedChapters.length < 21 && (
        <div className="col-span-full text-center py-12">
          <p className="text-slate-500">
            Only {sortedChapters.length} chapters loaded. Please seed the
            database with all 21 chapters.
          </p>
        </div>
      )}
    </div>
  );
}
