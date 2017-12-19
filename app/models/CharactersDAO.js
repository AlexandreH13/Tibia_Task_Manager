/* CharactersDAO */
function CharactersDAO(connection){

	this._connection = connection();
}

CharactersDAO.prototype.adicionarCharacter = function(character, user){

	this._connection.open( function(err, mongoclient){
		mongoclient.collection("character", function(err, collection){
			collection.insert({
				usuario: user,
				nome: character.nome,
				vocacao: character.vocacao,
				mundo: character.mundo
			});
			mongoclient.close();
		});
	});
}

CharactersDAO.prototype.buscarCharacters = function(user, req, res){

	/* Procura por todos os character do user passado */
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("character", function(err, collection){
			collection.find({usuario: {$eq: user}}).toArray(function(err, result){
				/* Se tiver passado pelo fluxo de autenticação */
				if(req.session.autorizado){
					res.render('characters', {validacao: {}, usuario: req.session.user, characters: result});
				}else{
					res.send('O usuário precisa fazer login');
				}
			});
		});
	});
}

module.exports = function(){
	return CharactersDAO;
}