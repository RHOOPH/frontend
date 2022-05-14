import Navbar from "./Navbar"
import Footer from "./Footer"
import Body from "./Body"
import Work from "./Pages/Work"
import Contact from "./Pages/Contact"
import Blog from "./Pages/Blog"
import { Routes, Route } from "react-router-dom"
function Portfolio() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Body />} />
        <Route path="work" element={<Work />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
      </Routes>
      <Footer />
    </>
  )
}
export default Portfolio
