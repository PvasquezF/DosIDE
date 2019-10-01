exports.routesConfig = function (app) {
    app.get("/", (req, res) => {
        return res.render('index.ejs');
    });
}