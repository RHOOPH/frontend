import Forms from "./Projects/Forms"
import Navbar from "./Navbar"
import { Routes, Route } from "react-router-dom"
import Portfolio from "./Projects/Porfolio"
import Calendar from "./Projects/Calendar"
import { calendarRoute, formRoute, portfolioRoute } from "./routes"
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={formRoute + "/*"} element={<Forms />} />
        <Route path={portfolioRoute + "/*"} element={<Portfolio />} />
        <Route path={calendarRoute + "/*"} element={<Calendar />} />
      </Routes>
    </div>
  )
}

export default App
