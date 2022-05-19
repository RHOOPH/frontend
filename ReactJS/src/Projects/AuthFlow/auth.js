import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const getUser = () => {
    fetch("/open-suite-master/ws/app/info")
      .then((res) => {
        if (res.status === 200) return res.json()
        else throw new Error("Not logged In")
      })
      .then((data) => {
        setError(null)
        setUser(data["user.name"])
      })
      .catch((err) => {
        setError(err)
        setUser(null)
      })
  }
  const login = ({ username, password }) => {
    fetch("/open-suite-master/callback", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      mode: "no-cors",
    })
      .then((res) => {
        if (res.status === 200) getUser()
        else throw new Error("Wrong Username Or Password")
      })
      .catch((err) => {
        setError(err)
        setUser(null)
      })
  }

  const logout = () => {
    setUser(null)
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, error, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
