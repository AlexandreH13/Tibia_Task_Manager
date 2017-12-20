module.exports.tasks = function(application, req, res){
	if(req.session.autorizado){
		res.render('adicionarTask', {usuario: req.session.user});
	}else{
		res.send('Usuário precisa estar logado');
	}
}