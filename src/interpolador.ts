const args = process.argv.slice(2);
import path = require("path");
import fs = require("fs");
// import { substitui } from "./interpolador";

const encoding = args[3] || "utf8";
console.log(`Utilizando ${encoding} como encoding padrao.`);

function substitui(template: string, searchValue: string, replaceValue: string): string {
    const regex = new RegExp(searchValue, "g");
    const t = template.replace(regex, replaceValue);
    return t;
}

function encerraAplicacao(mensagem: string, code: number) {
    console.log(mensagem);
    process.exit(code);
}

process.on("exit", function(code: number) {
    return console.log(`Fim da execucao do Interpolador: ${code}`);
});

if (args.length == 0) {
    encerraAplicacao("Parametros nao informados.", 0);
}

const pathArquivoTemplate = path.join(__dirname, args[0]);
const pathFolderArquivos = path.join(__dirname, args[1]);
const arquivoSaida = path.join(__dirname, args[2]);
const folderExists = fs.existsSync(pathFolderArquivos);
const fileExists = fs.existsSync(pathArquivoTemplate);

if (!fileExists || !folderExists) {
    encerraAplicacao("Arquivo de Template ou Diretorio de Arquivos nao existe.", 0);
}

const conteudoTemplate = fs.readFileSync(pathArquivoTemplate, { encoding: encoding });
// console.log(templateFileContent);
const listaArquivos: string[] = fs.readdirSync(pathFolderArquivos);

let novoConteudo = conteudoTemplate;
listaArquivos.forEach((arquivo, index) => {
    try {
        const padrao = `##${arquivo}##`;
        const pathArquivo = path.join(pathFolderArquivos, arquivo);
        const conteudoArquivo = fs.readFileSync(pathArquivo, { encoding: encoding });
        novoConteudo = substitui(novoConteudo, padrao, conteudoArquivo);
    } catch (error) {}
});

fs.writeFileSync(arquivoSaida, novoConteudo, { encoding: encoding });