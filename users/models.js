'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
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
    answer: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    response: { type: String },
    isCorrect: { type: Boolean }
  }] 
});

//performance is an array with node objects containing info about the word/response/correct  

//may need a method to grab the user's performance from a previous
//session for the algorithm

UserSchema.methods.apiRepr = function(){
  return {
    id: this._id,
    username: this.username
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};
// UserSchema.methods.getPerformanceData() = function() {
//   return {
//     id: this._id,
//     performance: this.performance
//   }
// }

const User = mongoose.model('User', UserSchema);

module.exports = { User };