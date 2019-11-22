class FinalizarMetodo {
    constructor(Identificador, fila, columna) {
        this.Identificador = Identificador;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = this.index;
        //tabla.InsertUpdate(this.Identificador, value);
        return value;
    }
    getAssembler(tabla) {
        let codigo = '';
        codigo += 'ret\n' + this.Identificador + ' endp\n';
        codigo += 'fin_metodo_' + this.Identificador + ':\n';
        tabla.setAssembler(codigo);
        tabla.isProc = false;
        return null;
    }
    getOptimizacion() {
        let codigo = '';
        codigo += 'end,,,' + this.Identificador + '\n';
        return codigo;
    }
}
exports.FinalizarMetodo = FinalizarMetodo;