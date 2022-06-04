import styled from "styled-components"
import axelorImg from "../Assets/axelor.png"
import { useAuth } from "../auth"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Img = styled.img`
  width: 320px;
  height: 100px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
`
const Input = styled.input`
  width: 320px;
  height: 2rem;
  margin: 1rem 0;
`
const Error = styled.span`
  color: red;
`

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const { user, login, error } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const fromPath = location.state?.from || "/"

  const handleChange = (e) => {
    const { name, value } = e.currentTarget
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handleLogin = () => {
    login(formData)
  }

  useEffect(() => {
    user && navigate(fromPath, { replace: true })
    // eslint-disable-next-line
  }, [user])

  return (
    <Container>
      <Img src={axelorImg} alt="axelor" />
      {error && <Error> {error.message}</Error>}
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Log In</button>
    </Container>
  )
}
export default Login
