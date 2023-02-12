const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = function () {
    return async function (req, res, next) {

        if (req.headers.authorization === undefined || req.headers.authorization === null || req.headers.authorization === '') {
            res.status(400).json({ msg: "Unauthorized", status: 400 });
        } else {
            let token = req.headers.authorization.slice(7);
            if (token) {
                let user = await models.users.findOne({ where: { username: jwt.decode(token)['username'] } });
                if (user) {
                    next();
                } else {
                    res.status(400).json({ msg: "Token de validação mal formado" });
                }
            } else {
                res.status(401).json({ msg: "Operação não autorizada para este usuário" });
            }
        }

    }

};
