import styled from "styled-components"
import ProfilePic from "./ProfilePic"

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`

const Title = styled.h1`
  margin: 2rem;
`
const Description = styled.p`
  max-width: 50ch;
  margin-bottom: 1rem;
  text-align: justify;
`
function Body() {
  return (
    <Container>
      <ProfilePic />
      <Title>Hi, I'm Kowshik!</Title>
      <Description>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
        perferendis. Porro fugiat vitae sequi iusto magnam corporis voluptate,
        ex rerum distinctio ab delectus numquam iste, unde eius, aut omnis
        commodi.
      </Description>
      <Description>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos dolorem
        laboriosam odio cum doloribus corrupti dignissimos, adipisci autem
        maiores nulla itaque quibusdam nostrum hic sit ipsa quidem. Dolor, ab
        provident.
      </Description>
    </Container>
  )
}
export default Body
