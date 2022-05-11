const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const getDaysInCurrentMonth = () => {
  const date = new Date()

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}
const getStartingDayInCurrentMonth = () => {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}
const createElements = (type, count) => {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push(document.createElement(type))
  }
  return arr
}

const totalDays = getDaysInCurrentMonth()
const startingDay = getStartingDayInCurrentMonth()
const emptyDays = createElements("span", startingDay)
const days = createElements("span", totalDays)
const weekdays = createElements("span", 7)

days.forEach((v, i) => {
  v.innerHTML = i + 1
})

weekdays.forEach((v, i) => {
  v.innerHTML = weeks[i]
})

const calender = document.getElementById("calender")

calender.append(...weekdays, ...emptyDays, ...days)
