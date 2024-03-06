const express = require('express')
const http = require('http');
const socketio = require('socket.io');
const connect = require('./config/database-config')
const app = express()
const server = http.createServer(app);
const io = socketio(server)
const Chat = require('./models/chat')

io.on('connection', (socket) => {  //when any of the machine emmit a connection event then other one recieves by using io.on  //its ecpect a event called connection 
  socket.on('join_room', (data) => {
    console.log('joining a room', data.roomid)//data object having roomid
    socket.join(data.roomid)
  })
  socket.on('msg_send', async (data) =>//server receive data
  {
    console.log(data)  // data is then printed on server side
    const chat = await Chat.create({
      content: data.msg,
      user: data.username,
      roomId: data.roomid
    })
    io.to(data.roomid).emit('msg_rcvd', data)  //now the server emit this data to all client connected through socket in that room having that room id
  })
 
 
});
app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'))

app.get('/chat/:roomid',async (req, res) => // for ejs /chat/roomid  
{
  //to show previous chat we send chat content datafrom mongo db
  const chats = await Chat.find({
    roomId:req.params.roomid  //from a particulla room in whic chat is going
  }).select('content user')//from chats data we want only content that why we select only  content from it and also user

  res.render('index', {
    name: 'Bhuwan',
    id: req.params.roomid,
    chats:chats
  })
})

server.listen(3000, async () => {
  console.log('server started')
  await connect()
  console.log("mongodb connected")
})

//listening or receving an event using socket.on and emmiting and event using socket.emmit