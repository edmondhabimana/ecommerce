import { useContext } from "react";
import { useReducer, createContext, useEffect  } from "react";
import { projectFirestore } from "../firebase/config";


const CartContext = createContext()

const initialSate = {
  cartCollection: [],
  itemQuantity: null,
  totalQuantity: null,
  cartTotal: null,
  successMessage: []
}

function reducer(state, action) {
  switch(action.type){
    case "success-message":
      return {...state, successMessage: [...state.successMessage, action.payload]}
    case "delete-successMessage":
      return {...state, successMessage: state.successMessage.slice(0, state.successMessage.length - 1)}
    case "quantity":
      return {...state, itemQuantity: action.payload}
    case "itemTotal":
      return {...state, totalQuantity: action.payload}
    case "totalItemsPrice":
      return {...state, cartTotal: action.payload}
    case "cart-collection":
      return {...state, cartCollection: action.payload}
  }

}

function CartProvider({children}) {
  const[{itemQuantity, totalQuantity, cartTotal, successMessage, cartCollection}, dispatch] = useReducer(reducer, initialSate)
  const ref = projectFirestore.collection('cart')

  useEffect(() => {
    // const getCartCollection = () => {
      projectFirestore.collection('cart').onSnapshot((querySnapshot) => {
        let results = []
        querySnapshot.forEach((doc) => {
            results.push({...doc.data(), id: doc.id})
        })
        // console.log(results);
        dispatch({type: "cart-collection", payload: results})
      })
    // }
  }, [])

  //with this function we add product to the cart
  const addToCart = (doc) => {
    //we use the doc name to see if the item exists within the cart
    ref.doc(doc.name).get().then(async (item) => {
      if(item.exists){
        // if it does exist we just update the quantity of the item
        await ref.doc(doc.name).update({
          quantity: item.data().quantity + doc.quantity,
          totalPrice: item.data().totalPrice + doc.totalPrice
        }).then(() => {
          dispatch({ type: "success-message", payload: [`${doc.quantity} ${doc.name} added to the cart`]})
        })

      }else{
        //if no item exit, we add it to cart
        await ref.doc(doc.name).set({...doc}).then(() => {
          dispatch({ type: "success-message", payload: [`${doc.quantity} ${doc.name} added to the cart`]})
        })
      }
    })
  }

  const deleteItem = (id) => {
    ref.doc(id).delete()
  }

  const increaseQuantity = (id, _price) => {
    ref.doc(id).get().then((item) => {
      if(item.exists){
        ref.doc(id).update({
          quantity: item.data().quantity + 1,
          totalPrice: item.data().totalPrice + _price
        })
      }
    })
  }

  const decreaseQuantity = (id, _price) => {
    ref.doc(id).get().then((item) => {
      if(item.exists){
        if(item.data().quantity <= 1){
          deleteItem(id)
          return
        }
        ref.doc(id).update({
          quantity: item.data().quantity - 1,
          totalPrice: item.data().totalPrice - _price
        })
      }
    })
  }

  const getItemQuantity = (name) => {
    //we grab the document/product quantity
    ref.doc(name).get().then((item) => {
      if(item.exists){
        dispatch({type: 'quantity', payload: item.data().quantity})
      }
    })
  }

  useEffect(() => {
    let itemTotal = 0
    let totalItemsPrice = 0
    //we go through the entire collection of documents/products and add up all the quantity and prices together

    cartCollection.forEach(function(item) {
      itemTotal = itemTotal + item.quantity
      totalItemsPrice = totalItemsPrice + item.totalPrice
    })

    dispatch({ type: "itemTotal", payload: itemTotal})
    dispatch({ type: "totalItemsPrice", payload: totalItemsPrice})

  }, [cartCollection])

  return(
    <CartContext.Provider
      value={{
        itemQuantity, 
        totalQuantity, 
        cartTotal, 
        successMessage,
        addToCart,
        deleteItem,
        getItemQuantity,
        dispatch,
        cartCollection,
        increaseQuantity,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )

}

function useCart() {
  const context = useContext(CartContext)
  if(context === undefined)
    throw new Error("CartContent was used outside the CartProvider")
  return context
}

export { CartProvider, useCart }