const db = require('../models')

module.exports = {
    _create: (req, res) => {
        db.penilaians.create({
            id_absen: req.body.id_absen,
            id_karyawan: req.body.id_karyawan,
            nilai: req.body.nilai,
        })
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _readAll: (req, res) => {
        // SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
        // FROM ((Orders
        // INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
        // INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);
        db.penilaians.sequelize.query(`
            SELECT 
                   karyawans.nip,
                   karyawans.nama,
                   karyawans.jabatan,
                   karyawans.pangkat,
                   karyawans.gol,
                   penilaians.nilai,
                   penilaians.id_absen,
                   penilaians.id_karyawan,
                   absens.tgl,
                   absens.kehadiran,
                   absens.kerapian,
                   absens.sikap,
                   absens.keterangan
            FROM (( penilaians
            LEFT JOIN karyawans ON penilaians.id_karyawan = karyawans.id)
            LEFT JOIN absens ON penilaians.id_absen = absens.id)
        `)
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _readOne: (req, res) => {
        db.penilaians.sequelize.query(`
            SELECT 
                   karyawans.nip,
                   karyawans.nama,
                   karyawans.jabatan,
                   karyawans.pangkat,
                   karyawans.gol,
                   penilaians.nilai,
                   penilaians.id_absen,
                   penilaians.id_karyawan,
                   absens.tgl,
                   absens.kehadiran,
                   absens.kerapian,
                   absens.sikap,
                   absens.keterangan
            FROM (( penilaians
            LEFT JOIN karyawans ON penilaians.id_karyawan = karyawans.id)
            LEFT JOIN absens ON penilaians.id_absen = absens.id)
            WHERE penilaians.id_karyawan = ${req.params.id_karyawan}
        `)
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _update: (req, res) => {
        db.penilaians.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((response) => {
            db.penilaians.update({
                id_absen: req.body.id_absen === null ? response.id_absen : req.body.id_absen,
                id_karyawan: req.body.id_karyawan === null ? response.id_karyawan : req.body.id_karyawan,
                nilai: req.body.nilai === null ? response.nilai : req.body.nilai,
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
        db.penilaians.findOne({
            where: {
              id: req.params.id
            }
        })
        .then((response) => {
            db.penilaians.destroy({
              where: {
                id: response.id
              }
            })
            .then(() => {res.status(200).send({message: "deleted success"})})
            .catch((err) => {res.status(400).send(err)})
        })
        .catch((err) => {res.status(400).send(err)})
    },
}