// function onFormSubmit(e) {
// 	event.preventDefault();
//         var formData = readFormData();
//         if (selectedRow == null){
//             insertNewRecord(formData);
// 		}
//         else{
//             updateRecord(formData);
// 		}
//         resetForm();    
// }

// //Retrieve the data
// function readFormData() {
//     var formData = {};
//     formData["productCode"] = document.getElementById("productCode").value;
//     formData["product"] = document.getElementById("product").value;
//     formData["qty"] = document.getElementById("qty").value;
//     formData["perPrice"] = document.getElementById("perPrice").value;
//     return formData;
// }

// //Insert the data
// function insertNewRecord(data) {
//     var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
//     var newRow = table.insertRow(table.length);
//     cell1 = newRow.insertCell(0);
// 		cell1.innerHTML = data.productCode;
//     cell2 = newRow.insertCell(1);
// 		cell2.innerHTML = data.product;
//     cell3 = newRow.insertCell(2);
// 		cell3.innerHTML = data.qty;
//     cell4 = newRow.insertCell(3);
// 		cell4.innerHTML = data.perPrice;
//     cell4 = newRow.insertCell(4);
//         cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
// }

// //Edit the data
// function onEdit(td) {
//     selectedRow = td.parentElement.parentElement;
//     document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
//     document.getElementById("product").value = selectedRow.cells[1].innerHTML;
//     document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
//     document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
// }
// function updateRecord(formData) {
//     selectedRow.cells[0].innerHTML = formData.productCode;
//     selectedRow.cells[1].innerHTML = formData.product;
//     selectedRow.cells[2].innerHTML = formData.qty;
//     selectedRow.cells[3].innerHTML = formData.perPrice;
// }

// //Delete the data
// function onDelete(td) {
//     if (confirm('Do you want to delete this record?')) {
//         row = td.parentElement.parentElement;
//         document.getElementById('storeList').deleteRow(row.rowIndex);
//         resetForm();
//     }
// }

//Reset the data
function resetForm() {
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}

function loadJobs(){
    var userType = document.getElementById("userType").textContent;
    var userID = document.getElementById("userID").textContent;
    var getProvidedJobs = {
        type:userType,
        id:userID
    }
    fetch("/jobs/providedJobs",{
        method:"POST",
        body:JSON.stringify(getProvidedJobs),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
.then(data=>{
    if(data.status == "error"){
        successAlert.style.display="none";
        errorAlert.style.display = "block";
        errorAlert.innerText = data.error;
        document.getElementById("storeList").style.display = "none";
    }else{
        // successAlert.style.display="none";
        errorAlert.style.display = "none";
        document.getElementById("storeList").style.display = "block";
        if (data.success) { 
            var x = 1;
            data.success.forEach(function(obj) {
        document.getElementById("bodyOfTable").innerHTML += "<tr><td>"+obj.jobType+"</td><td>"+obj.salaryPerHour+"</td><td>"+obj.workingHoursPerDay+"</td><td>"+obj.vacancies+"</td><td>"+obj.state+"</td><td>"+obj.location+"</td>";
        x++;
    });
}
    }
});
}

postJobForm.addEventListener("submit",(req,res)=>{
    
    var jobTypes = document.getElementById("jobTypeSelect");
    var states = document.getElementById("stateSelect");
    var userID = document.getElementById("userID"); 
    var userType = document.getElementById("userType");
    const newJob = {
        eID:userID.textContent,
        eType:userType.textContent,
        jobType:jobTypes.options[jobTypes.selectedIndex].text,
        jobDescription:jobDescription.value,
        vacancies:vacancies.value,
        jobState:states.options[states.selectedIndex].text,
        workingHours:workingHour.value,
        jobLocation:jobLocation.value,
        jobSalary:salary.value
    }
    console.log(newJob);
    fetch("/jobs/postJob",{
        method:"POST",
        body:JSON.stringify(newJob),
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








