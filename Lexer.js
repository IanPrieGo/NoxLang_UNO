import * as TokenTypes from "./TokenTypes.js";
import {Token, Statement, Operator, Literal} from "./Token.js";
import process from "node:process";

export class Lexer {
    constructor(){
        this.source;
        this.charIndex = 0;
        this.tokens = [];
    }

    process(source){
        this.source = source;

        while (this.currentChar() != undefined){
            
            while (
            this.currentChar() === " " |
            this.currentChar() === "\r" |
            this.currentChar() === "\n" 
            ){
                this.charIndex++;
            }

            switch(this.currentChar()){
                case TokenTypes.PLUS:
                    this.tokens.push(new Operator(TokenTypes.PLUS));
                break;
                
                case TokenTypes.MINUS:
                    this.tokens.push(new Operator(TokenTypes.MINUS));
                break;
                
                case TokenTypes.MULTIPLY:
                    this.tokens.push(new Operator(TokenTypes.MULTIPLY));
                break;
                
                case TokenTypes.DIVIDE:
                    this.tokens.push(new Operator(TokenTypes.DIVIDE));
                break;

                case ";":
                    this.tokens.push(new Statement(TokenTypes.NEW_LINE));
                break;
                
                default:
                if (this.currentChar() <= "9" && this.currentChar() >= "0") {
                    this.tokens.push(new Literal(this.currentChar()));
                } else if (this.currentChar() === undefined){
                    //Just Exit The Loop
                } else {
                    console.log("Invalid Token: " + this.currentChar());
                    process.exit(1);
                }
                break;
            }
            
            this.charIndex++;
        }

        this.tokens.push(new Token(TokenTypes.EOF, null));

        console.log(this.tokens);

    }

    nextChar(){
        return this.source[this.charIndex + 1];
    }

    currentChar(){
        return this.source[this.charIndex];
    }

}