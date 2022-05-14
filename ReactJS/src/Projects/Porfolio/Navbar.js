import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.ul`
  display: flex;
  list-style: none;
  padding: 3rem;
  background-color: #4ebd9b;
  margin: 0;
`
const NavList = styled.li`
  margin: 1rem;
  text-transform: uppercase;
  &:first-child {
    margin-right: auto;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #f1fbfb;
  font-weight: bold;
`
const Logo = styled(NavLink)`
  font-size: large;
`

function Navbar() {
  return (
    <nav>
      <Container>
        <NavList>
          <Logo to="/portfolio">Kowshik</Logo>
        </NavList>
        <NavList>
          <NavLink to="work">Work</NavLink>
        </NavList>
        <NavList>
          <NavLink to="/portfolio">About</NavLink>
        </NavList>
        <NavList>
          <NavLink to="blog">Blog</NavLink>
        </NavList>
        <NavList>
          <NavLink to="contact">Contact</NavLink>
        </NavList>
      </Container>
    </nav>
  )
}
export default Navbar
