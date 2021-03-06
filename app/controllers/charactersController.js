module.exports.characters = function(application, req, res){
	
	var user = req.session.user;
	var connection = application.config.dbConnection;
	var CharactersDAO = new application.app.models.CharactersDAO(connection);
	CharactersDAO.buscarCharacters(user, req, res);
}

module.exports.adicionarCharacter = function(application, req, res){

	var dadosCharacter = req.body;

	req.assert('nome', 'O campo "Nome" não pode ser vazio').notEmpty();
	req.assert('vocacao', 'O campo "Vocação" não pode ser vazio').notEmpty();
	req.assert('mundo', 'O campo "Mundo" não pode ser vazio').notEmpty();

	var erros = req.validationErrors();
	var user = req.session.user;
	if(erros){
		res.render('characters', {validacao: erros, usuario: req.session.user, characters: req.session.characters});
		return;
	}

	var connection = application.config.dbConnection;
	var CharactersDAO = new application.app.models.CharactersDAO(connection);
	CharactersDAO.adicionarCharacter(dadosCharacter, user);

	res.redirect('characters');
}

module.exports.deletarCharacter = function(application, req, res){
	
	var url_query = req.query;

	var connection = application.config.dbConnection;
	var CharactersDAO = new application.app.models.CharactersDAO(connection);

	var _idCharacter = url_query.id_character;
	CharactersDAO.deletarCharacter(_idCharacter, res);
}

module.exports.sair = function(application, req, res){
	
	req.session.destroy( function(err){
		res.render("index", {validacao: {}});
	});
}

