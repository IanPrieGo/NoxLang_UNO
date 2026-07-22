import fs from "node:fs";


export class Writer{
    constructor(){

    }

    createJavaFile(path, content){
        let header = 
        "public class MAIN {" + "\n" + 
        "   public static void main(String [] args) {" + "\n"
        ;

        let body = 
        "       " + this.sysOut(content, false) + ";\n"
        ;


        let footer = 
        "   }" + "\n" + 
        "}"
        ;

        fs.writeFileSync(path, header + body + footer);
    }

    sysOut(content, isString){
        let dQ = "";
        if (isString){
            dQ = "\""
        }
        return " System.out.println(" + dQ + content + dQ + ") "
    }

}