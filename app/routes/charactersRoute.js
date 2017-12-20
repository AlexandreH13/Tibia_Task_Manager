module.exports = function (application) {
	application.get('/characters', function(req, res){
		application.app.controllers.charactersController.characters(application, req, res);
	})

	application.get('/sair', function(req, res){
		application.app.controllers.charactersController.sair(application, req, res);
	})

	application.post('/adicionarCharacter', function(req, res){
		application.app.controllers.charactersController.adicionarCharacter(application, req, res);
	})

	application.get('/deletarCharacter', function(req, res){
		application.app.controllers.charactersController.deletarCharacter(application, req, res);
	})
}