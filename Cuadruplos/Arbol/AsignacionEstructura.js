class AsignacionEstructura {
    constructor(Direccion, Valor, Estructura, fila, columna) {
        this.Direccion = Direccion;
        this.Valor = Valor;
        this.Estructura = Estructura;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = this.Valor.Ejecutar(tabla);
        let dir = this.Direccion.Ejecutar(tabla);
        if (this.Estructura.toLowerCase() == "stack") {
            tabla.setStack(dir, value);
        } else {
            tabla.setHeap(dir, value);
        }
        return null;
    }
    getAssembler(tabla) {
        let codigo = '';
        let temp1 = this.Valor.getAssembler(tabla);
        let temp2 = this.Direccion.getAssembler(tabla);
        //codigo += '; __________________ASIGNACION ESTRUCTURA___________________\n';
        codigo += 'xor si,si\n';
        codigo += 'xor ax,ax\n';
        codigo += 'mov si, ' + temp2 + '\n';
        codigo += 'add si,si\n';
        if (this.Estructura.toLowerCase() == "stack") {
            codigo += 'mov ax, ' + temp1 + '\n';
            codigo += 'mov pila[si], ax\n';
        } else {
            codigo += 'mov ax, ' + temp1 + '\n';
            codigo += 'mov heap[si], ax\n';
        }
        codigo += 'limpiarReg\n';
        //codigo += '; __________________FIN ASIGNACION ESTRUCTURA___________________\n';
        tabla.setAssembler(codigo);
        return null;
    }
}
exports.AsignacionEstructura = AsignacionEstructura;