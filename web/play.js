const easyBTN = document.querySelector("#easy");
const mediumBTN = document.querySelector("#medium");
const hardBTN = document.querySelector("#hard");
const respBTNS = {
    resp1: document.querySelector("#resp1"),
    resp2: document.querySelector("#resp2"),
    resp3: document.querySelector("#resp3"),
    resp4: document.querySelector("#resp4"),
}
const textQuestion = document.querySelector("#question");
easyBTN.addEventListener("click",(event) =>{
    event.preventDefault();
    if(confirm("¿Estas seguro de jugar en facil?") == true){
        sendDifficulty("Easy");
    }else{
    alert("Puedes escoger otra opcion");   
    }
});
mediumBTN.addEventListener("click",(event) =>{
    event.preventDefault();
    if(confirm("¿Estas seguro de jugar en media?") == true){
        sendDifficulty("Average");
    }else{
        alert("Puedes escoger otra opcion");   
        }
});
hardBTN.addEventListener("click",(event) =>{
    event.preventDefault();
    if(confirm("¿Estas seguro de jugar en dificil?") == true){
        sendDifficulty("Hard");
    }else{
        alert("Puedes escoger otra opcion");   
        }
});

async function sendDifficulty(difficulty){
    const url =  "http://127.0.0.1:3000/getQuestions/"+difficulty;
    console.log(url);
    const response =  await fetch(url, {
        method:"GET",
        mode:"cors",
        headers:{
            "Content-Type": "application/json"
        }
    }).then((response) =>{
        return response.json();
    }).then(data =>{
        showFirstQuestion(JSON.parse(data));
    }).catch((error) =>{
        console.log(error);
    });   
}

function showFirstQuestion(data){
    console.log(data);
    textQuestion.innerHTML = data[0].descripcion;
    let choices = data[0].choices.split(",");
    console.log(choices);
    respBTNS["resp1"].style.display = "inline";
    respBTNS["resp2"].style.display = "inline";
    respBTNS["resp3"].style.display = "inline";
    respBTNS["resp4"].style.display = "inline";
    respBTNS["resp1"].innerHTML = choices[0];
    respBTNS["resp2"].innerHTML = choices[1];
    respBTNS["resp3"].innerHTML = choices[2];
    respBTNS["resp4"].innerHTML = choices[3];
    disableButtons();
}

function disableButtons(){
    easyBTN.style.display = "none";
    mediumBTN.style.display = "none";
    hardBTN.style.display = "none";
}