var net = require('net');
exports.routesConfig = function(app, socket) {
    app.post("/Ejecutar", (req, res) => {
        var response = '';
        var enviar = true;
        server = net.createServer(function(socket) {
            console.log('Cliente java conectado');
            response = '';
            socket.setEncoding('utf8');
            socket.on('error', () => {
                server.close();
            });
            //Aqui viene el texto de respuesta de java
            socket.on('data', function(data) {
                response += data;
                //console.log(data);
                let finalizacion = '$$$-----FINALIZANDOCUADRUPLOS-----';
                index = response.indexOf(finalizacion);
                if (index != -1) {
                    server.close();
                    response = response.substr(0, response.length - (finalizacion.length + 2));
                    res.status(202).json({
                        data: JSON.parse(response)
                    });
                }
            })
        }).listen(3001, "localhost", () => {
            console.log("Socket open in: " + 3001);
        });
        var client = net.connect(3002, 'localhost');
        let entrada = req.body.entrada;
        //Aqui debe ir el texto a enviar
        client.write(entrada);
        client.end();
        //return res.render('index.ejs');
    });

    app.get("/", (req, res) => {
        return res.render('index.ejs', {
            data: "hola"
        });
    });
}