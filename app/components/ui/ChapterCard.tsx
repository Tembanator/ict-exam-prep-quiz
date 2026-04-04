import Link from 'next/link'
import { ChevronRight, FileText } from 'lucide-react'

interface ChapterCardProps {
  chapterNumber: number
  title: string
  questionCount: number
  progress?: number
  href: string
}

export default function ChapterCard({
  chapterNumber,
  title,
  questionCount,
  progress = 0,
  href
}: ChapterCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Chapter Number Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg px-3 py-1.5 text-sm font-semibold">
            Chapter {chapterNumber}
          </div>
          <div className="flex items-center gap-1 text-text-muted text-sm">
            <FileText className="w-4 h-4" />
            <span>{questionCount} questions</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Progress Bar (optional) */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
            Start Practice
          </span>
          <ChevronRight className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}