import { Link } from "react-router-dom"
import styled from "styled-components"
import {
  portfolioRoute,
  workRoute,
  blogRoute,
  contactRoute,
} from "../../routes"

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
          <Logo to={portfolioRoute}>Kowshik</Logo>
        </NavList>
        <NavList>
          <NavLink to={portfolioRoute + workRoute}>Work</NavLink>
        </NavList>
        <NavList>
          <NavLink to={portfolioRoute}>About</NavLink>
        </NavList>
        <NavList>
          <NavLink to={portfolioRoute + blogRoute}>Blog</NavLink>
        </NavList>
        <NavList>
          <NavLink to={portfolioRoute + contactRoute}>Contact</NavLink>
        </NavList>
      </Container>
    </nav>
  )
}
export default Navbar
