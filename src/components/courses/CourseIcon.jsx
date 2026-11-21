import { AudioLines, BookA, BookOpen, HandHeart, Languages, Sparkles } from 'lucide-react'

// Icon for each course id in data/courses.js (falls back to an open book).
const icons = {
  'noorani-qaida': BookA,
  'quran-reading': BookOpen,
  tajweed: AudioLines,
  hifz: Sparkles,
  'translation-tafseer': Languages,
  'islamic-studies': HandHeart,
}

function CourseIcon({ courseId, size = 26 }) {
  const Icon = icons[courseId] || BookOpen
  return <Icon size={size} aria-hidden="true" />
}

export default CourseIcon
