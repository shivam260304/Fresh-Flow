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

// This is how we render logic segment of the routes;

// function homeController() {
//   return {
//     index(req, res) {
//       return res.render("home.ejs");
//     }
//   };
// }

module.exports = homeController;
