import { createContext, useState, useContext } from "react";


const ProductsContext = createContext();

function ProductsProvider({children}) {
  const[displayCart, setDisplayCart] = useState(false)

  function handleCartDisplay() {
    setDisplayCart((displayCart) => !displayCart)
  }

  return(
    <ProductsContext.Provider
      value={{
        displayCart,
        handleCartDisplay,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

function useProducts() {
  const content = useContext(ProductsContext)
  if(content === undefined)
    throw new Error("ProductsContext was used outside the ProductsProvider")
  return content
}

export { ProductsProvider, useProducts}