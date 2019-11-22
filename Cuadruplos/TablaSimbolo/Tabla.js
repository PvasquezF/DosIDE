class Tabla {
    constructor(Anterior) {
        this.stack = [];
        this.heap = [];
        this.tabla = new Array();
        this.Anterior = Anterior;
        this.isDebugger = false;
        this.indiceDebugger = 0;
        this.listaRetornosCall = [];
        this.temporales = [];
        this.indiceTemporal = 0;
        this.AssemblerGenerado = '';
        this.AssemblerGeneradoProcs = '';
        this.isProc = false;
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

    getTemporal() {
        var temp = 'tASM' + this.indiceTemporal++;
        this.temporales.push(temp);
        return temp;
    }

    genTemporal(nombre) {
        var idx = this.temporales.indexOf(nombre);
        if (idx == -1) {
            this.temporales.push(nombre);
        }
        return nombre;
    }

    getTemporalActual() {
        return 'tASM' + (this.indiceTemporal - 1);
    }

    getCodigoEnsamblador() {
        var codigo = '';
        codigo += 'printChar macro p1\n';
        codigo += 'mov dl, p1\n';
        codigo += 'mov ah, 02h\n';
        codigo += 'int 21h\n';
        codigo += 'endm\n\n';

        codigo += 'leer macro\n';
        codigo += 'mov ah, 01h\n';
        codigo += 'int 21h\n';
        codigo += 'endm\n\n';

        codigo += 'imprimirString macro\n';
        codigo += 'mov ah,9\n';
        codigo += 'int 21h\n';
        codigo += 'endm\n\n';

        codigo += 'limpiarReg macro\n'
        codigo += 'xor ax,ax\n'
        codigo += 'xor bx,bx\n'
        codigo += 'xor cx,cx\n'
        codigo += 'xor dx,dx\n'
        codigo += 'xor si,si\n'
        codigo += 'endm\n\n'

        codigo += this.macroImprimirString();
        codigo += '.model huge\n';
        codigo += '.stack 10000h\n';
        codigo += '.fardata? ExtraSeg1  \n'
        codigo += 'pila dw 15000 dup(0000h)\n'
        codigo += 'heap dw 15000 dup(0000h)\n'
        codigo += '.fardata? EndSeg\n'
        codigo += '.data\n';
        codigo += 'numeroLectura dw 0000h\n';
        codigo += 'posicionLectura dw 0000h\n';
        codigo += 'buffer dw 0000h\n';
        codigo += 'i dw 0000h\n';
        let temp1 = this.getTemporal();
        let temp2 = this.getTemporal();
        let temp3 = this.getTemporal();
        let temp4 = this.getTemporal();
        let temp5 = this.getTemporal();
        this.temporales.map(m => {
            codigo += m + " dw 0\n";
        });
        codigo += '.code\n';
        codigo += 'mov ax,ExtraSeg1\n';
        codigo += 'mov es,ax\n\n';
        codigo += 'mov ax,@data\n';
        codigo += 'mov ds,ax\n\n';


        codigo += this.AssemblerGeneradoProcs;
        codigo += this.macroLecturaNumero();
        codigo += this.macroLecturaString();

        codigo += this.callInvalueFunction(temp1, temp2, temp3, temp4, temp5);
        //codigo += 'start:\n';
        codigo += this.AssemblerGenerado;
        codigo += '\nmov ax, 4c00h\n';
        codigo += 'int 21h\n';
        //codigo += "end start\n"
        codigo += 'end\n';
        return codigo;
    }

    getAssembler() {
        return this.AssemblerGenerado;
    }

    setAssembler(codigo) {
        if (this.isProc) {
            this.AssemblerGeneradoProcs += codigo;
        } else {
            this.AssemblerGenerado += codigo;
        }
    }

    macroLecturaNumero() {
        let codigo = '';
        codigo += 'jmp fin_metodo_leerNumero\n';
        codigo += 'leerNumero proc\n';
        codigo += '    xor si,si\n';
        codigo += '    mov numeroLectura,0h\n';
        codigo += '    inicio:\n';
        codigo += '    leer            ; habilitando lectura teclado      \n';
        codigo += '    cmp al, 45      ; verificamos si el numero a leer es negativo\n';
        codigo += '    je esNegativo   ; si es negativo guardamos la un bit para proceder despues     \n';
        codigo += '           \n';
        codigo += '    cmp al, 13      ; comparamos si es 13 para saber si terminar la lectura\n';
        codigo += '    je SalirLeerNumero  ; si fuera 13 nos salimos\n';
        codigo += '    mov ah,0h       ; liberamos el registro ah para evitar resultados incorrectos\n';
        codigo += '    mov cx,ax       ; movemos la data leida al registro cx\n';
        codigo += '    xor ax,ax       ; limpiamos ax\n';
        codigo += '    mov ax,numeroLectura   ; movemos el numero resultado a ax\n';
        codigo += '    xor dx,dx\n';
        codigo += '    mov dx,posicionLectura\n';
        codigo += '\n';
        codigo += '    mul dx    ; multiplicamos por 1 y luego de la primera iteracion por 10\n';
        codigo += '    sub cl, 30h     ; restamos 30h al valor ingresado\n';
        codigo += '    add ax,cx       ; sumamos el numero que llevamos mas el ingresado\n';
        codigo += '    mov numeroLectura,ax   ; guardamos el resultado en el numero de respuesta\n';
        codigo += '    mov posicionLectura,0ah ; cambiamos la posicion a 0ah para aumentar el numero en decenas por iteracion\n';
        codigo += '    jmp inicio  ; volvemos al inicio\n';
        codigo += '    \n';
        codigo += '    esNegativo:     ; si el numero fuera negativo llega aqui\n';
        codigo += '    mov si,1        ; ponemos el registro si en 1 para indicar que el numero a ingresar es negativo y 0 para positivo\n';
        codigo += '    jmp inicio  ; leemos otro caracter  \n';
        codigo += '    \n';
        codigo += '    \n';
        codigo += '    SalirLeerNumero: ; finalizada la lectura de numero\n';
        codigo += '    cmp si,1         ; verificamos que el numero ingresado sea positivo o negativo\n';
        codigo += '    je negar         ; si es 1 saltamos a la etiqueta negar\n';
        codigo += '    jmp salirLectura ; sino nos salimos de la lectura y devolvemos el numero leido\n';
        codigo += '    \n';
        codigo += '\n';
        codigo += '    negar:           ; inicio para negar el numero leido\n';
        codigo += '    xor ax,ax        ; limpiar registro ax\n';
        codigo += '    xor bx,bx        ; limpiar registro bx\n';
        codigo += '    mov bx,-1        ; bx = -1\n';
        codigo += '    mov ax,numeroLectura    ; ax = numero\n';
        codigo += '    imul bx          ; multiplicamos por -1 para cambiar el signo del numero leido\n';
        codigo += '    mov numeroLectura,ax    ; devolvemos el numero \n';
        codigo += '    \n';
        codigo += '\n';
        codigo += '    salirLectura:    ; salida\n';
        codigo += '    ret\n';
        codigo += 'leerNumero endp\n';
        codigo += 'fin_metodo_leerNumero:\n';
        return codigo;
    }

    macroLecturaString() {
        let codigo = '';
        codigo += 'jmp fin_metodo_leerString\n';
        codigo += 'leerString proc\n';
        codigo += 'mov bx,h\n';
        codigo += 'mov numeroLectura,bx\n';
        codigo += 'add bx,bx\n';
        codigo += 'continuarLecturaString:\n'
        codigo += 'leer\n'
        codigo += 'cmp al, 13\n'
        codigo += 'je SalirLeerString\n'
        codigo += 'xor ah,ah\n'
        codigo += 'mov es:heap[bx],ax\n';
        codigo += 'inc h\n'
        codigo += 'mov bx,h\n'
        codigo += 'add bx,bx\n';
        codigo += 'jmp continuarLecturaString\n'
        codigo += 'jmp SalirLeerString\n'

        codigo += 'SalirLeerString:'
        codigo += 'ret\n';
        codigo += 'leerString endp\n';
        codigo += 'fin_metodo_leerString:\n';
        return codigo;
    }

    macroImprimirString() {
        let codigo = 'imprimirNumero macro p1\n';
        codigo += 'LOCAL reducirPrimitiva, imprimirPrimitiva\n';
        codigo += 'mov ax,p1\n';
        codigo += 'mov bx,10\n';
        codigo += 'mov di,p1\n';
        codigo += 'cmp di, 0ffffh\n';
        codigo += 'jg reducirPrimitiva\n';
        codigo += 'neg ax\n';
        codigo += 'reducirPrimitiva:\n';
        codigo += 'mov dx,0\n';
        codigo += 'div bx\n';
        codigo += 'add dx,48\n';
        codigo += 'inc i\n';
        codigo += 'push dx\n';
        codigo += 'cmp ax,0\n';
        codigo += 'jnz reducirPrimitiva\n';
        codigo += 'mov di,p1\n';
        codigo += 'cmp di, 0ffffh\n';
        codigo += 'jg imprimirPrimitiva\n';
        codigo += 'mov si,45\n';
        codigo += 'push si\n';
        codigo += 'inc i\n';
        codigo += 'imprimirPrimitiva:\n';
        codigo += 'pop dx\n';
        codigo += 'printChar dl\n';
        codigo += 'dec i\n';
        codigo += 'cmp i,0\n';
        codigo += 'jnz imprimirPrimitiva\n';
        codigo += 'endm\n\n';
        return codigo;
    }

    callInvalueFunction(temp1, temp2, temp3, temp4, temp5) {
        let codigo = '';

        codigo += 'jmp fin_metodo_Invalue\n';
        codigo += 'Invalue proc\n';

        codigo += 'xor ax,ax\n';
        codigo += 'xor bx,bx\n';

        codigo += 'mov bx, p\n'; // bx = p
        codigo += 'inc bx\n'; // bx++
        codigo += 'mov si, bx\n';
        codigo += 'add si,si\n';
        codigo += 'mov ax, es:pila[si]\n'; // ax = stack[bx + 1]
        codigo += 'mov ' + temp2 + ', ax\n'; // 0 - int, 1 - string
        codigo += 'xor ax,ax\n';
        codigo += 'inc bx\n'; // bx++

        codigo += 'mov si, bx\n';
        codigo += 'add si,si\n';
        codigo += 'mov ax, es:pila[si]\n'; // ax = stack[bx + 2]
        codigo += 'mov ' + temp3 + ', ax\n'; // posicionDondeGuardar
        codigo += 'xor ax,ax\n';
        codigo += 'inc bx\n';

        codigo += 'mov si, bx\n';
        codigo += 'add si,si\n';
        codigo += 'mov ax, es:pila[si]\n';
        codigo += 'mov ' + temp4 + ', ax\n'; // 0 - stack, 1 - heap
        codigo += 'xor ax,ax\n';
        codigo += 'xor bx,bx\n';
        codigo += 'mov ax,' + temp2 + '\n';
        codigo += 'cmp ax,0\n';
        codigo += 'je isIntLabel\n';
        codigo += 'isStringLabel:\n';
        codigo += 'call leerString\n'
        codigo += 'xor ax, ax\n'
        codigo += 'mov ax, numeroLectura\n';
        codigo += 'mov ' + temp5 + ', ax\n';

        codigo += 'mov ax, ' + temp5 + '\n';
        codigo += 'mov bx, ' + temp3 + '\n';
        codigo += 'add bx,bx\n';

        codigo += 'mov cx,' + temp4 + '\n';
        codigo += 'cmp cx,0\n';
        codigo += 'je isStackInvalue\n';
        codigo += 'jmp isHeapInvalue\n';


        codigo += 'jmp isSalidaLabel\n';

        codigo += 'isIntLabel:\n';
        codigo += 'call leerNumero\n'
        codigo += 'xor ax, ax\n'
        codigo += 'mov ax, numeroLectura\n';
        codigo += 'mov ' + temp5 + ', ax\n';

        codigo += 'mov ax, ' + temp5 + '\n';
        codigo += 'mov bx, ' + temp3 + '\n';
        codigo += 'add bx,bx\n';

        codigo += 'mov cx,' + temp4 + '\n';
        codigo += 'cmp cx,0\n';
        codigo += 'je isStackInvalue\n';
        codigo += 'jmp isHeapInvalue\n';

        codigo += 'isStackInvalue:\n'
        codigo += 'mov es:pila[bx], ax\n';
        codigo += 'jmp isSalidaLabel\n';

        codigo += 'isHeapInvalue:\n'
        codigo += 'mov es:heap[bx], ax\n';

        codigo += 'isSalidaLabel:\n';
        codigo += '    ret\n';
        codigo += 'Invalue endp\n';
        codigo += 'fin_metodo_Invalue:\n';

        return codigo;
    }
}
exports.Tabla = Tabla;