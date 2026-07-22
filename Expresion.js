

export class BINARY{
    constructor(firstOperand, operator, secondOperand){
        this.firstOperand = firstOperand;
        this.operator = operator;
        this.secondOperand = secondOperand;
    }

    toString(){
        return " (" + this.firstOperand + " " + this.operator + " " + this.secondOperand + ") ";
    }
}

export class PRIMARY{
    constructor(token){
        this.token = token;
    }

    toString(){
        return this.token.toString();
    }
}

export class OPERATOR{
    constructor(token){
        this.token = token;
    }

    toString(){
        return this.token.toString();
    }
}