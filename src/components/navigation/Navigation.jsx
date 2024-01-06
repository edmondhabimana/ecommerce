import navigationStyles from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/pro-light-svg-icons'

export default function Navigation() {
  return(
    <div className={navigationStyles['navigation-container']}>
      <div className={navigationStyles.logo}>
        <p>Gadgets Galore</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faCartShopping} className={navigationStyles['cart-logo']}/>
        <div className={navigationStyles['item-count']}><p>2</p></div>
      </div>
    </div>
  )
}