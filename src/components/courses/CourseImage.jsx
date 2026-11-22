// Course photo, looked up by course id: src/assets/images/courses/<course id>.webp
// To change a photo, replace that file (keep the same name). A course without a photo
// simply shows nothing here (the card keeps its emerald pattern background).
const photos = Object.fromEntries(
  Object.entries(import.meta.glob('../../assets/images/courses/*.webp', { eager: true, import: 'default' }))
    .map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]),
)

function CourseImage({ course, className }) {
  const src = photos[course.id]
  if (!src) return null
  return (
    <div className={className}>
      <img src={src} alt="" width="800" height="500" loading="lazy" decoding="async" />
    </div>
  )
}

export default CourseImage
