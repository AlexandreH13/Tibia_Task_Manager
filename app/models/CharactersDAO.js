/* CharactersDAO */

var ObjectID = require('mongodb').ObjectId;

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
					/* Variável de sessão para recuperar os characters */
					req.session.characters = result;
					res.render('characters', {validacao: {}, usuario: req.session.user, characters: result});
				}else{
					res.send('O usuário precisa fazer login');
				}
				mongoclient.close();
			});
		});
	});
}

CharactersDAO.prototype.deletarCharacter = function(_idCharacter, res){
	
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("character", function(err, collection){
			collection.remove(
				{_id: ObjectID(_idCharacter)},
				function(err, result){
					res.redirect("characters");
					mongoclient.close();
				}
			);
		});
	});
}

module.exports = function(){
	return CharactersDAO;
}