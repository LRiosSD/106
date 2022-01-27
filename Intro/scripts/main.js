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

    let theTask=new Task(isImportant, title, desc,location,participants,color,date);
    console.log(theTask);

    displayTask(theTask);
    
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

    let syntax = `<div class="task">
            <div class="task-title">
                <h5>${task.title}</h5>
                <p>${task.description}</p>
            </div>

            <div class="task-middle">
                <label>${task.location}</label>
                <label>${task.dueDate}</label>
            </div>
        </div>`;
        $(".task-container").append(syntax);
}

function init() {
    console.log("My Calendar!!");

    // load data


    // hook events
    $("#btnSave").click(saveTask);    

    $(".iImportant").click(toggleImportant);
    $("#btnToggleDetails").click(toggleDetails);
}



window.onload = init;


/**
 * Task:
 * 
 * title
 * important
 * due date
 * location
 * description
 * participants
 * color
 * 
 */