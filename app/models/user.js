const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role :{type:String, default:'Customer'}
},{timestamps:true});

module.exports=mongoose.model("User", UserSchema);