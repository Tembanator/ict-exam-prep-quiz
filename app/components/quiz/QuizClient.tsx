"use client";

import { useState } from "react";
import { IQuestion } from "@/models/Question";
import { QuizSetup } from "./QuizSetup";
import { QuizActive } from "./QuizActive";
import { QuizResults } from "./QuizResults";

export type QuizStage = "setup" | "active" | "results";

export interface UserAnswer {
  questionId: string;
  selected: string;
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  questionText: string;
  options: string[];
  topic: string;
  type: string;
}

interface QuizClientProps {
  questions: IQuestion[];
  chapterNum: number;
  chapterName: string;
}

export function QuizClient({
  questions,
  chapterNum,
  chapterName,
}: QuizClientProps) {
  const [stage, setStage] = useState<QuizStage>("setup");
  const [selectedCount, setSelectedCount] = useState<number>(10);
  const [quizQuestions, setQuizQuestions] = useState<IQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (count: number) => {
    // Randomly select `count` questions from available
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, questions.length));
    setQuizQuestions(selected);
    setSelectedCount(selected.length);
    setStage("active");
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
  };

  const answerQuestion = (
    selected: string,
    isCorrect: boolean,
    correctAnswer: string,
    explanation: string,
    questionText: string,
    options: string[],
    topic: string,
    type: string,
  ) => {
    const currentQ = quizQuestions[currentIndex];
    const newAnswer: UserAnswer = {
      questionId: currentQ.id,
      selected,
      isCorrect,
      correctAnswer,
      explanation,
      questionText,
      options,
      topic,
      type,
    };
    setUserAnswers((prev) => [...prev, newAnswer]);
    if (isCorrect) setScore((prev) => prev + 1);

    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStage("results");
    }
  };

  const resetQuiz = () => {
    setStage("setup");
    setQuizQuestions([]);
    setUserAnswers([]);
    setCurrentIndex(0);
    setScore(0);
  };

  return (
    <div>
      {stage === "setup" && (
        <QuizSetup
          totalAvailable={questions.length}
          onStart={startQuiz}
          chapterName={chapterName}
          chapterNum={chapterNum}
        />
      )}
      {stage === "active" && quizQuestions.length > 0 && (
        <QuizActive
          questions={quizQuestions}
          currentIndex={currentIndex}
          totalQuestions={quizQuestions.length}
          onAnswer={answerQuestion}
          score={score}
        />
      )}
      {stage === "results" && (
        <QuizResults
          userAnswers={userAnswers}
          totalQuestions={quizQuestions.length}
          score={score}
          chapterName={chapterName}
          onRetry={resetQuiz}
        />
      )}
    </div>
  );
}
