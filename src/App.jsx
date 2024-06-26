import { BrowserRouter, createBrowserRouter, Route, Routes, RouterProvider } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { stripePromise } from './utils/stripe.utils.js'
import { Elements } from '@stripe/react-stripe-js'
import ProductDetail from '../src/components/productDetail/ProductDetail'
import './App.css'
import OrderPlaced from './components/orderPlaced/OrderPlaced'
import OrderForm from './components/orderForm/OrderForm'
import AppLayout from './pages/AppLayout'
import MainPage from './pages/MainPage'

// const router = createBrowserRouter([
//   {
//     element: <AppLayout/>,
//     children: [
//       {
//         path: '/',
//         element: <MainPage/>
//       },
//       {
//         path: 'product-detail/:productName/',
//         element: <ProductDetail/>,
//       }
//       // {
//       //   path: 'order',
//       //   element: <OrderForm/>
//       // }
//       // {
//       //   path: 'order/:id',
//       //   element: <Order/>
//       // }
//     ],
//     element: <Order/>
//   }
// ])

function App() {
  
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
  };

  // return <RouterProvider router={router}/>
  return(
    <Elements stripe={stripePromise} options={options}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<MainPage/>}/>
            <Route path='product-detail/:productName' element={<ProductDetail/>}/>
            <Route path='orderplaced' element={<OrderPlaced/>}/>
          </Route>
          <Route path='order' element={<OrderForm/>}/>
        </Routes>
      </BrowserRouter>
    </Elements>
  )
}

export default App
