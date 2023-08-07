
registerForm.addEventListener("submit",()=>{
    console.log("herheh");
    var qualifications = document.getElementById("qualificationSelect");
var sQuestions = document.getElementById("sQuestion");

var genderRadio = document.getElementsByName("gender");
var gender;
for(i=0;i<genderRadio.length;i++) if(genderRadio[i].checked) gender = genderRadio[i].value; 
// var date = new Date($('#dateInput').val());
var date = document.getElementById("dateInput").value;
var userTypeRadio = document.getElementsByName("userType");
var userTypee;
for(i=0;i<userTypeRadio.length;i++) if(userTypeRadio[i].checked) userTypee = userTypeRadio[i].value; 
// var day = date.getDate();
// var month = date.getMonth()+1;
// var year = date.getFullYear();
var completeDate = date;


    const registerData = {
        registerEmail:email.value,
        registerType:userTypee,
        registerPassword:newPassword.value,
        confirmPassword:confirmPassword.value,
        registerID:identity.value,
        registerName:fullName.value,
        registerContact:phone.value,
        registerQualification:qualifications.options[qualifications.selectedIndex].text,
        securityQuestion: sQuestions.options[sQuestions.selectedIndex].text,
        securityAnswer: sAnswer.value, 
        registerGender:gender,
        registerDOB:completeDate,
        registerAddress:address.value
    };
    console.log(registerData);
    fetch("/api/register",{
        method:"POST",
        body:JSON.stringify(registerData),
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
            
        }
    });
});