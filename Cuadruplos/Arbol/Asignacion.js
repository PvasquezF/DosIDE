class Asignacion {
    constructor(Identificador, Valor, fila, columna) {
        this.Identificador = Identificador;
        this.Valor = Valor;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = this.Valor.Ejecutar(tabla);
        tabla.InsertUpdate(this.Identificador.Nombre, value);
        return null;
    }

    getAssembler(tabla) {
        let codigo = '';
        let temp1 = this.Valor.getAssembler(tabla);
        codigo += 'mov ax, ' + temp1 + '\n';
        codigo += 'mov ' + tabla.genTemporal(this.Identificador.Nombre) + ', ax\n';
        codigo += 'limpiarReg\n';
        tabla.setAssembler(codigo);
        return null;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += '=,' + this.Valor.getOptimizacion() + ',,' + this.Identificador.Nombre + '\n';
        return codigo;
    }
}
exports.Asignacion = Asignacion;