import Navigation from "../components/navigation/Navigation"
import Header from "../components/header/Header"
import Products from "../components/products/Products"
import FooterBanner from "../components/footerBanner/FooterBanner"
import Footer from "../components/footer/Footer"

export default function MainPage() {

  return (
    <div>
      <Header/>
      <Products/>
      <FooterBanner/>
    </div>
  )
}