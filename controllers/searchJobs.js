
const db = require("../routes/db-config.js");


const searchJob = async(req,res)=>{
    const{searchJobTypes:searchJobs,state:stateToSearch,size:len} = req.body;
    
    if(len==0){
        return res.json({status:"error",error:"Please choose a job type first"});
    }else{
        var queryToSend = "SELECT * FROM job WHERE state='"+stateToSearch+"' AND jobType IN ('"+searchJobs[0]+"'";
        var i;
        for(i=1;i<len;i++){
            queryToSend  = queryToSend + ",'"+searchJobs[i]+"'";
        }
        queryToSend += ")";
        console.log(queryToSend);
        db.query(queryToSend,async (err,result)=>{
            if(err) throw err;
            if(!result[0] ) return res.json({status:"error",error:"No Jobs Found"});
            else{
                console.log("here");
                // const token = jwt.sign({id:result[0].id},process.env.JWT_SECRET,{
                //     expiresIn:"90d"
                // });
                // const cookieOptions = {
                //     expiresIn:new Date(Date.now() + process.env.COOKIE_EXPIRES*24*60*60*1000)
                // }
                // res.cookie("userLoggedIn",token,cookieOptions);
                console.log(result);
                return res.json({status:"success",success:result});
            }
        });
    }
};
module.exports = searchJob;