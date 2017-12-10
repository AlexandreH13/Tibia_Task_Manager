module.exports.characters = function(application, req, res){
	
	/* Se tiver passado pelo fluxo de autenticação */
	if(req.session.autorizado){
		res.render('characters');
	}else{
		res.send('O usuário precisa fazer login');
	}
}