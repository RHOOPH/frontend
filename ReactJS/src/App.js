import Forms from "./Projects/Forms/Forms"
import Navbar from "./Navbar"
import { Routes, Route } from "react-router-dom"
import Portfolio from "./Projects/Porfolio/Portfolio"
import Calendar from "./Projects/Calendar/Calendar"
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="forms" element={<Forms />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
    </div>
  )
}

export default App
