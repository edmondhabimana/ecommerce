import Navigation from "../components/navigation/Navigation"
import Footer from "../components/footer/Footer"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export default function AppLayout() {
  const[displayCart, setDisplayCart] = useState(null)

  function handleCartDisplay() {
    setDisplayCart((displayCart) => !displayCart)
  }

  return (
    <>
      <Navigation handleCartDisplay={handleCartDisplay}/>
      <Outlet context={[displayCart, handleCartDisplay]}/>
      <Footer/>
    </>
  )
}