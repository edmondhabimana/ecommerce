import sideBarStyles from './SideBar.module.css'
import CartItems from '../cartItem/CartItems'
// import { useCart } from '../../context/cartContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTotalCartQuantity, getTotalCartPrice, getCart } from '../../Cart/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/pro-duotone-svg-icons'

export default function SideBar({displayCart, handleCartDisplay}) {
  // const {totalQuantity, cartCollection, cartTotal} = useCart()
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const cart = useSelector(getCart)
  const navigate = useNavigate()

  function handleNavigation() {
    navigate('/order')
  }

  return(
    <>
      {displayCart && (
      <div className={sideBarStyles['side-bar']}>
        <div className={sideBarStyles.cart}>
          <div className={sideBarStyles['item-count']}>
            <FontAwesomeIcon 
              icon={faArrowLeft} 
              className={sideBarStyles.arrow}
              onClick={() => handleCartDisplay()}
            />
            <p>Your Cart</p>
            <p>({totalCartQuantity} items)</p>
          </div>
          <div className={sideBarStyles.items}>
            {/* maping through cart collection */}
            {cart.map((item, index) => (
              <CartItems key={index} item={item}/>
            ))}
          </div>
          <div className={sideBarStyles.total}>
            <div>
              <p>subtotal:</p>
              <p>${totalCartPrice}</p>
            </div>
            <button onClick={() => handleNavigation()}>pay</button>
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