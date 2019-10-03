class Operacion {
    constructor(Operador, Valor1, Valor2, Resultado) {
        this.Operador = Operador;
        this.Valor1 = Valor1;
        this.Valor2 = Valor2;
        this.Resultado = Resultado;
    }
    Ejecutar(tabla) {
        let op1 = this.Valor1.Ejecutar(tabla);
        let op2 = this.Valor2.Ejecutar(tabla);
        console.log(op1);
        console.log(op2);
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
}
exports.Operacion = Operacion;
