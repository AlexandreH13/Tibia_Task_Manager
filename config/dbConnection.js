/* Importar mongodb */
var mongo = require('mongodb');

/* Wrapper */
var connMongo = function(){

	var db = new mongo.Db(
		'tibiatask',
		new mongo.Server(
			'localhost', //string contendo o endereço do servidor
			27017, //Porta
			{}
		),

		{}
	);

	return db;
}

/* Função exportada para executar no autoload */
module.exports = function(){
	return connMongo;
}