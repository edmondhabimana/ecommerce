import orderFormStyles from './OrderForm.module.css'
import OrderItem from '../orderItem/OrderItem';
import { useCollection } from '../../hooks/useCollection'
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';

export default function OrderForm() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { collection } = useCollection('cart')
  const { cartTotal } = useCart()

  const displayItems = isCollapsed ? collection.slice(0, 4) : collection
  console.log(collection);

  return(
    <>
    <div>
      <p>total Amount:</p>
      <p>{cartTotal}</p>
      <div className={orderFormStyles.items}>
        {displayItems.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `show all ${collection.length} items` : 'show less'}
      </button>
      <p>subtotal</p>
      <p>{cartTotal}</p>
      <p>Shipping</p>
      <p>FREE</p>
      <p>Free</p>
      <p>Total due</p>
      <p>{cartTotal}</p>
    </div>
    <div className={orderFormStyles.form}>
      <fieldset>
        <label>Email</label>
        <input type='email'/>
      </fieldset>
      <fieldset>
        <label>Shipping method</label>
        <input type='radio' name='shipping-method'/>
        <p>FREE</p>
        <p>Free</p>
        <input type='radio' name='shipping-method'/>
        <p>FAST</p>
        <p>1-3 business days</p>
      </fieldset>
      <fieldset>
        <label>Card information</label>
        <input type='number' placeholder='1234 1234 1234 1234'/>
        <input type='number' placeholder='MM/YY'/>
        <input type='number' placeholder='CVC'/>
      </fieldset>
      <fieldset>
        <label>Cardholder name</label>
        <input placeholder='Full name on card'/>
      </fieldset>
      <fieldset>
        <label>Billing address</label>
        <select>
          <option>United States</option>
        </select>
        <input type='text' placeholder='Address line 1'/>
        <input type='text' placeholder='Address line 2'/>
        <input type='text' placeholder='City'/>
        <input type='number' placeholder='ZIP'/>
        <select defaultValue='State' className={orderFormStyles.states}>
          <option>Alabama</option>
        </select>
      </fieldset>
      <button>Pay</button>
    </div>
    </>
  )
}