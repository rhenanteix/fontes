'use-strict';

var models = require('../models');
const bcrypt = require('bcrypt');

class UsersRepository {
    async create(data) {
        data.password = bcrypt.hashSync(data.password, 10);
        return await models.users.create(data).then(response => { return response }).catch((e) => { return e });
    }

    async findOne(username) {
        return await models.users.findOne({ where: { username } }).then(response => { return response });
    }
}

exports.repository = new UsersRepository();