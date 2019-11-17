function btnGenAssembler() {
    // var tabla = new Tabla(null);
    // var codigo = tabla.getCodigoEnsamblador();
    generado = generarAssembler(tabla);
    console.log(tabla.getCodigoEnsamblador());
}

function generarAssembler() {
    // @ts-ignore
    var result = quadruplesGrammar.parse(editor4D.getValue());
    document.getElementById("consolaArea").value = "";
    var indexInstruccion = 0;
    var tabla;
    var codigo = "";
    this.tabla = new Tabla(null);
    this.tabla.isDebugger = false;
    console.log(result.instrucciones)
        /*for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
            if (result.instrucciones[indexInstruccion] instanceof Etiqueta ||
                result.instrucciones[indexInstruccion] instanceof IniciarMetodo ||
                result.instrucciones[indexInstruccion] instanceof FinalizarMetodo ||
                result.instrucciones[indexInstruccion] instanceof Metodo) {
                result.instrucciones[indexInstruccion].Ejecutar(tabla);
            }
        }*/

    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        if (result.instrucciones[indexInstruccion] instanceof Print ||
            result.instrucciones[indexInstruccion] instanceof Asignacion ||
            result.instrucciones[indexInstruccion] instanceof AccesoEstructura ||
            result.instrucciones[indexInstruccion] instanceof AsignacionEstructura ||
            result.instrucciones[indexInstruccion] instanceof Etiqueta ||
            result.instrucciones[indexInstruccion] instanceof SaltoCondicional ||
            result.instrucciones[indexInstruccion] instanceof SaltoIncondicional ||
            result.instrucciones[indexInstruccion] instanceof Operacion ||
            result.instrucciones[indexInstruccion] instanceof IniciarMetodo ||
            result.instrucciones[indexInstruccion] instanceof FinalizarMetodo ||
            result.instrucciones[indexInstruccion] instanceof Llamada ||
            result.instrucciones[indexInstruccion] instanceof Invalue) {
            codigo += result.instrucciones[indexInstruccion].getAssembler(this.tabla);
        }
    }
    return codigo;
}