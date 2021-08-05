const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express()

mongoose.connect("mongodb://localhost:27017/tarefas",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection

//captura de erro
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function() {
    console.log("Conexão feita com sucesso.")
})

const tarefas = require("./routes/toDoRoutes")

app.use(cors()) 
app.use(express.json()) 

app.use("/tarefas", tarefas)

module.exports = app