import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeForm } from './StripeForm';
import './CheckoutForm.css';

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51JHCcOSCb54ikBObuJhQGevZZRijUZ3R76D2gcnl9ZkNGtcB0IEyi4cCYW7uqYrhs3cFxsU6VFz2LRzuKoBq63Jx00iLqZV61T'
);

export const CheckoutForm = () => {
  return (
    <div className="checkoutform-page-wrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <StripeForm />
      </Elements>
    </div>
  );
};
