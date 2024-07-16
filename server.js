const express= require('express');
const app = express();

const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// app.use(expressLayout);
app.set('views', './resources/views');
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/cart",(req,res)=>{
    res.render("./customer/cart.ejs");
})

app.listen(3000,()=>{
    console.log("FreshFlow");
})