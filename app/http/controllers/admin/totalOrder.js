const Order = require('../../../models/order');

function init(){
    return {
        async index(req,res){
            const orders = await Order.find();
            let totalQuantity = 0;
            let pizzaMap ={};
            
            // orders.forEach((order)=>{
            //     for (let pizza of Object.values(order.items)) {
            //         totalQuantity += pizza.qty;
            //     }
            // })
            
            
            // for (let pizza of Object.values(orders.order)) {
            //     let pizzaName = pizza.item.name;
            //     if (pizzaQuantityMap[pizzaName]) {
            //         pizzaQuantityMap[pizzaName] += pizza.qty;
            //     } else {
            //         pizzaQuantityMap[pizzaName] = pizza.qty;
            //     }
            // }
            res.render('/admin/totalOrder', { orders, totalQuantity, pizzaMap });
        }
    }
}

module.exports = init;