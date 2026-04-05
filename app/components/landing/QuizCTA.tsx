import React from "react";
import { Button } from "../ui/Button";

export default function QuizCTA() {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Ready to test your knowledge?
        </h2>
        <p className="text-slate-600 mb-8">
          Jump straight into the exam prep and practice with multiple-choice
          questions.
        </p>
        <Button href="/auth-callback" variant="primary" size="lg">
          Start Exam Prep
        </Button>
      </div>
    </section>
  );
}
