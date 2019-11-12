class Invalue {
    constructor(fila, columna) {
            this.fila = fila;
            this.columna = columna;
        }
        // parametro 0 -> Retorno
        // parametro 1 -> Tipo valor
        // parametro 2 -> Posicion donde se va a guardar el valor
        // parametro 3 -> heap o stack
    Ejecutar(tabla) {
        let entradaUsuario = prompt('Ingrese la entrada prro: ');
        let inicioAmbito = tabla.getItem('p');
        let tipoEntrada = tabla.getStack(inicioAmbito + 1); // 0 - int, 1 - string
        let posicionDondeGuardar = tabla.getStack(inicioAmbito + 2);
        let tipoVariable = tabla.getStack(inicioAmbito + 3); // 0 - stack, 1 - heap
        console.log(typeof entradaUsuario);
        if (tipoEntrada == 0) {
            if (!isNaN(entradaUsuario)) { // not (Is not a number)
                if (tipoVariable == 0) {
                    tabla.setStack(posicionDondeGuardar, entradaUsuario);
                } else {
                    tabla.setHeap(posicionDondeGuardar, entradaUsuario);
                }
            } else {
                console.log("ERRROR DE TIPOS");
            }
        } else if (tipoEntrada == 1) {
            if (typeof entradaUsuario === 'string') {
                let direccionString = tabla.getItem('h');
                if (tipoVariable == 0) {
                    tabla.setStack(posicionDondeGuardar, direccionString);
                } else {
                    tabla.setHeap(posicionDondeGuardar, direccionString);
                }
                for (i = 0; i < entradaUsuario.length; i++) {
                    let direccion = tabla.getItem('h');
                    tabla.InsertUpdate('h', direccion + 1);
                    tabla.setHeap(direccion, entradaUsuario.charAt(i).charCodeAt(0));
                }
                let direccion = tabla.getItem('h');
                tabla.InsertUpdate('h', direccion + 1);
                tabla.setHeap(direccion, 0);
            } else {
                console.log("Error de tipos");
            }
        }

        return null;
    }
}
exports.Invalue = Invalue;

/*
    typeof miFuncion === 'function'   
    typeof forma === 'string'
    typeof tamano === 'number'
    typeof hoy === 'object'
    typeof noExiste === 'undefined'
*/