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
    const {descricao, nomeColaborador} = request.body
    console.log(descricao, nomeColaborador)
    let newTarefa = new tarefas ({
        id:Math.random().toString(32).substr(2),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    })
    newTarefa.save(function (err){
        if(err){
            response.status(500).send({ "message": err.message})
        }
        else{
            response.status(201).send({"message": "Nova tarefa criada com sucesso.",
            newTarefa
        })
        }
    })
}
const replaceTask = (request, response) => { //substituir tarefa 
    const idRequerido = request.params.id
    tarefas.findOne({id: idRequerido}, function (err, tarefaFound){
        if(err){
            response.status(500).send({"message": err.message})
        }
        else{
            if(tarefaFound){
                tarefas.updateOne({id: idRequerido}, { $set: request.body}, function (err){
                    if(err){
                        response.status(500).send({"message": err.message})
                    }
                    else{
                        response.status(200).send({"message": "Tarefa substituida com sucesso."})
                    }
                })
            }else{
                response.status(404).send({"message": "Não foi possivel substituir tarefa."})
            }
        }
    })
}

const updateTitle = (request, response) => {
     const idRequerido = request.params.id
    let newDescricao = request.body.descricao
    tarefas.findOne({id:idRequerido}, function (err, tarefaFound) {
        if(err){
            response.status(500).send({"message": err.message})
        }
        else{
            if (tarefaFound){
                tarefas.updateOne({id: idRequerido}, { $set: {descricao: newDescricao}}, function (err){
                    if(err){
                        response.status(500).send({"message": err.message})
                    }
                    else{
                        response.status(200).send({ "message": "Descriçao alterada com sucesso"})
                    }
                })
            }else{
                response.status(404).send({ "message": "Não foi possivel encontrar tarefa para atualizar descriçao"})
            }
        }
    }) 
}

const deleteTask = (request, response) => {
     const idRequerido = request.params.id
     tarefas.findOne({id: idRequerido}, function (err, tarefas){
         if(err){
             response.status(500).send({ "message": err.message})
         }
         else{
             if(tarefas){
                tarefas.deleteOne({id: idRequerido}, function (err){
                    if(err){
                        response.status(500).send({ "message": err.message,
                        "status": "FAIL"
                    })
                    } else{
                        response.status(200).send({ "message": "Tarefa deletada com sucesso."})
                    }
                })
             }else{
                response.status(404).send({ "message": "Não existe tarefa para ser removido com esse id" })
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