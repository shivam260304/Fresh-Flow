const Order = require("../../../models/order");

function init() {
  return {
    update(req, res) {
      Order.updateOne({ _id: req.body.orderId }, { status: req.body.status })
        .then(() => {
          res.redirect("/admin");
        })
        .catch((err) => {
            res.redirect("/admin");
        });
    },
  };
}

module.exports = init;
