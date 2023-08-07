const  express = require("express");
const router = express.Router();
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");


router.get("/",loggedIn,(req,res)=>{
    if(req.user){
        res.render("index",{status:"loggedIn",user:req.user});
    }else{
        res.render("index",{status:"notLoggedIn",user:"nothing"});
    }
});

// router.get("/login",(req,res)=>{
//     res.sendFile("login.html",{root: "./public"});
// });

router.get("/login",(req,res)=>{
    res.render("partials/login"); 
});

router.get("/providedJobs",loggedIn,(req,res)=>{
    if(req.user) res.render("partials/postJob",{status:"loggedIn",user:req.user});
    else res.render("partials/login",{status:"notLoggedIn",user:"nothing"});
});

router.get("/postJob",loggedIn,(req,res)=>{
    if(req.user) res.render("partials/postJob",{status:"loggedIn",user:req.user});
    else res.render("partials/login",{status:"notLoggedIn",user:"nothing"});
});

router.get("/profile",loggedIn,(req,res)=>{
    if(req.user) res.render("partials/profile",{status:"loggedIn",user:req.user});
    else res.render("partials/login");
});
router.get("/searchJob",loggedIn,(req,res)=>{
    if(req.user) res.render("partials/searchJob",{status:"loggedIn",user:req.user});
    else res.render("partials/login");
})
router.get("/register",(req,res)=>{
    res.render("partials/register");
});

router.get("/forgotPassword",(req,res)=>{
    res.render("partials/forgotPassword");
});
router.get("/logout",logout);

module.exports = router;
