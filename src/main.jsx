import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { CartProvider } from './context/cartContext.jsx'
import App from './App.jsx'
import './index.css'

import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Provider store={store}>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </Provider>
    </CartProvider>
  </React.StrictMode>,
)
