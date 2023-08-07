const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");


const register = async (req,res)=>{

    if(req.body.registerType == "individual"){
        const{registerEmail:email,registerPassword:nPassword,confirmPassword:cPassword,registerGender:gender,registerName:fullName,registerType:userType,registerContact:contact,
        registerID:identity,registerAddress:address,registerDOB:dob,registerQualification:qualification,sQuestion:sQuestion,sAnswer:sAnswer} = req.body;
        if(!email ||!nPassword || qualification=="Not Applicable" || gender=="Not Applicable" || nPassword!=cPassword){
            return res.json({status:"error",error:"Registration failed. Fill all details applicable"});
        }else{
            db.query('SELECT email FROM individual WHERE email= ?',[email],async(err,result)=>{
                if(err) throw err;
                if(result[0]) return res.json({status:"error",error:"Registration failed. Email has already been taken. Enter a different email"});
                else{
                    const bPassword = await bcrypt.hash(nPassword,8);
                    console.log(bPassword)
                    db.query("INSERT INTO individual (email,password,name,gender,dob,mobile,identity,residence,qualification,userType,sQuestion,sAnswer) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",[email,bPassword,fullName,gender,dob,contact,identity,address,qualification,userType,sQuestion,sAnswer], async (error,results)=>{
                        if(error) throw error;
                        else{
                            return res.json({status:"success",success:"User Registered successfully"});
                        }
                    });
                }
            });
        }
    }else{
        const{registerEmail:email,registerPassword:nPassword,confirmPassword:cPassword,registerName:fullName,registerType:userType,registerContact:contact,
            registerID:identity,registerAddress:address,securityQuestion:sQuestion,securityAnswer:sAnswer} = req.body;
        if(!email ||!nPassword || cPassword!=nPassword){
            return res.json({status:"error",error:"Registration failed. Try again with all your details"});
        }else{
            db.query('SELECT email FROM organization WHERE email= ?',[email],async(err,result)=>{
                if(err) throw err;
                if(result[0]) return res.json({status:"error",error:"Registration failed. Email has already been taken. Enter a different email"});
                else{
                    const bPassword = await bcrypt.hash(nPassword,8);
                    
                    db.query("INSERT INTO organization (email,password,name,identity,mobile,address,userType,sQuestion,sAnswer) VALUES('"+email+"','"+bPassword+"',?,?,?,?,?,?,?)",[fullName,identity,contact,address,userType,sQuestion,sAnswer], async (error,results)=>{
                        if(error) throw error;
                        else{
                            return res.json({status:"success",success:"User Registered successfully"});
                        }
                    });
                }
            });
        }
    }
    

}

module.exports = register;