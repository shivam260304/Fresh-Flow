const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId:{
        type: String,
        ref: 'User',
        required: true
    },
    items:{type: Object, required:true},
    phone:{type:String, required:true},
    address:{type:String, required:true},
    status:{type:String, default:'order_placed'}
},{timestamps: true});

module.exports=mongoose.model("Order", orderSchema);