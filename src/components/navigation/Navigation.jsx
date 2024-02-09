import navigationStyles from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/pro-light-svg-icons'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useProducts } from '../../context/ProductsContext'

export default function Navigation() {
  const { totalQuantity } = useCart()
  const { handleCartDisplay } = useProducts()
  // getTotalQuantity()

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