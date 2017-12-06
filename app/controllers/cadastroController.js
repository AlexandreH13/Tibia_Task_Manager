module.exports.cadastro = function(application, req, res){

	res.render("cadastro", {validacao: {}});
}

module.exports.cadastrar = function(application, req, res){

	var dados = req.body;

	req.assert('usuario', 'O campo usuario não pode ser vazio').notEmpty();
	req.assert('senha', 'O campo senha não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros});
		return;
	}


}