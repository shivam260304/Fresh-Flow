// This page is for the following purpose ->
    // If a user is already logged in , he/she should not be allowed to
    // go to login and register page, so to prevent that this file is made
    // which will act as a middleware in 

    // app.get("/login",guest,authController().login);
    // app.get("/register",guest,authController().register);



// we are able to use (req.isAuthenticated) beacuse we'd app.use(passport.initialize());
function guest(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return next();
}

module.exports = guest;