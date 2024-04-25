import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './utils/stripe.utils'
import ProductDetail from '../src/components/productDetail/ProductDetail'
import OrderForm from './components/orderForm/OrderForm'
import OrderPlaced from './components/orderPlaced/OrderPlaced'
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
      },
      {
        path: 'order',
        element: <OrderForm/>
      },
      {
        path: 'orderplaced',
        element: <OrderPlaced/>
      }
    ],
  }
])

function App() {
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd'
  }

  return(
    <Elements stripe={stripePromise} options={options}>
      <RouterProvider router={router}/>
    </Elements>
  ) 
}

export default App
