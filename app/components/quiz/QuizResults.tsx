"use client";

import { useState } from "react";
// import { Button } from "@/components/ui/Button";
import { UserAnswer } from "./QuizClient";
import {
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Home,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

interface QuizResultsProps {
  userAnswers: UserAnswer[];
  totalQuestions: number;
  score: number;
  chapterName: string;
  onRetry: () => void;
}

export function QuizResults({
  userAnswers,
  totalQuestions,
  score,
  chapterName,
  onRetry,
}: QuizResultsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">📊 Quiz Results</h1>
        <p className="text-slate-600 mt-2">Chapter: {chapterName}</p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
          <span className="text-2xl font-bold text-indigo-600">{score}</span>
          <span className="text-slate-600">/</span>
          <span className="text-2xl font-bold text-slate-600">
            {totalQuestions}
          </span>
        </div>
        <div className="mt-2 text-sm text-slate-500">Score: {percentage}%</div>
        {percentage >= 70 ? (
          <p className="mt-2 text-green-600 text-sm">
            🎉 Great job! Keep up the good work.
          </p>
        ) : percentage >= 50 ? (
          <p className="mt-2 text-yellow-600 text-sm">
            👍 Good effort! Review the explanations to improve.
          </p>
        ) : (
          <p className="mt-2 text-red-600 text-sm">
            📚 Keep practicing! Review the explanations below.
          </p>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-slate-900">
          📝 Question Review
        </h2>
        {userAnswers.map((answer, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedId(
                  expandedId === answer.questionId ? null : answer.questionId,
                )
              }
              className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {answer.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className="font-medium text-slate-900">
                  Q{idx + 1}:{" "}
                  {answer.questionText.length > 80
                    ? answer.questionText.substring(0, 80) + "..."
                    : answer.questionText}
                </span>
              </div>
              {expandedId === answer.questionId ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>
            {expandedId === answer.questionId && (
              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Your answer:</strong>{" "}
                  {answer.selected || "(No answer)"}
                </p>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Correct answer:</strong> {answer.correctAnswer}
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Explanation:</strong> {answer.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRetry} variant="outline" size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Link href="/chapters">
          <Button variant="primary" size="lg">
            <Home className="w-4 h-4 mr-2" />
            Back to Chapters
          </Button>
        </Link>
      </div>
    </div>
  );
}
