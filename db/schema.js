
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({

	nick: {type: String, unique: true},
	weapon: String,
	frags: Number
});

var User = mongoose.model('Player',playerSchema);

module.exports = User;