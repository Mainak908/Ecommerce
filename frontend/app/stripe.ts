import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51O07tpSC4QlQZ4KyvCIAcKoXHmhRZt4zXs1c03fAPYkErsN4SJ6LNtJpM13jJBvKOxaNwP9NeXGHTiANIZokrYtU00axKLOBrx"
    );
  }
  return stripePromise;
};

export default getStripe;
