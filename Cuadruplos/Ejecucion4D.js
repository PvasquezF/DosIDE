function ejecutar() {
    // @ts-ignore
    var result = quadruplesGrammar.parse(editor.getValue());
    var indexInstruccion = 0;
    var tabla;
    this.tabla = new Tabla(null);
    console.log(result.instrucciones);
    console.log(this.tabla);

    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        if (result.instrucciones[indexInstruccion] instanceof Etiqueta) {
            result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
        } else if (result.instrucciones[indexInstruccion] instanceof Metodo) {
            result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
        }
    }

    for (indexInstruccion = 0; indexInstruccion < result.instrucciones.length; indexInstruccion++) {
        //console.log(JSON.parse(JSON.stringify(this.tabla)));
        if (result.instrucciones[indexInstruccion] instanceof Etiqueta
            || result.instrucciones[indexInstruccion] instanceof Metodo) {
            continue;
        }
        if (result.instrucciones[indexInstruccion] instanceof SaltoCondicional) {
            let temp = result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
            if (temp != null && temp != -1) {
                indexInstruccion = temp;
            }
        } else if (result.instrucciones[indexInstruccion] instanceof SaltoIncondicional) {
            let temp = result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
            if (temp != null && temp != -1) {
                indexInstruccion = temp;
            }
        } else {
            result.instrucciones[indexInstruccion].Ejecutar(this.tabla);
        }
    }

}