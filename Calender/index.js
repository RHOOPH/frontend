const createCalendar = (date) => {
  const calendar = document.createElement("div")
  calendar.className = "calendarGrid"

  const getNumberOfDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const getStartingDayInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const createItem = (innerHTML) => {
    const item = document.createElement("span")
    item.innerHTML = innerHTML
    item.className = "item"

    calendar.appendChild(item)
  }

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const numberOfDays = getNumberOfDaysInMonth(date)
  const startingDayIndex = getStartingDayInMonth(date)

  const calendarEntries = [
    ...days,
    ...new Array(startingDayIndex).fill(""), // empty string for starting blank spaces
    ...new Array(numberOfDays).fill(null).map((_, i) => i + 1), //1 to numberOfDays
    ...new Array((7 - ((numberOfDays + startingDayIndex) % 7)) % 7).fill(""), // empty string for ending blank spaces
  ]

  calendarEntries.forEach(createItem)

  return calendar
}
//pass in desired date object to get corresponding calender
const calendar = createCalendar(new Date(2022, 0))
document.getElementById("calendar").appendChild(calendar)
