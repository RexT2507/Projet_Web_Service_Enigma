const express = require('express');
const router = express.Router();

const User = require('../models/user');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'enigmadb';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect(`${url}/${dbName}`, options);

const database = mongoose.connection;

database.once('open', _ => {
    console.log(`Connexion MongoDB : ${url}`);
    console.log(`Database : ${dbName}`);
});

database.on('error', err => {
    console.log('Erreur de connexion : ', err);
});

// EN ATTENTE D'IMPLEMENTATION (VOIR SI REELLEMENT PERTINANTE)
function verifyToken(req, res, next) 
{
    if (!req.headers.authorization)
    {
        return res.status(401).send('Demande non autorisée');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null')
    {
        return res.status(401).send('Demande non autorisée');
    }
    let playload = jwt.verify(token, 'secretKey');
    if (!playload)
    {
        return res.status(401).send('Demande non autorisée');
    }
    req.userId = playload.subject
    next()
}

router.get('/', (req, res) => {
    res.send(`
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Racine de l'API</a>
    </nav>
    <div class="alert alert-dark" role="alert">
        <a>Connexion MongoDB : ${url}</a>
        <br>
        <a>Database : ${dbName}</a>
    </div>
    `);
});

router.post('/register', (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) 
        {
            return res.status(500).json({
                error: err
            });
        }
        else
        {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });    
            
            user.save()
                .then(result => {
                    console.log(result);
                    let playload = { subject: user._id };
                    let token = jwt.sign(playload, 'secretKey');
                    res.status(200).send({token});
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })

});// Fin de la méthode register

router.post('/login', (req, res) => 
{
    User.findOne({ email: req.body.email }, function (err, user) {

        if (err)
        {
            return res.status(500).send('Error on the server.');
        }

        if (!user)
        {
            return res.status(404).send('Email invalide');
        }
        
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid)
        {
            return res.status(401).send('Mot de passe invalide');
        }
        
        const token = jwt.sign({ id: user._id }, 'secretKey', {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, token: token });
    });

}); // Fin de la méthode login


router.get('/user', verifyToken, (req, res) => {

    console.log('*************************OK');
    console.log(req.userId);
    console.log(req);
    User.findById(req.userId, {password: 0}, (err, user) => {
        console.log('*************************find user');
        console.log(`*************************${user}`);
        if(err)
        {
            return res.status(500).send(`Nous rencontrons un problème dans la recherche de l'utilisateur`);
        }
        if(!user)
        {
            return res.status(404).send(`Nous ne trouvons pas l'utilisateur`);
        }
        res.status(200).send(user);
        
    });
});

module.exports = router;