export const createCalendar = (date) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const numberOfDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()

  const startingDayIndex = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay()

  return [
    ...days,
    ...new Array(startingDayIndex).fill(""), // empty string for starting blank spaces
    ...new Array(numberOfDays).fill(null).map((_, i) => i + 1), //1 to numberOfDays
    ...new Array((7 - ((numberOfDays + startingDayIndex) % 7)) % 7).fill(""), // empty string for ending blank spaces
  ]
}
