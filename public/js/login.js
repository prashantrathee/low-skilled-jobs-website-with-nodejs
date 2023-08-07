loginForm.addEventListener("submit",(req,res)=>{
    
var userTypeRadio = document.getElementsByName("select");
var userType;
for(i=0;i<userTypeRadio.length;i++) if(userTypeRadio[i].checked) userType = userTypeRadio[i].value; 
    // document.getElementById("userType").innerHTML = userType;
    const loginData = {
        email:loginEmail.value,
        password:loginPassword.value,
        userType:userType
    }
    fetch("/api/login",{
        method:"POST",
        body:JSON.stringify(loginData),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.status == "error"){
            successAlert.style.display="none";
            errorAlert.style.display = "block";
            errorAlert.innerText = data.error;
        }else{
            successAlert.style.display="block";
            errorAlert.style.display = "none";
            successAlert.innerText = data.success;
            // res.redirect("/");
            // fetch("/",{
            //     method:"GET"
            // });
        }
    });
});