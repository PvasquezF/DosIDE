class Tabla {
    constructor(Anterior) {
        this.stack = [];
        this.heap = [];
        this.tabla = new Array();
        this.Anterior = Anterior;
        this.isDebugger = false;
        this.indiceDebugger = 0;
        this.listaRetornosCall = [];
        this.InsertUpdate("h", 0);
        this.InsertUpdate("p", 0);
    }
    InsertUpdate(id, valor) {
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo;
            simbolo = this.tabla[i];
            if (simbolo.Identificador.toLowerCase() == id.toLowerCase()) {
                simbolo.Valor = valor;
                return;
            }
        }
        this.tabla.push(new Simbolo(id.toLowerCase(), valor, null));
    }

    InsertUpdateMethod(id, instrucciones) {
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo;
            simbolo = this.tabla[i];
            if (simbolo.Identificador.toLowerCase() == id.toLowerCase()) {
                simbolo.ListaIns = instrucciones;
                return;
            }
        }
        this.tabla.push(new Simbolo(id.toLowerCase(), null, instrucciones));
    }

    getItem(id) {
        //if (id.toLowerCase() == "h") {
        //    return this.heap.length;
        //}
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo;
            simbolo = this.tabla[i];
            if (simbolo.Identificador.toLowerCase() == id.toLowerCase()) {
                return simbolo.Valor;
            }
        }
        return null;
    }

    getInstructions(id) {
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo;
            simbolo = this.tabla[i];
            if (simbolo.Identificador.toLowerCase() == id.toLowerCase()) {
                return simbolo.ListaIns;
            }
        }
        return null;
    }

    setHeap(posicion, valor) {
        this.heap[posicion] = valor;
        for (var i = 0; i < this.heap.length; i++) {
            let m = this.heap[i];
            if (m == undefined || m == NaN || m == null) {
                this.heap[i] = -1;
            }
        }
    }

    setStack(posicion, valor) {
        this.stack[posicion] = valor;
        for (var i = 0; i < this.stack.length; i++) {
            let m = this.stack[i];
            if (m == undefined || m == NaN || m == null) {
                this.stack[i] = -1;
            }
        }
    }

    getHeap(posicion) {
        return this.heap[posicion];
    }

    getStack(posicion) {
        return this.stack[posicion];
    }


}
exports.Tabla = Tabla;