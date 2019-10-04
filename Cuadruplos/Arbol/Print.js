class Print {
    constructor(Parametro, Valor) {
        this.Parametro = Parametro;
        this.Valor = Valor;
    }
    Ejecutar(tabla) {
        let value = this.Valor.Ejecutar(tabla);

        if (this.Parametro.toLowerCase() == "%c") {
            document.getElementById("consolaArea").value += String.fromCharCode(value) + "\n";
            console.log(String.fromCharCode(value) + "")
        } else if (this.Parametro.toLowerCase() == "%d") {
            document.getElementById("consolaArea").value += parseFloat(value + "").toFixed(2) + "\n";
            console.log(parseFloat(value + "").toFixed(2));
        } else {
            document.getElementById("consolaArea").value += parseInt(value + "", 10) + "\n";
            console.log(parseInt(value + "", 10));
        }
        return null;
    }
}
exports.Print = Print;