const tarefas = require("../models/tarefas"); 

const getAllTarefas = (request, response) => {
    tarefas.find(function (err, tarefas){
        if(err){
            response.status(500).send({ "message": err.message})
        }
        response.status(200).send(tarefas)
    })
};

const createTask = (request, response) => {
    let {descricao, nomeColaborador} = request.body
    let tarefa = {
        //id: Math.random().toString(32).substr(2),
        dataInclusao: new Date(),
        concluido: false,
        descricao,
        nomeColaborador
    }
    tarefas.findOne(function(err, tarefaFound){
        if(err){
            response.status(500).send({ "message": err.message})
        }
        else{
            if(tarefaFound){
                let newTarefa = new tarefas(tarefa) 
                newTarefa.save (function (err){
                    if(err){
                        response.status(500).send({"message": err.message})
                    }
                    else{
                        tarefaFound.tarefas.push(tarefas)
                        tarefas.updateOne({ $set: {tarefas: tarefaFound.tarefas }}, function (err){
                            if(err) {
                                response.status(500).send({"message": err.message})
                            }
                            response.status(201).send({
                                "message": "Tarefa criada com sucesso!",
                                ...tarefaFound.toJSON()
                            })
                        })
                    }
                })
            }
            else{
                response.status(404).send({ "message": "Não foi possivel inserir nova tarefa!"})
            }
        }
    })
 }

const replaceTask = (request, response) => { //substituir tarefa
    tarefas.findOne(function (err){
        if(err){
            response.status(500).send({"message": err.message})
        }
        else{
            if(tarefaFound){
                tarefas.updateOne({ $set: request.body}, function (err){
                    if(err){
                        response.status(500).send({"message": err.message})
                    }
                    else{
                        response.status(201).send({"message": "Tarefa substituida com sucesso."})
                    }
                })
            }else{
                response.status(404).send({"message": "Não foi possivel substituir tarefa."})
            }
        }
    })
}

const updateTitle = (request, response) => {
    // const idRequerido = request.params.id
    let newDescricao = request.body.descricao
    tarefas.findOne(function (err, tarefaFound) {
        if(err){
            response.status(500).send({"message": err.message})
        }
        else{
            if (tarefaFound){
                tarefas.updateOne({ $set: {descricao: newDescricao}}, function (err){
                    if(err){
                        response.status(500).send({"message": err.message})
                    }
                    else{
                        response.status(201).send({ "message": "Descriçao alterada com sucesso"})
                    }
                })
            }else{
                response.status(404).send({ "message": "Não foi possivel encontrar tarefa para atualizar descriçao"})
            }
        }
    }) 
}

const deleteTask = (request, response) => {
    // const idRequerido = request.params.id
    tarefas.findOne( function(err, tarefa){
        if(err){
            response.status(500).send({"message": err.message})
        }
        else{
            if(tarefa){
                tarefas.deleteOne(function (err){
                    if(err){
                        response.status(500).send({ "message": err.message,
                        "status": "FAIL"
                    })
                 }
                    else{
                        response.status(201).send({ "message": "Tarefa deletada com sucesso.",
                        "status": "SUCESS"
                    })
                  }
                })
            }else{
                response.status(404).send({ "message": "Nao foi possivel encontrar tarefa para ser deletada."})
            }
        }
    })
}

module.exports = {
    getAllTarefas,
    createTask,
    replaceTask,
    updateTitle,
    deleteTask
}