function cartController() {
    return {
      index(req, res) {
        res.render("./customer/cart.ejs");
      }
    };
  }
  
  module.exports = cartController;