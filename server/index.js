// Configuracion basica del servidor
// Cargas de modulos Basicos
var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res) {
   res.status(200).send('Hola Mundo desde una ruta'); 
});

var messages = [{
   id: 1,
   text: 'Mensaje por defecto',
   nickname: 'Charly-Bot' 
}];

io.on('connection', function(socket) {
    console.log('El cliente IP: ' + socket.handshake.address + 'se a conectado');
    
    socket.emit('messages', messages);
    
    socket.on('add-message', function(data){
       messages.push(data);
       
       io.sockets.emit('messages', messages);
    });
    
});

server.listen(1984, function(){
    console.log('Esta funcionando en http://localhost:1984');
});