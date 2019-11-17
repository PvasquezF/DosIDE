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

        codigo += '.model huge\n';
        codigo += '.stack 10000h\n';
        codigo += '.data\n';
        codigo += 'pila dw 15000 dup(0000h)\n';
        codigo += 'heap dw 15000 dup(0000h)\n';
        codigo += 'numeroLectura dw 0000h\n';
        codigo += 'posicionLectura dw 0000h\n';
        codigo += 'buffer dw 0000h\n';
        let temp1 = this.getTemporal();
        let temp2 = this.getTemporal();
        let temp3 = this.getTemporal();
        let temp4 = this.getTemporal();
        let temp5 = this.getTemporal();
        this.temporales.map(m => {
            codigo += m + " dw 0\n";
        });
        codigo += '.code\n';
        codigo += 'mov ax,@data\n';
        codigo += 'mov ds,ax\n\n';


        codigo += this.AssemblerGeneradoProcs;
        codigo += this.macroLecturaNumero();
        codigo += this.macroImprimirString();

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


    macroImprimirString() {
        let codigo = '';
        codigo += 'jmp fin_metodo_intToStringPrint\n';
        codigo += 'intToStringPrint proc\n';
        codigo += 'mov di, ax\n'
        codigo += 'cmp di, 0ffffh\n'
        codigo += 'jg reservarEspacio\n';
        codigo += 'xor di,di\n';
        codigo += 'mov di,-1\n';
        codigo += 'neg ax\n'
        codigo += 'reservarEspacio:\n';
        codigo += '    mov [buffer+8],36    ; almacenamos $ en la posicion de memoria buffer + 1 \n';
        codigo += '    lea si,[buffer+8]   ; guardamos la direccion de memoria de buffer + 1 en SI\n';
        codigo += '    mov bx,10           ; agregamos 10 o 0ah al registro bx\n';
        codigo += '    \n';
        codigo += '\n';
        codigo += 'reducir:\n';
        codigo += '    mov dx,0            ; volvemos 0 el registro dx\n';
        codigo += '    div bx              ; ax = ax / bx   dx = ax mod bx el valor en dx luego de sumar 48\n';
        codigo += '                        ; es el que se va concatenando hacia el string final\n';
        codigo += '    add dx,48           ; agregamos 48 o 30h al valor resultante en el registro dx\n';
        codigo += '    dec si              ; regresamos 1 en la posicion de memoria guardada en si\n';
        codigo += '    mov [si],dl         ; guardamos el contenido de dl (un numero decimal) en si\n';
        codigo += '    cmp ax,0            ; comparamos si ax == 0\n';
        codigo += '    jz impString   ; si ax == 0 quiere decir que se redujo completamente el ascii\n';
        codigo += '    jmp reducir         ; sino lo repite hasta reducir al numero ascii a un valor menor a 16    \n';
        codigo += '\n';
        codigo += 'impString:           \n';
        codigo += '    cmp di,-1\n'
        codigo += '    jne continuarImprimiendoNumero\n';
        codigo += '    dec si\n'
        codigo += '    mov dl, 45\n'
        codigo += '    mov [si],dl\n';
        codigo += 'continuarImprimiendoNumero: \n'
        codigo += '    lea dx, [si]\n';
        codigo += '    imprimirString\n';
        codigo += '    ret\n';
        codigo += 'intToStringPrint endp\n';
        codigo += 'fin_metodo_intToStringPrint:\n';
        return codigo;
    }

    callInvalueFunction(temp1, temp2, temp3, temp4, temp5) {
        let codigo = '';

        codigo += 'jmp fin_metodo_Invalue\n';
        codigo += 'Invalue proc\n';
        codigo += 'call leerNumero\n'
        codigo += 'xor ax, ax\n'
        codigo += 'mov ax, numeroLectura\n';
        codigo += 'mov ' + temp5 + ', ax\n';
        codigo += 'xor ax,ax\n';
        codigo += 'xor bx,bx\n';

        codigo += 'mov bx, p\n'; // bx = p
        codigo += 'inc bx\n'; // bx++
        codigo += 'mov si, bx\n';
        codigo += 'add si,si\n';
        codigo += 'mov ax, pila[si]\n'; // ax = stack[bx + 1]
        codigo += 'mov ' + temp2 + ', ax\n'; // 0 - int, 1 - string
        codigo += 'xor ax,ax\n';
        codigo += 'inc bx\n'; // bx++

        codigo += 'mov si, bx\n';
        codigo += 'add si,si\n';
        codigo += 'mov ax, pila[si]\n'; // ax = stack[bx + 2]
        codigo += 'mov ' + temp3 + ', ax\n'; // posicionDondeGuardar
        codigo += 'xor ax,ax\n';
        codigo += 'inc bx\n';

        codigo += 'mov si, bx\n';
        codigo += 'add si,si\n';
        codigo += 'mov ax, pila[si]\n';
        codigo += 'mov ' + temp4 + ', ax\n'; // 0 - stack, 1 - heap
        codigo += 'xor ax,ax\n';
        codigo += 'xor bx,bx\n';
        codigo += 'mov ax,' + temp2 + '\n';
        codigo += 'cmp ax,0\n';
        codigo += 'je isIntLabel\n';
        codigo += 'isStringLabel:\n';

        codigo += 'jmp isSalidaLabel\n';

        codigo += 'isIntLabel:\n';
        codigo += 'mov ax, ' + temp5 + '\n';
        codigo += 'mov bx, ' + temp3 + '\n';
        codigo += 'mov si, bx\n';
        codigo += 'add si,si\n';

        codigo += 'mov cx,' + temp4 + '\n';
        codigo += 'cmp cx,0\n';
        codigo += 'je isStackInvalue\n';
        codigo += 'jmp isHeapInvalue\n';

        codigo += 'isStackInvalue:\n'
        codigo += 'mov pila[bx], ax\n';
        codigo += 'jmp isSalidaLabel\n';

        codigo += 'isHeapInvalue:\n'
        codigo += 'mov heap[bx], ax\n';

        codigo += 'isSalidaLabel:\n';
        codigo += '    ret\n';
        codigo += 'Invalue endp\n';
        codigo += 'fin_metodo_Invalue:\n';

        return codigo;
    }
}
exports.Tabla = Tabla;