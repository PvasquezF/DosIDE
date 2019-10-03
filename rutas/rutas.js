var net = require('net');
exports.routesConfig = function (app, socket) {
    app.get("/Ejecutar", (req, res) => {
        var client = net.connect(3002, 'localhost');
        server = net.createServer(function (socket) {
            console.log('Cliente java conectado');
            socket.on('error', () => {
                console.log("error");
            });
            //Aqui viene el texto de respuesta de java
            socket.on('data', function (data) {
                data = data.toString('utf-8');
                server.close();
                return res.render('index.ejs', {
                    data: data
                });
            });
        }).listen(3001, "localhost", () => {
            console.log("Socket open in: " + 3001);
        });
        //Aqui debe ir el texto a enviar
        client.write(`Hello from node.js
        adfadsfas
        fad
        fsf`);
        client.end();
        //return res.render('index.ejs');
    });

    app.get("/", (req, res) => {
        return res.render('index.ejs', {
            data: "hola"
        });
    });
}