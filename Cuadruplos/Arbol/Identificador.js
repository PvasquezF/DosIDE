class Identificador {
    constructor(Nombre, fila, columna) {
        this.Nombre = Nombre;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = tabla.getItem(this.Nombre);
        return value;
    }

    getAssembler(tabla) {
        return this.Nombre;
    }
    getOptimizacion() {
        let codigo = '';
        codigo += this.Nombre;
        return codigo;
    }
}
exports.Identificador = Identificador;