const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routers');
const handleErrors = require('./middlewares/handle.errors.mw');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// ROUTER
app.use('/api', router);

app.use(handleErrors);

module.exports = app;
