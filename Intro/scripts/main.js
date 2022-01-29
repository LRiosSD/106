var isImportant = false;
var isAsideVisible = true;

function toggleImportant() {   
    let icon =  $(".iImportant");
    if(isImportant) {
        icon.removeClass("fas").addClass("far");
        isImportant = false;
    }
    else {
        icon.removeClass("far").addClass("fas");
        isImportant = true;
    }
}

function toggleDetails() {
    // do the magic
    let aside = $("aside");
    if(isAsideVisible) {
        aside.hide();
        isAsideVisible = false;
    }
    else {
        aside.show();
        isAsideVisible = true;
    }
}


function saveTask() {
    let title=$("#txtTitle").val();
    let date=$("#txtDueDate").val();
    let location=$("#txtLocation").val();
    let desc=$("#txtDescription").val();
    let participants=$("#txtParticipants").val();
    let color=$("#txtColor").val();

    //Validations
    // if there is no title, show an error and get out (do not continue)

    if(!title){
        alert("Error, Empty Title Not Allowed");
        return; //do not continue
    }

    let theTask=new Task(isImportant, title, desc,location,participants,color,date);


$.ajax({
    type:"POST",
    url:"https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(theTask),
    contentType:"application/json",

    success: function(response){
        console.log("Server says:",response);
        let savedTask=JSON.parse(response);

        displayTask(savedTask);
        clearForm();    
    },

    error: function(details){
        console.log("Save failed", details);

        //show an error
    }
});   
}

function clearForm(){
    $("#txtTitle").val("");
    $("#txtDueDate").val("");
    $("#txtLocation").val("");
    $("#txtDescription").val("");
    $("#txtParticipants").val("");
    $("#txtColor").val("");
}


function displayTask(task){

    let syntax = `<div class="task" style="border:2px solid ${task.color}">
            <div class="task-title">
                <h5>${task.title}</h5>
                <p>${task.description}</p>
            </div>

            <div class="task-middle">
                <label><i class="fas fa-map-marker-alt"></i> ${task.location}</label>
                <label><i class="far fa-clock"></i> ${task.dueDate}</label>
            </div>
        </div>`;

        $(".task-container").append(syntax);
}

function fetchTask(){
    // get=> "https://fsdiapi.azurewebsites.net/api/tasks"
    $.ajax({
        type:"GET",
        url:"https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            let allTask=JSON.parse(response);

            for(let i=0; i<allTask.length;i++){
                let task=allTask[i];

                // if the user on the task is equal to my name, then I will display this task
                if(task.name==="Leo"){
                    displayTask(task);
                }
                displayTask(task);
            }
        },
        error: function(details){
            console.log("Retrieve failed", details);
        }
    });
}

function deleteAllTask(){
    $.ajax({
        type:'DELETE',
        url:"https://fsdiapi.azurewebsites.net/api/tasks/clear/Leo",
        success: function(){
            $(".task-container").html("");
        }
    })
}

function testrequest(){
    $.ajax({
        url:"https://restclass.azurewebsites.net/api/test",
        type:"GET",
        success: function(){
            console.log("Server says:",response);
        },
        error: function(details){
            console.log("req failed",details);
        }
    });
}


function init() {
    console.log("My Calendar!!");

    // load data
    fetchTask();


    // hook events
    $("#btnSave").click(saveTask);
    $("#btnDelete").click(deleteAllTask);

    $(".iImportant").click(toggleImportant);
    $("#btnToggleDetails").click(toggleDetails);
}



window.onload = init;

