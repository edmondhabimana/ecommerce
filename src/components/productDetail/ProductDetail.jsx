// import data from "../../data"
import productDetailStyles from './productDetail.module.css'
import { useDispatch } from 'react-redux'
import SmallerImages from '../smallerImages/SmallerImages'
import Recommanded from '../recommended/Recommended'
import SideBar from '../sideBar/SideBar'
import Button from '../button/button'
import SuccessMessage from '../successMessage/SuccessMessage'
import { useState } from 'react'
import { useParams, useOutletContext } from "react-router-dom"
import { useProducts } from '../../context/ProductsContext'
import { addItem } from '../../Cart/cartSlice'
// import { useCart } from '../../context/cartContext'
import { useMemo } from 'react'

export default function ProductDetail() {
  const [selectedId, setSelectedId] = useState(0)
  const [itemCount, setItemCount] = useState(1)
  const { productName } = useParams()
  const [displayCart, handleCartDisplay] = useOutletContext()
  const { collection, product, getProduct } = useProducts()
  console.log(product);
  const dispatch = useDispatch()
  // const { addToCart } = useCart()
  const { details, images, name, price} = product

  //we use useMemo to prevent getProduct from infinite re-render
  useMemo(() => getProduct(productName), [productName]) 
  

  function displayImage(index){
    setSelectedId(index !== selectedId ? index : selectedId)
    // console.log(selectedId);
  }

  function increaseQuantity() {
    setItemCount((itemCount) => itemCount + 1)
  }

  function decreaseQuantity() {
    if(itemCount == 1) return
    setItemCount((itemCount) => itemCount - 1)
  }

  function handleAddToCart() {
    // console.log(cart);
    const newItem = {
      image: images[0],
      name,
      unitPrice: price,
      totalPrice: price * itemCount,
      quantity: itemCount
    }

    dispatch(addItem(newItem))

    setItemCount(1)
  }
 

  return(
    <>
      {product.length !== 0 && collection.length !== 0 &&
        <div>
          <SuccessMessage/>
          <div className={productDetailStyles.body}>
            <div className={productDetailStyles['images-container']}>
              <div>
                <img src={images[selectedId]} alt='Stereo' className={productDetailStyles['main-image']}/>
              </div>
              <div>
                {images.map((productImage, index) => (
                  <SmallerImages 
                    key={index} 
                    productImage={productImage}
                    index={index}
                    displayImage={displayImage}
                  />
                ))}
              </div>
            </div>
            <div className={productDetailStyles['info-container']}>
              <div className={productDetailStyles.info}>
                <p>{name}</p>
                <p>Details: </p>
                <p>{details}</p>
                <p>${price}</p>
                <div className={productDetailStyles.quantity}>Quantity:
                  <Button
                    quantity={itemCount}
                    decreaseQuantity={decreaseQuantity}
                    increaseQuantity={increaseQuantity}
                  />
                </div>
              </div>
              <div className={productDetailStyles.buttons}>
                <button 
                  className={productDetailStyles['white-button']}
                  onClick={() => handleAddToCart()}
                >Add to Cart</button>
                <button className={productDetailStyles['red-button']}>Buy Now</button>
              </div>
            </div>
          </div>
          <div className={productDetailStyles.recommand}>
            <p>You may also like</p>
            <div className={productDetailStyles['animation-div']}>
              {collection.map((collectionItem, index) => (
                <Recommanded key={index} collectionItem={collectionItem}/>
              ))}
            </div>
          </div>
          <SideBar displayCart={displayCart} handleCartDisplay={handleCartDisplay}/>
        </div>
      }
    </>

  )
}
