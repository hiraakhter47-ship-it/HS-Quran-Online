// Single source of truth for every course HS Quran Online offers.
// Used by: the Courses page, the homepage "Our Courses" section and the
// Book a Free Demo form's Course dropdown.
//
// DRAFT CONTENT — age groups, lesson lengths, audiences and learning
// outcomes are placeholders for the academy to review and edit.
// Do NOT add prices here; prices are not shown anywhere on the site.

export const courses = [
  {
    id: 'noorani-qaida',
    title: 'Noorani Qaida',
    summary: 'Learn Arabic letters, sounds and joining rules — the foundation for reading the Quran.',
    audience: 'Young children and anyone starting from the very first Arabic letters.',
    ageGroup: 'Ages 4+',
    lessonLength: '30 minutes',
    outcomes: [
      'Recognise and pronounce every Arabic letter',
      'Learn the short and long vowel signs (harakat)',
      'Join letters to read words with confidence',
      'Build a strong base for reading the Quran',
    ],
  },
  {
    id: 'quran-reading',
    title: 'Quran Reading (Nazra)',
    summary: 'Read the Holy Quran fluently and correctly with guided, one-to-one practice.',
    audience: 'Learners who know the letters and are ready to read the Quran.',
    ageGroup: 'All ages',
    lessonLength: '30 minutes',
    outcomes: [
      'Read directly from the Quran with fluency',
      'Pronounce letters from their correct points (makharij)',
      'Improve reading speed and confidence',
      'Build a regular, lasting reading habit',
    ],
  },
  {
    id: 'tajweed',
    title: 'Quran with Tajweed',
    summary: 'Perfect your recitation with the rules of Tajweed and correct pronunciation.',
    audience: 'Students who can read the Quran and want to recite it beautifully.',
    ageGroup: 'Ages 7+',
    lessonLength: '30–45 minutes',
    outcomes: [
      'Learn and apply the core rules of Tajweed',
      'Rules of noon saakin, meem saakin and madd',
      'Correct common pronunciation mistakes',
      'Recite with confidence, rhythm and beauty',
    ],
  },
  {
    id: 'hifz',
    title: 'Quran Memorization (Hifz)',
    summary: 'Memorize the Quran step by step with a structured revision plan.',
    audience: 'Learners who read fluently and wish to memorize the Quran.',
    ageGroup: 'Ages 6+',
    lessonLength: '30–45 minutes',
    outcomes: [
      'Memorize Surahs step by step, at your pace',
      'Follow a revision plan to keep what you learn',
      'Maintain correct recitation while memorizing',
      'Track progress with your tutor’s guidance',
    ],
  },
  {
    id: 'translation-tafseer',
    title: 'Quran Translation & Tafseer',
    summary: 'Understand the meaning and message of the Quran with translation and explanation.',
    audience: 'Older students and adults who want to understand what they recite.',
    ageGroup: 'Ages 12+',
    lessonLength: '45 minutes',
    outcomes: [
      'Understand the meaning of the verses you read',
      'Learn the background and context of Surahs',
      'Reflect on lessons for everyday life',
      'Grow your vocabulary of common Quranic words',
    ],
  },
  {
    id: 'islamic-studies',
    title: 'Islamic Studies, Salah & Duas',
    summary: 'Learn Salah, essential duas, short surahs and the core principles of Islam.',
    audience: 'Children and new learners building everyday Islamic knowledge.',
    ageGroup: 'Ages 5+',
    lessonLength: '30 minutes',
    outcomes: [
      'Learn how to perform Salah step by step',
      'Memorize essential daily duas',
      'Learn short Surahs used in prayer',
      'Understand the basic beliefs and manners of Islam',
    ],
  },
]

export function getCourseById(id) {
  return courses.find((course) => course.id === id)
}
