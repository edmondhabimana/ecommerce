import Navigation from "../components/navigation/Navigation"
import Footer from "../components/footer/Footer"
import { Outlet } from "react-router-dom"

export default function AppLayout() {

  return (
    <>
      <Navigation/>
      <Outlet/>
      <Footer/>
    </>
  )
}