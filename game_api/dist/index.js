"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const question = require("../dist/Questions.js");
const sqlite3 = require("sqlite3");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("<h1> Let's start </h1>");
    let test = new question();
    console.log(test);
    test = {
        description: "¿Que dia es?",
        choices: ["Lunes", "Martes"],
        answer: "Martes"
    };
    console.log(test);
    createQuestion(test);
});
function createQuestion(question) {
    let db = new sqlite3.Database("softka.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        db.run(`INSERT INTO preguntas (descripcion,choices,answer) VALUES(?,?,?)`, [question["description"], question["choices"], question["answer"]], function (err) {
            if (err) {
                return console.log(err.message);
            }
        });
        // close the database connection
        db.close();
    });
}
function getQuestions() {
    let db = new sqlite3.Database("softka.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    let sql = "SELECT * FROM preguntas";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
        }
        console.log(JSON.stringify(rows[0]));
    });
}
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
