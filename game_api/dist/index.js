"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const question = require("../dist/Questions.js");
const sqlite3 = require("sqlite3");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*"
}));
app.get("/", (req, res) => {
    res.send("<h1> Let's start </h1>");
});
app.get("/getQuestions/:difficulty", (req, res) => {
    const difficulty = JSON.parse(JSON.stringify(req.params.difficulty));
    let db = new sqlite3.Database("softka.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    let sql = `SELECT descripcion,choices,answer, categorie, difficulty FROM preguntas WHERE difficulty = ?`;
    db.all(sql, difficulty, (err, rows) => {
        if (err) {
            console.error(err);
        }
        res.status(200).json(JSON.stringify(rows));
    });
});
app.post("/create", (req, res) => {
    let formQuestion = JSON.parse(JSON.stringify(req.body));
    let newQuestion = new question();
    newQuestion.description = formQuestion.description;
    newQuestion.choices = [formQuestion.resp1, formQuestion.resp2, formQuestion.resp3, formQuestion.resp4];
    newQuestion.answer = formQuestion.answer;
    newQuestion.categorie = formQuestion.categorie;
    newQuestion.difficulty = formQuestion.difficulty;
    const success = createQuestion(newQuestion);
    if (success) {
        res.send({ message: "Success" });
    }
    else {
        res.send({ message: "there was an error" });
    }
});
function createQuestion(question) {
    let status = false;
    let db = new sqlite3.Database("softka.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        db.run(`INSERT INTO preguntas (descripcion,choices,answer,categorie,difficulty) VALUES(?,?,?,?,?)`, [question["description"], question["choices"], question["answer"], question["categorie"], question["difficulty"]], function (err) {
            if (err) {
                return console.log(err.message);
            }
            else {
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
