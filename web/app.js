const submitBTN = document.querySelector("#submit");
const img = document.querySelector("#confimg");


submitBTN.addEventListener("click",(event) =>{
    event.preventDefault();
    let formSelector = {
        categorie: document.querySelector("#Categoria").value,
        description: document.querySelector("#Descripcion").value,
        resp1: document.querySelector("#resp1").value,
        resp2: document.querySelector("#resp2").value,
        resp3: document.querySelector("#resp3").value,
        resp4: document.querySelector("#resp4").value,
        answer: document.querySelector("#respCorrecta").value,
        difficulty: document.querySelector("#difficulty").value
    }
    if(validar(formSelector)){
        sendData("http://127.0.0.1:3000/create",formSelector);
    }else{
        alert("Por favor completa la data");
    }

    
})

async function sendData(url,data){
    const response =  await fetch(url,{
        method:"POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(() =>{
        alert("Pregunta Creada Correctamente");
    }).catch((error) =>{
        alert(error);
    });
     alert(response.json());
}

function validar(formSelector){
    if(formSelector.answer != "" && formSelector.categorie != "" && formSelector.resp1 != "" && formSelector.resp2 != "" && formSelector.resp3 != "" && formSelector.resp4 != "" && formSelector.answer != "" && formSelector.description != "" && formSelector.difficulty != ""){
        return true;
    }else{
        return false;
    }
}

