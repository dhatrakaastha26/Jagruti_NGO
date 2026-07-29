import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Blog from "../pages/Blog";
import Donation from "../pages/Donation";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Programs from "../pages/Program";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/program" element={< Programs/>} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/donation" element={<Donation />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;