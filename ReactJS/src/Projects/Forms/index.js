import { useState } from "react"
import styled from "styled-components"
import { checkPassword, checkUsername } from "./utils"

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`
const Form = styled.form`
  max-width: max-content;
  text-align: center;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  gap: 2rem;
  text-align: initial;
  padding: 2rem;
`
const Rows = styled.div`
  display: flex;
  flex-direction: column;
`
const ValidationMsg = styled.span`
  font-size: 0.8rem;
  color: firebrick;
`

export default function Forms() {
  const initialFormData = {
    username: "",
    password: "",
    city: "",
    webServer: "",
    role: "",
    mail: false,
    payroll: false,
    selfService: false,
  }
  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState({
    username: false,
    password: false,
  })
  const [didAttemptSubmit, setDidAttemptSubmit] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.currentTarget
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setDidAttemptSubmit(true)
    const validUsername = checkUsername(formData.username)
    const validPassword = checkPassword(formData.password)
    setError((p) => ({
      ...p,
      username: validUsername,
      password: validPassword,
    }))
    if (validUsername && validPassword) submitData()
  }
  const handleReset = (e) => {
    e.preventDefault()
    setFormData(initialFormData)
  }
  const submitData = () => {
    setDidSubmit(true)
  }

  return (
    <OuterContainer>
      {didSubmit ? (
        <h1>Form submitted</h1>
      ) : (
        <Form onSubmit={handleSubmit} onReset={handleReset}>
          <Container>
            <label htmlFor="username">Username:</label>
            <Rows>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                id="username"
                onChange={handleChange}
                value={formData.username}
              />
              {!error.username && didAttemptSubmit && (
                <ValidationMsg>Username is required</ValidationMsg>
              )}
            </Rows>
            <label htmlFor="password">Password:</label>
            <Rows>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
              />
              {!error.password && didAttemptSubmit && (
                <ValidationMsg>
                  Password must have 8 characters and at least 1 digit.
                </ValidationMsg>
              )}
            </Rows>
            <label htmlFor="city">City of employment:</label>
            <input
              id="city"
              type="text"
              placeholder="Bangalore, Surat etc"
              name="city"
              onChange={handleChange}
              value={formData.city}
            />
            <label htmlFor="webServer">Web server:</label>
            <select
              id="webServer"
              name="webServer"
              onChange={handleChange}
              value={formData.webServer}
            >
              <option value="">Choose a server</option>
              <option value="Apache HTTP Server">Apache HTTP Server</option>
              <option value="Internet Information Services">
                Internet Information Services
              </option>
              <option value="lighttpd Serverlighttpd">
                lighttpd Serverlighttpd
              </option>
              <option value="Sun Java System Web ServerSun Java System Web Server">
                Sun Java System Web ServerSun Java System Web Server
              </option>
              <option value="Jigsaw Server">Jigsaw Server</option>
            </select>
            <span>Please specify your role:</span>
            <Rows>
              <span>
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                  checked={formData.role === "admin"}
                />
                <label htmlFor="admin">Admin</label>
              </span>

              <span>
                <input
                  type="radio"
                  id="engineer"
                  name="role"
                  value="engineer"
                  onChange={handleChange}
                  checked={formData.role === "engineer"}
                />
                <label htmlFor="engineer">Engineer</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="manager"
                  name="role"
                  value="manager"
                  onChange={handleChange}
                  checked={formData.role === "manager"}
                />
                <label htmlFor="manager">Manager</label>
              </span>

              <span>
                <input
                  type="radio"
                  id="guest"
                  name="role"
                  value="guest"
                  onChange={handleChange}
                  checked={formData.role === "guest"}
                />
                <label htmlFor="guest">Guest</label>
              </span>
            </Rows>
            <span>Single Sign-on to the following:</span>
            <Rows>
              <span>
                <input
                  type="checkbox"
                  id="mail"
                  name="mail"
                  onChange={handleChange}
                  checked={formData.mail}
                />
                <label htmlFor="mail">Mail</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="payroll"
                  name="payroll"
                  onChange={handleChange}
                  checked={formData.payroll}
                />
                <label htmlFor="payroll">Payroll</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  id="selfService"
                  name="selfService"
                  onChange={handleChange}
                  checked={formData.selfService}
                />
                <label htmlFor="selfService">Self-service</label>
              </span>
            </Rows>
          </Container>
          <button type="submit" id="submit">
            Submit
          </button>
          <button type="reset">Reset</button>
        </Form>
      )}
    </OuterContainer>
  )
}
