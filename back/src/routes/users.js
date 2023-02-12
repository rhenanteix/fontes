const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const validaToken = require("../middlewares/tokenValidation");

router.post('/', controllers.createUser);
router.post('/auth', controllers.auth);

module.exports = router;
