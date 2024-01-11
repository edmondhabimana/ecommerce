import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import Footer from './components/footer/Footer'
import ProductDetail from '../src/components/productDetail/ProductDetail'
import './App.css'
import MainPage from './pages/MainPage'

function App() {

  return (
    <>
    <Navigation/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='product-detail/' element={<ProductDetail/>}/>
        </Routes>
      </BrowserRouter>
    <Footer/>
    </>
  )
}

export default App
