const db = require('../models')

module.exports = {
    _create: (req, res) => {
        db.absen.create({
            tgl: Date(),
            id_karyawan: req.body.id_karyawan
        })
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _read: (req, res) => {
        db.absen.findAll({})
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _update: (req, res) => {
        db.absen.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((response) => {
            db.absen.update({
                id_karyawan: req.body.id_karyawan === null ? response.id_karyawan : req.body.id_karyawan,
                updatedAt: new Date()
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
        db.absen.findOne({
            where: {
              id: req.params.id
            }
        })
        .then((response) => {
            db.absen.destroy({
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
