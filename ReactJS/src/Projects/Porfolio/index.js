import Navbar from "./Navbar"
import Footer from "./Footer"
import Body from "./Body"
import Work from "./Pages/Work"
import Contact from "./Pages/Contact"
import Blog from "./Pages/Blog"
import { Routes, Route } from "react-router-dom"
import { workRoute, contactRoute, blogRoute } from "../../routes"
function Portfolio() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Body />} />
        <Route path={workRoute} element={<Work />} />
        <Route path={contactRoute} element={<Contact />} />
        <Route path={blogRoute} element={<Blog />} />
      </Routes>
      <Footer />
    </>
  )
}
export default Portfolio
