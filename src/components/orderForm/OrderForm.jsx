import orderFormStyles from './OrderForm.module.css'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderItem from '../orderItem/OrderItem';
import UpdateQuantityModal from '../updateQuantityModal/UpdateQuantityModal';
import AddToCartMessage from '../addToCartMessage/AddToCartMessage';
import { useCollection } from '../../hooks/useCollection'
import { useCart } from '../../hooks/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, 
         faStore, 
         faAngleUp, 
         faAngleDown 
        } from '@fortawesome/pro-solid-svg-icons';


export default function OrderForm() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [mouseEnter, setMouseEnter] = useState(false)
  const [DisplayModal, setDisplayModal] = useState(false)
  const [productId, setProductId] = useState(null)
  const [productQuantity, setProductQuantity] = useState(null)

  //state for form
  const [emailError, setEmailError] = useState(null)
  const { collection } = useCollection('cart')
  console.log(emailError);



  const { cartTotal, deleteItem } = useCart()
  const navigation = useNavigate()

  const displayItems = isCollapsed ? collection.slice(0, 4) : collection

  function handleNavigation() {
    navigation(`/`)
  }

  return(
    <div className={orderFormStyles['order-form']}>
      <div className={orderFormStyles['cart-info']}>
        <div 
          className={`
          ${orderFormStyles['keep-shopping']} 
          ${mouseEnter ? orderFormStyles['change-color'] : ''}`}
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
          onClick={() => handleNavigation()}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <div>
            <FontAwesomeIcon icon={faStore} />
          </div>
          <p>Keep Shopping</p>
        </div>
        <div className={orderFormStyles['total-pay']}>
          <p>Total Amount</p>
          <p>${cartTotal}</p>
        </div>
        <div className={orderFormStyles.items}>
          {displayItems.map((item) => (
            <OrderItem 
              key={item.id} item={item} 
              setDisplayModal={setDisplayModal}
              setProductId={setProductId}
              setProductQuantity={setProductQuantity}
              deleteItem={deleteItem}
            />
          ))}
        </div>
        {collection.length > 4 && 
          <button 
            onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
            className={orderFormStyles.collapse}
          >
            {isCollapsed ? <span>{`Show all ${collection.length} items`}</span> : <span>Show less</span>}
            {isCollapsed ? 
              <FontAwesomeIcon icon={faAngleDown} className={orderFormStyles.icon}/> : 
              <FontAwesomeIcon icon={faAngleUp} className={orderFormStyles.icon}/> }
          </button>
        }
        <div className={orderFormStyles.subtotal}>
          <p>Subtotal</p>
          <p>${cartTotal}</p>
        </div>
        <hr/>
        <div className={orderFormStyles.shipping}>
          <div>
            <p>Shipping</p>
            <p>FREE</p>
          </div>
          <p>Free</p>
        </div>
        <hr/>
        <div className={orderFormStyles.price}>
          <p>Total due</p>
          <p>${cartTotal}</p>
        </div>
      </div>
      <hr/>
      <form className={orderFormStyles.form}>
        <p>Pay with card</p>
        <fieldset className={orderFormStyles.email}>
          <label>Email</label>
          <input 
            type='email' 
            // required='fill'
            onInvalid={() => setEmailError('REQUIRED')}
            // onInput='setEmailError()'
          />
        </fieldset>
        <fieldset className={orderFormStyles['shipping-method']}>
          <label className={orderFormStyles['shipping-title']}>Shipping method</label>
          <div className={orderFormStyles.free}>
            <div>
              <input type='radio' name='shipping-method' value='free'/>
              <label>FREE</label>
            </div>
            <p>Free</p>
          </div>
          <div className={orderFormStyles.fast}>
            <div>
              <input type='radio' name='shipping-method' value='20.00'/>
              <div>
                <label>FAST</label>
                <p className={orderFormStyles.business}>1-3 business days</p>
              </div>
            </div>
            <p>$20.00</p>
          </div>
        </fieldset>
        <fieldset className={orderFormStyles['card-info']}>
          <label>Card information</label>
          <div className={orderFormStyles.card}>
            <input 
              type='number' 
              placeholder='1234 1234 1234 1234'
              className={orderFormStyles['card-num']}
            />
            <input 
              type='number' 
              placeholder='MM/YY'
              className={orderFormStyles.date}
            />
            <input 
              type='number' 
              placeholder='CVC'
              className={orderFormStyles.code}
            />
          </div>
        </fieldset>
        <fieldset className={orderFormStyles['card-name']}>
          <label>Cardholder name</label>
          <input placeholder='Full name on card'/>
        </fieldset>
        <fieldset className={orderFormStyles.billing}>
          <label>Billing address</label>
          <div className={orderFormStyles['billing-info']}>
            <select className={orderFormStyles.countries}>
              <option>United States</option>
            </select>
            <input 
              type='text' 
              placeholder='Address line 1'
              className={orderFormStyles['address-1']}
            />
            <input 
              type='text' 
              placeholder='Address line 2'
              className={orderFormStyles['address-2']}
            />
            <input 
              type='text' 
              placeholder='City'
              className={orderFormStyles.city}
            />
            <input 
              type='number' 
              placeholder='ZIP'
              className={orderFormStyles.zip}
            />
            <select className={orderFormStyles.states}>
              <option>Alabama</option>
            </select>
          </div>
        </fieldset>
        <button>Pay</button>
      </form>
      {DisplayModal && <UpdateQuantityModal productId={productId} setDisplayModal={setDisplayModal} productQuantity={productQuantity}/>}
    </div>
  )
}