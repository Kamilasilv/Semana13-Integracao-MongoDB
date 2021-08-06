const mongoose = require("mongoose");

const tarefasSchema = new mongoose.Schema({
    id: {type: String},
    dataInclusao: {type:String},
    concluido: {type: Boolean},
    descricao: {type:String},
    nomeColaborador: {type:String}
}, {
    versionKey: false
})

const tarefas = mongoose.model('tarefas', tarefasSchema)

module.exports = tarefas