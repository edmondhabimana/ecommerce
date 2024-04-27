import orderFormStyles from './OrderForm.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
// import Payment from 'payment';
// import { formatCreditCardNumber,
//          formatCVC,
//          formatExpirationDate } from '../../utils';  
import OrderItem from '../orderItem/OrderItem';
// import SelectCountries from '../selectCountry/SelectCountry';
// import SelectState from '../selectState/selectState';
// import Error from '../error/error';
import UpdateQuantityModal from '../updateQuantityModal/UpdateQuantityModal';
// import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, 
         faStore, 
         faAngleUp, 
         faAngleDown,
         faCreditCard 
        } from '@fortawesome/pro-solid-svg-icons';
import PaymentForm from '../paymentForm/PaymentForm';
import { getTotalCartPrice, getCart, deleteItem } from '../../Cart/cartSlice';

// import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
// import { faCircleExclamation } from '@fortawesome/pro-regular-svg-icons';
// import { useReducer } from 'react';

//we start put as false as to say no error but flip it to true when errors occur
// const initialState = {
//   emailError: null,
//   emailValue: '',
//   cardNumberError: null, 
//   cardNumberValue: '',
//   cardDateError: null,
//   cardDateValue: '',
//   cardCvcError: null,
//   cardCvcValue: '',
//   cardNameError: null,
//   cardNameValue: '',
//   addressOneError: null,
//   addressOneValue: '',
//   addressTwoError: null,
//   addressTwoValue: '',
//   cityError: null,
//   cityValue: '',
//   zipError: null,
//   zipValue: '',
//   selectedCountry: 'United States',
//   selectedState: ''
// }
// const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// function reducer(state, action) {
//   switch (action.type) {
//     case 'email':
//       return {
//         ...state,
//         emailValue:  action.payload,
//         emailError: action.payload.match(validRegex) && 
//                     action.payload.slice(-4) === '.com' ? false : true
//       }

//     case 'cardNumber':
//       return {
//         ...state,
//         cardNumberValue: formatCreditCardNumber(action.payload),
//         cardNumberError: !Payment.fns.validateCardNumber(action.payload)
//       }
//     case 'cardDate':
//       return{
//         ...state,
//         cardDateValue: formatExpirationDate(action.payload),
//         cardDateError: !Payment.fns.validateCardExpiry(action.payload)
//       }
//     case 'cardCvc':
//       return{
//         ...state,
//         cardCvcValue: formatCVC(action.payload),
//         cardCvcError: !Payment.fns.validateCardCVC(action.payload)
//       }
//     case 'cardName':
//       return {
//         ...state,
//         cardNameValue: action.payload,
//         cardNameError: action.payload === ''
//       }
//     case 'selectedCountry':
//       return{
//         ...state,
//         selectedCountry: action.payload
//       }
//     case 'address-1':
//       return {
//         ...state,
//         addressOneValue: action.payload,
//         addressOneError: action.payload === ''
//       }
//     case 'address-2':
//       return {
//         ...state,
//         addressTwoValue: action.payload,
//         addressTwoError: action.payload === ''
//       }
//     case 'city':
//       return {
//         ...state,
//         cityValue: action.payload,
//         cityError: action.payload === ''
//       }
//     case 'zip':
//       return {
//         ...state,
//         zipValue: action.payload,
//         zipError: action.payload === ''
//       }
//     case 'selectedState':
//       return {
//         ...state,
//         selectedState: action.payload
//       }
//   }
// }


export default function OrderForm() {
  // const [{
  //   emailError, 
  //   emailValue, 
  //   cardNumberError, 
  //   cardNumberValue, 
  //   cardDateError, 
  //   cardDateValue, 
  //   cardCvcError, 
  //   cardCvcValue, 
  //   cardNameError, 
  //   cardNameValue, 
  //   selectedCountry,
  //   addressOneValue,
  //   addressOneError,
  //   addressTwoValue,
  //   addressTwoError,
  //   cityValue,
  //   cityError,
  //   zipValue,
  //   zipError,
  //   selectedState }, 
  //   dispatch] = useReducer(reducer, initialState)

  const [isCollapsed, setIsCollapsed] = useState(true)
  // const [emailFocus, setEmailFocus] = useState(false)
  // const [cardNumberFocus, setCardNumberFocus] = useState(false)
  // const [dateFocus, setDateFocus] = useState(false)
  // const [cvcFocus, setCvcFocus] = useState(false)
  const [mouseEnter, setMouseEnter] = useState(false)
  const [DisplayModal, setDisplayModal] = useState(false)
  const [productId, setProductId] = useState(null)
  const [productQuantity, setProductQuantity] = useState(null)
  // const [fastShipping, setFastShipping] = useState('free')
  // console.log(clientSecretKey);

  //state for form

  // const { cartTotal, deleteItem, cartCollection } = useCart()
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const totalCartPrice = useSelector(getTotalCartPrice)
  const cart = useSelector(getCart)

  const displayItems = isCollapsed ? cart.slice(0, 4) : cart

  function handleNavigation() {
    navigation(`/`)
  }



  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const inputFeilds = [emailError, cardNumberError, cardDateError, cardCvcError, cardNameError, addressOneError, cityError, zipError]
  //   let findEmpty

  //   for(let i = 0; i < inputFeilds.length; i++) {
  //     if(inputFeilds[i] === null || inputFeilds[i] === true){
  //       findEmpty = false
  //       break
  //     }else {
  //       findEmpty = true
  //     }
  //   }

  //   if( !findEmpty ) return

  //   console.log(emailValue, cardNumberValue, cardDateValue, cardCvcValue);
  // }

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
          <p>${totalCartPrice}</p>
        </div>
        {/* In here we set product id */}
        <div className={orderFormStyles.items}>
          {displayItems.map((item) => (
            <OrderItem 
              key={item.id} item={item} 
              setDisplayModal={setDisplayModal}
              setProductId={setProductId}
              setProductQuantity={setProductQuantity}
              dispatch={dispatch}
              deleteItem={deleteItem}
            />
          ))}
        </div>
        {cart.length > 4 && 
          <button 
            onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
            className={orderFormStyles.collapse}
          >
            {isCollapsed ? <span>{`Show all ${cart.length} items`}</span> : <span>Show less</span>}
            {isCollapsed ? 
              <FontAwesomeIcon icon={faAngleDown} className={orderFormStyles.icon}/> : 
              <FontAwesomeIcon icon={faAngleUp} className={orderFormStyles.icon}/> }
          </button>
        }
        {/* <div className={orderFormStyles.subtotal}>
          <p>Subtotal</p>
          <p>${cartTotal}</p>
        </div>
        <hr/> */}
        {/* <div className={orderFormStyles.shipping}>
          <div>
            <p>Shipping</p>
            {fastShipping === 'free' ? <p>FREE</p> : <p>FAST (1-3 business days)</p> }
          </div>
          {fastShipping === 'free' ? <p>Free</p> : <p>20.00</p>}
        </div> */}
        {/* <hr/>
        {cartTotal && 
          <div className={orderFormStyles.price}>
            <p>Total due</p>
            <p>${fastShipping === 'free' ? (cartTotal).toFixed(2) : (cartTotal + 20.00).toFixed(2)}</p>
            <p>{cartTotal}</p>
          </div>
        } */}
      </div>
      <hr/>
      {/* <form className={orderFormStyles.form} onSubmit={handleSubmit}>
        <p>Pay with card</p>
        <fieldset className={orderFormStyles.email}>
          <label>Email</label>
          <input 
            type='email' 
            placeholder='john@email.com'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className={`${emailValue && emailError ? `${orderFormStyles.error}` : `${orderFormStyles['gray-border']}`}`}
            onChange={(e) => dispatch({type: 'email', payload: `${e.target.value}`})}
          />
          {emailValue && !emailFocus && emailError && <FontAwesomeIcon icon={faCircleExclamation} className={orderFormStyles['email-faCircleExclamation']}/>}
        </fieldset>
        {emailValue && !emailFocus && emailError && <Error inputText='email' textStyle={orderFormStyles['error-text']}/>}
        <fieldset className={orderFormStyles['shipping-method']}>
          <label className={orderFormStyles['shipping-title']}>Shipping method</label>
          <div className={orderFormStyles.free}>
            <div>
              <input 
                type='radio' 
                name='shipping-method' 
                value='free'
                checked={fastShipping === "free"}
                onChange={(e)=> setFastShipping(e.target.value)}
              />
              <label>FREE</label>
            </div>
            <p>Free</p>
          </div>
          <div className={orderFormStyles.fast}>
            <div>
              <input 
                type='radio' 
                name='shipping-method' 
                value='20.00'
                checked={fastShipping === "20.00"}
                onChange={(e)=> setFastShipping(e.target.value)}
              />
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
              type='text' 
              placeholder='1234 1234 1234 1234'
              onFocus={() => setCardNumberFocus(true)}
              onBlur={() => setCardNumberFocus(false)}
              className={`${orderFormStyles['card-num']} ${cardNumberValue && cardNumberError ? `${orderFormStyles.error}` : `${orderFormStyles['gray-border']}`}`}
              value={cardNumberValue}
              onChange={(e) => dispatch({type: 'cardNumber', payload: `${e.target.value}`})}
            />
            <input 
              type='text' 
              placeholder='MM/YY'
              onFocus={() => setDateFocus(true)}
              onBlur={() => setDateFocus(false)}
              className={`${orderFormStyles.date} ${cardDateValue &&cardDateError ? `${orderFormStyles['date-error']}` : `${orderFormStyles['date-gray-border']}`}`}
              value={cardDateValue}
              onChange={(e) => dispatch({type: 'cardDate', payload: `${e.target.value}`})}
            />
            <input 
              type='text' 
              placeholder='CVC'
              onFocus={() => setCvcFocus(true)}
              onBlur={() => setCvcFocus(false)}
              className={`${orderFormStyles.cvc} ${cardCvcValue && cardCvcError ? `${orderFormStyles['cvc-error']}` : `${orderFormStyles['cvc-gray-border']}`}`}
              value={cardCvcValue}
              onChange={(e) => dispatch({type: 'cardCvc', payload: `${e.target.value}`})}
            />
          </div>
          {cardNumberValue && !cardNumberFocus && cardNumberError && <FontAwesomeIcon icon={faCircleExclamation} className={orderFormStyles['card-number-faCircleExclamation']}/>}
          <FontAwesomeIcon icon={faCcVisa} className={orderFormStyles.visa}/>
          <FontAwesomeIcon icon={faCcMastercard} className={orderFormStyles.master}/>
          {cardDateValue && !dateFocus && cardDateError &&           <FontAwesomeIcon icon={faCircleExclamation} className={orderFormStyles['date-faCircleExclamation']}/>}
          {cardCvcValue && !cvcFocus && cardCvcError &&           <FontAwesomeIcon icon={faCircleExclamation} className={orderFormStyles['cvc-faCircleExclamation']}/>}
          <FontAwesomeIcon icon={faCreditCard} className={orderFormStyles.credit}/>
          <div className={orderFormStyles['cvc-code']}>123</div>
        </fieldset>
        {cardNumberValue && !cardNumberFocus && cardNumberError && <Error inputText='card number' textStyle={orderFormStyles['error-text']}/>}
        {cardDateValue && !dateFocus && cardDateError && <Error inputText="card's expiration date" textStyle={orderFormStyles['error-text']}/>}
        {cardCvcValue && !cvcFocus && cardCvcError && <Error inputText="card's security code" textStyle={orderFormStyles['error-text']}/>}
        <fieldset className={orderFormStyles['card-name']}>
          <div className={orderFormStyles['error-label']}>
            <label>Cardholder name</label>
            {cardNameError && <p className={orderFormStyles['card-name-error']}>REQUIRED</p>}
          </div>
          <input 
            placeholder='Full name on card'
            value={cardNameValue}
            className={`${cardNameError ? `${orderFormStyles.error}` : `${orderFormStyles['gray-border']}`}`}
            onChange={(e) => dispatch({type: 'cardName', payload: `${e.target.value}`})}
          />
        </fieldset>
        <fieldset className={orderFormStyles.billing}>
          <label>Billing address</label>
          <div className={orderFormStyles['billing-info']}>
            <SelectCountries 
              selectedCountry={selectedCountry} 
              dispatch={dispatch}
              countriesStyles={orderFormStyles.countries}
            />
            <input 
              type='text' 
              placeholder='Address line 1'
              className={`${orderFormStyles['address-1']} ${addressOneError ? `${orderFormStyles.error}` : `${orderFormStyles['gray-border']}`}`}
              value={addressOneValue}
              onChange={(e) => dispatch({type: 'address-1', payload: `${e.target.value}`})}
            />
            <input 
              type='text' 
              placeholder='Address line 2'
              className={orderFormStyles['address-2']}
              value={addressTwoValue}
              onChange={(e) => dispatch({type: 'address-2', payload: `${e.target.value}`})}
            />
            <input 
              type='text' 
              placeholder='City'
              className={`${orderFormStyles.city} ${cityError ? `${orderFormStyles.error}` : `${orderFormStyles['gray-border']}`}`}
              value={cityValue}
              onChange={(e) => dispatch({type: 'city', payload: `${e.target.value}`})}
            />
            <input 
              type='text' 
              placeholder='ZIP'
              className={`${orderFormStyles.zip} ${zipError ? `${orderFormStyles.error}` : `${orderFormStyles['gray-border']}`}`}
              value={zipValue}
              onChange={(e) => dispatch({type: 'zip', payload: `${e.target.value}`})}
            />
            <SelectState 
              stateStyles={orderFormStyles.states}
              selectedState={selectedState}
              dispatch={dispatch}
            />
          </div>
          {addressOneError && <FontAwesomeIcon icon={faCircleExclamation} className={orderFormStyles['address-1-faCircleExclamation']}/>}
          {addressTwoError  &&  <FontAwesomeIcon icon={faCircleExclamation} className={orderFormStyles['address-2-faCircleExclamation']}/>}
          {cityError && <FontAwesomeIcon icon={faCircleExclamation} className={orderFormStyles['city-faCircleExclamation']}/>}
          {zipError && <FontAwesomeIcon icon={faCircleExclamation} className={orderFormStyles['zip-faCircleExclamation']}/>}
        </fieldset>
        <button>Pay</button>
      </form> */}
      {/* <AddressElement options={{mode: 'shipping'}}/> */}
      <PaymentForm/>
      {DisplayModal && <UpdateQuantityModal productId={productId} setDisplayModal={setDisplayModal} productQuantity={productQuantity}/>}
    </div>
  )
}