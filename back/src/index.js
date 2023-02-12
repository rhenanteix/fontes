require('dotenv').config();
const express = require('express');
const cors = require('cors');
const models = require('./models');
const logger = require('morgan');

// ROUTES
const userRoute = require('./routes/users');
const projectRoute = require('./routes/projects');

const app = express();
var http = require('http');
var port = process.env.PORT || '3001';
var server = http.createServer(app);

models.sequelize.sync();
app.use(express.json());
app.use(logger('dev'));
app.use(cors({ origin: "*" }));

app.use('/users', userRoute);
// app.use('/project', projectRoute);
app.use('/', projectRoute);


server.listen(port, () => {
    console.log(`#SERVER IS RUNNING AT ${port}`);
});