const db = require('../models')

module.exports = {
    _create: (req, res) => {
        db.karyawan.create({
            nip: req.body.nip,
            nama: req.body.nama,
            jabatan: req.body.jabatan,
            pangkat: req.body.pangkat,
            gol: req.body.gol,
        })
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _read: (req, res) => {
        db.karyawan.findAll({})
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _update: (req, res) => {
        db.karyawan.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((response) => {
            db.karyawan.update({
                nip: req.body.nip === null ? response.nip : req.body.nip,
                nama: req.body.nama === null ? response.nama : req.body.nama,
                jabatan: req.body.jabatan === null ? response.jabatan : req.body.jabatan,
                pangkat: req.body.pangkat === null ? response.pangkat : req.body.pangkat,
                gol: req.body.gol === null ? response.gol : req.body.gol,
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
        db.karyawan.findOne({
            where: {
              id: req.params.id
            }
        })
        .then((response) => {
            db.karyawan.destroy({
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
