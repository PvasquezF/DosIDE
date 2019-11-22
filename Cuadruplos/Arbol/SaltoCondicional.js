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
    getAssembler(tabla) {
        let codigo = 'jmp ' + this.Identificador + '\n';
        tabla.setAssembler(codigo);
        return null;
    }
    getOptimizacion() {
        let codigo = '';
        codigo += 'jmp,,,' + this.Identificador + '\n';
        return codigo;
    }
}
exports.SaltoCondicional = SaltoCondicional;