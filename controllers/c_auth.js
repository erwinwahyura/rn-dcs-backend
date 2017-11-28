const db = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    authUser: function(req, res, next) {
        let token = req.headers.token
        if (!!token) {
            jwt.verify(token, 'secret-key', (err, decoded) => {
                if (!!err) {
                    res.status(500).send(err)
                } else {
                    db.users.findOne({
                        where: {
                            id: decoded.id
                        }
                    })
                    .then((response) => {
                        next()
                    })
                    .catch((err) => {
                        res.status(500).send({msg: 'you are not authorized!'})
                    })
                }
            })
        } else {
            res.status(500).send({msg:'login please!'})
        }
    }
}