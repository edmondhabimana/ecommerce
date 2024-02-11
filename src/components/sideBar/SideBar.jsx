import sideBarStyles from './SideBar.module.css'
import CartItems from '../cartItem/CartItems'
import { useCart } from '../../hooks/useCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-duotone-svg-icons'

export default function SideBar({displayCart, handleCartDisplay}) {
  console.log(displayCart);
  const {totalQuantity, collection, cartTotal} = useCart()

  return(
    <>
      {displayCart && (
      <div>
        <div className={sideBarStyles.cart}>
          <div className={sideBarStyles['item-count']}>
            <FontAwesomeIcon 
              icon={faArrowLeft} 
              className={sideBarStyles.arrow}
              onClick={() => handleCartDisplay()}
            />
            <p>Your Cart</p>
            <p>({totalQuantity} items)</p>
          </div>
          <div className={sideBarStyles.items}>
            {/* maping through cart collection */}
            {collection.map((item, index) => (
              <CartItems key={index} item={item}/>
            ))}
          </div>
          <div className={sideBarStyles.total}>
            <div>
              <p>subtotal:</p>
              <p>${cartTotal}</p>
            </div>
            <button>pay</button>
          </div>
        </div>
        <div 
          className={sideBarStyles.transparent}
          onClick={() => handleCartDisplay()}
        >
        </div>
      </div>
    )}
    </>
  )
}