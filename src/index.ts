const args = process.argv.slice(2);
import path = require("path");
import fs = require("fs");
import { substitui } from "./interpolador";

function encerraAplicacao(mensagem: string, code: number) {
    console.log(mensagem);
    process.exit(code);
}

process.on("exit", function(code: number) {
    return console.log(`Fim da execução do Interpolador: ${code}`);
});

if (args.length == 0) {
    encerraAplicacao("Parametros não informados.", 0);
}

const pathArquivoTemplate = path.join(__dirname, args[0]);
const pathFolderArquivos = path.join(__dirname, args[1]);
const arquivoSaida = path.join(__dirname, args[2]);
const folderExists = fs.existsSync(pathFolderArquivos);
const fileExists = fs.existsSync(pathArquivoTemplate);

if (!fileExists || !folderExists) {
    encerraAplicacao("Arquivo de Template ou Diretório de Arquivos não existe.", 0);
}

const conteudoTemplate = fs.readFileSync(pathArquivoTemplate, { encoding: "utf8" });
// console.log(templateFileContent);
const listaArquivos: string[] = fs.readdirSync(pathFolderArquivos);

let novoConteudo = conteudoTemplate;
listaArquivos.forEach((arquivo, index) => {
    const padrao = `##${arquivo}##`;
    const pathArquivo = path.join(pathFolderArquivos, arquivo);
    const conteudoArquivo = fs.readFileSync(pathArquivo, { encoding: "utf8" });

    novoConteudo = substitui(novoConteudo, padrao, conteudoArquivo);
});

fs.writeFileSync(arquivoSaida, novoConteudo, { encoding: "utf8" });
