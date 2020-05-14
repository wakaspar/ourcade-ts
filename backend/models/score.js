'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  name: String,
  description: String,
  username: String,
  user:
  {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Score', ScoreSchema);
