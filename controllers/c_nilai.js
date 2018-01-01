const db = require('../models');


module.exports = {
    _allGetNilai: (req, res) => {
        db.nilai.sequelize.query(`
        select nilais.id, nilais.id_absen as "id_absen", nilais.nilai, nilais.tag, nilais.keterangan,
        karyawans.id as "id_karyawan", karyawans.nip, karyawans.nama
        from karyawans
        left join nilais on karyawans.id = nilais.id_absen
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
        karyawans.id as "id_karyawan", karyawans.nip, karyawans.nama
        from karyawans
        left join nilais on karyawans.id = nilais.id_absen
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
        karyawans.id as "id_karyawan", karyawans.nip, karyawans.nama
        from karyawans
        left join nilais on karyawans.id = nilais.id_absen
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