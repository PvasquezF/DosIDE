class Primitivo {
    constructor(Valor, fila, columna) {
        this.Valor = Valor;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        return this.Valor;
    }

    getAssembler(tabla) {
        let codigo = '';
        let temp1 = tabla.getTemporal();
        codigo += 'mov ' + temp1 + ', ' + this.Valor + '\n';
        codigo += 'limpiarReg\n';
        tabla.setAssembler(codigo);
        return temp1;
    }
    getOptimizacion() {
        let codigo = '';
        codigo += this.Valor;
        return codigo;
    }
}
exports.Primitivo = Primitivo;