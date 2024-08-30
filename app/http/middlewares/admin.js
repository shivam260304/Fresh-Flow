function init(req,res,next){
    if(req.isAuthenticated() && req.user.role=='Admin'){
        return next();
    }
    else{
        return res.redirect('/order');
    }
}

module.exports = init;