module.exports.cadastro = function(application, req, res){

	res.render('cadastro', {validacao: {}, dados: {}});
}

module.exports.cadastrar = function(application, req, res){

	var dados = req.body;

	req.assert('usuario', 'O campo usuario não pode ser vazio').notEmpty();
	req.assert('senha', 'O campo senha não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros, dados: dados});
		return;
	}

	var connection = application.config.dbConnection;
	console.log(connection);
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.inserirUsuario(dados);

	res.render('index');
}