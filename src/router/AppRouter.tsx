import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "@/pages/Home"
import Booking from "@/pages/Booking"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ProtectedRoute from "./ProtectedRoute"
import Auth from "@/pages/Auth"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouter
