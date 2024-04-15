import orderPlacedStyles from './OrderPlaced.module.css'
import { useCollection } from "../../hooks/useCollection"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/sharp-light-svg-icons';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';

export default function OrderPlaced() {
  const { collection } = useCollection('cart')
  return(
    <div className={orderPlacedStyles['order-container']}>
      <div className={orderPlacedStyles['order-details']}>
        <div className={orderPlacedStyles['order-placed']}>
          <FontAwesomeIcon icon={faCircleCheck} className={orderPlacedStyles['order-check']}/>
          <p>Your order has been placed</p>
        </div>
        <p className={orderPlacedStyles['order-id']}>order# BBY01-806452202332</p>
        <div className={orderPlacedStyles['order-items']}>
          {collection.map((element, index) => (
            <div key={index}>
              <hr/>
                <div className={orderPlacedStyles['order-item']}>
                  <div>
                    <p className={orderPlacedStyles.quantity}>{element.quantity}<span>x</span></p>
                    <p className={orderPlacedStyles.name}>{element.name}</p>
                  </div>
                  <p className={orderPlacedStyles.totalPrice}>${element.totalPrice}</p>
                </div>
              <hr className={orderPlacedStyles['negative-margin']}/>
            </div>
          ))}
        </div>
        <button>
          continue shopping
          <FontAwesomeIcon icon={faArrowRightLong} className={orderPlacedStyles.arrow}/>
        </button>
      </div>
    </div>
  )
}