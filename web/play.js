const easyBTN = document.querySelector("#easy");
const mediumBTN = document.querySelector("#medium");
const hardBTN = document.querySelector("#hard");

easyBTN.addEventListener("click",(event) =>{
    event.preventDefault();
    if(confirm("¿Estas seguro de jugar en facil?") == true){

    }else{
    alert("Puedes escoger otra opcion");   
    }
});
mediumBTN.addEventListener("click",(event) =>{
    event.preventDefault();
    if(confirm("¿Estas seguro de jugar en media?") == true){
        
    }else{
        alert("Puedes escoger otra opcion");   
        }
});
hardBTN.addEventListener("click",(event) =>{
    event.preventDefault();
    if(confirm("¿Estas seguro de jugar en dificil?") == true){
        
    }else{
        alert("Puedes escoger otra opcion");   
        }
});