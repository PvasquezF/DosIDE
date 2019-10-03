class Print {
    constructor(Parametro, Valor) {
        this.Parametro = Parametro;
        this.Valor = Valor;
    }
    Ejecutar(tabla) {
        let value = this.Valor.Ejecutar(tabla);
        if (this.Parametro.toLowerCase() == "%c") {
            console.log(String.fromCharCode(value) + "")
        } else if (this.Parametro.toLowerCase() == "%d") {
            console.log(parseInt(value + "", 10));
        } else {
            console.log(parseFloat(value + "").toFixed(2));
        }
        return null;
    }
}
exports.Print = Print;
