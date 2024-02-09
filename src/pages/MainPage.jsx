import Header from "../components/header/Header"
import Products from "../components/products/Products"
import FooterBanner from "../components/footerBanner/FooterBanner"
import SideBar from "../components/sideBar/SideBar"

export default function MainPage() {

  return (
    <div>
      <Header/>
      <Products/>
      <FooterBanner/>
      <SideBar/>
    </div>
  )
}