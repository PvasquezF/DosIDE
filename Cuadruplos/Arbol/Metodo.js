class Metodo {
    constructor(Identificador, Instrucciones) {
        this.Identificador = Identificador;
        this.Instrucciones = Instrucciones;
    }
    Ejecutar(tabla) {
        tabla.InsertUpdateMethod(this.Identificador, this.Instrucciones);
        return null;
    }
}
exports.Metodo = Metodo;
