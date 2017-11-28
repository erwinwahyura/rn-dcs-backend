const db = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken')

module.exports = {
  _create: (req, res) => {
    db.users.create({
      nama: req.body.name,
      username: bcrypt.hashSync(req.body.password, salt),
      password: req.body.password,
    })
    .then((response) => {res.status(200).send(response)})
    .catch((err) => {res.status(400).send(err)})
  },
  _signin: (req, res) => {
    var username = req.body.username
    var checkPassword = req.body.password
    db.users
    .findOne({
        where: {
            username: username
        }
    })
    .then((response) => {
        bcrypt.compare(req.body.password, response.password, (err,resp) => {
            if (resp === true) {
                const token = jwt.sign({id: response.id, name: response.name}, process.env.secretKey)
                res.status(200).send({token})
            } else {
                res.status(500).send({msg: 'No Such User!'})
            }
        })
    })
    .catch((err) => {
        res.status(500).send({msg: 'no such user!'})
    })
  },
  _read: (req, res) => {
    db.users.findAll({})
    .then((response) => {res.status(200).send(response)})
    .catch((err) => {res.status(400).send(err)})
  },
  _update: (req, res) => {
    db.users.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((response) => {
      db.users.update({
        nama: req.body.nama === null ? response.nama : req.body.nama,
        username: req.body.username === null ? response.username : req.body.username,
        password: req.body.password === null ? response.password : req.body.password,
      }, {
        where: {
          id: response.id
        }
      })
      .then(() => {res.status(200).send({message: "updated success"})})
      .catch((err) => {res.status(400).send(err)})
    })
    .catch((err) => {res.status(400).send(err)})
  },
  _delete: (req, res) => {
    db.users.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((response) => {
      db.users.destroy({
        where: {
          id: response.id
        }
      })
      .then(() => {res.status(200).send({message: "deleted success"})})
      .catch((err) => {res.status(400).send(err)})
    })
    .catch((err) => {res.status(400).send(err)})
  }
}