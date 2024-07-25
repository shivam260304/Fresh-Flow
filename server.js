const express= require('express');
const app = express();

const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Connect mongoDb database from here
const mongoose = require('mongoose');
const url = 'mongodb://localhost/pizza';
mongoose.connect(url);


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', './resources/views');

// Landing page route here
require('./routes/web')(app);


app.listen(3000,()=>{
    console.log("FreshFlow");
})