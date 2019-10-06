function ejecutar4D() {
    // @ts-ignore
    var result = quadruplesGrammar.parse(editor4D.getValue());
    document.getElementById("consolaArea").value = "";
    var indexInstruccion = 0;
    var tabla;
    this.tabla = new Tabla(null);
    this.tabla.isDebugger = false;
    console.log(result.instrucciones);
    console.log(this.tabla);

    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        if (result.instrucciones[indexInstruccion] instanceof Etiqueta ||
            result.instrucciones[indexInstruccion] instanceof IniciarMetodo ||
            result.instrucciones[indexInstruccion] instanceof FinalizarMetodo ||
            result.instrucciones[indexInstruccion] instanceof Metodo) {
            result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
        }
    }

    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        //console.log(JSON.parse(JSON.stringify(this.tabla)));
        if (result.instrucciones[indexInstruccion] instanceof Etiqueta) {
            continue;
        }
        if (result.instrucciones[indexInstruccion] instanceof SaltoCondicional ||
            result.instrucciones[indexInstruccion] instanceof SaltoIncondicional) {
            let temp = result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
            if (temp != null && temp != -1) {
                indexInstruccion = temp;
            }
        } else if (result.instrucciones[indexInstruccion] instanceof Llamada) {
            let temp = result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
            if (temp != null && temp != -1) {
                this.tabla.listaRetornosCall.push(indexInstruccion);
                indexInstruccion = temp;
            }
        } else if (result.instrucciones[indexInstruccion] instanceof IniciarMetodo) {
            //let temp = result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
            let temp = result.instrucciones[indexInstruccion];
            temp = temp.index + temp.cantidadIns + 1; //inicio metodo + cantidad de instrucciones + end metodo
            if (temp != null && temp != -1) {
                indexInstruccion = temp;
            }
        } else if (result.instrucciones[indexInstruccion] instanceof FinalizarMetodo) {
            //let temp = result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
            let temp = this.tabla.listaRetornosCall.pop();
            if (temp != null && temp != -1) {
                indexInstruccion = temp;
            }
        } else {
            result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
        }
    }
}

var instruccionesDebugger = null;
var tabla = null;
var listaBreakpoints = [];

function debugear4D() {
    // @ts-ignore
    var entrada4d = editor4D.getValue();
    var result = quadruplesGrammar.parse(entrada4d);
    document.getElementById("consolaArea").value = "";
    var indexInstruccion = 0;
    tabla = new Tabla(null);
    instruccionesDebugger = result.instrucciones;
    console.log(instruccionesDebugger);
    console.log(this.tabla);
    for (indexInstruccion = 0; indexInstruccion < instruccionesDebugger.length; indexInstruccion++) {
        if (instruccionesDebugger[indexInstruccion] instanceof Etiqueta ||
            instruccionesDebugger[indexInstruccion] instanceof IniciarMetodo ||
            instruccionesDebugger[indexInstruccion] instanceof FinalizarMetodo ||
            instruccionesDebugger[indexInstruccion] instanceof Metodo) {
            instruccionesDebugger[indexInstruccion].Ejecutar(this.tabla);
        }
    }
    listaBreakpoints = [];
    for (var i = 0; i < editor4D.lineCount(); i++) {
        if (editor4D.doc.children[0].lines[i].bgClass != undefined) {
            if (!listaBreakpoints.includes(i + 1)) {
                listaBreakpoints.push(i + 1);
                listaBreakpoints.sort();
            }
            //editor4D.removeLineClass(linea, 'background', 'clase4dcss1');
        }
    }
    //setTimeout(ejecutarInstruccion(result.instrucciones, this.tabla), 1000);
}

function ejecutarInstruccion(instrucciones, tabla) {
    if (tabla.indiceDebugger < instrucciones.length) {
        if (instrucciones[tabla.indiceDebugger] instanceof Etiqueta ||
            instrucciones[tabla.indiceDebugger] instanceof Metodo) {
            tabla.indiceDebugger++;
            return;
            //continue;
        }
        if (instrucciones[tabla.indiceDebugger] instanceof SaltoCondicional ||
            instrucciones[tabla.indiceDebugger] instanceof SaltoIncondicional) {
            let temp = instrucciones[tabla.indiceDebugger].Ejecutar(tabla);
            if (temp != null && temp != -1) {
                tabla.indiceDebugger = temp;
            }
        } else if (instrucciones[tabla.indiceDebugger] instanceof Llamada) {
            let temp = instrucciones[tabla.indiceDebugger].Ejecutar(tabla);
            if (temp != null && temp != -1) {
                tabla.listaRetornosCall.push(tabla.indiceDebugger);
                tabla.indiceDebugger = temp;
            }
        } else if (instrucciones[tabla.indiceDebugger] instanceof IniciarMetodo) {
            //let temp = instrucciones[tabla.indiceDebugger].Ejecutar(this.tabla);
            let temp = instrucciones[tabla.indiceDebugger];
            temp = temp.index + temp.cantidadIns + 1; //inicio metodo + cantidad de instrucciones + end metodo
            if (temp != null && temp != -1) {
                tabla.indiceDebugger = temp;
            }
        } else if (instrucciones[tabla.indiceDebugger] instanceof FinalizarMetodo) {
            let temp = tabla.listaRetornosCall.pop();
            if (temp != null && temp != -1) {
                tabla.indiceDebugger = temp;
            }
        } else {
            instrucciones[tabla.indiceDebugger].Ejecutar(tabla);
        }
        tabla.indiceDebugger++;
    }
}