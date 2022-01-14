import { error } from "console";

const fs = require("fs");

class question {
  id?: number;
  description: string;
  choices?: string[];
  answer?: string;

  constructor() {
    this.description = "¿De que color es el cielo?";
    this.choices = ["Azul, Verde, Rojo, Amarillo"];
    this.answer = "Azul";
  }

  getQuestion() {
    //llamado a la DB para conseguir las preguntas  
  }
  
  updateQuestion() { }

  deleteQuestion() { }
}

module.exports = question;