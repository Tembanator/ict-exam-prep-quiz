"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { ChevronLeft, Clock, FileQuestion } from "lucide-react";
import Link from "next/link";

interface QuizSetupProps {
  totalAvailable: number;
  onStart: (count: number) => void;
  chapterName: string;
  chapterNum: number;
}

const questionOptions = [2, 5, 10, 15, 20, 25, 30];

export function QuizSetup({
  totalAvailable,
  onStart,
  chapterName,
  chapterNum,
}: QuizSetupProps) {
  const [selectedCount, setSelectedCount] = useState(
    Math.min(10, totalAvailable),
  );

  const maxAllowed = Math.min(30, totalAvailable);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-8">
      <div className="mb-6">
        <Link
          href="/chapters"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Chapters
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Quiz Setup</h1>
        <p className="text-slate-600 mt-2">
          Chapter {chapterNum}: {chapterName}
        </p>
        <p className="text-sm text-slate-500 mt-1">
          {totalAvailable} questions available in this chapter
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Number of questions
          </label>
          <div className="flex flex-wrap gap-3">
            {questionOptions.map(
              (num) =>
                num <= maxAllowed && (
                  <button
                    key={num}
                    onClick={() => setSelectedCount(num)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCount === num
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {num}
                  </button>
                ),
            )}
            {totalAvailable > 30 && (
              <button
                onClick={() => setSelectedCount(totalAvailable)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCount === totalAvailable
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All ({totalAvailable})
              </button>
            )}
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-sm font-medium text-indigo-900">
              Estimated time
            </p>
            <p className="text-xs text-indigo-700">
              ~{Math.ceil(selectedCount * 0.5)} minutes (30 sec per question)
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 flex items-center gap-3">
          <FileQuestion className="w-5 h-5 text-slate-600" />
          <div>
            <p className="text-sm font-medium text-slate-900">
              Random selection
            </p>
            <p className="text-xs text-slate-600">
              Questions will be randomly selected from this chapter
            </p>
          </div>
        </div>

        <Button
          onClick={() => onStart(selectedCount)}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
