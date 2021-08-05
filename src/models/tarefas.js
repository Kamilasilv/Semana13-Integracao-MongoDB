const mongoose = require("mongoose");

const tarefasSchema = new mongoose.Schema({
    dataInclusao: {type:String},
    concluido: {type: Boolean},
    descriçao: {type:String},
    nomeColaborador: {type:String}
}, {
    versionKey: false
})

const tarefas = mongoose.model('tarefas', tarefasSchema)

module.exports = tarefas
