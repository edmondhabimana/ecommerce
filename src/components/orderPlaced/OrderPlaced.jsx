import orderPlacedStyles from './OrderPlaced.module.css'
import { useNavigate } from 'react-router-dom';
import { useCollection } from "../../hooks/useCollection"
import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/sharp-light-svg-icons';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';

export default function OrderPlaced() {
  const [orderNumber, setOrderNumber] = useState(0)
  const { collection } = useCollection('cart')
  const { removeAllItems } = useCart()
  const navigation = useNavigate()

  function handleNavigation() {
    removeAllItems()
    navigation('/')
  }

  useEffect(() => {
    const generateOrderNumber = () => {
      setOrderNumber(Math.floor(100000000 + Math.random() * 900000000)) 
    }

    generateOrderNumber()
  }, [])

  return(
    <div className={orderPlacedStyles['order-container']}>
      <div className={orderPlacedStyles['overlay']}>
        <div className={orderPlacedStyles['order-details']}>
          <div className={orderPlacedStyles['order-placed']}>
            <FontAwesomeIcon icon={faCircleCheck} className={orderPlacedStyles['order-check']}/>
            <p>Your order has been placed</p>
          </div>
          <p className={orderPlacedStyles['order-id']}>order# BBY01-{orderNumber}</p>
          <button 
            className={orderPlacedStyles['continue-shopping']}
            onClick={() => handleNavigation()}
          >
            continue shopping
            <FontAwesomeIcon icon={faArrowRightLong} className={orderPlacedStyles.arrow}/>
          </button>
        </div>
      </div>
    </div>
  )
}