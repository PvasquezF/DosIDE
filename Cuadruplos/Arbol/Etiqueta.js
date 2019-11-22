class Etiqueta {
    constructor(Identificador, fila, columna) {
        this.Identificador = Identificador;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        tabla.InsertUpdate(this.Identificador, this.index);
        return null;
    }
    getAssembler(tabla) {
        let codigo = this.Identificador + ':\n';
        tabla.setAssembler(codigo);
        return null;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += this.Identificador + ':\n';
        return codigo;
    }
}
exports.Etiqueta = Etiqueta;