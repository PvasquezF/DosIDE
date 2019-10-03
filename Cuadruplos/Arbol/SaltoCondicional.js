class SaltoCondicional {
    constructor(Identificador) {
        this.Identificador = Identificador;
    }
    Ejecutar(tabla) {
        let value = tabla.getItem(this.Identificador);
        return value;
    }
}
exports.SaltoCondicional = SaltoCondicional;
