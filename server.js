const express= require('express');
const app = express();

const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));

app.get("/",(req,res)=>{
    res.render("home");
})

app.listen(3000,()=>{
    console.log("FreshFlow");
})