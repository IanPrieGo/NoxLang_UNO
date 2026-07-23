import * as TokenType from "./TokenTypes.js";
import * as Exp from "./Expresion.js";
import * as Syntax  from "./SyntaxElements.js";
import process from "node:process";

export class Parser {
    constructor(tokens){
        this.tokenIndex = 0;
        this.tokenList = tokens;
        this.stopParsing = false;
        this.hadError = false;
        this.declaredVariables = [];

        this.result;

    }

    parseProgram(tokens, holder){
        this.tokenList = tokens;
        console.log("Program: ");

        let commands = [];

        while (!this.match(this.currentToken(), [TokenType.EOF])){

            let currentCommand = this.command();

            if (currentCommand != undefined) {
                commands.push(currentCommand);
            }

        }

        console.log("COMANDOS:");
        console.log(commands);

        this.result = commands;

    }
    
    command(){

        let comando;

        switch (this.currentToken().type){

            case TokenType.LET:
                comando = this.creacion();
            break;

            case  TokenType.IMPRIME:
            break;

            default:
            break;

        }

        this.advanceIndex(1);

        return comando;

    }

    asignacion(){
        console.log("Asignacion: ");

        let variableName;
        let variableValue;

        this.advanceIndex(1);
        if (this.currentToken().type != TokenType.LITERAL){
            this.abort("Expecting Literal  ", 1);
        }

        variableValue = this.currentToken().value;

        this.advanceIndex(1);
        if (this.currentToken().type != TokenType.EOC){
            this.abort("Expecting \" ; \"", 1);
        }

        

        return new Syntax.Asignacion(variableName, variableValue);
    }
    
    creacion(){
        let asignValue = false;
        let variableName;
        let variableValue = null;

        this.advanceIndex(1);
        if (this.currentToken().type != TokenType.IDENTIFIER){
            this.abort("Expecting Identifier ", 1);
        }

        variableName = this.currentToken().value;

        for (let variable of this.declaredVariables){
            if (variable[0] == variableName){
                this.abort("Variable \"" + variable[0] +"\" Already Declared ", 1);
            };
        }
        console.log("Variable  \"" + variableName +"\" added to Declared variables list");

        this.advanceIndex(1);

        if (this.currentToken().type == "="){
            this.advanceIndex(1);
            variableValue = this.currentToken().value;
            this.advanceIndex(1);
        } 
    

        if (this.currentToken().type != TokenType.EOC){
            this.abort("Expecting \" ; \"", 1);
        }


        this.declaredVariables.push([variableName, variableValue]);
        return new Syntax.Creacion(variableName, variableValue);
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

    match(token, typesToCheck){
        for (let type of typesToCheck){
            if(token.type == type)
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

    abort(mes, errCode){
        console.error("ParsingError. " + mes); process.exit(errCode);
    }

}

  

    
