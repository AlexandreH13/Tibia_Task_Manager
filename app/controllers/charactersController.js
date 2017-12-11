module.exports.characters = function(application, req, res){
	
	/* Se tiver passado pelo fluxo de autenticação */
	if(req.session.autorizado){
		res.render('characters', {user: req.session.user});
	}else{
		res.send('O usuário precisa fazer login');
	}
}

module.exports.sair = function(application, req, res){
	
	req.session.destroy( function(err){
		res.render("index", {validacao: {}});
	});
}