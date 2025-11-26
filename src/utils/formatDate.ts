export const formatDate = (date: number | Date | undefined | unknown) => {
  const parsedDate =
    date instanceof Date ? date : typeof date === 'string' || typeof date === 'number' ? new Date(date) : null
  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return
  }
  const language = 'vi-VN'
  return new Intl.DateTimeFormat(language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(parsedDate)
}
