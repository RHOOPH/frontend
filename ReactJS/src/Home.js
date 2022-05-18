import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
`

function Home() {
  return (
    <Container>
      <h1> This is HomePage, Checkout projects from the navbar above </h1>
    </Container>
  )
}
export default Home
