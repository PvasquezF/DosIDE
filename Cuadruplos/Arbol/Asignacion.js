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
}
exports.Asignacion = Asignacion;