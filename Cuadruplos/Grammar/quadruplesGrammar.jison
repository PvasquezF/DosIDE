/* lexical grammar */
%lex

%options case-insensitive
identificador   [Ñña-zA-Z_][Ñña-zA-Z0-9_]*
entero '-'([0-9])+|([0-9])+
decimal '-'?([0-9])+'.'([0-9])+
%%
\s+                   /* skip whitespace */
'//'.*                                   //'.*      /* skip comment */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   /* IGNORE */
t[0-9]+                 return 'temporal'
L[0-9]+                 return 'etiqueta'
'jmp'                   return 'salto'
'begin'                 return 'begin'
'end'                   return 'end'
'%c'                    return 'cadenaprint'
'%d'                    return 'decimalprint'
'%e'                    return 'enteroprint'
'P'                     return 'punteroStack'
'H'                     return 'punteroHeap'
'Heap'                  return 'heap'
'Stack'                 return 'stack'
'$_in_value'            return 'invalue'
'print'                 return 'imprimir'
'call'                  return 'llamada'
'je'                    return 'je'
'jne'                   return 'jne'
'jg'                    return 'jg'
'jl'                    return 'jl'
'jge'                   return 'jge'
'jle'                   return 'jle'
{identificador}         return 'identificador'
{decimal}               return 'decimal'
{entero}                return 'entero'
"*"                     return '*'
"/"                     return '/'
"-"                     return '-'
"+"                     return '+'
"%"                     return '%'
":"                     return ':'
"="                     return '='
","                     return ','
"("                     return '('
")"                     return ')'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%start INICIO

%% /* language grammar */

INICIO : ELEMENTOS EOF {return new AST($1);}
        ;

ELEMENTOS : ELEMENTOS ELEMENTO {
                                        if($2 instanceof Metodo){
                                                $$ = $1; $$ = $$.concat($2.instruccionesMetodo);
                                        }else{
                                                $$ = $1; $$.push($2);
                                        }
                                }
          | ELEMENTO {
                        if($1 instanceof Metodo){
                                $$ = $1.instruccionesMetodo;;
                        }else{
                                $$ = [$1];
                        }
                     }
          ;
           
ELEMENTO : INSTRUCCION {$$ = $1;}
         | METODO {$$ = $1;}
         ;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$$ = $1; $$.push($2);}
              | INSTRUCCION {$$ = [$1];}
              ;

INSTRUCCION : SALTOS {$$ = $1;}
            | ASIGNACION {$$ = $1;}
            | LLAMADA {$$ = $1;}
            | PRINT {$$ = $1;}
            | OPERACION {$$ = $1;}
            | ETIQUETA {$$ = $1;}
            ;

SALTOS : CONDICIONAL {$$ = $1;}
       | INCONDICIONAL {$$ = $1;}
       ;

CONDICIONAL : salto ',' ',' ',' etiqueta {$$ = new SaltoCondicional($5, yylineno + 1, _$[_$.length - 1].last_column + 1);} 
            ;

INCONDICIONAL : TIPOSALTO ',' VALOR ',' VALOR ',' etiqueta {$$ = new SaltoIncondicional($1, $3, $5, $7, yylineno + 1, _$[_$.length - 1].last_column + 1);} 
            ;

ETIQUETA : etiqueta ':' {$$ = new Etiqueta($1, yylineno + 1, _$[_$.length - 1].last_column + 1);}
         ;

ASIGNACION : '=' ',' VALOR ',' VALOR ',' ESTRUCTURA {$$ = new AsignacionEstructura($3, $5, $7, yylineno + 1, _$[_$.length - 1].last_column + 1);} // HEAP[VALOR1] = VALOR2
           | '=' ',' VALOR ',' ',' VALOR {$$ = new Asignacion($6, $3, yylineno + 1, _$[_$.length - 1].last_column + 1);} // VALOR2 = VALOR1
           | '=' ',' ESTRUCTURA ',' VALOR ',' VARIABLE {$$ = new  AccesoEstructura($3, $5, $7, yylineno + 1, _$[_$.length - 1].last_column + 1);} // VALOR2 = HEAP[VALOR1]
           ;

METODO : begin ',' ',' ',' identificador INSTRUCCIONES end ',' ',' ',' identificador {$$ = new Metodo($5, $6, yylineno + 1, _$[_$.length - 1].last_column + 1);}
       | begin ',' ',' ',' identificador end ',' ',' ',' identificador {$$ = new Metodo($5, [], yylineno + 1, _$[_$.length - 1].last_column + 1);}
       ;

LLAMADA : llamada ',' ',' ',' identificador {$$ = new Llamada($5, yylineno + 1, _$[_$.length - 1].last_column + 1);}    
        | llamada ',' ',' ',' invalue {$$ = new Invalue(yylineno + 1, _$[_$.length - 1].last_column + 1);}  
        ;

PRINT : imprimir '(' PARAMETROPRINT ',' VALOR ')' {$$ = new Print($3, $5, yylineno + 1, _$[_$.length - 1].last_column + 1);}  
      ;

PARAMETROPRINT : cadenaprint {$$ = $1;}
               | enteroprint  {$$ = $1;}
               | decimalprint {$$ = $1;}
               ;

ESTRUCTURA : stack {$$ = $1;}
           | heap {$$ = $1;}
           ;

TIPOSALTO : je {$$ = $1;}
          | jne {$$ = $1;}
          | jg {$$ = $1;}
          | jl {$$ = $1;}
          | jge {$$ = $1;}
          | jle {$$ = $1;}
          ;

VALOR : entero {$$ = new Primitivo(Number($1), yylineno + 1, _$[_$.length - 1].last_column + 1);}
      | decimal {console.log(type of $1); $$ = new Primitivo(Number($1), yylineno + 1, _$[_$.length - 1].last_column + 1);}
      | VARIABLE {$$ = $1;}
      ;

VARIABLE : temporal {$$ = new Identificador($1, yylineno + 1, _$[_$.length - 1].last_column + 1);}
         | punteroHeap {$$ = new Identificador($1, yylineno + 1, _$[_$.length - 1].last_column + 1);}
         | punteroStack {$$ = new Identificador($1, yylineno + 1, _$[_$.length - 1].last_column + 1);}
         ;
 
OPERACION : '+' ',' VALOR ',' VALOR ',' VARIABLE {$$ = new Operacion($1, $3, $5, $7, yylineno + 1, _$[_$.length - 1].last_column + 1);} 
          | '-' ',' VALOR ',' VALOR ',' VARIABLE {$$ = new Operacion($1, $3, $5, $7, yylineno + 1, _$[_$.length - 1].last_column + 1);} 
          | '*' ',' VALOR ',' VALOR ',' VARIABLE {$$ = new Operacion($1, $3, $5, $7, yylineno + 1, _$[_$.length - 1].last_column + 1);} 
          | '/' ',' VALOR ',' VALOR ',' VARIABLE {$$ = new Operacion($1, $3, $5, $7, yylineno + 1, _$[_$.length - 1].last_column + 1);} 
          | '%' ',' VALOR ',' VALOR ',' VARIABLE {$$ = new Operacion($1, $3, $5, $7, yylineno + 1, _$[_$.length - 1].last_column + 1);}  
          ;
