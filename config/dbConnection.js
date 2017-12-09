/* imprtar o mogodb */
var mongo = require('mongodb');

/* Wrapper */
var conMongoDB = function(){
	var db = new mongo.Db(
		'taskmanager',
		new mongo.Server(
			'localhost', //string contendo o endereço do servidor
			27017, //porta de conexão
			{}
		),
		{}
	);

	return db;
}

/* Função exportada para executar no autoload */
module.exports = function () {
	return conMongoDB;
}