const express = require('express');

const PORT = 8000;
const server = express();

server.get('/', function(req, res)
{
    res.send(`
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Serveur à l'écoute sur le port ${PORT}</a>
    </nav>
    `);
});

server.listen(PORT, function()
{
    console.log(`Serveur l'écoute sur le port: ${PORT}`);
});
