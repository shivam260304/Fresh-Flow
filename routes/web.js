const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authController');



function init(app){
    app.get("/",homeController().index);
    
    app.get("/cart",cartController().index);
    
    app.post("/update-cart",cartController().update);

    app.get("/login",authController().login);

    app.post("/login",authController().postLogin);
    
    app.get("/register",authController().register);
    
    app.post("/register",authController().postRegister);

}

module.exports = init;