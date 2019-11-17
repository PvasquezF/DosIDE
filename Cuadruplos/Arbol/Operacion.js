class Operacion {
    constructor(Operador, Valor1, Valor2, Resultado, fila, columna) {
        this.Operador = Operador;
        this.Valor1 = Valor1;
        this.Valor2 = Valor2;
        this.Resultado = Resultado;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let op1 = this.Valor1.Ejecutar(tabla);
        let op2 = this.Valor2.Ejecutar(tabla);
        if (this.Operador.toLowerCase() == "+") {
            tabla.InsertUpdate(this.Resultado.Nombre, op1 + op2);
        } else if (this.Operador.toLowerCase() == "-") {
            tabla.InsertUpdate(this.Resultado.Nombre, op1 - op2);
        } else if (this.Operador.toLowerCase() == "*") {
            tabla.InsertUpdate(this.Resultado.Nombre, op1 * op2);
        } else if (this.Operador.toLowerCase() == "/") {
            tabla.InsertUpdate(this.Resultado.Nombre, op1 / op2);
        } else { // %
            tabla.InsertUpdate(this.Resultado.Nombre, op1 % op2);
        }
    }
    getAssembler(tabla) {
        let temp1 = this.Valor1.getAssembler(tabla);
        let temp2 = this.Valor2.getAssembler(tabla);
        let codigo = '';
        if (this.Operador.toLowerCase() == "+") {
            codigo += 'mov ax, ' + temp1 + '\n';
            //codigo += 'mov bx, ' + temp2 + '\n';
            codigo += 'add ax,' + temp2 + '\n';
            codigo += 'mov ' + tabla.genTemporal(this.Resultado.Nombre) + ', ax\n';
        } else if (this.Operador.toLowerCase() == "-") {
            codigo += 'mov ax, ' + temp1 + '\n';
            //codigo += 'mov bx, ' + temp2 + '\n';
            codigo += 'sub ax,' + temp2 + '\n';
            codigo += 'mov ' + tabla.genTemporal(this.Resultado.Nombre) + ', ax\n';
        } else if (this.Operador.toLowerCase() == "*") {
            codigo += 'mov ax, ' + temp1 + '\n';
            codigo += 'mov cx, ' + temp2 + '\n';
            codigo += 'mul cx\n';
            codigo += 'mov ' + tabla.genTemporal(this.Resultado.Nombre) + ', ax\n';
        } else if (this.Operador.toLowerCase() == "/") {
            codigo += 'mov ax, ' + temp1 + '\n';
            codigo += 'mov cx, ' + temp2 + '\n';
            codigo += 'div cl\n';
            codigo += 'mov ' + tabla.genTemporal(this.Resultado.Nombre) + ', ax\n';
        } else if (this.Operador.toLowerCase() == "%") {
            codigo += 'mov ax, ' + temp1 + '\n';
            codigo += 'mov cx, ' + temp2 + '\n';
            codigo += 'div cl\n';
            codigo += 'mov al, ah\n';
            codigo += 'mov ' + tabla.genTemporal(this.Resultado.Nombre) + ', ax\n';
        }
        codigo += 'limpiarReg\n';
        tabla.setAssembler(codigo);
        return null;
    }
}
exports.Operacion = Operacion;