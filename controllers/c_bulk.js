const db = require('../models');

module.exports = {
    _bulkInsert: (req, res) => {
        const data = req.body.datas
        db.penilaians.bulkCreate(data)
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    }
}