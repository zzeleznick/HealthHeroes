var jade = require('jade');
var io = require('socket.io').listen(app);
var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.configure(function() {
    app.use(express.static(__dirname + '/public'))
});
app.get('/', function(req, res) {
    res.render('home.jade');
});
app.listen(3000);
io.sockets.on('connection', function (socket) {
    socket.on('setPseudo', function (data) {
        socket.set('pseudo', data);
    });
    socket.on('message', function (message) {
        socket.get('pseudo', function (error, name) {
            var data = { 'message' : message, pseudo : name };
            socket.broadcast.emit('message', data);
            console.log("user " + name + " send this : " + message);
        })
    });
});


