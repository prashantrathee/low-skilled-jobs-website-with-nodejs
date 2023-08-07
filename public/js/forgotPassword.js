forgotPasswordForm.addEventListener("submit",()=>{
    
    var userTypeRadio = document.getElementsByName("userType");
    var userTypee;
    for(i=0;i<userTypeRadio.length;i++) if(userTypeRadio[i].checked) userTypee = userTypeRadio[i].value; 
    console.log("forgot password user type = "+userTypee);
    var sQuestions = document.getElementById("forgotPasswordQuestion");
    var value = sQuestions.value;
    
    const forgotPassword = {
        email:forgotEmail.value,
        securityQuestion: sQuestions.options[sQuestions.selectedIndex].text,
        securityAnswer: sAnswerInForgot.value, 
        userType:userTypee,
        newPassword:newPassword.value,
        confirmPassword:confirmPassword.value
    };

    fetch("/api/forgotPassword",{
        method:"POST",
        body:JSON.stringify(forgotPassword),
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