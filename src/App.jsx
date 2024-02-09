import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductDetail from '../src/components/productDetail/ProductDetail'
import './App.css'
import AppLayout from './pages/AppLayout'
import MainPage from './pages/MainPage'

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <MainPage/>
      },
      {
        path: 'product-detail/:productName/',
        element: <ProductDetail/>,
      }
    ],
  }
])

function App() {

  return <RouterProvider router={router}/>
}

export default App
