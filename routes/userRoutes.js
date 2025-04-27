const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const passport=require("passport");

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});

router.post('/signup', async(req, res) => {
    const { username, email, password, role } = req.body;
    const newUser=new User({username,email,role});
    let registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
       res.redirect("/");
       });
});


router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    if (req.user.role === 'admin') {
        res.redirect('/admin/dashboard');
    } else if (req.user.role === 'worker') {
        res.redirect('/worker/dashboard');
    } else {
        res.redirect('/user/dashboard');
    }
});



router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/'); // Redirect to home page after logout
    });
});

module.exports = router;