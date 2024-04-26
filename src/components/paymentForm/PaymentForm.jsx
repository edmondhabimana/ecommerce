import paymentFormStyles from './PaymentForm.module.css'
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function PaymentForm() {

  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal } = useCart()

  const [errorMessage, setErrorMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');

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

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    // const {
    //   paymentIntent: { client_secret },
    // } = await res;
    const clientSecret = res.paymentIntent.client_secret;
    console.log(clientSecret);

    const paymentResults = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/orderplaced`,
      },
    });


    // console.log(paymentResults);

    // if (error) {
    //   // This point will only be reached if there is an immediate error when
    //   // confirming the payment. Show error to your customer (for example, payment
    //   // details incomplete)
    //   setErrorMessage(error.message);
    // } else {
    //   // Your customer will be redirected to your `return_url`. For some payment
    //   // methods like iDEAL, your customer will be redirected to an intermediate
    //   // site first to authorize the payment, then redirected to the `return_url`.
    // }
  };


  return(
    <div className={paymentFormStyles.container}>
      <form onSubmit={handleSubmit}>
        <PaymentElement className={paymentFormStyles.payment}/>
        <button 
          type='submit' 
          className={paymentFormStyles.submit}
        >
          PAY
        </button>
      </form>
    </div>
  )
}