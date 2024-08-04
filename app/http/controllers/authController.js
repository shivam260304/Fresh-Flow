// Factory function : It is a function that return an object, here controllers are factory fn

const User = require("../../models/user");
const bcrypt = require("bcrypt");

function authController() {
  return {
    login(req, res) {
      res.render("./auth/login.ejs");
    },
    postLogin(req,res){
      // Login logic;
    },
    register(req, res) {
      res.render("./auth/register.ejs");
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      // If user forgot to enter some credentials so return them a flash messages
      // Also flash is applied to only one request so we need to return the entered values by user
      // for ex if user entered the name but forgot email when we redirect back both name & email will diappeared
      // to prevent that we will also be sending the entered details line ->21,22
      // These flash messages can be acceseed by messages.name, messages.email, etc...
      // We will not be sending password back for security reasons
      if (name == "" || email == "" || password == "") {
        req.flash("error", "All fields are required!");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      // Check if email already exists
      User.exists({ email: email }).then((result) => {
          if (result) {
            req.flash("error", "Email already exists!");
            req.flash("email", email);
            req.flash("name", name);
            return res.redirect("/register");
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        });

      const hashedPassword = await bcrypt.hash(password, 10);

      let user = new User({
        name,
        email,
        password: hashedPassword,
      });

      user.save().then((user) => {
          return res.redirect("/");
        }).catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/register");
        });
    },
  };
}

module.exports = authController;
