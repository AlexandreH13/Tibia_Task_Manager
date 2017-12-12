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

module.exports = function(){
	return CharactersDAO;
}