import { BrowserRouter, createBrowserRouter, Route, Routes, RouterProvider } from 'react-router-dom'
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

  // return <RouterProvider router={router}/>
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='product-detail/:productName' element={<ProductDetail/>}/>
        </Route>
        <Route path='order' element={<OrderForm/>}/>
        <Route path='orderplaced' element={<OrderPlaced/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
