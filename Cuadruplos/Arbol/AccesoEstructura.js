class AccesoEstructura {
    constructor(Estructura, Direccion, Memoria, fila, columna) {
        this.Estructura = Estructura;
        this.Direccion = Direccion;
        this.Memoria = Memoria;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let dir = this.Direccion.Ejecutar(tabla);
        let mem = this.Memoria.Nombre;
        let value;
        if (this.Estructura.toLowerCase() == "stack") {
            value = tabla.getStack(dir)
        } else {
            value = tabla.getHeap(dir);
        }
        tabla.InsertUpdate(mem, value);
        return null;
    }
    getAssembler(tabla) {
        let codigo = '';
        let temp1 = this.Direccion.getAssembler(tabla);
        let mem = this.Memoria.Nombre;
        //codigo += '; __________________ACCESO ESTRUCTURA___________________\n';
        codigo += 'xor si,si\n';
        codigo += 'xor ax,ax\n';
        codigo += 'mov si, ' + temp1 + '\n';
        codigo += 'add si,si\n';
        if (this.Estructura.toLowerCase() == "stack") {
            codigo += 'mov ax, es:pila[si]\n';
        } else {
            codigo += 'mov ax, es:heap[si]\n';
        }
        codigo += 'mov ' + tabla.genTemporal(mem) + ', ax\n';
        codigo += 'limpiarReg\n';
        //codigo += '; __________________FIN ACCESO ESTRUCTURA___________________\n';
        tabla.setAssembler(codigo);
        return null;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += '=,' + this.Estructura + ',' + this.Direccion.getOptimizacion() + ',' + this.Memoria.Nombre + '\n';
        return codigo;
    }
}
exports.AccesoEstructura = AccesoEstructura;