require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const createPayment = async (req, res) => {
    try {
        const { amount, currency = 'usd', payment_method_types = ['card'] } = req.body;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types,
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPayment = async (req, res) => {
    try {
        const { paymentIntentId } = req.params;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        res.status(200).json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPayment,
    getPayment,
};
