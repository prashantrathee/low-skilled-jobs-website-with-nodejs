const db = require("../routes/db-config.js");



const postJob = async(req,res)=>{
    const{eID:employerID,eType:employerType,jobType:job,jobLocation:location,jobState:state,workingHours:hours,jobDescription:description,jobSalary:salary,vacancies:vacancy} = req.body;
    // const loginemail = req.body.email;
    if(!employerID || !location || !hours || !description || !salary){
        return res.json({status:"error",error:"Please fill all details"});
    }else{
        db.query("INSERT INTO job (employerID,employerType,vacancies,jobType,description,salaryPerHour,state,location,workingHoursPerDay) VALUES(?,?,?,?,?,?,?,?)",[employerID,employerType,vacancy,job,description,salary,state,location,hours],async (err,result)=>{
            if(err) throw err;
            if(!result) return res.json({status:"error",error:"Some error occurred"});
            else{
                
                return res.json({status:"success",success:"Job Added"});
                
            }
        });
    }
};



module.exports = postJob;