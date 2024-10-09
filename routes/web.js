const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require('../app/http/controllers/admin/adminOrdercontroller');
const adminStatusController = require('../app/http/controllers/admin/adminStatusController');
const totalorderController = require('../app/http/controllers/admin/totalOrder');

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
    app.get('/customerOrder',auth,orderController().index);
    app.post('/thisOrder',auth,orderController().singleOrder);

    // Admin routes
    app.get('/admin',admin,adminOrderController().index);
    app.post('/statusUpdate',adminStatusController().update);
    app.get('/orderReport',admin,totalorderController().index);
}

module.exports = init;