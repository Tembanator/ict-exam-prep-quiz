"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

interface QuizTimerProps {
  duration: number;
  onTimeout: () => void;
  resetTrigger: any;
  isActive: boolean;
}

export function QuizTimer({
  duration,
  onTimeout,
  resetTrigger,
  isActive,
}: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
    }
  }, [resetTrigger, duration, isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout, isActive]);

  const percentage = (timeLeft / duration) * 100;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="flex items-center gap-2">
      <Timer
        className={`w-4 h-4 ${isUrgent ? "text-red-500 animate-pulse" : "text-slate-500"}`}
      />
      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            isUrgent ? "bg-red-500" : "bg-indigo-600"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span
        className={`text-sm font-mono ${isUrgent ? "text-red-600 font-bold" : "text-slate-600"}`}
      >
        {timeLeft}s
      </span>
    </div>
  );
}
