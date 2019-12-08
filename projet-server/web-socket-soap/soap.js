/****LES MODULES NODEJS****/
const fs = require('fs');


const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');

// Fichier 
const utils = require('./utils');

// Modules utilisés pour le chiffrage de César
const caesar = require('caesar-encrypt');
const random = require('random');

const app = express();

const sourceDir = './mock'

if(!fs.existsSync(sourceDir))
{
    console.log(`Impossible de touver le dossier ${sourceDir}`);
}

const service = {

    Caesar_Service: {
        Caesar_Port: {
            encryptCesar(args) {

                let randomKey = random.int(min = 1, max = 26);

                let string = "La légende sanglante du comte Dracula est fortement liée au règne de Vlad Tepes.";
                
                let sourceFileContentEncrypt = caesar.encrypt(string, randomKey);
                
                console.log(`Chaine encrypté : ${sourceFileContentEncrypt}`);
                
                function decryptStringMessage()
                {
                    console.log(`Démarrage du décryptage...`);
                }
                
                setTimeout(decryptStringMessage, 1000);
                
                function decryptString(res) 
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

                        return res.status(200).send(`
                            La bonne clé est : ${i}
                            Chaine décrypté : ${sourceFileContentDecrypt}
                        `);
                    }
                }
                
                setTimeout(decryptString, 3000);
            }
        }
    }

};

const xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(8000, function(){

    try 
    {
        soap.listen(app, '/wsdl', service, xml);
    }
    catch(err) 
    {
        utils.logError(err);
        process.exit(1);
    }
    
});

