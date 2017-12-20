module.exports = function(application){
	application.get('/adicionarTask', function(req, res){
		application.app.controllers.taskController.tasks(application, req, res);
	})
}