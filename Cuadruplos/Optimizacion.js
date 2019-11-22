function Optimizar() {
    if (!editor4D.getValue()) {
        alert("NO HAY NADA PARA OPTIMIZAR");
        return;
    }
    let reporteOptimizacion = []
    let blocks = generarBloques();
    optimizacionCaso1(blocks, reporteOptimizacion);
    optimizacionCaso2(blocks, reporteOptimizacion);
    optimizacionCaso3(blocks, reporteOptimizacion);
    optimizacionCaso4(blocks, reporteOptimizacion);
    optimizacionCaso5(blocks, reporteOptimizacion);
    optimizacionCaso6(blocks, reporteOptimizacion);
    optimizacionCaso7(blocks, reporteOptimizacion);
    optimizacionCaso8(blocks, reporteOptimizacion);
    optimizacionCaso9(blocks, reporteOptimizacion);
    optimizacionCaso10(blocks, reporteOptimizacion);
    optimizacionCaso11(blocks, reporteOptimizacion);
    optimizacionCaso12(blocks, reporteOptimizacion);
    optimizacionCaso13(blocks, reporteOptimizacion);
    optimizacionCaso14(blocks, reporteOptimizacion);
    optimizacionCaso15(blocks, reporteOptimizacion);
    optimizacionCaso16(blocks, reporteOptimizacion);
    crearReporteOptimizacion(reporteOptimizacion);
    let codigoFinal = ''
    blocks.map(m => {
        m.bloques.map(n => {
            if (n.habilitado) {
                codigoFinal += n.instruccion.getOptimizacion();
            }
        })
    })
    document.getElementById("consolaArea").value = codigoFinal;
}

function generarBloques() {
    var result = quadruplesGrammar.parse(editor4D.getValue());
    document.getElementById("consolaArea").value = "";
    var indexInstruccion = 0;
    let table = new Tabla(null);
    table.isDebugger = false;
    let bloques = [];
    let bloqueAux = [];
    let indiceBloque = 0;
    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        if (indexInstruccion + 1 != result.instrucciones.length) {
            bloqueAux.push({
                "instruccion": result.instrucciones[indexInstruccion],
                "habilitado": true,
                "caso1": false,
                "cambioValor": false
            });
            if (result.instrucciones[indexInstruccion + 1] instanceof SaltoCondicional ||
                result.instrucciones[indexInstruccion + 1] instanceof SaltoIncondicional ||
                result.instrucciones[indexInstruccion + 1] instanceof Etiqueta ||
                result.instrucciones[indexInstruccion + 1] instanceof IniciarMetodo ||
                result.instrucciones[indexInstruccion + 1] instanceof FinalizarMetodo) {
                bloques.push({ "bloques": bloqueAux, "indice": indiceBloque++ });
                bloqueAux = [];
            }
        } else {
            bloqueAux.push({
                "instruccion": result.instrucciones[indexInstruccion],
                "habilitado": true,
                "caso1": false,
                "cambioValor": false
            });
            bloques.push({ "bloques": bloqueAux, "indice": indiceBloque++ });
            bloqueAux = [];
        }
    }
    return bloques;
}

function optimizacionCaso1(bloques, reporteOptimizacion) {
    var i = 0;
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            subBloque = bloqueN[j];
            if (j + 1 != bloqueN.length) {
                for (var k = j + 1; k < bloqueN.length; k++) {
                    subBloque2 = bloqueN[k];
                    if (!(subBloque.instruccion instanceof Asignacion) ||
                        !(subBloque2.instruccion instanceof Asignacion)) {
                        break;
                    }
                    if (subBloque.instruccion instanceof Asignacion &&
                        subBloque2.instruccion instanceof Asignacion) {
                        if (subBloque.cambioValor) {
                            break;
                        }
                        compararCaso1(subBloque, subBloque2, reporteOptimizacion);
                    }
                }
            }
        }
    }
}

function optimizacionCaso2(bloques, reporteOptimizacion) {
    var i = 0;
    while (i < bloques.length) {
        bloque1 = bloques[i].bloques;
        if (i + 1 != bloques.length) {
            for (var j = i + 1; j < bloques.length; j++) {
                bloque2 = bloques[j].bloques;
                if (bloque1[0].instruccion instanceof SaltoCondicional &&
                    bloque2[0].instruccion instanceof Etiqueta) {
                    if (!compararCaso2(bloques, bloques[i], bloques[j], reporteOptimizacion)) {
                        break;
                    }
                }
            }
        }
        i++;
    }
}

function optimizacionCaso3(bloques, reporteOptimizacion) {
    var i = 0;
    while (i < bloques.length) {
        if (i + 2 != bloques.length) {
            if (bloques[i].bloques[0].instruccion instanceof SaltoIncondicional &&
                bloques[i + 1].bloques[0].instruccion instanceof SaltoCondicional &&
                bloques[i + 2].bloques[0].instruccion instanceof Etiqueta
            ) {
                if (!compararCaso3(bloques[i].bloques, bloques[i + 1].bloques, bloques[i + 2].bloques, reporteOptimizacion)) {
                    break;
                }
            }
        }
        i++;
    }
}

function optimizacionCaso4(bloques, reporteOptimizacion) {
    var i = 0;
    while (i < bloques.length) {
        bloque1 = bloques[i].bloques;
        if (i + 1 != bloques.length) {
            for (var j = i + 1; j < bloques.length; j++) {
                bloque2 = bloques[j].bloques;
                if (bloque1[0].instruccion instanceof SaltoIncondicional &&
                    bloque2[0].instruccion instanceof SaltoCondicional) {
                    if (!compararCaso4(bloques[i].bloques, bloques[j].bloques, reporteOptimizacion)) {
                        break;
                    }
                }
            }
        }
        i++;
    }
}

function optimizacionCaso5(bloques, reporteOptimizacion) {
    var i = 0;
    while (i < bloques.length) {
        bloque1 = bloques[i].bloques;
        if (i + 1 != bloques.length) {
            for (var j = i + 1; j < bloques.length; j++) {
                bloque2 = bloques[j].bloques;
                if (bloque1[0].instruccion instanceof SaltoIncondicional &&
                    bloque2[0].instruccion instanceof SaltoCondicional) {
                    if (!compararCaso5(bloques[i].bloques, bloques[j].bloques, reporteOptimizacion)) {
                        break;
                    }
                }
            }
        }
        i++;
    }
}

function optimizacionCaso6(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '+') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() == id.toLowerCase())) {
                            bloqueN[j].habilitado = false;
                            reporteOptimizacion.push({
                                "Expresion": instruccion.getOptimizacion(),
                                "Resultado": '',
                                "Regla Aplicada": 6,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() == id.toLowerCase())) {
                            bloqueN[j].habilitado = false;
                            reporteOptimizacion.push({
                                "Expresion": instruccion.getOptimizacion(),
                                "Resultado": '',
                                "Regla Aplicada": 6,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso7(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '-') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() == id.toLowerCase())) {
                            bloqueN[j].habilitado = false;
                            reporteOptimizacion.push({
                                "Expresion": instruccion.getOptimizacion(),
                                "Resultado": '',
                                "Regla Aplicada": 7,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() == id.toLowerCase())) {
                            bloqueN[j].habilitado = false;
                            reporteOptimizacion.push({
                                "Expresion": instruccion.getOptimizacion(),
                                "Resultado": '',
                                "Regla Aplicada": 7,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso8(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '*') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 1 && (idResult.toLowerCase() == id.toLowerCase())) {
                            bloqueN[j].habilitado = false;
                            reporteOptimizacion.push({
                                "Expresion": instruccion.getOptimizacion(),
                                "Resultado": '',
                                "Regla Aplicada": 8,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 1 && (idResult.toLowerCase() == id.toLowerCase())) {
                            bloqueN[j].habilitado = false;
                            reporteOptimizacion.push({
                                "Expresion": instruccion.getOptimizacion(),
                                "Resultado": '',
                                "Regla Aplicada": 8,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso9(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '/') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 1 && (idResult.toLowerCase() == id.toLowerCase())) {
                            bloqueN[j].habilitado = false;
                            reporteOptimizacion.push({
                                "Expresion": instruccion.getOptimizacion(),
                                "Resultado": '',
                                "Regla Aplicada": 9,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 1 && (idResult.toLowerCase() == id.toLowerCase())) {
                            bloqueN[j].habilitado = false;
                            reporteOptimizacion.push({
                                "Expresion": instruccion.getOptimizacion(),
                                "Resultado": '',
                                "Regla Aplicada": 9,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso10(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '+') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor2, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 10,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor1, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 10,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso11(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '-') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor2, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 11,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor1, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 11,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso12(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '*') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 1 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor2, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 12,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 1 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor1, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 12,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso13(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '/') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 1 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor2, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 13,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 1 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor1, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 13,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso14(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '*') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 2) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Operacion('+', valor2, valor2, instruccion.Resultado, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 14,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 2 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Operacion('+', valor1, valor1, instruccion.Resultado, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 14,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso15(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '*') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 0) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor1, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 15,
                                "Fila": instruccion.fila
                            });
                        }
                    } else if (valor1 instanceof Identificador && valor2 instanceof Primitivo) {
                        let valorFinal = valor2.Valor;
                        let id = valor1.Nombre;
                        if (valorFinal == 0 && (idResult.toLowerCase() != id.toLowerCase())) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor2, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 15,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function optimizacionCaso16(bloques, reporteOptimizacion) {
    for (var i = 0; i < bloques.length; i++) {
        bloqueN = bloques[i].bloques;
        for (var j = 0; j < bloqueN.length; j++) {
            instruccion = bloqueN[j].instruccion;
            if (instruccion instanceof Operacion) {
                let valor1 = instruccion.Valor1;
                let valor2 = instruccion.Valor2;
                let idResult = instruccion.Resultado.Nombre;
                if (instruccion.Operador == '/') {
                    if (valor1 instanceof Primitivo && valor2 instanceof Identificador) {
                        let valorFinal = valor1.Valor;
                        let id = valor2.Nombre;
                        if (valorFinal == 0) {
                            let codigoAnterior = instruccion.getOptimizacion();
                            let NuevaInstruccion = new Asignacion(instruccion.Resultado, valor1, instruccion.fila, instruccion.columna);
                            bloqueN[j].instruccion = NuevaInstruccion;
                            reporteOptimizacion.push({
                                "Expresion": codigoAnterior,
                                "Resultado": NuevaInstruccion.getOptimizacion(),
                                "Regla Aplicada": 16,
                                "Fila": instruccion.fila
                            });
                        }
                    }
                }
            }
        }
    }
}

function compararCaso1(subBloque1, subBloque2, reporteOptimizacion) {
    //console.log(subBloque1);
    let id1 = subBloque1.instruccion.Identificador.Nombre.toLowerCase();
    let valor1 = subBloque1.instruccion.Valor;
    let id2 = subBloque2.instruccion.Identificador.Nombre.toLowerCase();
    let valor2 = subBloque2.instruccion.Valor;
    // t3 = t1
    // t3 = 2
    // t1 = t3
    if (id1 == id2) {
        subBloque1.cambioValor = true;
    } else if (valor1 instanceof Identificador && !(valor2 instanceof Identificador)) {
        if (valor1.Nombre.toLowerCase() == id2) {
            subBloque.cambioValor = true;
        }
    } else if (valor1 instanceof Identificador && valor2 instanceof Identificador) {
        if (id1 == valor2.Nombre.toLowerCase() &&
            valor1.Nombre.toLowerCase() == id2) {
            subBloque2.habilitado = false;
            exp1 = subBloque1.instruccion.getOptimizacion();
            exp2 = subBloque2.instruccion.getOptimizacion();
            reporteOptimizacion.push({
                "Expresion": exp1 + '<br/>' + exp2,
                "Resultado": exp1,
                "Regla Aplicada": 1,
                "Fila": subBloque2.instruccion.fila
            });
        }
    }
}

function compararCaso2(bloques, subBloque1, subBloque2, reporteOptimizacion) {
    let bloque1 = subBloque1.bloques;
    let bloque2 = subBloque2.bloques;

    if (bloque1[0].instruccion.Identificador == bloque2[0].instruccion.Identificador) {
        let indiceInicio = subBloque1.indice + 1;
        let indiceFinal = subBloque2.indice;
        if (bloque1.length > 1) {
            for (var i = 1; i < bloque1.length; i++) {
                bloque1[i].habilitado = false;
            }
            reporteOptimizacion.push({
                "Expresion": "jmp,,," + bloque1[0].instruccion.Identificador + '<br/>instrucciones<br/>' + bloque2[0].instruccion.Identificador + ":",
                "Resultado": "jmp,,," + bloque1[0].instruccion.Identificador + '<br/>' + bloque2[0].instruccion.Identificador + ":",
                "Regla Aplicada": 2,
                "Fila": bloque1[0].instruccion.fila + ', ' + bloque2[0].instruccion.fila
            });
        }
        while (indiceInicio < indiceFinal) {
            for (var i = 0; i < bloques[indiceInicio].bloques.length; i++) {
                bloques[indiceInicio].bloques[i].habilitado = false;
            }
            indiceInicio++;
        }
        return true;
    }
    return false;
}

function compararCaso3(subBloque1, subBloque2, subBloque3, reporteOptimizacion) {
    if (subBloque1[0].instruccion.salto.toLowerCase() == subBloque3[0].instruccion.Identificador.toLowerCase()) {
        subBloque2[0].habilitado = false;
        let val1 = subBloque1[0].instruccion.getOptimizacion();
        let val2 = subBloque2[0].instruccion.getOptimizacion();
        let val3 = subBloque3[0].instruccion.Identificador;
        let val4 = subBloque2[0].instruccion.Identificador + ':';

        if (subBloque1[0].instruccion.tipo.toLowerCase() == "je") {
            subBloque1[0].instruccion.tipo = "jne";
        } else if (subBloque1[0].instruccion.tipo.toLowerCase() == "jne") {
            subBloque1[0].instruccion.tipo = "je";
        } else if (subBloque1[0].instruccion.tipo.toLowerCase() == "jg") {
            subBloque1[0].instruccion.tipo = "jle";
        } else if (subBloque1[0].instruccion.tipo.toLowerCase() == "jl") {
            subBloque1[0].instruccion.tipo = "jge";
        } else if (subBloque1[0].instruccion.tipo.toLowerCase() == "jge") {
            subBloque1[0].instruccion.tipo = "jl";
        } // else if (this.tipo.toLowerCase() == "jle") {
        else {
            subBloque1[0].instruccion.tipo = "jg";
        }
        subBloque1[0].instruccion.salto = subBloque2[0].instruccion.Identificador;
        let val1_1 = subBloque1[0].instruccion.getOptimizacion();
        let val4_1 = subBloque2[0].instruccion.Identificador;

        subBloque3[0].habilitado = false;
        reporteOptimizacion.push({
            "Expresion": val1 + '<br/>' + val2 + '<br/>' + val3 + '<br/>instrucciones<br/>' + val4 + '<br/>instrucciones',
            "Resultado": val1_1 + '<br/>instrucciones<br/>' + val4_1 + ':',
            "Regla Aplicada": 3,
            "Fila": subBloque1[0].instruccion.fila + ',' + subBloque3[0].instruccion.fila
        });
        return true;
    }
    return false;
}

function compararCaso4(subBloque1, subBloque2, reporteOptimizacion) {
    let cond1 = subBloque1[0].instruccion.valor1;
    let cond2 = subBloque1[0].instruccion.valor2;
    let tipoSalto = subBloque1[0].instruccion.tipo.toLowerCase();
    if (cond1 instanceof Primitivo && cond2 instanceof Primitivo) {
        let valor1 = cond1.Valor;
        let valor2 = cond2.Valor;
        let salto = subBloque1[0].instruccion.salto;
        if (tipoSalto == "je") {
            if (valor1 == valor2) {
                subBloque1[0].habilitado = false;
                subBloque2[0].instruccion.Identificador = salto;
                reporteOptimizacion.push({
                    "Expresion": 'je,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + salto,
                    "Resultado": 'jmp,,,' + salto,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
            } else {
                return false;
            }
        } else if (tipoSalto == "jne") {
            if (valor1 != valor2) {
                subBloque1[0].habilitado = false;
                subBloque2[0].instruccion.Identificador = salto;
                reporteOptimizacion.push({
                    "Expresion": 'jne,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + salto,
                    "Resultado": 'jmp,,,' + salto,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
            } else {
                return false;
            }
        } else if (tipoSalto == "jg") {
            if (valor1 > valor2) {
                subBloque1[0].habilitado = false;
                subBloque2[0].instruccion.Identificador = salto;
                reporteOptimizacion.push({
                    "Expresion": 'jg,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + salto,
                    "Resultado": 'jmp,,,' + salto,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
            } else {
                return false;
            }
        } else if (tipoSalto == "jl") {
            if (valor1 < valor2) {
                subBloque1[0].habilitado = false;
                subBloque2[0].instruccion.Identificador = salto;
                reporteOptimizacion.push({
                    "Expresion": 'jl,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + salto,
                    "Resultado": 'jmp,,,' + salto,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
            } else {
                return false;
            }
        } else if (tipoSalto == "jge") {
            if (valor1 >= valor2) {
                subBloque1[0].habilitado = false;
                subBloque2[0].instruccion.Identificador = salto;
                reporteOptimizacion.push({
                    "Expresion": 'jge,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + salto,
                    "Resultado": 'jmp,,,' + salto,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
            } else {
                return false;
            }
        } else {
            if (valor1 <= valor2) {
                subBloque1[0].habilitado = false;
                subBloque2[0].instruccion.Identificador = salto;
                reporteOptimizacion.push({
                    "Expresion": 'jle,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + salto,
                    "Resultado": 'jmp,,,' + salto,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
            } else {
                return false;
            }
        }
        return true;
    }
    return false;
}

function compararCaso5(subBloque1, subBloque2, reporteOptimizacion) {
    let cond1 = subBloque1[0].instruccion.valor1;
    let cond2 = subBloque1[0].instruccion.valor2;
    let tipoSalto = subBloque1[0].instruccion.tipo.toLowerCase();
    if (cond1 instanceof Primitivo && cond2 instanceof Primitivo) {
        let valor1 = cond1.Valor;
        let valor2 = cond2.Valor;
        let salto = subBloque1[0].instruccion.salto;
        if (tipoSalto == "je") {
            if (valor1 != valor2) {
                subBloque1[0].habilitado = false;
                reporteOptimizacion.push({
                    "Expresion": 'je,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Resultado": 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
                return true;
            }
        } else if (tipoSalto == "jne") {
            if (valor1 == valor2) {
                subBloque1[0].habilitado = false;
                reporteOptimizacion.push({
                    "Expresion": 'jne,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Resultado": 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
                return true;
            }
        } else if (tipoSalto == "jg") {
            if (valor1 <= valor2) {
                subBloque1[0].habilitado = false;
                reporteOptimizacion.push({
                    "Expresion": 'jg,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Resultado": 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
                return true;
            }
        } else if (tipoSalto == "jl") {
            if (valor1 >= valor2) {
                subBloque1[0].habilitado = false;
                reporteOptimizacion.push({
                    "Expresion": 'jl,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Resultado": 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
                return true;
            }
        } else if (tipoSalto == "jge") {
            if (valor1 < valor2) {
                subBloque1[0].habilitado = false;
                reporteOptimizacion.push({
                    "Expresion": 'jge,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Resultado": 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
                return true;
            }
        } else {
            if (valor1 > valor2) {
                subBloque1[0].habilitado = false;
                reporteOptimizacion.push({
                    "Expresion": 'jle,' + valor1 + ',' + valor2 + ',' + salto + '<br/>' + 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Resultado": 'jmp,,,' + subBloque2[0].instruccion.Identificador,
                    "Regla Aplicada": 4,
                    "Fila": subBloque1[0].instruccion.fila + ',' + subBloque2[0].instruccion.fila
                });
                return true;
            }
        }
        return false;
    }
    return false;
}

function crearReporteOptimizacion(reporte) {
    var filas = '<table class="table table-striped table-light" style="height: 100%;">';
    filas += `<tr style="height: 40px;">
                <th scope="col">No</th>
                <th scope="col">Expresion</th>
                <th scope="col">Resultado</th>
                <th scope="col">Regla aplicado</th>
                <th scope="col">Fila</th>
            </tr>`;
    for (var i = 0; i < reporte.length; i++) {
        filas += "<tr>";
        filas += "<td scope=\"row\">" + i + "</td>";
        filas += "<td scope=\"row\">" + reporte[i].Expresion + "</td>";
        filas += "<td scope=\"row\">" + reporte[i].Resultado + "</td>";
        filas += "<td scope=\"row\">" + reporte[i]['Regla Aplicada'] + "</td>";
        filas += "<td scope=\"row\">" + reporte[i].Fila + "</td>";
        filas += "</tr>";
    }
    filas += '</table>'
    document.getElementById('Optimizacion').innerHTML = filas;
}