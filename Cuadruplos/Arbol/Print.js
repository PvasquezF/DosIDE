class Print {
    constructor(Parametro, Valor, fila, columna) {
        this.Parametro = Parametro;
        this.Valor = Valor;
        this.fila = fila;
        this.columna = columna;
        this.assembler = '';
    }
    Ejecutar(tabla) {
        let value = this.Valor.Ejecutar(tabla);

        if (this.Parametro.toLowerCase() == "%c") {
            document.getElementById("consolaArea").value += String.fromCharCode(value);
        } else if (this.Parametro.toLowerCase() == "%d") {
            document.getElementById("consolaArea").value += parseFloat(value + "").toFixed(2);
        } else {
            document.getElementById("consolaArea").value += parseInt(value + "", 10);
        }
        return null;
    }

    getAssembler(tabla) {
        let codigo = '';
        let temp1 = this.Valor.getAssembler(tabla);
        if (this.Parametro.toLowerCase() == "%c") {
            codigo += 'mov ax, ' + temp1 + '\n';
            codigo += 'printChar al\n';
        } else if (this.Parametro.toLowerCase() == "%d") {
            codigo += 'imprimirNumero ' + temp1 + '\n';
        } else {
            //codigo += 'mov ax,' + temp1 + '\n';
            codigo += 'imprimirNumero ' + temp1 + '\n';
        }
        codigo += 'limpiarReg\n';
        tabla.setAssembler(codigo);
        return null;
    }
    getOptimizacion() {
        let codigo = '';
        if (this.Parametro.toLowerCase() == "%c") {
            codigo += 'print(%c,' + this.Valor.getOptimizacion() + ')\n';
        } else if (this.Parametro.toLowerCase() == "%d") {
            codigo += 'print(%d,' + this.Valor.getOptimizacion() + ')\n';
        } else {
            codigo += 'print(%e,' + this.Valor.getOptimizacion() + ')\n';
        }
        return codigo;
    }
}
exports.Print = Print;