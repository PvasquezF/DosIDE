class Etiqueta {
    constructor(Identificador) {
        this.Identificador = Identificador;
    }
    Ejecutar(tabla) {
        tabla.InsertUpdate(this.Identificador, this.index);
        return null;
    }
}
exports.Etiqueta = Etiqueta;
