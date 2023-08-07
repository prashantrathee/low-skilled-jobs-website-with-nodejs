const jwt = require("jsonwebtoken");
const db = require("../routes/db-config.js");
const bcrypt = require("bcryptjs");


const login = async(req,res)=>{
    const{email:loginemail,password:nPassword,userType:logintype} = req.body;
    // const loginemail = req.body.email;
    if(!loginemail || !nPassword || !logintype){
        return res.json({status:"error",error:"Please choose your Type and enter your details"});
    }else{
        db.query("SELECT * FROM "+logintype+" WHERE `email`=\""+loginemail+"\"",async (err,result)=>{
            if(err) throw err;
            if(!result[0] || !await bcrypt.compare(nPassword,result[0].password)) return res.json({status:"error",error:"Wrong credentials"});
            else{
                const token = jwt.sign({id:result[0].id},process.env.JWT_SECRET,{
                    expiresIn:"90d"
                });
                const cookieOptions = {
                    expiresIn:new Date(Date.now() + process.env.COOKIE_EXPIRES*24*60*60*1000)
                }
                res.cookie("userLoggedIn",token,cookieOptions);
                // res.redirect('/');
                // fetch("/");
                return res.json({status:"success",success:"User has been logged in"});
                
            }
        });
    }
};
//bcrypt.compare(nPassword,result[0].password)
module.exports = login;