require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const index = require('./routes/index');
const publicaciones = require('./routes/publicaciones');
const perfil = require('./routes/perfil');
const amigos = require('./routes/amigos');
const chatbot = require('./routes/chatbot');
const { verifyToken } = require('./controllers/auth.controller');

const app = express();

app.set('port', process.env.API_PORT || 2000);
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.set('json spaces', 2);

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

app.use('/', index);
app.use('/', verifyToken, publicaciones);
app.use('/', verifyToken, perfil);
app.use('/', verifyToken, amigos);
app.use('/', verifyToken, chatbot);

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});