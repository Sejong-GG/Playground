## Socket.io
### 전체 코드
```js
io.on('connection', (socket) => {                       // socket 커넥션 이벤트
    io.to(socket.id).emit('connected', GAME_SETTINGS)   // socket.id(연결된 client마다 고유id를 가짐)를 가지고 채널의 이름이 connected인 곳으로 본냄
    io.emit('draw', objects[socket.id])					// 연결된 모든 draw채널로 client에 보냄

    socket.on('disconnect', () => {						// socket.on : 첫번째 인자에 임의로 채널 이름(약속한)을 전송할 수 있음
        console.log('user disconnected: ', socket.id)
    })

    socket.on('push', (msg) => {                        // push라는 채널로 값이 오면 pull이라는 채널로 값을 보냄
        io.emit('pull', msg)
    })
})
```

### 서버 -> 클라이언트(channel)
```js
socket.on('channel', (id) => {
    
})
```

### 클라이언트 -> 서버(channel)
```js
socket.emit('channel', value)
```