// Factory function : It is a function that return an object;

const Menu = require("../../models/menu");

function homeController() {
  return {
    async index(req, res) {
      const pizzas = await Menu.find();
      return res.render("home.ejs", {pizzas});
    },
  };
}

module.exports = homeController;
