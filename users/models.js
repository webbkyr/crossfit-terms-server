'use strict';

const mongoose = require('mongoose');
const bcrpyt = require('bcrpytjs');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  performance: [{
    word: { type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    response: { type: String, required: true},
    timesAnswered: { type: Number, required: true}
  }] 
});

//performance is a node with the word, answer

//may need another method to grab the user's performance from a previous
//session for the algorithm

UserSchema.methods.apiRepr = function(){
  return {
    id: this._id,
    username: this.username
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrpyt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrpyt.hashPassword(password, 10);
};
// UserSchema.methods.getPerformanceData() = function() {
//   return {
//     id: this._id,
//     performance: this.performance
//   }
// }

const User = mongoose.model('User', UserSchema);

module.exports = { User };