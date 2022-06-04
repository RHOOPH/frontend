import Forms from "./Projects/Forms"
import Navbar from "./Navbar"
import { Routes, Route } from "react-router-dom"
import Portfolio from "./Projects/Porfolio"
import Calendar from "./Projects/Calendar"
import LeadList from "./Projects/AuthFlow"
import Login from "./Projects/AuthFlow/Login"
import ProtectRoute from "./Projects/AuthFlow/ProtectRoute"
import Home from "./Home"
import { useEffect } from "react"
import { useAuth } from "./Projects/AuthFlow/auth"
import EditLead from "./Projects/AuthFlow/Components/EditLead"
import {
  protectedRoute,
  calendarRoute,
  formRoute,
  loginRoute,
  portfolioRoute,
  editRoute,
} from "./routes"
import { Navigate } from "react-router-dom"

function App() {
  const { getUser } = useAuth()

  useEffect(() => {
    getUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path={formRoute + "/*"} element={<Forms />} />
        <Route path={portfolioRoute + "/*"} element={<Portfolio />} />
        <Route path={calendarRoute + "/*"} element={<Calendar />} />
        <Route path={loginRoute} element={<Login />} />
        {/* anything inside ProtectRoute component will be protected */}
        <Route element={<ProtectRoute />}>
          <Route path={protectedRoute + "/*"} element={<LeadList />} />
          <Route
            path={protectedRoute + "/" + editRoute}
            element={<Navigate to={"new"} replace={true} />}
          />
          <Route
            path={protectedRoute + "/" + editRoute + "/:userId"}
            element={<EditLead />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
