#### **On12- Back-end {reprograma} :purple_heart: Semana 13** 🚀

### Integração Back-end , banco de dados e MongoDB

### Banco de dados na API
#### Criação do database: :pushpin:
	use tarefas
#### Criação da collection: :white_check_mark:
	db.createCollection('tarefas')
#### Inserçao do documento na collection:
	db.tarefas.insert([
	 {
		"dataInclusao":  "2021-06-192T20:42:00Z",
		"concluido":  false,
		"descricao":  "Aprender como usar datas no javascript",
		"nomeColaborador":  "Manoela"
		}
	  ])
	
### Demandas de negócio: :computer:
- Utilizar API que tenha um CRUD completo  e retornar as informações do banco de dados, através do Postman. 

### Rotas:  :repeat:
- **{GET} "/"**
	 - Visualizar todas as tarefas;
- **{POST} "/create"** 
	- Criar nova tarefa;
-  **{DELETE} "/delete/:id"** 
	 - Deletar tarefa através do id;
- **{PUT}"/replace/:id"**
	 - Substituir tarefa através do id;
- **{PATCH} "/updateTitle/:id"**
	 - Atualizar descriçao da tarefa através do id. 