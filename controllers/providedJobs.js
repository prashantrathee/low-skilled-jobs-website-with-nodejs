
const db = require("../routes/db-config.js");


const providedJob = async(req,res)=>{
    const{type:userType,id:userID} = req.body;
    
        db.query("SELECT * FROM job WHERE employerID=? AND employerType=?",[userID,userType],async (err,result)=>{
            if(err) throw err;
            if(!result[0] ) return res.json({status:"error",error:"No Jobs Found"});
            else{
                
                console.log(result);
                return res.json({status:"success",success:result});
            }
        });
    
};
module.exports = providedJob;