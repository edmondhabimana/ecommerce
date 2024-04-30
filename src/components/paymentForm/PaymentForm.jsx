import paymentFormStyles from './PaymentForm.module.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { getTotalCartPrice } from '../../Cart/cartSlice';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-duotone-svg-icons';


export default function PaymentForm() {

  const stripe = useStripe();
  const elements = useElements();
  const totalCartPrice = useSelector(getTotalCartPrice)

  const [errorMessage, setErrorMessage] = useState('');
  const [isProccessingPayment, setIsProccessingPayment] = useState(false);

  useEffect(() => {
    // console.log('inside useEffect 1');
    const timerRef = setInterval(function () {
      setErrorMessage('')
    }, 4800)
    return () => clearInterval(timerRef)

  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    setIsProccessingPayment(true)
    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalCartPrice * 100 }),
    }).then((res) => res.json());

    // const {
    //   paymentIntent: { client_secret },
    // } = await res;
    const clientSecret = res.paymentIntent.client_secret;
    // console.log(clientSecret);

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/orderPlaced`,
      },
    });

    setIsProccessingPayment(false)

    if (error) {
      setErrorMessage(error.message);
    }
  };


  return(
    <div className={paymentFormStyles.container}>
      <form onSubmit={handleSubmit}>
        <PaymentElement className={paymentFormStyles.payment}/>
        <button 
          type='submit' 
          className={paymentFormStyles.submit}
        >
          { isProccessingPayment ? 
            <FontAwesomeIcon icon={faSpinner} spinPulse /> : 
            'PAY'}
        </button>
        {errorMessage && <div className={paymentFormStyles['card-error']}>{errorMessage}</div>}
      </form>
    </div>
  )
}