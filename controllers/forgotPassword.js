const jwt = require("jsonwebtoken");
const db = require("../routes/db-config.js");
const bcrypt = require("bcryptjs");
// const loginPage = require("../views/index");


const forgotPassword = async(req,res)=>{

    const{email:forgotEmail,securityQuestion:sQuestion,securityAnswer:sAnswer,userType:userType,newPassword:nPassword,confirmPassword:cPassword} = req.body;
    console.log("here");
    if(!forgotEmail || !sQuestion || !sAnswer){
        return res.json({status:"error",error:"Please enter all information to reset Password"});

    }
    if(nPassword!=cPassword) return res.json({status:"error",error:"New password and confirm password doesn't match"});
    else{
        var querySent = "UPDATE "+userType+" SET password='"+bcrypt.hash(nPassword,8)+"' WHERE `email`='"+forgotEmail+"' AND `sQuestion`='"+sQuestion+"' AND sAnswer='"+sAnswer+"'";
        console.log(querySent);
        db.query(querySent,async (err,result)=>{
            if(err) throw err;
            if(!result) return res.json({status:"error",error:"Wrong credentials"});
            else{
                console.log("changed password");
                return res.json({status:"success",success:"Successfully updated the password. Login Again"});
            }
    });

}
}




module.exports = forgotPassword;