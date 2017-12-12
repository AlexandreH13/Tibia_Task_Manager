module.exports.characters = function(application, req, res){
	
	/* Se tiver passado pelo fluxo de autenticação */
	if(req.session.autorizado){
		res.render('characters', {validacao: {}});
	}else{
		res.send('O usuário precisa fazer login');
	}
}

module.exports.adicionarCharacter = function(application, req, res){

	var dados = req.body;
	var user = req.session.user;

	req.assert('nome', 'O campo "Nome" não pode ser vazio').notEmpty();
	req.assert('vocacao', 'O campo "Vocação" não pode ser vazio').notEmpty();
	req.assert('mundo', 'O campo "Mundo" não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('characters', {validacao: erros});
		return;
	}

	var connection = application.config.dbConnection;
	var CharactersDAO = new application.app.models.CharactersDAO(connection);
	CharactersDAO.adicionarCharacter(dados, user);

	res.send(dados.nome);
}

module.exports.sair = function(application, req, res){
	
	req.session.destroy( function(err){
		res.render("index", {validacao: {}});
	});
}

module.exports.addCharacter = function(application, req, res){
	
	if(req.session.autorizado !== true){
		res.send('O usuário precisa fazer o login');
		return;		
	}

	req.session.destroy( function(err){
		res.render("addCharacter", {validacao: {}});
	});
}