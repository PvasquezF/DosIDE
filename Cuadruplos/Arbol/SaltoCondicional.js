class SaltoCondicional {
    constructor(Identificador, fila, columna) {
        this.Identificador = Identificador;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = tabla.getItem(this.Identificador);
        return value;
    }
}
exports.SaltoCondicional = SaltoCondicional;