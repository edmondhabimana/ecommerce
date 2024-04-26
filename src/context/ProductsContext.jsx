import { useContext } from "react";
import { useReducer, createContext, useEffect  } from "react";
import { projectFirestore } from "../firebase/config";

const initialState = {
  collection: [],
  product: [],
}

function reducer (state, action) {
  switch (action.type) {
    case "collection":
      return {...state, collection: action.payload}
    case "document":
      return {...state, product: action.payload}

  }
}

const ProductsContext = createContext();

function ProductsProvider({children}) {
  // const ref = projectFirestore.collection('products')
  // console.log('products', ref);
  const [{collection, product}, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    projectFirestore.collection('products').onSnapshot((querySnapshot) => {
      let results = []
      querySnapshot.forEach((doc) => {
          results.push({...doc.data(), id: doc.id})
      })
      // console.log(results);
      dispatch({type: "collection", payload: results})
    })
  }, [])
  // console.log(collection);
  // useEffect(() => { 
    const getProduct = (collection = "products", id) => {
      console.log(1);
      projectFirestore.collection(collection).doc(id).get().then((doc) => {
        if(doc.exists) {
          // console.log('Document data:', doc.data());
          dispatch({ type: "document", payload: {...doc.data(), id: doc.id}})
        }
  
      })
    }

  // }, [])

  return (
    <ProductsContext.Provider
      value={{
        collection,
        product,
        getProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

function useProducts() {
  const context = useContext(ProductsContext)
  if(context === undefined)
    throw new Error("ProductsContext was used outside the ProductsProvider")
  return context
}

export { useProducts, ProductsProvider}