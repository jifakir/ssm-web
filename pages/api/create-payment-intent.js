// This is your test secret API key.
const stripe = require("stripe")('sk_test_51KSxxsLPva6t8Wj1op7BsHgqCCN3RN7d4hIJSL87QzMjwbYclR9mvqwGqRYFcRZHkFBbV9PVo4jcJ1N5A1N0fG8Q00xEYffkXg');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};