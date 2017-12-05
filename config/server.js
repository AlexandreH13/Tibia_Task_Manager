var express = require('express');

var consign = require('consign')

var bodyParser = require('body-parser');

var expressValidator = require('express-validator');

var expressSession = require('express-session');

/* Inicia o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* Configura o moddleware body-parser*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Configura o moddleware express-validator*/
app.use(expressValidator());

/* Configura o moddleware express-session*/
app.use(expressSession({
	secret: 'cookie_secret',
	resave: false,
	saveUninitialized: false
}))

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app. A partir de app.js*/
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* Exporta o objeto app(Instancia do servidor)*/
module.exports = app;