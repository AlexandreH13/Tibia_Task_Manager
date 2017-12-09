/* DAO usuários */
function UsuariosDAO(connection){

	this._connection = connection();
}

/* Criar a collection 'usuarios' e inserir os documentos*/
UsuariosDAO.prototype.inserirUsuario = function(usuario){

	/* Abrir conexão com mongo */
	this._connection.open( function(err, mongoclient){
		//através do mongoclient é que manipulamos as collection e documentos
		mongoclient.collection("usuarios", function(err, collection){
			collection.insert(usuario);

			mongoclient.close();
		});
	});
}

//O consign espera um exports
module.exports = function(){
	return UsuariosDAO;
}