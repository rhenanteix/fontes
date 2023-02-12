'use-strict';

var user = require('../repository/users');
var models = require("../models");
const { auth } = require('./jwt-auth/token');

async function verifyUser(username) {
    return await models.users.findAndCountAll({ where: { username } }).then(response => { return response });
}

exports.createUser = async (req, res) => {
    let exists = await verifyUser(req.body.username);

    if (exists.count == 0) {
        const retorno = await user.repository.create(req.body);
        if (retorno.dataValues) {
            res.status(200).json({ msg: "Usuário cadastrado com sucesso!", retorno });
        }
        else {
            res.status(400).json({ msg: "Erro ao criar usuário", retorno });
        }
    } else {
        res.status(400).json({ msg: "Já existe um usuário com este username." });
    }
}

exports.auth = async (req, res) => {
    let isAuthenticated = await auth(req.body);
    res.status(200).json({ msg: isAuthenticated });
}