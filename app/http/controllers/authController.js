// Factory function : It is a function that return an object;

function authController() {
    return {
      login(req, res) {
        res.render("./auth/login.ejs");
      },
      register(req, res) {
        res.render("./auth/register.ejs");
      },
    };
  }
  
  module.exports = authController;