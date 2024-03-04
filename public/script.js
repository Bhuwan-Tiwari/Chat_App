//script.js js use to write js code in frontend
let btn = document.getElementById('btn')
let inputMsg = document.getElementById('newmsg')
let msgList = document.getElementById('msglist')

var socket = io()  //its started a connection event
//from any of the machine lets browser create websocket object then a new websocket connection is establish in backet server recive that connection usid io.on
//we make a socket connection here  

btn.onclick = function exec() {
    socket.emit('msg_send',
           {
             msg: inputMsg.value
            })
}


socket.on('msg_rcvd',(data)=>
{
    let limsg = document.createElement('li')
    limsg.innerText=  data.msg;
    msgList.appendChild(limsg)
})
