class IniciarMetodo {
    constructor(Identificador, cantidadIns, fila, columna) {
        this.Identificador = Identificador;
        this.cantidadIns = cantidadIns;
        this.getValor = false;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = this.index;
        if (this.getValor) {
            return tabla.getItem(this.Identificador);
        } else {
            tabla.InsertUpdate(this.Identificador, value);
        }
        return null;
    }


    getAssembler(tabla) {
        let codigo = '';
        tabla.isProc = true;
        codigo += 'jmp fin_metodo_' + this.Identificador + '\n';
        codigo += this.Identificador + ' proc\n';
        tabla.setAssembler(codigo);
        return null;
    }
}
exports.IniciarMetodo = IniciarMetodo;