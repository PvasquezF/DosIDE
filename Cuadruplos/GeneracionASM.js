function btnGenAssembler() {
    if (!editor4D.getValue()) {
        alert("NO HAY NADA PARA TRADUCIR");
        return;
    }
    generado = generarAssembler();
    document.getElementById("consolaArea").value = generado;
}

function generarAssembler() {
    // @ts-ignore
    var result = quadruplesGrammar.parse(editor4D.getValue());
    document.getElementById("consolaArea").value = "";
    var indexInstruccion = 0;
    let table = new Tabla(null);
    table.isDebugger = false;

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
            result.instrucciones[indexInstruccion].getAssembler(table);
        }
    }
    return table.getCodigoEnsamblador();
}