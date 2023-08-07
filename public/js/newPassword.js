
window.onload = function(){
    var name = "Prashant";
    document.getElementById('welcomeTextInNewPassword').innerHTML = "Welcome "+name;
}

newPasswordForm.addEventListener("submit",()=>{
    const passwordData = {
        email:
    }
    fetch("/profile/setNewPassword",{
        method:"POST",
        body:JSON.stringify(passwordData),
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