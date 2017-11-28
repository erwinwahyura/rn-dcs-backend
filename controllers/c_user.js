const db = require('../models')

module.exports = {
  _create: (req, res) => {
    db.users.create({
      nama: req.body.name,
      username: req.body.username,
      password: req.body.password,
    })
    .then((response) => {res.status(200).send(response)})
    .catch((err) => {res.status(400).send(err)})
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