class Tabla {
    constructor(Anterior) {
        this.stack = [];
        this.heap = [];
        this.tabla = new Array();
        this.Anterior = Anterior;
        this.InsertUpdate("h", this.heap.lenght-1);
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
        if(id.toLowerCase() == "h"){
            return heap.lenght-1;
        }
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
    }

    setStack(posicion, valor) {
        this.stack[posicion] = valor;
    }

    getHeap(posicion) {
        return this.heap[posicion];
    }

    getStack(posicion) {
        return this.stack[posicion];
    }


}
exports.Tabla = Tabla;
