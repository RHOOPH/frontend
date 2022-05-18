import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

const mockVerification = (username, password) =>
  new Promise((res, rej) => {
    if (username === "admin" && password === "12345")
      res({ firstName: "Kowshik", lastName: "Achar" })
    else rej(Error("username and password did not match"))
  })

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)

  const login = ({ username, password }) => {
    mockVerification(username, password)
      .then((res) => {
        setUserInfo(res)
        setError(null)
      })
      .catch((err) => setError(err))
  }
  const logout = () => {
    setUserInfo(null)
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{ user: userInfo?.firstName, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
