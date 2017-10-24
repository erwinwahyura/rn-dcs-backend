const m_user = require('../models/m_user');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var jwt = require('jsonwebtoken');
require('dotenv').config()

var signIn = function(req, res, next) {
  console.log('masuk 1');
  var username = req.body.username;
  var password = req.body.password;

  m_user.findOne({ username: username }, function(err, user) {
    if(err) res.send(err);
    if(user) {
      bcrypt.compare(password, user.password)
      .then(result => {
        if(result) {
          var token = jwt.sign({id: user._id, username: user.username}, process.env.secret);
          res.send({token, id: user._id, name: user.username})
        } else {
          res.send({ msg: 'Incorrect password' });
        }
      })
      .catch(err => console.log(err))
    } else res.send({ msg: 'No such user' })
  })
}

var signUp = function(req, res, next) {
  console.log('masuk 2');
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new m_user({
    username: req.body.username,
    email: req.body.email,
    password: hash
  })
  newUser.save((err, user) => {
    if(err) {
      res.send(err.errors)
    } else res.send(user)
  })
}

module.exports = {
  signIn, signUp
};