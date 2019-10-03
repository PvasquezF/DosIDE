class Llamada {
    constructor(Identificador) {
        this.Identificador = Identificador;
    }
    Ejecutar(tabla) {
        let ins = tabla.getInstructions(this.Identificador);
        let indexLlamada = 0;
        for (indexLlamada = 0; indexLlamada < ins.length; indexLlamada++) {
            ins[indexLlamada].Ejecutar(tabla);
        }
        return null;
    }
}
exports.Llamada = Llamada;
