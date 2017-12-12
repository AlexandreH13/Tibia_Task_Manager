/* UsuáriosDAO */
function UsuariosDAO(connection){

	this._connection = connection();
}

/* Criar a collection 'usuarios' e inserir os documentos*/
UsuariosDAO.prototype.inserirUsuario = function(usuario){

	/* Abrir conexão com mongo */
	this._connection.open( function(err, mongoclient){
		//através do mongoclient é que manipulamos as collection e documentosS
		mongoclient.collection("usuarios", function(err, collection){
			collection.insert(usuario);
			mongoclient.close();
		});
	});
}

/* Autenticar através das variáveis de seção */
UsuariosDAO.prototype.autenticar = function(usuario, req, res){

	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){

			/*Query para verificar e autenticar as informações*/
			collection.find(usuario).toArray(function(err, result){

				/* Cria as variávies de seção */
				if(result[0] != undefined){
					req.session.autorizado = true;
					req.session.user = result[0].usuario;
					//req.session.character = result[0].character;
				}

				if(req.session.autorizado){
					res.redirect("characters");
				}else{
					res.render("index", {validacao: {}});
				}

			});
			mongoclient.close();
		});
	});
}

//O consign espera um exports
module.exports = function(){
	return UsuariosDAO;
}