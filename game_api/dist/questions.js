"use strict";
class question {
    constructor() {
        this.description = "¿De que color es el cielo?";
        this.choices = ["Azul, Verde, Rojo, Amarillo"];
        this.answer = "Azul";
        this.categorie = "Curiosidades";
        this.difficulty = "Facil";
    }
    getQuestion() {
        //llamado a la DB para conseguir las preguntas  
    }
    updateQuestion() { }
    deleteQuestion() { }
}
module.exports = question;
