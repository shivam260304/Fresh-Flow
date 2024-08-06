const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authController');
const guest = require('../app/http/middlewares/guest');



function init(app){
    app.get("/",homeController().index);
    app.get("/login",guest,authController().login);
    app.post("/login",authController().postLogin);
    app.get("/register",guest,authController().register);
    app.post("/register",authController().postRegister);
    app.get("/logout",authController().logout);
    app.get("/cart",cartController().index);
    app.post("/update-cart",cartController().update);
}

module.exports = init;