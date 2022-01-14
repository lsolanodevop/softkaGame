import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import fs from "fs";

const question = require("../dist/Questions.js");
const sqlite3 = require("sqlite3");
dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => { 
  res.send("<h1> Let's start </h1>");
  let test = new question();
  console.log(test);
  test = {
    description: "¿Que dia es?",
    choices: ["Lunes", "Martes"],
    answer: "Martes"
  }
  console.log(test);
  createQuestion(test);

});

function createQuestion(question:any){
  let db = new sqlite3.Database("softka.db",sqlite3.OPEN_READWRITE, (err:any) => {
    if (err) {
      return console.error(err.message);
    }
    
    db.run(`INSERT INTO preguntas (descripcion,choices,answer) VALUES(?,?,?)`, [question["description"],question["choices"],question["answer"]], function(err:any) {
      if (err) {
        return console.log(err.message);
      }
    });
  
    // close the database connection
    db.close();

  });
}

function getQuestions() {
  let db = new sqlite3.Database("softka.db",sqlite3.OPEN_READWRITE, (err:any) => {
    if (err) {
      return console.error(err.message);
    }
    
  });
  let sql = "SELECT * FROM preguntas";
    
    db.all(sql, [], (err:any, rows:any) => {
      if (err) {
        console.error(err);
      }
      console.log(JSON.stringify(rows[0]));
    })
}

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));