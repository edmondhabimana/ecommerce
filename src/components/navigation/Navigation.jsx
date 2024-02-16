import navigationStyles from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/pro-light-svg-icons'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/cartContext'

export default function Navigation({handleCartDisplay}) {
  const { totalQuantity } = useCart()

  console.log('totalQuantity',totalQuantity);

  return(
    <div className={navigationStyles['navigation-container']}>
      <div className={navigationStyles.logo}>
        <Link to="/" className={navigationStyles.link}><p>Gadgets Galore</p></Link>
      </div>
      <div onClick={() => handleCartDisplay()}>
        <FontAwesomeIcon icon={faCartShopping} className={navigationStyles['cart-logo']}/>
        <div className={navigationStyles['item-count']}><p>{totalQuantity}</p></div>
      </div>
    </div>
  )
}