import navigationStyles from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/pro-light-svg-icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getTotalCartQuantity } from '../../Cart/cartSlice'

export default function Navigation({handleCartDisplay}) {
  const totalCartQuantity = useSelector(getTotalCartQuantity)

  return(
    <div className={navigationStyles['navigation-container']}>
      <div className={navigationStyles.logo}>
        <Link to="/" className={navigationStyles.link}><p>Gadgets Galore</p></Link>
      </div>
      <div onClick={() => handleCartDisplay()}>
        <FontAwesomeIcon icon={faCartShopping} className={navigationStyles['cart-logo']}/>
        <div className={navigationStyles['item-count']}><p>{totalCartQuantity}</p></div>
      </div>
    </div>
  )
}