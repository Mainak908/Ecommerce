import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51O07tpSC4QlQZ4KyrCd9LGT12U8SdgacO7maOpxaRcPTYrkBO2CSxkna2zbJwSpdvFdJagWDvB9hoW7mZbnhkv4r00pyZ27k99",
  {
    typescript: true,
    apiVersion: "2023-10-16",
  }
);