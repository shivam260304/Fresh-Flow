function auth(req,res,next){
    if(req.isAuthenticated() && req.user.role=='Customer'){
        return next();
    }
    // else the user is admin who has logged in
    return res.redirect('/admin');
    
}

module.exports= auth;