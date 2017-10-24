var mongoose = require('mongoose')
const m_user = require('../models/m_user.js')
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

var add_user = function(req, res, next) {
  console.log('----1');
  console.log('ihni : ',req.body);

  var hash = bcrypt.hashSync(req.body.password, salt);
  // var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
  var newUser = new m_user({
    username: req.body.username,
    password: hash
  })
  newUser.save(function(err, result) {
    err ? res.status(500).send(err) :res.status(200).send(result)
  })
}

var getAllUser = function(req, res, next) {
  m_user.find({}, function(err, result) {
    err ? res.status(500).send(err) :res.status(200).send(result)
  })
}
//method deleteOne can also use remove, deleteOne with promise .then / callback and deleteMany
var delete_user = function(req, res, next) {
  m_user.deleteOne({_id:req.params._id}, function(err, result) {
    err ? res.status(500).send(err) :res.status(200).send(result)
  })
}

var getUserById = function(req, res ) {
  var id = req.params._id
  m_user.findById({_id:id}, function(err, result) {
    err ? res.status(500).send(err) :res.status(200).send(result)
  })
}

//trying using findOneandDelete
//docs : http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

var update_user = function(req, res, next) {
  let id = req.params._id
  m_user.findById({_id:id}, function(err, result) {
    var hash = bcrypt.hashSync(req.body.password, salt);
    m_user.findOneAndUpdate({_id:id}, {$set : {username: req.body.username || result.username, password: hash || result.password}}, function(err, result) {
      err ? res.status(500).send(err) :res.status(200).send(result)
    })
  })
}

module.exports = {
  add_user,
  getAllUser,
  delete_user,
  update_user,
  getUserById
}