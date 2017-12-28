const db = require('../models')

module.exports = {
    _create: (req, res) => {
        db.penilaian.create({
            id_absen: req.body.id_absen,
            kehadiran: req.body.kehadiran,
            kerapihan: req.body.kerapihan,
            sikap: req.body.sikap,
        })
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {retag: req.body.tags.status(400).send(err)})
    },
    _readAll: (req, res) => {
        // SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
        // FROM ((Orders
        // INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
        // INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);
        db.penilaian.sequelize.query(`
            SELECT
                penilaians.id, 
                penilaians.kehadiran, 
                penilaians.kerapihan, 
                penilaians.sikap,
                penilaians.tag as tag_penilaian,
                absens.id as absen_id, 
                absens.tgl,
                karyawans.id as karyawan_id,
                karyawans.nama
            FROM ((penilaians
            LEFT JOIN absens ON penilaians.id_absen = absens.id)
            LEFT JOIN karyawans ON absens.id_karyawan = karyawans.id)
        `        
        ,{ type: db.penilaian.sequelize.QueryTypes.SELECT })
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _readOne: (req, res) => {
        db.penilaian.sequelize.query(`
                SELECT
                penilaians.id, 
                penilaians.kehadiran, 
                penilaians.kerapihan, 
                penilaians.sikap,
                penilaians.tag as tag_penilaian,
                absens.id as absen_id, 
                absens.tgl,
                karyawans.id as karyawan_id,
                karyawans.nama
            FROM ((penilaians
            LEFT JOIN absens ON penilaians.id_absen = absens.id)
            LEFT JOIN karyawans ON absens.id_karyawan = karyawans.id)
            WHERE karyawans.id = ${req.params.id}
        ` ,{ type: db.penilaian.sequelize.QueryTypes.SELECT })
        .then((response) => {res.status(200).send(response)})
        .catch((err) => {res.status(400).send(err)})
    },
    _update: (req, res) => {
        db.penilaian.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((response) => {
            db.penilaian.update({
                id_absen: req.body.id_absen === null ? response.id_absen : req.body.id_absen,
                kehadiran: req.body.kehadiran === null ? response.kehadiran : req.body.kehadiran,
                kerapihan: req.body.kerapihan === null ? response.kerapihan : req.body.kerapihan,
                sikap: req.body.sikap === null ? response.sikap : req.body.sikap,
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
        db.penilaian.findOne({
            where: {
              id: req.params.id
            }
        })
        .then((response) => {
            db.penilaian.destroy({
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
