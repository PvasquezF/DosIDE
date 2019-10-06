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
    console.log(listaBreakpoints);
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
    if (tabla.indiceDebugger == instruccionesDebugger.length) {
        detenerDebugger();
    }
}

window.addEventListener('click', function(evt) {
    if (evt.detail === 2) {
        var linea = editor4D.getCursor().line;
        if (editor4D.doc.children[0].lines[linea].bgClass != undefined) {
            editor4D.removeLineClass(linea, 'background', 'clase4dcss1');
        } else {
            editor4D.addLineClass(linea, 'background', 'clase4dcss1');
        }
    }
});

function actualizarStack() {
    //tabla
    var cabecera = '<tr><th colspan="2" scope="colgroup">Stack</th></tr>'
    cabecera += '<tr><th>Direccion</th><th>Valor</th></tr>';
    var body = ''
    for (var i = 0; i < tabla.stack.length; i++) {
        body += '<tr><td>' + i + '</td><td>' + tabla.stack[i] + '</td></tr>';
    }
    document.getElementById('tablaStack').innerHTML = cabecera + body;
}

function actualizarHeap() {
    //tabla
    var cabecera = '<tr><th colspan="2" scope="colgroup">Heap</th></tr>'
    cabecera += '<tr><th>Direccion</th><th>Valor</th></tr>';
    var body = ''
    for (var i = 0; i < tabla.heap.length; i++) {
        body += '<tr><td>' + i + '</td><td>' + tabla.heap[i] + '</td></tr>';
    }
    document.getElementById('tablaHeap').innerHTML = cabecera + body;
}