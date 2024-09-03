const Order = require('../../../models/order');
const moment = require('moment');

function init(){
    return{
        store(req,res){
            const {phone,address} = req.body;
            if(phone=='' || address==''){
                req.flash('error','All fiels are required');
                return res.redirect('/cart');
            }
            const order = new Order({
                customerId: req.user._id,
                items : req.session.cart.items,
                phone,
                address,

            })
            order.save().then((result)=>{
                req.flash('success','Order placed successfully');
                delete req.session.cart;
                res.redirect('/order');
            }).catch((err)=>{
                req.flash('error','Something went wrong');
                return res.redirect('/cart');
            })
        },
        async index(req,res){
            const orders = await Order.find({customerId: req.user._id},null,{sort: {'createdAt' : -1}});
            res.render("customer/order",{orders,moment});
        },
        async singleOrder(req,res){
            const order = await Order.findById(req.body.orderId);
            if(req.user._id.toString() === order.customerId.toString()){
                return res.render('customer/singleOrder', { order })
            }
            return  res.redirect('/')
        }
    }
}

module.exports = init;

// Here I have used a form to send the data from order.ejs to orderController.js