class Identificador {
    constructor(Nombre) {
        this.Nombre = Nombre;
    }
    Ejecutar(tabla) {
        let value = tabla.getItem(this.Nombre);
        return value;
    }
}
exports.Identificador = Identificador;
