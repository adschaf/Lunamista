var express = require('express'); 
var app = express(); 
var credentials = require('./credentials.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var sessions = require('express-session');

// set up handlebars view engine 
var handlebars = require('express-handlebars').create({ defaultLayout:'main'}); 
app.engine('handlebars', handlebars.engine); 
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000); 

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(validator());
app.use(sessions({
	secret: 'fous',
	resave: false,
	saveUninitialized: true 
}));

app.get('/', function(req, res) { 
	res.render('home'); 
}); 

app.get('/login', function(req, res) { 
	res.render('login'); 
});

app.get('/new-user', function(req, res) {
        res.render('new-user');
}); 

app.get('/new-user2', function(req, res) {
        res.render('new-user2');
});

app.get('/new-user3', function(req, res) {
        res.render('new-user3');
});

app.get('/new-user4', function(req, res) {
        res.render('new-user4');
});

app.get('/welcome', function(req, res) {
       res.render('welcome');
});

app.post('/login', function(req, res) {
	session = req.session;
	if (req.body.username == 'admin' && req.body.password == 'admin') {
		session.uniqueID = req.body.username;
	}
	res.redirect('/welcome');
});

app.get('/welcome', function(req, res) {
        session = req.session;
	if (session.uniqueID) {
	 console.log(session);
		res.render('/welcome');
	} else {
		res.end('Back up B');
	}
});


// custom 404 page 
app.use(function(req, res, next) { 
	res.status(404); 
	res.render('404'); 
});

// custom 500 page 
app.use(function(err, req, res, next) { 
	console.error(err.stack); 
	res.status(500); 
	res.render('500'); 
});

app.listen(app.get('port'), function() { 
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' ); 
});


