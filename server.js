'use strict';
const bodyParser = require("body-parser");
const express = require('express');
const index = require('./rutas/rutas');
const app = express();
const net = require('net');
let socketPort = 3001;
let host = "localhost";
var socket;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use('/', express.static(process.cwd() + '/'));
app.use(express.static(__dirname + '/Web'));
app.use(express.static(__dirname + '/Cuadruplos'));
index.routesConfig(app, socket);
app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log(`Running on http://localhost:3000`);
});