const Order = require("../../../models/order");

function init() {
  return {
    update(req, res) {
      Order.updateOne({ _id: req.body.orderId }, { status: req.body.status })
        .then(() => {
          const eventEmitter = req.app.get('eventEmitter');
          eventEmitter.emit('orderUpdated', {id:req.body.orderId, status: req.body.status})
          res.redirect("/admin");
        })
        .catch((err) => {
            res.redirect("/admin");
        });
    },
  };
}

module.exports = init;
