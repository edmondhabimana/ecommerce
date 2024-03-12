// import data from "../../data"
import productDetailStyles from './productDetail.module.css'
import SmallerImages from '../smallerImages/SmallerImages'
import Recommanded from '../recommended/Recommended'
import SideBar from '../sideBar/SideBar'
import Button from '../button/button'
import AddToCartMessage from '../addToCartMessage/AddToCartMessage'
import { useState } from 'react'
import { useParams, useOutletContext } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument"
import { useCollection } from '../../hooks/useCollection'
import { useCart } from '../../hooks/useCart'

export default function ProductDetail() {
  const [selectedId, setSelectedId] = useState(0)
  const [itemCount, setItemCount] = useState(1)
  console.log(itemCount);

  const { productName } = useParams()
  const [displayCart, handleCartDisplay] = useOutletContext()
  const { data } = useDocument('products', productName)
  const { collection } = useCollection('products')
  const { addToCart, successMessage, deleteSuccesMessage } = useCart()
  const { details, images, name, price } = data
  

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
    addToCart({
      image: images[0],
      name,
      unitPrice: price,
      totalPrice: price * itemCount,
      quantity: itemCount
    })

    setItemCount(1)
  }

  return(
    <>
      {data.length !== 0 && collection.length !== 0 &&
        <div>
          {successMessage.length != 0 && <AddToCartMessage successMessage={successMessage} deleteSuccesMessage={deleteSuccesMessage}/>}

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
