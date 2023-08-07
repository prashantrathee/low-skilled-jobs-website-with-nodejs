searchJobForm.addEventListener("submit",(req,res)=>{
    
    
    var searchJobs = [];
    var index = 0;
    var checkBoxes = document.getElementsByName("checkbox");
    var i;
    // console.log(checkBoxes.length);
    // document.getElementById("print").innerHTML = checkBoxes.length;
    for(i=0;i<checkBoxes.length;i++){
        if(checkBoxes[i].checked){
            searchJobs[index] = checkBoxes[i].value;
            index++;
        }
    }
    var states = document.getElementById("state");

    const searchJobData = {
        searchJobTypes:searchJobs,
        state:states.options[states.selectedIndex].value,
        size:index
    }
    fetch("/jobs/searchJobs",{
        method:"POST",
        body:JSON.stringify(searchJobData),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
    .then(data=>{
        if(data.status == "error"){
            successAlert.style.display="none";
            errorAlert.style.display = "block";
            errorAlert.innerText = data.error;
            document.getElementById("tableInSearchJob").style.display = "none";
        }else{
            successAlert.style.display="none";
            errorAlert.style.display = "none";
            document.getElementById("searchJobForm").style.display = "none";
            document.getElementById("tableInSearchJob").style.display = "block";
            if (data.success) { 
                var x = 1;
                data.success.forEach(function(obj) {
            document.getElementById("bodyOfTable").innerHTML += "<tr><td style='display:none;'>"+obj.jobID+"</td><td>"+obj.employerType+"</td><td>"+obj.jobType+"</td><td>"+obj.vacancies+"</td><td>"+obj.location+"</td><td>"+obj.state+"</td><td>"+obj.salaryPerHour+"</td><td>"+obj.workingHoursPerDay+"</td><td><input type='button' class='submit-btn' id='apply' value='Apply'></td>";
            x++;
        });
    }
}
    });
});