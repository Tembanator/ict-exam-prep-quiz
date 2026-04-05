import { requireActiveUser } from "@/lib/auth-active";
import { getAllChapters } from "@/actions/chapters";
import { ChapterGrid } from "../components/chapters/ChapterGrid";

export const dynamic = "force-dynamic";

export default async function ChaptersPage() {
  // Ensure user is authenticated, approved, and active
  await requireActiveUser();

  // Fetch all chapters with question counts
  const chapters = await getAllChapters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Choose a Chapter
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select any chapter below to start practicing. Each chapter contains
            questions based on the Cambridge 0417 ICT syllabus.
          </p>
        </div>

        {/* Client component for interactive grid */}
        <ChapterGrid chapters={chapters} />
      </div>
    </div>
  );
}
