var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  {
    type : String,
    required : [true, 'username is required! please fill it!']
  },
  password: {
    type : String,
    required : [true, 'password is required! please fill it!']
  }
});

var user = mongoose.model('User', userSchema);

module.exports = user