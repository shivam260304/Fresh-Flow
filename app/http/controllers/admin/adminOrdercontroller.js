const Order = require('../../../models/order');

function init() {
    return {
        async index(req, res) {
            try {
                // Fetch orders that are not completed, sort by creation date, and populate customer data
                const orders = await Order.find({ status: { $ne: 'completed' } })
                    .sort({ 'createdAt': -1 })
                    .populate('customerId', '-password');

                // If the request is an AJAX request, respond with JSON
                if (req.xhr) {
                    return res.json(orders);
                } else {
                    return res.render('admin/adminOrder');
                }
            } catch (err) {
                // Log the error and return an error response
                console.error('Error fetching orders:', err);
                return res.status(500).send('Internal Server Error');
            }
        }
    }
}

module.exports =init;

