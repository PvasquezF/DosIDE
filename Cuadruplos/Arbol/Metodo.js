class Metodo {
    constructor(Identificador, Instrucciones, fila, columna) {
        this.Identificador = Identificador;
        this.Instrucciones = Instrucciones;
        this.fila = fila;
        this.columna = columna;
        this.InitMethod = new IniciarMetodo(this.Identificador, this.Instrucciones.length, fila, columna);
        this.EndMethod = new FinalizarMetodo(this.Identificador, fila, columna);

        this.instruccionesMetodo = [];
        this.instruccionesMetodo.push(this.InitMethod);
        this.Instrucciones.map(m => {
            this.instruccionesMetodo.push(m);
        })
        this.instruccionesMetodo.push(this.EndMethod);
    }
    Ejecutar(tabla) {
        tabla.InsertUpdateMethod(this.Identificador, this.Instrucciones);
        return null;
    }
}
exports.Metodo = Metodo;