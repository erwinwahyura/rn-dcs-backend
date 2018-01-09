const db = require('../models');


module.exports = {
    _allGetNilai: (req, res) => {
        db.nilai.sequelize.query(`
        select nilais.id, nilais.id_absen as "id_absen", nilais.nilai, nilais.tag, nilais.keterangan,
        karyawans.id as "id_karyawan", karyawans.nip, karyawans.nama,
        absens.id as "id_absen"
        from absens
        inner join nilais on absens.id = nilais.id_absen
        inner join karyawans on absens.id_karyawan = karyawans.id
        `, { type: db.nilai.sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    },
    _getNilaiByWeek: (req, res) => {
        db.nilai.sequelize.query(`
        select nilais.id, nilais.id_absen as "id_absen", nilais.nilai, nilais.tag, nilais.keterangan,
        karyawans.id as "id_karyawan", karyawans.nip, karyawans.nama,
        absens.id as "id_absen"
        from absens
        inner join nilais on absens.id = nilais.id_absen
        inner join karyawans on absens.id_karyawan = karyawans.id
        where nilais.tag = '${req.body.week}'
        `, { type: db.nilai.sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    },
    _getNilaiByName: (req, res) => {
        db.nilai.sequelize.query(`
        select nilais.id, nilais.id_absen as "id_absen", nilais.nilai, nilais.tag, nilais.keterangan,
        karyawans.id as "id_karyawan", karyawans.nip, karyawans.nama,
        absens.id as "id_absen"
        from absens
        inner join nilais on absens.id = nilais.id_absen
        inner join karyawans on absens.id_karyawan = karyawans.id
        where karyawans.nama = '${req.body.nama}'
        `, { type: db.nilai.sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    }
}