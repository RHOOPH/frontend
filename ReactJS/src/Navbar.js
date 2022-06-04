import { NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "./Projects/AuthFlow/authContext"
import {
  protectedRoute,
  calendarRoute,
  formRoute,
  portfolioRoute,
  loginRoute,
} from "./routes"

const StyledLink = styled(NavLink)`
  font-size: 1.5rem;
  text-transform: uppercase;
  text-decoration: none;
  margin: 0 2rem;
  &.active {
    color: darkgoldenrod;
  }
  &:active {
    color: darkgoldenrod;
  }
`
const LogIn = styled(StyledLink)`
  margin-left: auto;
`
const Nav = styled.nav`
  display: flex;
`
const UserContainer = styled.div`
  margin: 0 2rem 0 auto;
  display: flex;
  flex-direction: column;
`

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  return (
    <Nav>
      <StyledLink to={formRoute}>Forms</StyledLink>
      <StyledLink to={portfolioRoute}>Portfolio</StyledLink>
      <StyledLink to={calendarRoute}>Calendar</StyledLink>
      <StyledLink to={protectedRoute}>Leads</StyledLink>

      {user ? (
        <UserContainer>
          <span>Welcome {user}</span>
          <button onClick={logout}>Log Out</button>
        </UserContainer>
      ) : (
        <LogIn to={loginRoute} state={{ from: location.pathname }}>
          Log In
        </LogIn>
      )}
    </Nav>
  )
}
