module.exports = function (application) {
	application.get('/characters', function(req, res){
		application.app.controllers.charactersController.characters(application, req, res);
	})
}