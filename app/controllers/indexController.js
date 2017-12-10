/*Propriedade home para renderizar a página home. Application é a intancia recebida de app*/
module.exports.home = function(application, req, res){
	res.render("index", {validacao: {}});
}

module.exports.autenticar = function(application, req, res){

	var dados = req.body;

	req.assert('usuario', 'O campo de usuário não deve ser vazio').notEmpty();
	req.assert('senha', 'O campo de senha não deve ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('index', {validacao: erros});
		return;
	}

	var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dados, req, res);

}