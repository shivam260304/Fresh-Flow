const Order = require('../../../models/order');
const moment = require('moment');const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function init() {
    return {
        store(req, res) {
            const { phone, address, stripeToken, paymentType } = req.body;

            if (phone === '' || address === '') {
                req.flash('error', 'All fields are required');
                return res.redirect('/cart');
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address,
                paymentType,
                paymentStatus: paymentType === 'cod' ? false : true,
            });

            order.save().then(async (result) => {
                const placedOrder = await Order.populate(result, { path: 'customerId' });

                // Payment processing
                if (paymentType === 'card') {
                        stripe.charges.create({
                            amount: req.session.cart.totalPrice * 100,
                            source: stripeToken,
                            currency: 'inr',
                            description: `pizza order: ${placedOrder._id}`,
                            receipt_email: req.user.email, // Optional, but helps with customer communication
                            shipping: {
                                name: req.user.name, // You can use a name from the user profile
                                address: {
                                    line1: address,
                                    city: 'Your City', // Replace with actual city
                                    state: 'Your State', // Replace with actual state
                                    postal_code: 'Your Postal Code', // Replace with actual postal code
                                    country: 'IN'
                                }
                            }
                        }).then(()=>{
                            placedOrder.paymentStatus = true;
                            placedOrder.paymentType = paymentType;
                            placedOrder.save().then((ord)=>{
                                const eventEmitter = req.app.get('eventEmitter');
                                eventEmitter.emit('orderPlaced', ord);
                                delete req.session.cart;
                                res.redirect('/customerOrder');
                            }).catch((err)=>{
                                console.error(err);
                            })
                        }).catch((err)=>{
                            delete req.session.cart;
                            res.redirect('/customerOrder');
                        })
                } else {
                    delete req.session.cart;
                    res.redirect('/customerOrder');
                }
            }).catch((err) => {
                console.error(err);
                res.redirect('/customerOrder');
            });
        },

        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } });
            res.render("customer/order", { orders, moment });
        },

        async singleOrder(req, res) {
            const order = await Order.findById(req.body.orderId);
            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render('customer/singleOrder', { order });
            }
            return res.redirect('/');
        }
    };
}

module.exports = init;
