const db = require('../models');

module.exports = {
    _bulkInsert: (req, res) => {
        console.log('bdnya: ', req.body)
        var data = req.body.datas
        db.nilai.bulkCreate(data, {returning: true})
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    }
}