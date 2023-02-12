const express = require('express');
const router = express.Router();
const controllers = require('../controllers/projects');
const validaToken = require("../middlewares/tokenValidation");

router.post('/project', validaToken(), controllers.createProject);
router.get('/projects', validaToken(), controllers.listUserProjects);
router.get('/project', validaToken(), controllers.listOneProject);
router.put('/projects/:id', validaToken(), controllers.updateProject);
router.patch('/projects/:id/done', validaToken(), controllers.completeProject);
router.delete('/projects/:id', validaToken(), controllers.dropProject);


module.exports = router;
