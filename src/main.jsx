import React from 'react'
import ReactDOM from 'react-dom/client'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { CartProvider } from './context/cartContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </CartProvider>
  </React.StrictMode>,
)
