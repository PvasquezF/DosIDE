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
            document.getElementById("consolaArea").value += parseFloat(value + "").toFixed(2);
        } else {
            codigo += 'mov ax,' + temp1 + '\n';
            codigo += 'call intToStringPrint\n';
        }
        codigo += 'limpiarReg\n';
        tabla.setAssembler(codigo);
        return null;
    }
}
exports.Print = Print;