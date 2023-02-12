'use-strict';

var models = require('../models');

class ProjectsRepository {
    async create(data) {
        return await models.projects.create(data).then(response => { return response }).catch((e) => { return e });
    }

    async findOne(id, username) {
        let where = {};
        if (id) where.id = id;
        if (username) where.username = username;

        return await models.projects.findOne({ where }).then(response => { return response });
    }

    async findAll(headers) {
        return await models.projects.findAndCountAll({ where: { username: headers['username'] } }).then(response => { return response });
    }

    async update(id, data) {
        return await models.projects.update(data, { where: { id } }).then(response => { return response });
    }

    async delete(id, data) {
        return await models.projects.destroy({ where: { id } }).then(response => { return response });
    }
}

exports.repository = new ProjectsRepository();