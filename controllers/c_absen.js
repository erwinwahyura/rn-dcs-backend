const db = require('../models')

module.exports = {
    _create: (req, res) => {
        db.absens.create({
            tgl: new Date(),
            kehadiran: req.body.kehadiran,
            kerapian: req.body.kerapian,
            sikap: req.body.sikap,
            keterangan: req.body.keterangan,
        })
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _read: (req, res) => {
        db.absens.findAll({})
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _update: (req, res) => {
        db.absens.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((response) => {
            db.absens.update({
                kehadiran: req.body.kehadiran === null ? response.kehadiran : req.body.kehadiran,
                kerapian: req.body.kerapian === null ? response.kerapian : req.body.kerapian,
                sikap: req.body.sikap === null ? response.sikap : req.body.sikap,
                keterangan: req.body.keterangan === null ? response.keterangan : req.body.keterangan,
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
        db.absens.findOne({
            where: {
              id: req.params.id
            }
        })
        .then((response) => {
            db.absens.destroy({
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