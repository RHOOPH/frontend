import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [gettingUser, setGettingUser] = useState(true)

  const getUser = () => {
    setGettingUser(true)
    fetch("/open-suite-master/ws/app/info")
      .then((res) => {
        // server redirects to login page when not logged in with a status code of 302 and then login.jsp resolves with status code 200. However login.jsp does not contain body hence .json() method fails, which throws an error.
        if (res.ok) return res.json()
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
      .finally(() => {
        setGettingUser(false)
      })
  }
  const login = ({ username, password }) => {
    fetch("/open-suite-master/callback", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) getUser()
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
    <AuthContext.Provider
      value={{ user, login, logout, error, getUser, gettingUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
