import styled from "styled-components"
import Picture from "./Assets/profile-pic.svg"

const Img = styled.img`
  height: 250px;
  width: 250px;
`
function ProfilePic() {
  return <Img src={Picture} alt="Profile" />
}
export default ProfilePic
