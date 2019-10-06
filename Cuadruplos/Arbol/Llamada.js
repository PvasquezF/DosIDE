class Llamada {
    constructor(Identificador, fila, columna) {
        this.Identificador = Identificador;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        //let ins = tabla.getInstructions(this.Identificador);
        //let indexLlamada = 0;
        //for (indexLlamada = 0; indexLlamada < ins.length; indexLlamada++) {
        //    ins[indexLlamada].Ejecutar(tabla);
        //}
        //return null;
        let index = tabla.getItem(this.Identificador);
        return index;
    }
}
exports.Llamada = Llamada;