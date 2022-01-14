import express, { Express, Request, response, Response } from "express";
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

app.get("/getQuestions/:difficulty", (req: Request, res: Response) => { 
  
  const difficulty = JSON.parse(JSON.stringify(req.params.difficulty));
  let db = new sqlite3.Database("softka.db", sqlite3.OPEN_READWRITE, (err: any) => {
    if (err) {
      return console.error(err.message);
    }

  });
  let sql = `SELECT descripcion,choices,answer, categorie, difficulty FROM preguntas WHERE difficulty = ?`;
    
   
  db.all(sql, difficulty, (err: any, rows: any) => {
    if (err) {
      console.error(err);
    }
    res.status(200).json(JSON.stringify(rows));
  });
});

app.post("/create", (req: Request, res: Response) => {
  let formQuestion:any = JSON.parse(JSON.stringify(req.body));
  let newQuestion = new question();
  newQuestion.description = formQuestion.description;
  newQuestion.choices = [formQuestion.resp1,formQuestion.resp2,formQuestion.resp3,formQuestion.resp4];
  newQuestion.answer = formQuestion.answer;
  newQuestion.categorie = formQuestion.categorie;
  newQuestion.difficulty = formQuestion.difficulty;
  const success:boolean = createQuestion(newQuestion);
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

// function getQuestions(difficulty: string): Object {
//   let db = new sqlite3.Database("softka.db", sqlite3.OPEN_READWRITE, (err: any) => {
//     if (err) {
//       return console.error(err.message);
//     }

//   });
//   let sql = `SELECT descripcion,choices,answer, categorie, difficulty FROM preguntas WHERE difficulty = ?`;
    
//   let result:Object = db.all(sql, difficulty, (err: any, rows: any) => {
//     if (err) {
//       console.error(err);
//     }
//     res.status(200).json(rows);;
//   });
//   console.log(result);
//   return result;
// }

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));