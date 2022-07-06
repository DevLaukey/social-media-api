
exports.authorize = function (req, res, next) {
    // check if user is authenticated

    if (req.session.isAuthenticated == true){
        console.log("first")
        return next();

    }
    else {
        console.log("not authorized");  
        res.redirect("/login");
    }

};
