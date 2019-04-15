const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//importar paquetes
const hbs = require('hbs');
//herencia
require('./hbs/helpers');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

//Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');

app.set('view engine', 'hbs');

//helper 
app.get('/', (req, res) => {
    //res.send('Hola Mundo');
    //res.render('home');
    res.render('home', {
        nombre: 'isi'
    });

});





//usando body asd

app.get('/about', (req, res) => {
    res.render('about');

});



app.post('/solver', (req, res) => {
    //modificación grabo cambios ctrl + s
    //nodemon permite bajar y levantar el servidor
    let body = req.body;
    console.log(body);
    var javascriptLpSolver = require("javascript-lp-solver"),
        results,
        model = {
            "optimize": "ganancia",
            "opType": "max",
            "constraints": {
                "conCafe": { "max": body.rf1 }, //120
                "sinCafe": { "max": body.rf2 } //180
            },
            "variables": {
                "TipoA": {
                    "ganancia": body.z1, //6
                    "conCafe": body.r11, //3
                    "sinCafe": body.r21 //3
                },
                "TipoB": {
                    "ganancia": body.z2, //5
                    "conCafe": body.r12, //2
                    "sinCafe": body.r22 //4
                },

            }
        };
    results = javascriptLpSolver.Solve(model);

    console.log(results);

    res.send(results);

});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});