import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

/**
 * Generates a Stripe Promise through the PublicKey
 * @returns {Promise} stripePromise
 */
const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
}

export default getStripe;