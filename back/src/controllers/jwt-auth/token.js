require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../../repository/users');

exports.auth = async ({ username, password }) => {
    var token = null;
    var dbUser = await user.repository.findOne(username);

    if (dbUser) {
        let correctPassword = await bcrypt.compare(password, dbUser.password);
        if (correctPassword) {
            token = jwt.sign({ id: dbUser.id, username }, process.env.SECRET_KEY);
        }
    }
    return token;
}