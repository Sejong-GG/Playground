var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require('path')

app.use(express.static(path.join(__dirname, "public")))

// '/' 경로로 요청을 받을 경우 index.html로 연결시킴
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// 
var port = process.env.PORT || 3000
http.listen(port, () => {
    console.log("server on!")
});

// 
var objects = {};
var GAME_SETTINGS = {
    WIDTH : 600, HEIGHT : 400, BACKGROUND_COLOR : "#FFFFFF"
};

io.on('connection', (socket) => {
    console.log('user connected: ', socket.id)
    objects[socket.id] = new UserObject();      // objects[socket.id] : key로 value 찾기( ex. {"key": "value"}) 
    console.log('user color: ' + objects[socket.id].status.color)
    io.to(socket.id).emit('connected', GAME_SETTINGS);
    io.emit('draw', objects[socket.id])

    socket.on('disconnect', () => {
        delete objects[socket.id]
        console.log('user disconnected: ', socket.id)
    })

    socket.on('push', (msg) => {
        io.emit('pull', msg);
    })
});

function UserObject() { // JS 생성자, 필드: color, status
    var color = "#"
    for(var i = 0; i < 6; i++) {
        color += (Math.floor(Math.random()*16)).toString(16)
    }
    this.status = {}
    this.status.x = 0
    this.status.y = 0
    this.status.height = 20
    this.status.width = 20
    this.status.color = color
}