const express = require('express')
const http = require('http');
const socketio = require('socket.io');

const app = express()
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {  //when any of the machine emmit a connection event then other one recieves by using io.on  //its ecpect a event called connection 
  console.log('a user connected', socket.id);  //each socket object has unique id :-socket.id

  socket.on('msg_send', (data) =>//server receive data
  {
    console.log(data)  // data is then printed on server side
    io.emit('msg_rcvd', data)  //now the server emit this data to all client connected through socket
  })

});
app.use('/', express.static(__dirname + '/public'))


server.listen(3000, () => {
  console.log('server started')
})

//listening or receving an event using socket.on and emmiting and event using socket.emmit