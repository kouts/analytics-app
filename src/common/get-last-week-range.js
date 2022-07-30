export const getLastWeekRange = (referenceDate) => {
  const today = referenceDate instanceof Date ? referenceDate : new Date()

  today.setHours(0, 0, 0, 0)
  // Set the day of the month based on dayOfMonth - dayOfWeek - 7
  const firstDayOfLastWeek = new Date(today.getTime()).setDate(today.getDate() - today.getDay() - 7)
  const lastDayOfLastWeek = new Date(firstDayOfLastWeek + 7 * 24 * 60 * 60 * 1000).getTime()

  return {
    first: firstDayOfLastWeek,
    last: lastDayOfLastWeek
  }
}
