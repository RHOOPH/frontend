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
import AddLead from "./Projects/AuthFlow/Components/AddLead"

import {
  protectedRoute,
  calendarRoute,
  formRoute,
  loginRoute,
  portfolioRoute,
  addLeadRoute,
} from "./routes"

function App() {
  const { getUser } = useAuth()

  useEffect(() => {
    getUser()
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
          <Route path={addLeadRoute} element={<AddLead />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
