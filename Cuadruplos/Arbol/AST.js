"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.asignarIndex();
    }
    asignarIndex() {
        let i = 0;
        this.instrucciones.map(m => {
            m.index = i++;
        });
    }
}
exports.AST = AST;
