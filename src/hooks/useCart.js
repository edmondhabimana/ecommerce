import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"
import { useCollection } from "./useCollection"

export function useCart() {
  //Here we get what is in the cart which can be deleted
  const[isPending, setIsPending] = useState(false)
  const[itemQuantity, setItemQuantity] = useState(null)
  const[totalQuantity, setTotalQuantity] = useState(null)
  const[cartTotal, setCartTotal] = useState(null)
  const[successMessage, setSuccessMessage] = useState([])


  const[error, setError] = useState(null)

  const { collection } = useCollection('cart')

  const ref = projectFirestore.collection('cart')


  const deleteSuccesMessage = () => {
    setSuccessMessage((curr) => curr.slice(0, curr.length - 1))
  }

  //with this function we add product to the cart
  const addToCart = (doc) => {
    setIsPending(true)

    try{
      //we use the doc name to see if the item exists within the cart
      ref.doc(doc.name).get().then(async (item) => {
        if(item.exists){
          // if it does exist we just update the quantity of the item
          await ref.doc(doc.name).update({
            quantity: item.data().quantity + doc.quantity,
            totalPrice: item.data().totalPrice + doc.totalPrice
          }).then(() => {
            setSuccessMessage((suc) => [`${doc.quantity} ${doc.name} added to the cart`, ...suc])
          })

        }else{
          //if no item exit, we add it to cart
          await ref.doc(doc.name).set({...doc}).then(() => {
            setSuccessMessage((suc) => [`${doc.quantity} ${doc.name} added to the cart`, ...suc])
          })
        }
      })

    }
    catch (err) {
      setError(err.message)
    }
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

  const deleteItem = (id) => {
    ref.doc(id).delete()
  }

  //Not recommended
  const removeAllItems = () => {
    ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete()
      })
    })
  }

  const getItemQuantity = (name) => {
    //we grab the document/product quantity
    ref.doc(name).get().then((item) => {
      if(item.exists){
        setItemQuantity(item.data().quantity)
      }
    })

  }

  const updateFromModal = (_name, _quantity) => {
    ref.doc(_name).get().then(async (item) => {
      if(item.exists){
        // if it does exist we just update the quantity of the item
        await ref.doc(_name).update({
          // quantity: item.data().quantity + doc.quantity,
          quantity: _quantity,
          totalPrice: item.data().unitPrice * _quantity
        })
      }
    })
  }


  useEffect(() => {

    let itemTotal = 0
    let priceOfAllItems = 0
    //we go through the entire collection of documents/products and add up all the quantity together
    collection.forEach(function(item) {
      itemTotal = itemTotal + item.quantity
      priceOfAllItems = priceOfAllItems + item.totalPrice
    })

    setTotalQuantity(itemTotal)
    setCartTotal(priceOfAllItems)

  }, [collection])





  return{ 
    addToCart, 
    deleteItem, 
    cartTotal,
    totalQuantity,
    getItemQuantity,
    itemQuantity,
    increaseQuantity,
    decreaseQuantity,
    isPending, 
    error,
    successMessage,
    deleteSuccesMessage,
    collection,
    updateFromModal,
    removeAllItems
  }
}