// import data from "../../data"
import productDetailStyles from './productDetail.module.css'
import SmallerImages from '../smallerImages/SmallerImages'
import Recommanded from '../recommended/Recommended'
import SideBar from '../sideBar/SideBar'
import Button from '../button/button'
import { useState, useEffect  } from 'react'
import { useParams, useOutletContext } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument"
import { useCollection } from '../../hooks/useCollection'
import { useCart } from '../../hooks/useCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/pro-regular-svg-icons'

export default function ProductDetail() {
  const [selectedId, setSelectedId] = useState(0)
  const [itemCount, setItemCount] = useState(1)
  const [intervalId, setIntervalId] = useState(0)
  // console.log('intervalId', intervalId);

  const { productName } = useParams()
  const [displayCart, handleCartDisplay] = useOutletContext()
  const { data } = useDocument(productName)
  const { collection } = useCollection('products')
  const { addToCart, successMessage, setSuccessMessage } = useCart()
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
  //need to find a solution for useEffect and timer
  useEffect(() => {
    // console.log('inside useEffect 1');
    const timerRef = setInterval(function () {
      // console.log('inside useEffect 2');

      setSuccessMessage((curr) => curr.slice(0, curr.length - 1))


    }, 1200)
    setIntervalId(timerRef)
    // console.log('inside useEffect',timerRef);

  }, [setSuccessMessage])

  if(successMessage.length === 0){
    // console.log('inside the if statement', intervalId);
    // console.log('success message lenght', successMessage);
    clearInterval(intervalId)
  }
 

  return(
    <>
      {data.length !== 0 && collection.length !== 0 &&
        <div>
          <div className={productDetailStyles.absolute}>
            {successMessage.map((suc, index) => (
              <div key={index} className={productDetailStyles['success-message']}>
                <div className={productDetailStyles['check-container']}><FontAwesomeIcon icon={faCheck} /></div>
                <p>{suc}</p>
              </div>
            ))}
          </div>

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
