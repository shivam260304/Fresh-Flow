require('dotenv').config();

const express= require('express');
const app = express();

const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// packages for session storage
const session = require('express-session');
const flash = require('express-flash');
// To store the session in the database
const MongoDbStore = require('connect-mongo');

// Packages for passport authentication
const passport = require('passport');

const PORT = process.env.PORT || 3000;

// Connect mongoDb database from here
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

  let store = new MongoDbStore({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  })
  // Session Configure
  app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    store: store,
    saveUninitialized : false,
    cookie : {maxAge : 1000 * 60 * 60 * 24},
  }))
  
// Passport config

// It sets up Passport to handle user authentication.
  app.use(passport.initialize());
  // Passport will deserialize the user from the session on every request,
  // making the user object available as req.user.
  app.use(passport.session());

// Flash to display session in 'sessions' collection
// It is also used to display messages in frontend which can be accessed by messages.xyz
app.use(flash());

// Assets
app.use(express.static('public'));

// To see json object in console -->
  // By doing this all json files(session) will be accessible every for fronted file
app.use(express.json());

// For all the url data (ex: form submission)
app.use(express.urlencoded({extended: false}));

// Global middleware for using session in frontend and in general everywhere
app.use((req,res,next)=>{
  res.locals.session = req.session;
  next();
})

// Set Template engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', './resources/views');

// All routes here
require('./routes/web')(app);


app.listen(PORT,()=>{
    console.log("FreshFlow");
})