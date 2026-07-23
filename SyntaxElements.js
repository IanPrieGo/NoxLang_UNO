export class Comando {

    constructor(comando){
        this.comando =  comando;
    }

}

export class Expresion {

}

export class Igualdad {

}

export class Diferenciacion {

}

export class SumRes {

}

export class DivMul {
    
}

export class Negacion {

}

export class Primaria {
   
}

export class Asignacion{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}
export class Creacion{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}
export class Ciclo{}
export class Condicional{}
export class Impresion{}
export class Metodo{}
export class Operacion{}
export class Acceso{}