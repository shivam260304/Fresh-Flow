const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require('../app/http/controllers/admin/adminOrdercontroller');

// MIDDLEWARES
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');



function init(app){
    app.get("/",homeController().index);
    app.get("/login",guest,authController().login);
    app.post("/login",authController().postLogin);
    app.get("/register",guest,authController().register);
    app.post("/register",authController().postRegister);
    app.post("/logout",authController().logout);
    app.get("/cart",cartController().index);
    app.post("/update-cart",cartController().update);

    // Customer routes
    app.post("/order",auth,orderController().store);
    app.get('/order',auth,orderController().index);

    // Admin routes
    app.get('/admin',admin,adminOrderController().index);
}

module.exports = init;