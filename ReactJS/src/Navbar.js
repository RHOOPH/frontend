import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledLink = styled(Link)`
  font-size: 1.5rem;
  text-transform: uppercase;
  text-decoration: none;
  margin: 0 2rem;
`
const Nav = styled.nav`
  display: flex;
  justify-content: center;
`

export default function Navbar() {
  return (
    <Nav>
      <StyledLink to="/forms">Forms</StyledLink>

      <StyledLink to="/portfolio">Portfolio</StyledLink>
      <StyledLink to="calendar">Calendar</StyledLink>
    </Nav>
  )
}
