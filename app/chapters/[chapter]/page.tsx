import { getQuestionsByChapter } from "@/actions/chapters";
import { QuizClient } from "@/app/components/quiz/QuizClient";
import { requireActiveUser } from "@/lib/auth-active";
// import { getQuestionsByChapter } from "@/actions/questions";
// import { QuizClient } from "@/components/quiz/QuizClient";

interface QuizPageProps {
  params: Promise<{ chapter: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  await requireActiveUser();
  const { chapter } = await params;
  const chapterNum = parseInt(chapter, 10);

  if (isNaN(chapterNum)) {
    throw new Error("Invalid chapter number");
  }

  const questions = await getQuestionsByChapter(chapterNum);

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            No questions found
          </h1>
          <p className="text-slate-600 mt-2">
            This chapter has no questions yet.
          </p>
        </div>
      </div>
    );
  }

  const chapterName = questions[0].chapter_name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 py-8">
      <div className="container-custom">
        <QuizClient
          questions={questions}
          chapterNum={chapterNum}
          chapterName={chapterName}
        />
      </div>
    </div>
  );
}
