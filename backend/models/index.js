var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/ourcade-ts");
module.exports.Score = require('./score');
module.exports.User = require('./user');
