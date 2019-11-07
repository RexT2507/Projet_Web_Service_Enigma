const fs = require('fs');

const logFile = './log.txt';
const logErrorOrderFile = 'error.txt';

// Méthode pour afficher les informations du log
function logInfo(message) 
{
	let date = new Date().toLocaleString();
	console.log(`${date} : info : ${message} \n`);
	fs.appendFileSync(logFile, `${date} : ${message} \n`);
}

// Méthode pour afficher les Warning du log
function logWarning(warning) 
{
	let date = new Date().toLocaleString();
	console.log(`${date}: WARNING : ${warning}`);
	fs.appendFileSync(logErrorOrderFile, `${date}: WARNING : ${warning} \n`);
}

// Méthode pour afficher les erreurs du log
function logError(message) 
{
	let date = new Date().toLocaleString();
	console.log(`${date}: ERROR : ${message}`);
	fs.appendFileSync(logFile, `${date}: ERROR : ${message} :\n`);
}

// Méthode d'affichage des messages
function delay(message) 
{
    return new Promise(function(resolve, reject) 
    {
		setTimeout(resolve, message);
	});
}

// EXPORT DES MODULES
module.exports.logInfo = logInfo;
module.exports.logWarning = logWarning;
module.exports.logError = logError;
module.exports.delay = delay;