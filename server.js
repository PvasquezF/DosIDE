'use strict';
const bodyParser = require("body-parser");
const express = require('express');
const index = require('./rutas/rutas');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
//app.use('/', express.static(process.cwd() + '/'));
app.use(express.static(__dirname + '/Web'));
index.routesConfig(app);
app.set("view engine", "ejs");
app.listen(3000, () => {
	console.log(`Running on http://localhost:3000`);
});