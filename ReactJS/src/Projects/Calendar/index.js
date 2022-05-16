import { useState } from "react"
import styled from "styled-components"
import { createCalendar, months } from "./utils"

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 70vh;
`
const Grid = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: gainsboro;
  border: 1px solid gainsboro;
`
const Item = styled.span`
  text-align: center;
  padding: 0.5rem;
  background-color: white;
  &:nth-child(7n + 8) {
    color: red;
  }
  &:nth-child(7n + 13) {
    color: green;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  & > * {
    margin: 0 0.5rem;
  }
`
const Year = styled.input`
  width: 8ch;
`

const LAST_MONTH_INDEX = "11"
const FIRST_MONTH_INDEX = "0"

function Calendar() {
  const [formData, setFormData] = useState({
    month: new Date().getMonth().toString(), //converted to string since input returns string.
    year: new Date().getFullYear().toString(),
  })

  const calendarEntries = createCalendar(
    new Date(formData.year, formData.month)
  )
  const handleChange = (e) => {
    const { name, value, type, checked } = e.currentTarget
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }
  const increment = () => {
    setFormData((p) => {
      if (p.month === LAST_MONTH_INDEX)
        return {
          ...p,
          year: (Number(p.year) + 1).toString(),
          month: FIRST_MONTH_INDEX,
        }
      else return { ...p, month: (Number(p.month) + 1).toString() }
    })
  }
  const decrement = () => {
    setFormData((p) => {
      if (p.month === FIRST_MONTH_INDEX)
        return {
          ...p,
          year: (Number(p.year) - 1).toString(),
          month: LAST_MONTH_INDEX,
        }
      else return { ...p, month: (Number(p.month) - 1).toString() }
    })
  }
  console.log(formData)
  return (
    <Container>
      <div>
        <Header>
          <button onClick={decrement}>&lt;</button>
          <select name="month" value={formData.month} onChange={handleChange}>
            {months.map((month, i) => (
              <option key={month} value={i}>
                {month}
              </option>
            ))}
          </select>
          <Year
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          <button onClick={increment}>&gt;</button>
        </Header>
        <Grid>
          {calendarEntries.map((v, i) => (
            <Item key={i}>{v}</Item>
          ))}
        </Grid>
      </div>
    </Container>
  )
}
export default Calendar
