class Asignacion {
    constructor(Identificador, Valor) {
        this.Identificador = Identificador;
        this.Valor = Valor;
    }
    Ejecutar(tabla) {
        let value = this.Valor.Ejecutar(tabla);
        tabla.InsertUpdate(this.Identificador.Nombre, value);
        return null;
    }
}
exports.Asignacion = Asignacion;
