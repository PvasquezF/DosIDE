class SaltoIncondicional {
    constructor(tipo, valor1, valor2, salto, fila, columna) {
        this.tipo = tipo;
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.salto = salto;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let cond1 = this.valor1.Ejecutar(tabla);
        let cond2 = this.valor2.Ejecutar(tabla);
        let value = tabla.getItem(this.salto);
        if (value == null || value == undefined) {
            value = -1;
        }
        if (this.tipo.toLowerCase() == "je") {
            if (cond1 == cond2) {
                return value;
            }
        } else if (this.tipo.toLowerCase() == "jne") {
            if (cond1 != cond2) {
                return value;
            }
        } else if (this.tipo.toLowerCase() == "jg") {
            if (cond1 > cond2) {
                return value;
            }
        } else if (this.tipo.toLowerCase() == "jl") {
            if (cond1 < cond2) {
                return value;
            }
        } else if (this.tipo.toLowerCase() == "jge") {
            if (cond1 >= cond2) {
                return value;
            }
        } // else if (this.tipo.toLowerCase() == "jle") {
        else {
            if (cond1 <= cond2) {
                return value;
            }
        }
        return -1;
    }

    getAssembler(tabla) {
        let cond1 = this.valor1.getAssembler(tabla);
        let cond2 = this.valor2.getAssembler(tabla);
        let codigo = '';
        codigo += 'mov ax, ' + cond1 + '\n';
        codigo += 'mov bx, ' + cond2 + '\n';
        codigo += 'cmp ax, bx\n'
        if (this.tipo.toLowerCase() == "je") {
            codigo += 'je ' + this.salto + '\n';
        } else if (this.tipo.toLowerCase() == "jne") {
            codigo += 'jne ' + this.salto + '\n';
        } else if (this.tipo.toLowerCase() == "jg") {
            codigo += 'jg ' + this.salto + '\n';
        } else if (this.tipo.toLowerCase() == "jl") {
            codigo += 'jl ' + this.salto + '\n';
        } else if (this.tipo.toLowerCase() == "jge") {
            codigo += 'jge ' + this.salto + '\n';
        } // else if (this.tipo.toLowerCase() == "jle") {
        else {
            codigo += 'jle ' + this.salto + '\n';
        }
        codigo += 'limpiarReg\n';
        tabla.setAssembler(codigo);
        return null;
    }
}
exports.SaltoIncondicional = SaltoIncondicional;