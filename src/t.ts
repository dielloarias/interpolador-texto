import path = require("path");
import fs = require("fs");

const folderPath = path.join(__dirname, "../arquivos");

const folderFiles = fs.readdirSync(folderPath);

console.log(folderFiles);

const y = fs.existsSync(folderPath);
console.log(y);

