import * as TokenType from "./TokenTypes.js";
import * as Exp from "./Expresion.js";
import process from "node:process";

export class Parser {
    constructor(tokens){
        this.tokenIndex = 0;
        this.tokenList = tokens;
        this.stopParsing = false;
        this.hadError = false;

        this.result;

    }

    parseProgram(tokens, holder){
        this.tokenList = tokens;
        console.log("Program: ");

        let lines = [];

        while (!this.match(this.currentToken(), [TokenType.EOF])){

            lines.push();

        }

        console.log(lines.toString())

        this.result = lines;

    }
    
    linea(){

        retu

    }

    sumaResta(){
        let expresion =  this.divMult();

        while(this.match(this.nextToken(), [TokenType.PLUS, TokenType.MINUS])){

            let operator = new Exp.OPERATOR(this.nextToken());
            this.advanceIndex(2);
            let secondOperand = this.divMult();
            
            expresion = new Exp.BINARY(expresion, operator, secondOperand)
        }

        return expresion;
    }
    
    divMult(){

        let expresion = new Exp.PRIMARY(this.currentToken());

        while(this.match(this.nextToken(), [TokenType.MULTIPLY, TokenType.DIVIDE])){

            let operator = new Exp.OPERATOR(this.nextToken());
            this.advanceIndex(2);
            let secondOperand = this.divMult();
            
            expresion = new Exp.BINARY(expresion, operator, secondOperand)
        }

        return expresion;

    }

    match(suspect, typesToCheck){
        for (let type of typesToCheck){
            if(suspect.type == type)
            return true;
        }
        return false;
    } 

    advanceIndex(indexIncrease){
        this.tokenIndex += indexIncrease;
    }

    nextToken(){
        return this.tokenList[this.tokenIndex + 1];        
    }

    currentToken(){
        return this.tokenList[this.tokenIndex];
    }

}

  

    
