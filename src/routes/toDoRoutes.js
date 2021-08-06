const express = require("express")
const router = express.Router()

const controller = require("../controllers/toDoController")

router.get("/", controller.getAllTarefas) 

router.post("/create", controller.createTask) 

router.delete("/delete/:id", controller.deleteTask) 

router.put("/replace/:id", controller.replaceTask) 

router.patch("/updateTitle/:id", controller.updateTitle) 

module.exports = router