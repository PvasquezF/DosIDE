function activarDebugger() {
    if (!editor4D.getValue()) {
        alert("NO HAY NADA PARA ANALIZAR");
        return;
    }
    var btnDebugger = document.getElementsByClassName("btnDebugger");
    document.getElementById("btnActivarDebugger").disabled = true;

    var i = 0;
    for (i = 0; i < btnDebugger.length; i++) {
        btnDebugger[i].style.display = "inline";
    }
    debugear4D();
    var posicion = 0;
    for (i = 0; i < instruccionesDebugger.length; i++) {
        posicion = listaBreakpoints.indexOf(instruccionesDebugger[i].fila);
        if (posicion != -1) {
            editor4D.addLineClass(listaBreakpoints[posicion] - 1, 'background', 'clase4dcss');
            break;
        }
        ejecutarInstruccion(instruccionesDebugger, tabla);
        i = tabla.indiceDebugger - 1;
    }
    actualizarStack();
    actualizarHeap();
    actualizarSimbolos();
    if (tabla.indiceDebugger == instruccionesDebugger.length) {
        detenerDebugger();
    }
}

function detenerDebugger() {
    var btnDebugger = document.getElementsByClassName("btnDebugger");
    var i = 0;
    for (i = 0; i < btnDebugger.length; i++) {
        btnDebugger[i].style.display = "none";
    }
    for (var i = 0; i < editor4D.lineCount(); i++) {
        editor4D.removeLineClass(i, 'background', 'clase4dcss');
    }
    instruccionesDebugger = null;
    tabla = null;
    listaBreakpoints = [];
    document.getElementById("btnActivarDebugger").disabled = false;
}

function removeBreakpoints() {
    for (var i = 0; i < editor4D.lineCount(); i++) {
        editor4D.removeLineClass(i, 'background', 'clase4dcss1');
    }
}

function continuarInstruccion() {
    editor4D.removeLineClass(instruccionesDebugger[tabla.indiceDebugger].fila - 1, 'background', 'clase4dcss');
    ejecutarInstruccion(instruccionesDebugger, tabla);
    actualizarStack();
    actualizarHeap();
    actualizarSimbolos();
    if (tabla.indiceDebugger == instruccionesDebugger.length) {
        detenerDebugger();
    } else {
        editor4D.addLineClass(instruccionesDebugger[tabla.indiceDebugger].fila - 1, 'background', 'clase4dcss');
    }
}

function continuarDebugger() {
    ejecutarInstruccion(instruccionesDebugger, tabla);
    var i = tabla.indiceDebugger;

    for (i; i < instruccionesDebugger.length; i++) {
        posicion = listaBreakpoints.indexOf(instruccionesDebugger[i].fila);
        if (posicion != -1) {
            editor4D.addLineClass(listaBreakpoints[posicion] - 1, 'background', 'clase4dcss');
            break;
        }
        ejecutarInstruccion(instruccionesDebugger, tabla);
        i = tabla.indiceDebugger - 1;
    }
    actualizarStack();
    actualizarHeap();
    actualizarSimbolos();
    if (tabla.indiceDebugger == instruccionesDebugger.length) {
        detenerDebugger();
    }
}

window.addEventListener('click', function(evt) {
    if (evt.detail === 2) {
        var linea = editor4D.getCursor().line;
        var containsStyle = getLinePropertyCodeMirror(editor4D.doc, linea);
        if (containsStyle.result) {
            editor4D.removeLineClass(linea, 'background', 'clase4dcss1');
        } else {
            editor4D.addLineClass(linea, 'background', 'clase4dcss1');
        }
    }
});

function actualizarStack() {
    //tabla
    var cabecera = '<tr><th scope="colgroup">Stack</th><th scope="colgroup">' + tabla.getItem('p') + '</th></tr>'
    cabecera += '<tr><th>Direccion</th><th>Valor</th></tr>';
    var body = ''
    for (var i = 0; i < tabla.stack.length; i++) {
        body += '<tr><td>' + i + '</td><td>' + tabla.stack[i] + '</td></tr>';
    }
    //document.getElementById('tablaStack').innerHTML = '<th colspan="2" scope="colgroup">' + tabla.getItem('p') + '</th>' + cabecera + body;
    document.getElementById('tablaStack').innerHTML = cabecera + body;

}

function actualizarHeap() {
    //tabla
    var cabecera = '<tr><th colspan="2" scope="colgroup">Heap</th><th colspan="2" scope="colgroup">' + tabla.getItem('h') + '</th></tr>'
    cabecera += '<tr><th>Direccion</th><th>Valor</th><th>Ascii</th></tr>';
    var body = ''
    for (var i = 0; i < tabla.heap.length; i++) {
        body += '<tr><td>' + i + '</td><td>' + tabla.heap[i] + '</td><td><center>' + String.fromCharCode(tabla.heap[i]) + '</center></td></tr>';
    }
    document.getElementById('tablaHeap').innerHTML = cabecera + body;
}

function actualizarSimbolos() {
    //tabla
    var cabecera = '<tr><th colspan="2" scope="colgroup">Simbolos</th></tr>'
    cabecera += '<tr><th>Nombre</th><th>Valor</th></tr>';
    var body = ''
    for (var i = 0; i < tabla.tabla.length; i++) {
        let simbolo;
        simbolo = this.tabla.tabla[i];
        if (simbolo.ListaIns == null || simbolo.ListaIns == undefined) {
            body += '<tr><td>' + simbolo.Identificador + '</td><td>' + simbolo.Valor + '</td></tr>';
        }
    }
    document.getElementById('tablaSimbolos').innerHTML = cabecera + body;
}

function getLinePropertyCodeMirror(nodo, linea, contadorLineas = 0, verificar = true) {
    if (nodo.children != undefined) {
        for (var i = 0; i < nodo.children.length; i++) {
            var m = nodo.children[i];
            var result = getLinePropertyCodeMirror(m, linea, contadorLineas, verificar);
            if (result.result) {
                return { result: result.result, contadorLineas: result.contadorLineas, verificar: true };
            }
            contadorLineas = result.contadorLineas;
            verificar = result.verificar;
            if (!verificar) {
                return { result: result.result, contadorLineas: result.contadorLineas, verificar: false };
            }
        }
    } else {
        //if (nodo.lines.includes(linea)) {
        contadorLineas += nodo.lines.length;
        if (linea < contadorLineas && verificar) {
            var lineaAcceso = linea - (contadorLineas - nodo.lines.length);
            var lineaEvaluar = nodo.lines[lineaAcceso];
            var contienePropiedad = lineaEvaluar.bgClass != undefined;
            return {
                result: contienePropiedad,
                contadorLineas: contadorLineas,
                verificar: false
            };
        } else {
            return { result: false, contadorLineas: contadorLineas, verificar: true };
        }

    }
    return { result: false, contadorLineas: contadorLineas, verificar: true };
}