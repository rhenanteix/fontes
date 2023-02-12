'use-strict';

var projects = require('../repository/projects');
const Request = require("request");

exports.createProject = async (req, res) => {
    req.body.username = req.headers.username;
    let retorno = await projects.repository.create(req.body);
    if (retorno.dataValues) {
        res.status(200).json({ msg: "Projeto cadastrado com sucesso!", retorno });
    }
    else {
        res.status(400).json({ msg: "Erro ao criar projeto", erro: retorno });
    }

}

exports.listUserProjects = async (req, res) => {
    let retorno = await projects.repository.findAll(req.headers);
    res.status(200).json(retorno);
}

exports.listOneProject = async (req, res) => {
    let retorno = await projects.repository.findOne(req.headers.id);
    if (retorno) {

        await Request.get(`https://viacep.com.br/ws/${retorno.zip_code}/json/`, (error, response) => {
            if (error) res.status(200).json(retorno);
            retorno.zip_code = JSON.parse(response.body);
            res.status(200).json(retorno);
        });

    } else {
        res.status(400).json({ msg: "Projeto não encontrado na base de dados." });
    }
}

exports.updateProject = async (req, res) => {
    let retorno = await projects.repository.findOne(req.params.id, req.headers.username);
    if (retorno) {
        let updated = await projects.repository.update(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ msg: `Projeto ${req.body.title} atualizado com sucesso` });
        } else {
            res.status(400).json({ msg: "Erro ao atualizar projeto", erro: updated });
        }
    } else {
        res.status(400).json({ msg: "Projeto não encontrado na base de dados." });
    }
}

exports.completeProject = async (req, res) => {
    let retorno = await projects.repository.findOne(req.params.id);
    if (retorno) {
        let done = await projects.repository.update(req.params.id, { done: true });
        if (done) {
            res.status(200).json({ msg: `Projeto ${req.body.title} marcado como concluído.` });
        } else {
            res.status(400).json({ msg: "Erro ao concluir projeto", erro: done });
        }
    } else {
        res.status(400).json({ msg: "Projeto não encontrado na base de dados." });
    }
}

exports.dropProject = async (req, res) => {
    let retorno = await projects.repository.findOne(req.params.id, req.headers.username);
    if (retorno) {
        let dropped = await projects.repository.delete(req.params.id, req.headers.username);
        if (dropped) {
            res.status(200).json({ msg: "Projeto excluído com sucesso." });
        } else {
            res.status(400).json({ msg: "Erro ao excluír projeto", erro: dropped });
        }
    } else {
        res.status(400).json({ msg: "Projeto não encontrado na base de dados." });
    }
}