
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/'));

mongoose.connect('mongodb://localhost/playerdatabase');

var player = require('./db/schema.js');

app.get('/getplayers', function(req,res){//Devuelve todos los datos
	player.find(function(err,player){
		if(!err){
			return res.status(200).json(player);
		}
	});
});

app.post('/addplayer',function(req,res){//Agrega un jugador
	player.create(req.body,function(err,p){
		if(!err){
			return res.status(200).send();
		}
	});
});

app.put('/updateplayer',function(req,res){
	player.findOneAndUpdate({nick: req.body.nick},{nick: req.body.nick, weapon: req.body.weapon, frags: req.body.frags},function(err,player){
		if(!err){
			return res.status(200).send();
		}
	});
});

app.post('/deleteplayer',function(req,res){
	player.findOneAndRemove({nick: req.body.nick, weapon: req.body.weapon},function(err){
		if(!err){
			return res.status(200).send();
		}
	});
});


app.listen('3000',function(){
	console.log('localhost:3000');
});