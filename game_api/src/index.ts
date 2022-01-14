import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import { format } from "path";
const question = require("../dist/Questions.js");
const sqlite3 = require("sqlite3");
dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "*"
}));

app.get("/", (req: Request, res: Response) => { 
  res.send("<h1> Let's start </h1>");
});

app.post("/create", (req: Request, res: Response) => {
  let formQuestion:any = JSON.parse(JSON.stringify(req.body));
  let newQuestion = new question();
  newQuestion.description = formQuestion.description;
  newQuestion.choices = [formQuestion.resp1,formQuestion.resp2,formQuestion.resp3,formQuestion.resp4];
  newQuestion.answer = formQuestion.answer;
  newQuestion.categorie = formQuestion.categorie;
  newQuestion.difficulty = formQuestion.difficulty;
  const success:boolean= createQuestion(newQuestion);
  if (success) {
    res.send({message: "Success"});
  } else {
    res.send({message: "there was an error" });
  }
});

function createQuestion(question: any):boolean {
  let status = false;
  let db = new sqlite3.Database("softka.db",sqlite3.OPEN_READWRITE, (err:any) => {
    if (err) {
      return console.error(err.message);
    }
    
    db.run(`INSERT INTO preguntas (descripcion,choices,answer,categorie,difficulty) VALUES(?,?,?,?,?)`, [question["description"],question["choices"],question["answer"],question["categorie"],question["difficulty"]], function(err:any) {
      if (err) {
        return console.log(err.message);
      } else {
        status = true;
      }
    });
    db.close();
    
  });
  return status;
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