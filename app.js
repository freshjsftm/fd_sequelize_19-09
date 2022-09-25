const express = require("express");
const app = express();
const router = require("./routers");
const handleErrors = require("./middlewares/handle.errors.mw");

app.use(express.static('public'));
app.use(express.json());

// ROUTER
app.use("/api", router);

app.use(handleErrors);

module.exports = app;
