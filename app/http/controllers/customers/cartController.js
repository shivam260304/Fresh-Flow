function cartController() {
  return {
    index(req, res) {
      res.render("./customer/cart.ejs");
    },
    update(req, res) {
      // let cart ={
      //   items :{
      //     pizzaid1 : {item : pizzaObject, qty:0},
      //     pizzaid2 : {item : pizzaObject, qty:0},
      //     pizzaid3 : {item : pizzaObject, qty:0},
      //   },
      //   totalQty:0,
      //   totalPrice:0
      // }

      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;
      let pizza = req.body;
      let x = cart.items[pizza._id];
      // Checking if pizza is already present int the cart,
      if (x) {
        x.qty = x.qty + 1;
        cart.totalPrice = cart.totalPrice + pizza.price;
        cart.totalQty = cart.totalQty + 1;
      } else {
        cart.items[pizza._id] = { item: pizza, qty: 1 };
        cart.totalPrice = cart.totalPrice + pizza.price;
        cart.totalQty = cart.totalQty + 1;
      }

      res.json({totalQty: req.session.cart.totalQty})
    }
  };
}

module.exports = cartController;
