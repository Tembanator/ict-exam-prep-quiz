"use client";

import { useState, useEffect } from "react";
import { IQuestion } from "@/models/Question";
import { QuizTimer } from "./QuizTimer";
import { QuizProgress } from "./QuizProgress";
// import { Button } from "@/components/ui/Button";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/Button";

interface QuizActiveProps {
  questions: IQuestion[];
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (
    selected: string,
    isCorrect: boolean,
    correctAnswer: string,
    explanation: string,
    questionText: string,
    options: string[],
    topic: string,
    type: string,
  ) => void;
  score: number;
}

export function QuizActive({
  questions,
  currentIndex,
  totalQuestions,
  onAnswer,
  score,
}: QuizActiveProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
    explanation: string;
  } | null>(null);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
    setFeedback(null);
  }, [currentIndex]);

  const handleSubmit = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === currentQuestion.correct_answer;
    const feedbackMessage = isCorrect
      ? "✓ Correct! Well done."
      : `✗ Incorrect. The correct answer is: ${currentQuestion.correct_answer}`;
    setFeedback({
      isCorrect,
      message: feedbackMessage,
      explanation: currentQuestion.explanation,
    });
  };

  const handleContinue = () => {
    if (!feedback) return;
    onAnswer(
      selectedOption!,
      feedback.isCorrect,
      currentQuestion.correct_answer,
      currentQuestion.explanation,
      currentQuestion.question_text,
      currentQuestion.options,
      currentQuestion.topic,
      currentQuestion.type,
    );
  };

  const handleTimeout = () => {
    if (!feedback) {
      setFeedback({
        isCorrect: false,
        message: `⏰ Time's up! The correct answer is: ${currentQuestion.correct_answer}`,
        explanation: currentQuestion.explanation,
      });
    }
  };

  // Auto-continue after timeout if feedback exists and not yet continued
  useEffect(() => {
    if (
      feedback &&
      !feedback.isCorrect &&
      feedback.message.includes("Time's up")
    ) {
      const timer = setTimeout(() => {
        onAnswer(
          "",
          false,
          currentQuestion.correct_answer,
          currentQuestion.explanation,
          currentQuestion.question_text,
          currentQuestion.options,
          currentQuestion.topic,
          currentQuestion.type,
        );
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback, currentQuestion, onAnswer]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-lg border border-slate-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-slate-600">
            Question {currentIndex + 1} of {totalQuestions}
          </div>
          <div className="text-sm font-medium text-indigo-600">
            Score: {score} / {totalQuestions}
          </div>
        </div>
        <QuizProgress current={currentIndex + 1} total={totalQuestions} />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-b-xl shadow-lg border border-slate-200 border-t-0 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
              {currentQuestion.type === "theory" ? "📘 Theory" : "💻 Practical"}
            </span>
            <span className="text-xs text-slate-500">
              {currentQuestion.topic}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            {currentQuestion.question_text}
          </h2>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <QuizTimer
            duration={30}
            onTimeout={handleTimeout}
            resetTrigger={currentIndex}
            isActive={!feedback}
          />
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                selectedOption === option
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 hover:bg-slate-50"
              } ${feedback ? "pointer-events-none opacity-70" : ""}`}
            >
              <input
                type="radio"
                name="question"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
                disabled={!!feedback}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-slate-700">{option}</span>
            </label>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mb-4 p-3 rounded-lg ${feedback.isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
          >
            <div className="flex items-center gap-2">
              {feedback.isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span
                className={`text-sm ${feedback.isCorrect ? "text-green-800" : "text-red-800"}`}
              >
                {feedback.message}
              </span>
            </div>
            {!feedback.isCorrect && (
              <p className="mt-2 text-sm text-slate-600">
                <strong>💡 Explanation:</strong> {feedback.explanation}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end">
          {!feedback ? (
            <Button
              onClick={handleSubmit}
              //   disabled={!selectedOption}
              variant="primary"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleContinue} variant="primary">
              {currentIndex + 1 === totalQuestions
                ? "🏁 Finish Quiz"
                : "➡️ Next Question"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
