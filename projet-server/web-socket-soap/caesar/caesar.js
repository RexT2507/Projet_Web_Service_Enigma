
const caesar = require('caesar-encrypt');
const random = require('random');

let randomKey = random.int(min = 1, max = 26);

let string = "La légende sanglante du comte Dracula est fortement liée au règne de Vlad Tepes.";

let sourceFileContentEncrypt = caesar.encrypt(string, randomKey);

console.log(`Chaine encrypté : ${sourceFileContentEncrypt}`);

function sendKey()
{
    
}

function decryptStringMessage()
{
    console.log(`Démarrage du décryptage...`);
}

setTimeout(decryptStringMessage, 1000);

function decryptString() 
{
    let i = 1;

    let sourceFileContentDecrypt;

    do {

        console.log(`La clé ${i} n'est pas la bonne`);

        i = i + 1;

    } while(i != randomKey)

    if(i == randomKey)
    {

        sourceFileContentDecrypt = caesar.decrypt(sourceFileContentEncrypt, i);
        console.log(`La bonne clé est : ${i}`);
        console.log(`Chaine décrypté : ${sourceFileContentDecrypt}`);
    }
}

setTimeout(decryptString, 3000);





