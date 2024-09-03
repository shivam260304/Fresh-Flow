require("dotenv").config();

const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");


// packages for session storage
const session = require("express-session");
const flash = require("express-flash");
// To store the session in the database
const MongoDbStore = require("connect-mongo");

// Packages for passport authentication
const passport = require("passport");

// Connect mongoDb database from here
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Session Configure
let store = new MongoDbStore({
  mongoUrl: process.env.MONGODB_URI,
  collectionName: "sessions",
});
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware to use Flash in all templates
// Flash to display session in 'sessions' collection
// It is also used to display messages in frontend which can be accessed by messages.xyz
app.use(flash());

// Assets
app.use(express.static("public"));
// For all the url data (ex: form submission)
app.use(express.urlencoded({ extended: false }));
// To see json object in console -->
// By doing this all json files(session) will be accessible every for fronted file
app.use(express.json());

// Global middleware, entities inside it can be used anywhere in frontend files
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;  // It is possible through deserializeUser method
  next();
});

// Set Template engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'resources/views'));

// All routes here
require("./routes/web")(app);



const server = app.listen(PORT, () => {
  console.log("FreshFlow");
});

// All Socket Work
const io = require("socket.io")(server);








// Socket messages -> Help in real-time communication between client and server
// EventEmmiter messages -> allows different parts of your application (modules, components)
    // to communicate with each other by emitting and listening to events
