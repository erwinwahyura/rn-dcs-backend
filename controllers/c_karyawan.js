const m_karyawan = require('../models/m_karyawan')


var create = (req, res) => {
    var newKaryawan = new m_karyawan({
        nip: req.body.nip,
        nama: req.body.nama,
        alamat: req.body.alamat,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin,
        agama: req.body.agama
    }) 
    newKaryawan.save((err, result) => {
        err ? res.status(500).send(err) : res.status(200).send(result)
    })
}

var getAllKaryawan = (req, res) => {
    m_karyawan.find({}, (err, result) => {
        err ? res.status(500).send(err) : res.status(200).send(result)
    })
}

var deleteKaryawan = (req, res) => {
    m_karyawan.deleteOne({id: req.params.id}, (err, result) => {
        err ? res.status(500).send(err) :res.status(200).send(result)
    })
}

var getKaryawanById = (req, res) => {
    var id = req.params.id
    m_karyawan.findById({id:id}, (err, result) => {
      err ? res.status(500).send(err) :res.status(200).send(result)
    })
}


var updateKaryawan = (req, res) => {
    let id = req.params.id
    m_karyawan.findById({id:id}, (err, result) => {
        m_karyawan.findOneAndUpdate({id:id}, {$set : {name: req.body.username }})
    })
}

module.exports = {
    create,
    getAllKaryawan,
    deleteKaryawan,
    getKaryawanById
}