/****LES MODULES NODEJS****/
const fs = require('fs');


const soap = require('soap');
const express = require('express');

// Fichier 
const utils = require('./utils');

// Modules utilisés pour le chiffrage de César
const random = require('random');
const caesar = require('caesar-encrypt');

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

               const numberChiffrage = random.int(min = 1, max = 26);
               const msgCaesar = caesar.encrypt()
            }
        }
    }

};




const API;


try {
    switch(API) {
        case 'IDECesar':

    }
}
catch(err) {
    utils.logError(err);
    process.exit(1);
}