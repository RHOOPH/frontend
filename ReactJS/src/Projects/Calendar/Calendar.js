import { useState } from "react"
import styled from "styled-components"
import { createCalendar } from "./utils"

const Container = styled.div`
  display: flex;
  align-items: center;
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
  &:nth-child(7n + 1) {
    color: red;
  }
  &:nth-child(7n + 6) {
    color: green;
  }
`

function Calendar() {
  const [date, setDate] = useState(new Date())

  const calendarEntries = createCalendar(date)

  return (
    <Container>
      <Grid>
        {calendarEntries.map((v, i) => (
          <Item key={i}>{v}</Item>
        ))}
      </Grid>
    </Container>
  )
}
export default Calendar
