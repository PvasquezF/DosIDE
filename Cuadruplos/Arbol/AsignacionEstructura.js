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
}
exports.AsignacionEstructura = AsignacionEstructura;