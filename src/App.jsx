import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductDetail from '../src/components/productDetail/ProductDetail'
import './App.css'
import Order from './components/order/order'
import OrderForm from './components/orderForm/OrderForm'
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
      },
      {
        path: 'order',
        element: <OrderForm/>
      },
      {
        path: 'order/:id',
        element: <Order/>
      }
    ],
  }
])

function App() {

  return <RouterProvider router={router}/>
}

export default App
